import { ErrorResponse } from "./types";

export type SuccessfulImageUpload = [
  {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: number;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    provider_metadata: Object;
    createdAt: string;
    updatedAt: string;
  }
];
export type SuccessfulProductAdd = {
  data: {
    id: number;
    attributes: {
      name: string;
      description: string;
      price: number;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      teamName: string;
    };
  };
  meta: {};
};
export type ProductResponse = SuccessfulProductAdd | ErrorResponse;

export type ProductActionSuccess = SuccessfulProductAdd & {
  redirect: string;
};

export type ProductActionResponse = ProductActionSuccess | ErrorResponse;

export type ImageUpload = SuccessfulImageUpload | ErrorResponse;
