import {  ContainerStyle, Header, Main } from "@/styles/index.style"
import { TopBar } from "../header/topBar"
import type React from "react"

type Props={
    children:React.ReactNode
}
export const Container = ({children}:Props)=>{
    return(
    <ContainerStyle>
        <Header>
            <TopBar/>
        </Header>
     
        <Main>
            {children}
        </Main>
        
    </ContainerStyle>
    )
}