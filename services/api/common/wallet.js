import { api } from "../axios";


const user = JSON.parse(localStorage.getItem('user'))
export async function getWallet() {
    let res = await api.get(`transaction/getByClient/${user?.id}`);
    if (res) return res.data;
    else return false;
}


