import { categories,orderBy } from "./index";
import { StatusOrder } from "@/modules/orders/types/order.types";


export const checkIsAValidNumber = (value:unknown):boolean=>{
  if (typeof value === 'symbol') return false
  if (typeof value === 'boolean') return false;

  if(Array.isArray(value))return false;
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
export const checkIsAValidInteger = (value: unknown): boolean => {
  if(!checkIsAValidNumber(value))return false;

  const num = Number(value);

  if (!Number.isInteger(num)) return false;
  if (num <= 0) return false;

  return true;
};
export const checkisAValidString =(value:any,maxLength:number = 15):boolean=>{
    if(!value || typeof value !== 'string' )return false;

    if(value.length <= 4 || value.length >= maxLength)return false;
    return true;
}

export const checkisValidEmail = (email:any):boolean=>{

   const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return emailRegex.test(email);
}

const normalizeString = (str: string) =>
  str.normalize("NFD")             
     .replace(/[\u0300-\u036f]/g, "") 
     .toLowerCase();
export const checkIsAValidCategory = (category:string)=>{
 const normalizedInput = normalizeString(category);

  return categories.some(cat => normalizeString(cat) === normalizedInput);
}

export function checkIsValidStatus(value: unknown): value is StatusOrder {
  return typeof value === "string" && ["PENDING","PAID","CANCELED"].includes(value)
}

export const checkOrderBy = (value:unknown):boolean=>{
  if(!value || typeof value !=='string')return false
  return orderBy.includes(value.toLowerCase())
}
