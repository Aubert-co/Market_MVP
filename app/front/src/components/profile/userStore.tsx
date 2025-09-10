import { loadImage, usableFetch } from "@/services"
import { serviceGetStores } from "@/services/store.services"
import { ListContainer } from "@/styles/profile.style"
import type { Store } from "@/types/store.types"
import { shortDescription } from "@/utils"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

type Props={
    status:number,
    store:Store[]
}
type StoreState = {
    datas:Store[],
    status:number
}
type PropsUserStore = {
    formRef:React.RefObject<HTMLInputElement |null>
}
type PropsListStore = {
    store:Store[],
}
export const ListStore =  ({store,formRef}:PropsListStore & PropsUserStore)=>{
    const navigate = useNavigate()
    const redirect =()=> navigate(`/loja`)
    return(
        <div onClick={redirect} className="list-container">
            {store.map(({photo,description,name,id})=>{
            return (
                <div  className="list-item" key={id}>
                    <div className="list-image">
                        <img src={loadImage(photo)} alt="" />
                    </div>
                    
                    <div className="list-info">
                        <p>{name}</p>
                        <p>{shortDescription(description)}</p>    
                    </div>
                    
                </div>
            )
            })}
            <div className="end" ref={formRef}></div>
        </div>
        )
}
export const RenderConditionsStore = ({store,status,formRef}:Props &PropsUserStore)=>{
    const isEmpty = store.length ===0
    const hasError = isEmpty && status > 204
    
    if( hasError ){
        return (
        <div ref={formRef} className="text">
            <h1>Algo deu errado ao carregar a sua loja!</h1>
        </div>
        )
    }
    if( isEmpty ){
        return (
            <div ref={formRef} className="text">
                <h1>Você ainda não tem uma loja ,<Link to={"/abrir-loja"}>crie uma agora mesmo</Link> </h1>
            </div>
        )
    }
    return (
        <>
            <ListStore formRef={formRef} store={store}/>
        </>
    )
}

export const UserStore =({formRef}:PropsUserStore)=>{
    const [ stores,setStores] = useState<StoreState>({
        datas:[],status:0
    })
    useEffect(()=>{
        usableFetch<Store[]>({setDatas:setStores,service:serviceGetStores})
    },[])
    return (
        <ListContainer>
            <RenderConditionsStore formRef={formRef} status={stores.status} store={stores.datas}/>
        </ListContainer>
    )
}