import { ToastMessage,NormalMessage } from "@/styles";
import { useEffect, useState } from "react";

export type Message ={
    content:string,
    type:'error' | 'info' | 'success'
}

export type Props = {
    styledType?:"toast" | "" 
}
export const useBoxMessage = ({styledType}:Props)=>{
    const [message,setMessage] = useState<Message>({
        content:'',type:'info'
    })
    useEffect(()=>{
        if(message.content){
            setTimeout(()=>{
                setMessage({content:'',type:'info'})
            },3000)
        }
    },[message])
    const BoxMessage = ()=>{
        const Wrapper = styledType === "toast" ? ToastMessage : NormalMessage
        return (
            <Wrapper>
                {message?.content && (
                    <div className={"message_"+message.type} >
                        <p data-testid="message_content">{message.content}</p>
                    </div>
                )}
            </Wrapper>
        );
    
    };
    return {message,setMessage,BoxMessage}
}