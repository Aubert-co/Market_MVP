import type { UpsertProducts } from "@/types/storeDashboard.types";
import { categories } from "../constants/filters";


export const isValidEmail = (email:any):boolean=>{
  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return emailRegex.test(email);
}

export const isAValidString =(value:any,maxLength:number = 15):boolean=>{
    if(!value || typeof value !== 'string' )return false;

    if(value.length <= 4 || value.length >= maxLength)return false;
    return true;
}
export type RefValue = React.RefObject<HTMLInputElement | null>;

export const getValidImageFile = (image: RefValue): File | undefined => {
  const fileInput = image.current?.files?.[0];
  if (!fileInput) return undefined;

  return fileInput.type.startsWith("image/") ? fileInput : undefined;
};


export const checkIsAValidNumber = (value:any):boolean=>{
   if (typeof value === 'boolean') return false;

  const number = Number(value);

  if (
    value === null ||
    value === undefined ||
    value === '' ||
    isNaN(number) ||
    number <= 0
  ) {
    return false;
  }
  const isValidFormat = /^[0-9]+(\.[0-9]+)?$/.test(String(value)); 
  if(!isValidFormat)return false;
  return true;
}

const normalizeString = (str: string) =>
  str.normalize("NFD")             
     .replace(/[\u0300-\u036f]/g, "") 
     .toLowerCase();
     
export const checkIsAValidCategory = (category:string)=>{
 const normalizedInput = normalizeString(category);

  return categories.some(cat => normalizeString(cat) === normalizedInput);
}
type UpdateProduct = Omit<UpsertProducts,"id" | "image">
type ParamsCompare = {
  originalFields: UpdateProduct
  newFields: UpdateProduct
}

export const buildUpdatePayload = ({
  originalFields,
  newFields
}: ParamsCompare): UpdateProduct => {
  const payload: UpdateProduct = {
    name: "",
    description: "",
    price: "",
    stock: "",
    category: ""
  }

  if (originalFields.name !== newFields.name) {
    payload.name = newFields.name
  }

  if (originalFields.description !== newFields.description) {
    payload.description = newFields.description
  }

  if (originalFields.price !== newFields.price) {
    payload.price = newFields.price
  }

  if (originalFields.stock !== newFields.stock) {
    payload.stock = newFields.stock
  }

  if (originalFields.category !== newFields.category) {
    payload.category = newFields.category
  }

  return payload
}
export const hasChanges = (
  original: UpdateProduct,
  current: UpdateProduct
): boolean => {
  return (Object.keys(original) as (keyof UpdateProduct)[]).some(
    key => original[key] !== current[key]
  )
}

export const containsValues = <T extends string>(value: string | null,datas:T[]): value is T => {
  return datas.includes(value as T);
};