import { ReducedData } from "./_components/PageClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { getData } from "../../../../utils/getData";
import { UserData } from "@/types/types";
import { postData } from "../../../../utils/postData";
import { postImage, deleteImage } from "../../../../utils/imageOperations";
import { JWT } from "next-auth/jwt";

export async function getUserInfo() {
  const session = await getServerSession(authOptions);
  return getData<UserData>("users/me?populate=avatar", session?.user.jwt);
}

export async function updateUserData(formData: ReducedData, { data }: any) {
  //removing undefined values
  const reducedData = Object.fromEntries(
    Object.entries(formData).filter(([key, val]) => val !== undefined)
  );
  // if formData has avatar -> image has been changed
  if (formData.avatar) {
    const avatar = reducedData?.avatar;
    const imgRes = await postImage({
      url: "upload",
      token: data.user.jwt,
      data: avatar,
    });
    if (!imgRes.error) {
      reducedData["avatar"] = imgRes?.data[0].id;
    } else {
      return imgRes;
    }
  }
  // if formData has deleteImg:true and -> avatar will be deleted
  if (formData.deleteImg) {
    reducedData["avatar"] = undefined;
  }
  //delete image from DB if image changed or deleted
  if (formData.deleteImage || formData.avatar) {
    //getting actual imageId assigned to profile
    const userData = await getData<UserData>(
      "users/me?populate=avatar",
      data.user.jwt
    );
    const prevAvatarId = userData.data?.avatar?.id;
    if (prevAvatarId)
      deleteImage({ token: data.user.jwt, imageId: prevAvatarId as number });
  }
  // update users profile
  const res = await postData({
    url: `users/${data.user.id}`,
    method: "PUT",
    token: data.user.jwt,
    data: reducedData,
  });

  return res;
}
