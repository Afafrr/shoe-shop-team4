import PageClient from "./_components/PageClient";
import { getUserData } from "./actions";
import { UserDataRes } from "./actions";

export default async function Page() {
  const data: UserDataRes = await getUserData();
  return <PageClient initialData={data} />;
}
