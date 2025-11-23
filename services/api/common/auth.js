import { api } from "../axios";



export async function signIn(data) {
    let res = await api.post("users/login", data);
    if (res) return res.data;
    else return false;
}


export async function signUp(data) {
    let res = await api.post("users/register", data);
    if (res) return res.data;
    else return false;
}