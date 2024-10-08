import { ContextType, ErrorResponse } from "./types";

export interface ProductListResponse {
  data: ProductListResponseDataItem[];
  meta: Meta;
}

export interface ProductListResponseDataItem {
  id: number;
  attributes: Product;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Product {
  name: string;
  images: ImageResponse;
  description: string;
  brand: BrandResponse;
  categories: Related;
  color: Parent;
  gender: Parent;
  sizes: Related;
  price: number;
  userID: Parent;
  teamName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: Parent;
  updatedBy: Parent;
}
export interface MyProduct {
  id: number;
  name: string;
  images: MyImage[];
  description: string;
  brand: BrandResponse;
  categories: Related;
  color: Color;
  gender: Gender;
  sizes: Related;
  price: number;
  userID: Parent;
  teamName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: Parent;
  updatedBy: Parent;
}

export interface MyImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Gender {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
interface Color {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
interface ImageResponse {
  data: ImageData[];
}

interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

interface ImageAttributes {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  related: Related;
  folder: Folder;
  folderPath: string;
  createdAt: string;
  updatedAt: string;
  createdBy: Parent;
  updatedBy: Parent;
}

interface BrandResponse {
  data: BrandData;
}

interface BrandData {
  id: number;
  attributes: Brand;
}

interface Brand {
  name: string;
  products: ProductsResponse;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: Parent;
  updatedBy: Parent;
}

interface ProductsResponse {
  data: ProductData[];
}

export interface ProductData {
  id: number;
  attributes: ProductAttributes;
}

interface ProductAttributes {
  name: string;
  images: Images2;
  description: string;
  brand: Parent;
  categories: Categories;
  color: Color;
  gender: Color;
  sizes: Sizes;
  price: number;
  userID: UserID;
  teamName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: Parent;
  updatedBy: Parent;
}

interface UserID {
  data: Data4;
}

interface Data4 {
  id: number;
  attributes: Attributes13;
}

interface Attributes13 {
  username: string;
  email: string;
  provider: string;
  resetPasswordToken: string;
  confirmationToken: string;
  confirmed: boolean;
  blocked: boolean;
  role: Role;
  products: Related;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  avatar: Avatar;
  createdAt: string;
  updatedAt: string;
  createdBy: Parent;
  updatedBy: Parent;
}

interface Avatar {
  data: Datum6;
}

interface Role {
  data: Data3;
}

interface Data3 {
  id: number;
  attributes: Attributes12;
}

interface Attributes12 {
  name: string;
  description: string;
  type: string;
  permissions: Permissions2;
  users: Related;
  createdAt: string;
  updatedAt: string;
  createdBy: Parent;
  updatedBy: Parent;
}

interface Permissions2 {
  data: Datum9[];
}

interface Datum9 {
  id: number;
  attributes: Attributes11;
}

interface Attributes11 {
  action: string;
  role: Parent;
  createdAt: string;
  updatedAt: string;
  createdBy: Parent;
  updatedBy: Parent;
}

interface Sizes {
  data: Datum8[];
}

interface Datum8 {
  id: number;
  attributes: Attributes10;
}

interface Attributes10 {
  value: number;
  products: Related;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: Parent;
  updatedBy: Parent;
}

export type Options = {
  data: GetOption[];
};

export type GetOption = {
  id: number;
  attributes: Attributes14;
};

export type SizeOptions = {
  data: GetSizes[];
};
export type GetSizes = {
  id: number;
  attributes: Attributes15;
};

interface Attributes14 {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

type Attributes15 = Omit<Attributes14, "name"> & {
  value: string;
};

interface Color {
  data: Datum7;
}

interface Categories {
  data: Datum7[];
}

interface Datum7 {
  id: number;
  attributes: Attributes9;
}

interface Attributes9 {
  name: string;
  products: Related;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: Parent;
  updatedBy: Parent;
}

interface Images2 {
  data: Datum6[];
}

export interface Datum6 {
  id: number;
  attributes: Attributes8;
}

interface Attributes8 {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string;
  related?: Related;
  folder?: Parent;
  folderPath?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: Parent;
  updatedBy?: Parent;
}

interface Folder {
  data: Data2;
}

interface Data2 {
  id: number;
  attributes: Attributes6;
}

interface Attributes6 {
  name: string;
  pathId: number;
  parent: Parent;
  children: Related;
  files: Files;
  path: string;
  createdAt: string;
  updatedAt: string;
  createdBy: Parent;
  updatedBy: Parent;
}

interface Files {
  data: Datum4[];
}

interface Datum4 {
  id: number;
  attributes: Attributes5;
}

interface Attributes5 {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  related: Related;
  folder: Parent;
  folderPath: string;
  createdAt: string;
  updatedAt: string;
  createdBy: CreatedBy;
  updatedBy: Parent;
}

interface CreatedBy {
  data: Data;
}

interface Data {
  id: number;
  attributes: Attributes4;
}

interface Attributes4 {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  resetPasswordToken: string;
  registrationToken: string;
  isActive: boolean;
  roles: Roles;
  blocked: boolean;
  preferedLanguage: string;
  createdAt: string;
  updatedAt: string;
  createdBy: Parent;
  updatedBy: Parent;
}

interface Roles {
  data: Datum3[];
}

interface Datum3 {
  id: number;
  attributes: Attributes3;
}

interface Attributes3 {
  name: string;
  code: string;
  description: string;
  users: Related;
  permissions: Permissions;
  createdAt: string;
  updatedAt: string;
  createdBy: Parent;
  updatedBy: Parent;
}

interface Permissions {
  data: Datum2[];
}

interface Datum2 {
  id: number;
  attributes: Attributes2;
}

interface Attributes2 {
  action: string;
  actionParameters: string;
  subject: string;
  properties: string;
  conditions: string;
  role: Parent;
  createdAt: string;
  updatedAt: string;
  createdBy: Parent;
  updatedBy: Parent;
}

interface Parent {
  data: Datum;
}

interface Related {
  data: Datum[];
}

interface Datum {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  name: string;
  value: number;
}

export interface AttributeResponse {
  data: AttributeListResponseDataItem[];
  meta: Meta;
}

export interface AttributeListResponseDataItem {
  id: number;
  attributes: Attributes;
}

export type SuccessfulImageUpload = Omit<
  ImageAttributes,
  "related" | "folder" | "folderPath" | "createdBy" | "updatedBy"
> &
  {
    id: number;
  }[];

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

export type ProductFormSchema = {
  name: string;
  price: number | undefined;
  categories: string[];
  color: string[];
  gender: string;
  brand: string;
  description: string;
  sizes: string[];
  images: File[];
};

export type Option = {
  value: string;
  label: string;
};
export type ProductOptions = {
  colors: Option[] | null;
  categories: Option[] | null;
  brands: Option[] | null;
  genders: Option[] | null;
  sizes: Option[] | null;
};

export type ActionFunction = {
  (data: FormData, context: ContextType): Promise<ProductActionResponse>;
  (
    data: FormData,
    context: ContextType,
    id: string
  ): Promise<ProductActionResponse>;
};

export type EditProduct = ProductFormSchema & {
  id: string;
};

export type getProducts = {
  data: BackProduct[];
};

export type BackProduct = {
  id: number;
  attributes: {
    name: string;
    description: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    teamName: "team-4";
    brand: Data5;
    categories: Data6;
    gender: Data5;
    color: Data5;
    sizes: Data6;
    images: Images2;
  };
};

type Data5 = {
  data: attributes16;
};
type Data6 = {
  data: attributes16[];
};

type attributes16 = {
  id: string;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export type ProductCard = {
  productId: number;
  name: string;
  gender: string;
  imageUrl: string;
  price: number;
};

export type ProductContextItem = ProductCard & {
  id: string;
};
