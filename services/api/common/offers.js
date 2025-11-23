import { api } from "../axios";

export async function getOffers() {
  let res = await api.get("offers/getAll");
  if (res) return res.data;
  else return false;
}
