import { Link } from "react-router-dom"


export type DataState<T> ={
    datas:T[],
    status:number,
    children:React.ReactNode,
    emptyMessage:React.ReactNode,
    errorMessage:string
    
}
export const RenderDataState = <T,>({datas,status,emptyMessage,errorMessage,children}:DataState<T>)=>{
    const isEmpty = datas.length === 0 && status < 204;
    const hasError = !isEmpty && status > 204;
    const isLoading = status === 0;
    const isNotLogged = status === 401;

    if (isLoading) {
        return (
            <div className="text">
            <h1>Carregando...</h1>
            </div>
        );
    }

    if (isNotLogged) {
        return (
            <div className="text">
            <h1 data-testid="render-logged">
                Você não está logado.{" "}
                <Link to="/login">Faça login</Link> para acessar o seu perfil.
            </h1>
            </div>
        );
    }

    if (hasError) {
        return (
            <div className="text">
                <h1 data-testid="render-error">{errorMessage}</h1>
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="text">
                <h1 data-testid="render-empty">{emptyMessage}</h1>
            </div>
        );
    }


    return <>{children}</>;
}