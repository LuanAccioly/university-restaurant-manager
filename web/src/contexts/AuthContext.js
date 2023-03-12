import { createContext, useState, useEffect } from "react";
import {setCookie, parseCookies, destroyCookie} from 'nookies'
import { recoverUser, signInRequest } from "../services/auth";
import { userApi } from "../services/api";
import useLocalStorage from "use-local-storage";

export const AuthContext = createContext({})

export function AuthProvider ({children}) {
    const [user, setUser] = useState(null)
    const [isHub, setIsHub] = useState(true)
    const [lunch, setLunch] =  useLocalStorage("lunch", "0");
    const [dinner, setDinner] = useLocalStorage("dinner", "0");
    const [isLoading, setIsLoading] = useState(true)

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'ru.token': token } = parseCookies()
        if(token) {
            recoverUser().then(response => {
                setUser(response)
                setIsLoading(false)
            });   
        } else {
            setIsLoading(false)
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
        setDinner(0)
        setLunch(0)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, isHub, setIsHub, isLoading, setLunch, setDinner, dinner, lunch}}>
            {children}
        </AuthContext.Provider>
    )
}
