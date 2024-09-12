import { JWT } from "next-auth/jwt";

type PostOptions = {
  url: string;
  token: JWT;
  data: any;
};
type DeleteOptions = {
  token: JWT;
  imageId: number;
};

export async function postImage({ url, token, data }: PostOptions) {
  const formData = new FormData();
  formData.append("files", data);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      console.error(res);
      return {
        data: null,
        error: `There was a problem with uploading the image - ${res.statusText}`,
      };
    }

    return { data: await res.json(), error: "" };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: `There was a problem ${(error as Error)?.message}`,
    };
  }
}

export async function deleteImage({ token, imageId }: DeleteOptions) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/upload/files/${imageId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      console.error(res);
    }

    return { data: await res.json(), error: "" };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: `There was a problem ${(error as Error)?.message}`,
    };
  }
}
