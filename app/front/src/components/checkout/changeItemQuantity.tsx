import {  updateItemCheckout } from "@/storage/checkout.storage";
import { useState, type SetStateAction } from "react";
import styled from "styled-components";
type Props = {
    quantity:number,
    id:number,
    setUpdate:React.Dispatch<SetStateAction<boolean>>,
    stock:number
}

const QuantityControl = styled.div`

  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 500;

.input-quantity {
  width: 50px;
  height: 30px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  margin: 0 6px;
  outline: none;
  transition: border-color 0.2s;
}

.input-quantity:focus {
  border-color: #0e1420; /* usa sua cor base */
}

 button {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

 button:hover {
  background-color: #e0e0e0;
}
`

export const ChangeQuantity = ({quantity,id,setUpdate,stock}:Props)=>{
    const [newQuantity,setQuantity] = useState(quantity)
     const click = (type:'decrease'|'increase')=>{
        let quant = newQuantity
    
        if(type === 'decrease' && quant  <= 1)return;
        if(type === 'increase' && quant >= stock)return;
        if(type === 'decrease'){
            quant = quant -1
        }
        if(type === 'increase'){
            quant = quant+1
        }
        updateItemCheckout(id,quant)
        setQuantity(quant)
        setUpdate(true)
    }
    const onChange = (e:any)=>{
        const value = Number(e.target.value)
        if(value > stock)return;
        if(value <= 1)return;
        if(!Number.isInteger(value))return
        setQuantity( value )
        setUpdate( true )
        updateItemCheckout(id,value)
    }
    return(
         <QuantityControl>
     
            <button onClick={()=>click('decrease')}>
            -
            </button>
            <input
                type="number"
                onChange={onChange}
                value={newQuantity}
                className="input-quantity"
            />

            <button  onClick={()=>click('increase')}>
                +
            </button>
        </QuantityControl>
    )
}