import PageClient from "./_components/PageClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { getData } from "@/utils/getData";
import { UserData } from "@/types/types";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const data = await getData<UserData>(
    "users/me?populate=avatar",
    session?.user.jwt
  );
  return <PageClient initialData={data} />;
}
