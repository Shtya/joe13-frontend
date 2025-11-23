import { api } from "../axios";
import { makeFilterString } from "../utils";

// Get Careers
export async function getCareers() {
  let res = await api.get("careers/index");
  if (res) return res.data;
  else return false;
}

export async function getCareerById(id) {
  let res = await api.get("careers/get/" + id);
  if (res) return res.data;
  else return false;
}

export async function getAboutUs() {
  let res = await api.get("aboutus/getAll");
  if (res) return res.data;
  else return false;
}

export async function getManager() {
  let res = await api.get("team/all");
  if (res) return res.data;
  else return false;
}

export async function addContactUsData(data) {
  let res = await api.post("contact/create", data);
  if (res) return res.data;
  else return false;
}

export async function getService() {
  let res = await api.get("get_services");
  if (res) return res.data;
  else return false;
}
export async function forgetPassword(data) {
  let res = await api.post("user/send-ResetCode", data);
  if (res) return res.data;
  else return false;
}
export async function changePassword(data) {
  let res = await api.post("user/change-password", data);
  if (res) return res.data;
  else return false;
}
export async function getProjects(data) {
  let res = await api.get("projects/index", data);
  if (res) return res.data;
  else return false;
}

export async function getDepartment(id) {
  let res = await api.get(`category/get/${id}`);
  if (res) return res.data;
  else return false;
}

export async function getCategory() {
  let res = await api.get(`category/index`);
  if (res) return res.data;
  else return false;
}
export async function getCategoryById(id) {
  let res = await api.get(`category/get/${id}`);
  if (res) return res.data;
  else return false;
}

export async function getAffliate() {
  let res = await api.get(`category/get/1`);
  if (res) return res.data;
  else return false;
}

export async function getCodeService() {
  let res = await api.get("services/getByCategory/1");
  if (res) return res.data;
  else return false;
}
