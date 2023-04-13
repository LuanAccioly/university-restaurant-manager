import { createContext, useState, useEffect } from "react";
import {setCookie, parseCookies, destroyCookie} from 'nookies'
import { recoverUser, signInRequest } from "../services/auth";
import { cozinhaApi, userApi } from "../services/api";
import useLocalStorage from "use-local-storage";
import cookie from 'js-cookie';
import { useToast } from "@chakra-ui/react";


export const AuthContext = createContext({})

export function AuthProvider ({children}) {
    const toast = useToast();

    const [user, setUser] = useState(null)
    const [isHub, setIsHub] = useState(true)
    const [lunch, setLunch] =  useLocalStorage("lunch", "0");
    const [dinner, setDinner] = useLocalStorage("dinner", "0");
    const [isLoading, setIsLoading] = useState(true)

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'ru.token': token } = parseCookies()

        userApi.interceptors.response.use(
            (response) => {
              return response;
            },
            (error) => {
              if (error?.response?.status === 401) {
                toast({
                    title: `Usuário não logado`,
                    position: 'top-right',
                    status: 'error',
                    isClosable: true,
                  });
                signOut(); 
                setUser(null);
                window.location.replace('http://localhost:3000/hub/login')
              }
              return error;
            }
          );
          cozinhaApi.interceptors.response.use(
            (response) => {
              return response;
            },
            (error) => {
              if (error?.response?.status === 401) {
                toast({
                    title: `Usuário não logado`,
                    position: 'top-right',
                    status: 'error',
                    isClosable: true,
                  });
                signOut(); 
                setUser(null);
                window.location.replace('http://localhost:3000/hub/login')
              }
              return error;
            }
          );

        if(token) {
            recoverUser().then(response => {
                if(!response) {
                    signOut(); 
                }
                userApi.defaults.headers['Authorization'] = `Bearer ${token}`
                cozinhaApi.defaults.headers['Authorization'] = `Bearer ${token}`
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
        cozinhaApi.defaults.headers['Authorization'] = `Bearer ${token}`

        setUser(user)
    }

    async function signOut () {
        await destroyCookie(undefined, 'ru.token')
        const { 'ru.token': token } = parseCookies()
        if(!token) {
            setDinner(0)
            setLunch(0)
            setUser(null)
            toast({
                title: `Usuário deslogado`,
                position: 'top-right',
                status: 'success',
                isClosable: true,
              });
            setTimeout(() => {
                window.location.replace('http://localhost:3000/hub')
            }, 700);
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, isHub, setIsHub, isLoading, setLunch, setDinner, dinner, lunch}}>
            {children}
        </AuthContext.Provider>
    )
}
