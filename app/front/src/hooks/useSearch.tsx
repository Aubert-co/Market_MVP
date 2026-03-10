import type { NavigateMode } from "@/components/header/topBar";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
type Params = {
    mode:NavigateMode
    initialValue?:string
}
export const useSearch = ({mode,initialValue}:Params)=>{
    const [searchProduct,setSearchProduct] = useState<string>(initialValue ?? "")
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const searchEvent = (search:string)=>{

        if(mode === "navigate"){
            navigate({
                pathname: "/buscas",
                search: new URLSearchParams({ q: search }).toString()
            });
            return;
        }
        const newParams = new URLSearchParams(searchParams);
        newParams.set("q", search);
        
        setSearchParams(newParams);
        setSearchProduct(search)
    }
    return {
        searchProduct,setSearchProduct,
        searchEvent
    }
}