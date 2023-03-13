import { Api } from "../api/ApiConfig"
import { ApiException } from "../api/ApiExpection"

const login = async (email, password) => {
    try {
        console.log('a data é ')
        console.log({
            email:email,
            password:password
        })
        const {data} = await Api().post('/auth/login',{
            email:email,
            password:password
        })

        return {data: data, error:false}
    } catch(err) {
        console.log('to no error')
        console.log({...err})
        return new ApiException(err.message || 'Erro na tentativa de login.')
    }
}

const authUser = async (token) => {
    if(!token)
        return new ApiException('Erro token não existe')

    try {
        const { data } = await Api().post("/auth", { token })
        return { data: data, error: false }
    } catch (e) {
        return new ApiException(err.message || "Erro na tentativa da Autenticação.");
    }
}

export const AuthService = {
    login,
    authUser
}