import { StyleBtn } from "@/styles/forms.style";

type ErrorProps = {
  message?: string;
  retry?:boolean
};

export const ErrorBox = ({ message = "Ocorreu um erro ao carregar os dados.",retry }: ErrorProps) => {
  const onRetry = ()=>{
    window.location.reload()
  }
  return (
    <div className="error">
      <p>{message}</p>
   
      {retry &&  <StyleBtn $hoverBg="#f80929ff" $bg="#b3182cff" onClick={onRetry} >
        Tentar novamente
      </StyleBtn>}
    </div>
  );
};
