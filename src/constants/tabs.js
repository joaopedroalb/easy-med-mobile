import Medication from "../views/Medication"
import Profile from "../views/Profile"

const tabs = {
    PROFILE: {
      key: 'PROFILE',
      icon: 'user-circle',
      component: Profile,
      alwaysShow: true,
      label: 'Meu Perfil'
    },

    MEDICATION: {
        key: 'MEDICATION',
        icon: 'user-circle',
        component: Medication,
        alwaysShow: true,
        label: 'Medicamentos'
      },
  }
  
  export default tabs