import { headers } from "next/headers";

export async function getCustomerData() {
  const authHeaders = headers();
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/customer`, {
      method: "GET",
      headers: authHeaders,
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    return { data: data, error: "" };
  } catch (error) {
    console.error(error);
    return { data: null, error: (error as Error).message };
  }
}
