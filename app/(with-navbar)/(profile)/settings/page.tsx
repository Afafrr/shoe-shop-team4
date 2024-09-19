import PageClient from "./_components/PageClient";
import { getUserInfo } from "./actions";

export default async function Page() {
  const data = await getUserInfo();
  return <PageClient initialData={data} />;
}
