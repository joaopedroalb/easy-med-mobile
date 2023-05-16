import {Api} from '../api/ApiConfig'
import {ApiException} from '../api/ApiExpection'

const create = async (newPatient) => {
   try{
    const {data} = await Api().post('/patients',{
        name: newPatient.name,
        cpf: newPatient.cpf,
        email: newPatient.email,
        password: newPatient.password
    })

    return {data: data.patient, error: false }
   } catch (err) {
    return new ApiException(err.message || 'Erro ao criar paciente')
   }
}

const getById = async (idPatient) => {
    try{
        const { data } = await Api().get(`/patients/${idPatient}`)
        return {data: data, error:false}
    }catch(err){
        return new ApiException(err.message || 'Erro ao buscar paciente.')
    }
}

const getDoctorById = async (doctorId) => {
    try {
        const {data} = await Api().get(`/doctors/${doctorId}`)
        return {data: data, error:false} 
    } catch {
        return new ApiException(err.message || 'Erro ao buscar doutor.')
    }
}

const getDoctorList = async () => {
    try {
        const { data } = await Api().get(`/doctors`) 
        return {data: data, error: false}
    } catch (error) {
        return new ApiException(error.message || 'Erro ao buscar lista de medicos')
    }
}

const getSpecialties = async () => {
    try {
        const { data } = await Api().get(`/doctors/specialties`) 
        return {data: data, error: false}
    } catch (error) {
        return new ApiException(error.message || 'Erro ao buscar lista de especialidades')
    }
}

const updateById = async (idPatient, updatePatient) => {
    try{
        const { data } = await Api().patch(`/patients/${idPatient}`,{
            name: updatePatient.name,
            cpf: updatePatient.cpf,
            phone: updatePatient.phone,
            email: updatePatient.email,
            password: updatePatient.password,
            profilePicture: updatePatient.profilePicture,
            height: updatePatient.height,
            gender: updatePatient.gender,
            weight: updatePatient.weight
        })
        return {data: data.patient, error:false}
    }catch(err){
        return new ApiException(err.message || 'Erro ao atualizar as informações do paciente.')
    }
}

const getAllergiesByPatientId = async (idPatient) => {
    try{
        const { data } = await Api().get(`/patients/${idPatient}/allergies`)
        return {data: data.map(item=>{
            return {
                allergyId: item.allergyId,
                symptons: item.symptons,
                name: item.allergy.name
            }
        }), error:false}
    }catch(err){
        return new ApiException(err.message || 'Erro ao buscar paciente.')
    }
}

const getConditionsByPatientId = async (idPatient) => {
    try{
        const { data } = await Api().get(`/patients/${idPatient}/conditions`)
        return {data: data, error:false}
    }catch(err){
        return new ApiException(err.message || 'Erro ao buscar paciente.')
    }
}

const getMedicationsByPatientId = async (idPatient) => {
    try{
        const { data } = await Api().get(`/patients/${idPatient}/medicines`)
        return {data: data, error:false}
    }catch(err){
        return new ApiException(err.message || 'Erro ao buscar medicamento.')
    }
} 

const getAppointmentsByPatientId = async (idPatient) => {
    try{
        const { data } = await Api().get(`/patients/${idPatient}/appointments`)
        return {data: data, error:false}
    }catch(err){
        return new ApiException(err.message || 'Erro ao buscar consultas.')
    }
}


const getExamsByPatientId = async (idPatient) => {
    let appointments = []
    
    try{
        const { data } = await Api().get(`/patients/${idPatient}/appointments`)
        appointments = [...data]
        if(appointments.length === 0) 
            throw new Error('Paciente sem consultas')
    }catch(err){
        return new ApiException(err.message || 'Erro paciente não tem consultas')
    }

    try{
        let exams = []

        for (let i = 0; i<appointments.length ; i++) {
            const { data } = await Api().get(`/appointments/${appointments[i].id}/exams`)
            if (data.error)  
                throw new Error('Error ao buscar exame')
            exams = [...exams, ...data]
        }
        return {data: exams, error:false}
    }catch(err){
        return new ApiException(err.message || 'Erro ao buscar Exame por Consultas.')
    }
} 

const getExamByAppointmentId = async (idAppointment) => {
    try {
        const { data } = await Api().get(`/appointments/${idAppointment}/exams`)
        return {data: data, error:false}
    } catch (err) {
        return new ApiException(err.message || 'Erro ao buscar exames')
    }
}

const getAppointmentHistory = async (idPatient) => {
    try{
        const conditionsReq = await getConditionsByPatientId(idPatient)
        const appointmentReq = await getAppointmentsByPatientId(idPatient)

        if (conditionsReq.error)  throw new Error(conditionsReq.data)
        if (appointmentReq.error) throw new Error(appointmentReq.data)

        const result = appointmentReq.data.map(async appointment=>{
            const examsReq = await getExamByAppointmentId(appointment.id)
            const doctorReq = await getDoctorById(appointment.doctorId)

            if(examsReq.error)  throw new Error(examsReq.data)
            if(doctorReq.error) throw new Error(doctorReq.data)

            const conditionsByAppointment = conditionsReq.data.filter(x=> x.appointmentId === appointment.id).map(condition=>{
                return {
                    id: condition.id,
                    name: condition.name,
                }
            })
            const examsByAppointment = examsReq.data.map(exam=>{
                return {
                    id: exam.id,
                    examType: exam.examType,
                    result: exam.result,
                    location: exam.location,         
                }
            })
            const doctorById = doctorReq.data
            
            return {
                id: appointment.id,
                date: appointment.date,
                time: appointment.time,
                location: appointment.location,
                doctor: {
                    id: doctorById.id,
                    name: doctorById.name,
                    specialtyId: doctorById.specialtyId
                },
                exams:examsByAppointment,
                conditions: conditionsByAppointment
            }
        })

        return {data: result, error:false}

    }catch (err) {
        return new ApiException(err.message || 'Erro ao buscar informacoes')
    }
}

const createRatingDoctorByPatient = async (idPatient, idDoctor, rating) => {
    try {
        const { data } = await Api().post(`/patients/${idPatient}/doctors/${idDoctor}/ratings`, {
            rating: rating
        })

        return {data: data, error: false}
    } catch (err) {
        return new ApiException(err.message || 'Falha ao avaliar medico')
    }
}

const getRatingDoctorByPatient = async (idPatient, idDoctor) => {
    try {
        const {data} = await Api().get(`/patients/${idPatient}/doctors/${idDoctor}/ratings`)
        return {data: data, error:false}
    } catch (err) {
        return new ApiException(err.message || 'Não existe avaliacao entre eles')
    }
}

const getValidatePatientValidateDoctor = async (idPatient, idDoctor) => {
    try {
        const { data, error } = await getAppointmentsByPatientId(idPatient)

        if (error) 
            return false

        const CURRENT_DATE = new Date()
        
        for(let i = 0; i < data.length; i++) {
            const CURRENT_APPOINTMENT = data[i]
            const APPOINTMENT_DATE = new Date(CURRENT_APPOINTMENT.date)

            if(CURRENT_APPOINTMENT.doctor.id === idDoctor && APPOINTMENT_DATE < CURRENT_DATE )
                return true
        }
        return false
    } catch (err) {
        return false
    }
}

export const PatientService = {
    create,
    getById,
    updateById,
    getAllergiesByPatientId,
    getConditionsByPatientId,
    getMedicationsByPatientId,
    getAppointmentsByPatientId,
    getExamsByPatientId,
    getExamByAppointmentId,
    getAppointmentHistory, 
    getDoctorList, 
    getSpecialties,
    getRatingDoctorByPatient,
    getValidatePatientValidateDoctor,
    createRatingDoctorByPatient
}