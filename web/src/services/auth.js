import { userApi } from "./api";


export async function signInRequest ({email, password}){

    const { data, status } = await userApi.post("/login", {
        email,
        password,
      });

    return {token:data.token, user: data.user}
}

export async function recoverUser (){

  const { data, status } = await userApi.get("/user/profile");

  return data
}