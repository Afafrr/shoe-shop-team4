import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { getData } from "../../../../utils/getData";
import { MyProduct } from "@/types/Product";
import { UserData } from "@/types/types";
import { ResData } from "@/utils/getData";
import { postData } from "@/utils/postData";

export async function getMyProducts(): Promise<
  ResData<
    UserData & {
      products: MyProduct[];
    }
  >
> {
  const session = await getServerSession(authOptions);
  return getData("users/me?populate[products][populate]=*", session?.user.jwt);
}

export async function deleteProduct(productId: number) {

}
