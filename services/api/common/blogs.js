import { api } from "../axios";



// Blogs 
export async function getBlogs() {
    let res = await api.get("blogs/all");
    if (res) return res.data;
    else return false;
}

// Blogs By Id 
export async function getBlogsById(id) {
    let res = await api.get("blogs/get/" + id);
    if (res) return res.data;
    else return false;
}
