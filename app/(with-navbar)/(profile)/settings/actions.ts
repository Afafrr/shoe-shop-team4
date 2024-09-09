import { FormObj } from "./_components/PageClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { getData } from "../../_actions/getData";
import { UserData } from "@/types/types";
import { postData } from "../../_actions/postData";

export async function getUserInfo() {
  const session = await getServerSession(authOptions);
  return getData<UserData>("users/me", session?.user.jwt);
}

export async function updateUserData(formData: FormObj, { data }: any) {
  //removing undefined values
  const reducedData = Object.fromEntries(
    Object.entries(formData).filter(([key, val]) => val !== undefined)
  );
  const res = await postData({
    url: `users/${data.user.id}`,
    method: "PUT",
    token: data.user.jwt,
    data: reducedData,
  });
  return res;
}
