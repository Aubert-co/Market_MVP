type Props = {
    title:string
    subTitle:string
}
export const DashboardHeader = ({title,subTitle}:Props)=>{
    return (
        <header>
            <h1>{title }</h1>
            <p>{subTitle }</p>
        </header>
    )
}