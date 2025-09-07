import { Container } from "@/components/layouts/container"
import { BoxCreateStore } from "@/components/store/boxCreateStore"
import { useRef } from "react"

export const CreateStore = ()=>{
    const gotToForm = useRef<HTMLFormElement>(null)

    return (
        <Container>
            <BoxCreateStore formRef={gotToForm}/>
        </Container>
    )
}