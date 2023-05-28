const isAfterOrEqualsCurrentDate = (date) => {
    const CURRENT_DATE = new Date()
    const DATE = new Date(date)

    return DATE >= CURRENT_DATE
}

const formatDate = (date) => {
    const dateFormated = new Date(date).toLocaleDateString('pt-BR');

    return dateFormated
}   


export const DateService = {
    isAfterOrEqualsCurrentDate,
    formatDate
}