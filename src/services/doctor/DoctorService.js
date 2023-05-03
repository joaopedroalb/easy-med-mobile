import {Api} from '../api/ApiConfig'
import {ApiException} from '../api/ApiExpection'

const getRating = async (doctorId) => {
    try {
        const { data } = await Api().get(`/doctors/${doctorId}/ratings`)
        return {data: data, error:false}
    } catch (err) {
        return new ApiException(err.message || 'Erro ao consultar ranting do medico.')
    }
}

const createRating = async (doctorId, patientId) => {
    try {
        const { data } = await Api().post(`/patients/${patientId}/doctors/${doctorId}/ratings`)
        return {data: data, error:false}
    } catch (err) {
        return new ApiException(err.message || 'Erro ao criar ranting do medico.')
    }
}


export const DoctorService = {
    getRating,
    createRating
}