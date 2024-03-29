import { createContext, useCallback, useEffect, useState } from "react";
//import { AuthService } from "../services/auth/AuthService";

export const UserContext = createContext()

export const UserProvider = ({children}) =>{

    const [loadingAuth, setLoadingAuth] = useState(true)
    const [user,setUser] = useState(null)

    const userLogin = (user) =>{
        const {id,name,email,isDoctor=false, profilePicture, cpf} = user
        setUser({id,name,email,isDoctor,profilePicture,cpf})
    } 

    const userIsDoctor = () => {
        if(!user) return false

        return user.isDoctor
    }

    const userLogout = () => {
        setUser(null)
    }

    const userAuth = useCallback(async () => {

        // if(!token){
        //     setLoadingAuth(false)
        //     return null
        // } 

        // try {
        //     const res = await AuthService.authUser(token)

        //     if(res.error) 
        //         return null
                
        //     const {id, name, email, profilePicture,role} = res.data
        //     const isDoctor = !!role && role==='doctor' 

        //     userLogin(id, name, email,isDoctor,profilePicture)
        // } catch (e) {

        // } finally {
        //     setLoadingAuth(false)
        // }


        
    },[])

    useEffect(()=>{
        userAuth()
    },[])

    return(
        <UserContext.Provider value={{user,userLogin,userIsDoctor, loadingAuth, userLogout}}>
            {children}
        </UserContext.Provider>
    )
}