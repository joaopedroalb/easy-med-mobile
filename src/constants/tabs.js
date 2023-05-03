import AppointmentHistory from "../views/AppointmentHistory"
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
      label: 'Minhas Consultas'
    }, 

    DOCTORS: {
      key: 'DOCTORS',
      icon: 'user-circle',
      component: ListDoctors,
      alwaysShow: true,
      label: 'Medicos'
    }, 

    DOCTOR_PROFILE: {
      key: 'DOCTOR_PROFILE',
      icon: 'user-circle',
      component: DoctorProfile,
      alwaysShow: false,
      label: ''
    }
  }
  
  export default tabs