import { createContext, useState, useEffect } from "react";
import {setCookie, parseCookies, destroyCookie} from 'nookies'
import { signInRequest } from "../services/auth";
import { userApi } from "../services/api";

export const AuthContext = createContext({})

export function AuthProvider ({children}) {
    const [user, setUser] = useState(null)
    const [isHub, setIsHub] = useState(true)

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'ru.token': token } = parseCookies()
        if(token) {
            //recoverUser
        }
    }, []);

    async function signIn({email, password}) {
        const {user, token} = await signInRequest({
            email,
            password
        })
        
        setCookie(undefined, 'ru.token', token, {
            maxAge: 60*60*2,
        })

        userApi.defaults.headers['Authorization'] = `Bearer ${token}`

        setUser(user)
    }

    function signOut () {
        destroyCookie(undefined, 'ru.token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, isHub, setIsHub}}>
            {children}
        </AuthContext.Provider>
    )
}
