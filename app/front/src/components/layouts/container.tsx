import {  ContainerStyle, Header, Main } from "@/styles/index.style"
import { TopBar, type NavigateMode } from "../header/topBar"
import type React from "react"

type Props={
    children:React.ReactNode
    navigateMode?: NavigateMode
}
export const Container = ({children,navigateMode}:Props)=>{
    return(
    <ContainerStyle>
        <Header>
            <TopBar navigationMode={navigateMode}/>
        </Header>
     
        <Main>
            {children}
        </Main>
        
    </ContainerStyle>
    )
}