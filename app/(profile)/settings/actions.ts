import { FormObj } from "./_components/PageClient";
export type UserData = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
};
export type UserDataRes = { data: UserData | null; error: string };
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTk0LCJpYXQiOjE3MjQ4NjE0MjMsImV4cCI6MTcyNzQ1MzQyM30.JaEeavlYENGxJmu55pD0ZEoXTl5kJWQROvXiqxD3Mio";
const id = 594;
export async function getUserData(): Promise<{
  data: UserData | null;
  error: string;
}> {
  try {
    const res = await fetch(
      `https://shoes-shop-strapi.herokuapp.com/api/users/me`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) {
      console.error(res);
      return {
        data: null,
        error: `There was a problem with getting the data - ${res.statusText} `,
      };
    }
    const data = await res.json();
    return { data: data, error: "" };
  } catch (error) {
    console.error(error);
    return { data: null, error: "There was a problem" };
  }
}
export async function updateUserData(formData: FormObj) {
  const res = await fetch(
    `https://shoes-shop-strapi.herokuapp.com/api/users/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        body: JSON.stringify(formData),
      },
    }
  );
  if (!res.ok) {
    console.error(res);
    throw new Error(`Failed to update - ${res.statusText}`);
  }
  return await res.json();
}
