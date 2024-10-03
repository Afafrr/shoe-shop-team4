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
      id: 0,
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
