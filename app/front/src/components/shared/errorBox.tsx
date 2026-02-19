import { PrimaryButton } from "@/styles/shared.style";



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
   
      {retry &&  <PrimaryButton $hoverBg="#f80929ff" $bg="#b3182cff" onClick={onRetry} >
        Tentar novamente
      </PrimaryButton>}
    </div>
  );
};
