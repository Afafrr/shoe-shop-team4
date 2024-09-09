"use server";
import { JWT } from "next-auth/jwt";
export type ResData<T> = { data: T | null; error: string };

export async function getData<T>(
  url: string,
  token: JWT | null | undefined
): Promise<ResData<T>> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.error(res);
      return {
        data: null,
        error: `There was a problem with getting the data - ${res.statusText}`,
      };
    }

    const data = await res.json();
    return { data: data, error: "" };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: `There was a problem ${(error as Error)?.message}`,
    };
  }
}
