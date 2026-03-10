import type { Message } from "@/hooks/useBoxMessages"


type Action = "create" | "update" 

const statusMessages: Record<Action, Record<number, Message>> = {
  create: {
    201: { content: "Produto criado com sucesso", type: "success" },
  },
  update: {
    201: { content: "Sucesso ao atualizar o produto", type: "success" },

  },
}
type Params = {
    action:Action
    status:number
}
const defaultMessage: Message = {
  content: "Algo deu errado!",
  type: "info"
}

export const renderMessage = ({action,status}:Params):Message=>{
    if(status === 401){
        return {content:"Acesso não autorizado",type:"info"}
    }
    if(status >500){
        return {content:"Erro interno",type:"error"}
    }
    return statusMessages[action][status] ?? defaultMessage
}