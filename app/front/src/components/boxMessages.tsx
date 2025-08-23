import { useEffect, useState } from "react";

export type Message ={
    content:string,
    type:'error' | 'info' | 'success'
}


export const useBoxMessage = ()=>{
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
   
        return (
            <>
                {message?.content && (
                    <div className={"message_"+message.type} >
                        <p data-testid="message_content">{message.content}</p>
                    </div>
                )}
            </>
        );
    
    };
    return {message,setMessage,BoxMessage}
}