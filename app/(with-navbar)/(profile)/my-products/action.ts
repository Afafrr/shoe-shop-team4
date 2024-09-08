"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { getData } from "../../_actions/getData";

export async function getMyProducts() {
  const session = await getServerSession(authOptions);
  return getData("users/me?populate=products", session?.user.jwt);
}
