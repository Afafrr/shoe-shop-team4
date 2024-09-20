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

interface ProductData {
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

interface Datum6 {
  id: number;
  attributes: Attributes8;
}

interface Attributes8 {
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
  createdBy: Parent;
  updatedBy: Parent;
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
