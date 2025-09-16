import { usableFetch } from "@/services/fetchs"
import { serviceGetStores } from "@/services/store.services"
import { ListContainer } from "@/styles/profile.style"
import type { Store } from "@/types/store.types"
import { shortDescription } from "@/utils"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loadImage } from "@/utils"
import { RenderDataState } from "../RenderDataState"

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


export const UserStore =({formRef}:PropsUserStore)=>{
    const [ stores,setStores] = useState<StoreState>({
        datas:[],status:0
    })
    useEffect(()=>{
      usableFetch<Store[],{}>({setDatas:setStores,service:serviceGetStores,body:{}})
    },[])
    return (
        <ListContainer>
            <div className="text">
              <h1>Minha loja</h1>
            </div>
            <RenderDataState<Store>
                datas={stores.datas}
                status={stores.status}
                emptyMessage={
                    <>
                        Você ainda não tem uma loja ,<Link to={"/abrir-loja"}>crie uma agora mesmo</Link> 
                    </>
                }
                errorMessage="Algo deu errado ao carregar a sua loja!"
            >
                <ListStore store={stores.datas} formRef={formRef}/>
            </RenderDataState>
        </ListContainer>
    )
}