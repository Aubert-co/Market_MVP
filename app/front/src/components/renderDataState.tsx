import { Link } from "react-router-dom"
import { BoxSkeleton } from "./Skeleton"

type Loading = {
    length:number,
    classLoading:string,
    classImg:string
}
export type DataState<T> ={
    datas:T[],
    status:number,
    children:React.ReactNode,
    emptyMessage:React.ReactNode,
    errorMessage:string
    skeletonLoading:Loading
}
export const RenderDataState = <T,>({
    datas,status,
    emptyMessage,
    errorMessage,
    children,
    skeletonLoading
    }:DataState<T>)=>{
    const isEmpty = datas.length === 0 && status < 204;
    const hasError = datas.length ===0 && status > 410;
    const isLoading = status === 0;
    const isNotLogged = status === 401;

    if (isLoading) {
        return (
            <BoxSkeleton 
            className={skeletonLoading.classLoading} 
            classNameImg={skeletonLoading.classImg}
            length={skeletonLoading.length}/>
        );
    }

    if (isNotLogged) {
        return (
            <div className="text">
            <h1 data-testid="render-logged">
                Você não está logado.{" "}
                <Link to="/login">Faça login</Link>.
            </h1>
            </div>
        );
    }

    if (hasError) {
        return (
            <div className="text error">
                <h1 data-testid="render-error">{errorMessage}</h1>
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="text error">
                <h1 data-testid="render-empty">{emptyMessage}</h1>
            </div>
        );
    }


    return <>{children}</>;
}