import {Api} from '../api/ApiConfig'
import {ApiException} from '../api/ApiExpection'

const getAvailableAppointment = async (doctorId, startDate, endDate) => {
    try {
        const { data } = await Api().get(`/doctors/${doctorId}/appointments?startDate=${startDate}&endDate=${endDate}`)
        return {data: data, error:false}
    } catch (err) {
        return new ApiException(err.message || 'Erro ao consultas disponiveis.')
    }
}

const createAppointment = async (doctorId, patientId, date, time) => {
    try {
        const { data } = await Api().post(`/patients/${patientId}/doctors/${doctorId}/appointments`,{
            date: date,
            time: time
        })
        return {data: data, error:false}
    } catch (err) {
        return new ApiException(err.message || 'Erro ao criar consulta.')
    }
}


export const AppointmentService = {
    getAvailableAppointment,
    createAppointment
}