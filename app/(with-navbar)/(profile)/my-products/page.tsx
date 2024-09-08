"use server";
import { getMyProducts } from "./action";
import MyProductsClient from "./_components/MyProductsClient";

export default async function Page() {
  const data = await getMyProducts();
  return <MyProductsClient data={data} />;
}
