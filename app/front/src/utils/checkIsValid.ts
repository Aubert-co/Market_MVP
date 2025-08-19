import { categories } from "../constants";

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

export const getValidImageFile = (image: RefValue): File | null => {
  if (!image.current) return null;

  const files = image.current.files;
  if (!files || files.length !== 1) return null;

  const file = files[0];
  return file.type.startsWith("image/") ? file : null;
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