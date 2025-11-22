import {   useState } from "react"
import type { DatasSelect } from "@/types/filters";


export type Props<T extends string | number> = {
    datas: DatasSelect<T>[];
    text?: string;
    className?:string
};
export const useSelect = <T extends string,>({datas,text,className}:Props<T>)=>{
    const [selected,setSelected] = useState<T >(datas[0].value)
   
    const Select = ()=>{
        return (
        <select className={className} value={selected ?? ""}
         onChange={(e)=>setSelected(e.target.value as T)}>
            <option 
            value={""}
             disabled >{text}</option>
            {datas.map((val,index)=>
                <option value={val.value} key={index}>
                    {val.text}
                </option>
            )}
        </select>)
    }
    return {selected,setSelected,Select}
}