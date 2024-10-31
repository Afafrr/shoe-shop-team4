import ClientPage from "./_components/ClientPage";
import { getCustomerData } from "./serverActions";

export default async function Page() {
  const customerInfo = await getCustomerData();
  return <ClientPage customerInfo={JSON.parse(customerInfo)} />;
}
