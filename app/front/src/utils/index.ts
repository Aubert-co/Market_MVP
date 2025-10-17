import type { UserTotally } from "@/types/checkout.types";
import type { OrderStatus } from "@/types/storeDashboard.types";

export type RefValue = React.RefObject<HTMLInputElement | null | HTMLTextAreaElement | HTMLSelectElement>;

export const getInputValue = (ref:RefValue):string =>{
    if(ref?.current && ref.current.value)return ref.current.value;
    return '';
};
export const getMultiInputValues = (...refs:RefValue[]):string[]=>refs.map((val)=>getInputValue(val));


export const shortDescription = (description:string):string=>
    description.split(" ").slice(0,20).join(" ");


export const getLocalDate = (date:number):string=>{
    const value = new Date(date)
    const localDate = value.toLocaleDateString()
    const [month,day,year] = localDate.split('/')
    return `${day}/${month}/${year}`
}

export const getOrderStatus = (order:OrderStatus):string=>{
    if(order === "completed")return "completa"
    if(order ==="cancelled")return "cancelada"

    return "pendente"
}
export const loadImage = (imageName:string)=>`/images/${imageName}`

export const getUserTotally = ({items,discount,discountType}:UserTotally)=>{
  if(!items || items.length ===0)return 0 
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  if(!discount || !discountType){
    return total;
  }
  if(discountType === "fixed"){
    return total - discount
  }
  return total * (1 - discount / 100);
}