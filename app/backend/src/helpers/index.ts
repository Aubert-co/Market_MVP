export const isAValidString =(value:any,maxLength:number = 15):boolean=>{
    if(!value || typeof value !== 'string' )return false;

    if(value.length <= 4 || value.length >= maxLength)return false;
    return true;
}

export const isValidEmail = (email:any):boolean=>{

   const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return emailRegex.test(email);
}

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

export const categories = [
  "Roupas",
  "Eletrônicos",
  "Livros",
  "Brinquedos",
  "Beleza",
  "Esporte",
  "Automotivo",
  "Cozinha",
  "Celulares",
  "Informática",
  "Jardim",
  "Petshop",
  "Mercearia",
  "Moda",
  "Acessórios"
];
const orderBy = ["asc","desc"]
export const checkOrderBy = (value:string)=>orderBy.includes(value.toLowerCase())
const normalizeString = (str: string) =>
  str.normalize("NFD")             
     .replace(/[\u0300-\u036f]/g, "") 
     .toLowerCase();
     
export const checkIsAValidCategory = (category:string)=>{
 const normalizedInput = normalizeString(category);

  return categories.some(cat => normalizeString(cat) === normalizedInput);
}


type Pagination = {
  totalItems:number,
  page:number,
  limit:number
}
type ReturnPagination = {
  currentPage:number,
  totalPages:number,
  skip:number
}
export const pagination = ({totalItems,page,limit}:Pagination):ReturnPagination=>{
  const totalPages = Math.ceil(totalItems/limit)
  if(page > totalPages){
    page = totalPages
  }
  const skip = (page -1)* limit
  return{
    currentPage:page,
    skip,
    totalPages
  }
}

export const roundTottaly = (value:number, decimals:number = 2):number=> {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}