import AppointmentHistory from "../views/AppointmentHistory/AppointmentHistory"
import AppointmentList from "../views/AppointmentList"
import DoctorProfile from "../views/DoctorProfile/DoctorProfile"
import ListDoctors from "../views/ListDoctors/ListDoctors"
import Medication from "../views/Medication"
import Profile from "../views/Profile"

const tabs = {
    PROFILE: {
      key: 'PROFILE',
      icon: 'user-circle',
      component: Profile,
      alwaysShow: false,
      label: 'Meu Perfil'
    },

    MEDICATION: {
        key: 'MEDICATION',
        icon: 'user-circle',
        component: Medication,
        alwaysShow: true,
        label: 'Medicamentos'
      },

    APPOINTMENTS: {
      key: 'APPOINTMENTS',
      icon: 'user-circle',
      component: AppointmentHistory,
      alwaysShow: true,
      label: 'Histórico de consultas'
    }, 

    DOCTORS: {
      key: 'DOCTORS',
      icon: 'user-circle',
      component: ListDoctors,
      alwaysShow: true,
      label: 'Medicos'
    }, 

    APPOINTMENTS_LIST: {
      key: 'APPOINTMENTS_LIST',
      icon: '',
      component: AppointmentList,
      alwaysShow: true,
      label: 'Minhas Consultas'
    },

    DOCTOR_PROFILE: {
      key: 'DOCTOR_PROFILE',
      icon: 'user-circle',
      component: DoctorProfile,
      alwaysShow: false,
      label: ''
    },
  }
  
  export default tabs