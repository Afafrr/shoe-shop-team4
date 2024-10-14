import { ReducedData } from "@/app/(with-navbar)/(profile)/settings/_components/PageClient";
import { inputs } from "@/app/(with-navbar)/(profile)/settings/_schema/profileSchema";
import { UserData } from "@/types/types";
import { ResData } from "@/utils/getData";

export const mockUserData: ResData<UserData> = {
  data: {
    id: 1,
    username: "",
    email: "",
    provider: "",
    confirmed: true,
    blocked: false,
    createdAt: "",
    updatedAt: "",
    phoneNumber: "",
    firstName: "TestName",
    lastName: "",
    avatar: {
      id: 1,
      name: "",
      alternativeText: "",
      caption: "",
      width: 0,
      height: 0,
      formats: {
        thumbnail: {
          ext: "",
          url: "",
          hash: "",
          mime: "",
          name: "",
          path: "",
          size: 0,
          width: 0,
          height: 0,
          provider_metadata: {
            public_id: "",
            resource_type: "",
          },
        },
      },
      hash: "",
      ext: "",
      mime: "",
      size: 0,
      url: "testUrl",
      previewUrl: "",
      provider: "",
      provider_metadata: {
        public_id: "",
        resource_type: "",
      },
      createdAt: "",
      updatedAt: "",
    },
  },
  error: "",
};

export const mockUserSessionData = {
  user: {
    name: "Jhon",
    email: "Jhon@gmail.com",
    id: 123,
    jwt: "TestJWT",
    rememberMe: false,
  },
  expires: "TestData",
};

export const mockAvatar: File = {
  name: "avatar.jpg",
  size: 1024,
  type: "image/png",
  lastModified: 0,
  webkitRelativePath: "",
  arrayBuffer: function (): Promise<ArrayBuffer> {
    throw new Error("Function not implemented.");
  },
  slice: function (start?: number, end?: number, contentType?: string): Blob {
    throw new Error("Function not implemented.");
  },
  stream: function (): ReadableStream<Uint8Array> {
    throw new Error("Function not implemented.");
  },
  text: function (): Promise<string> {
    throw new Error("Function not implemented.");
  },
};

export function mockInitialData() {
  const { data } = mockUserData;
  const reducedData: ReducedData = {};
  const inputsName = inputs.map((input) => input.props.name);
  if (data) {
    for (const key of inputsName) {
      const value = data[key as keyof typeof data];
      reducedData[key] = value;
    }
  }
  return reducedData;
}
