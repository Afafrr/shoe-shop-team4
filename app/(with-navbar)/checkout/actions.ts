import { ResData } from "@/utils/getData";

export async function postData<T>(url: string, body: {}): Promise<ResData<T>> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return { data: null, error: res.statusText };
    }
    const data = await res.json();
    return { data: data, error: "" };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
}

export async function getUserTransactions() {
  try {
    const res = await fetch("/api/payment-intent", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!res.ok) {
      return { data: null, error: res.statusText };
    }
    const data = await res.json();
    console.log(data);
    return { data: data, error: "" };
  } catch (error) {
    console.error(error);
    return { data: null, error: (error as Error).message };
  }
}
