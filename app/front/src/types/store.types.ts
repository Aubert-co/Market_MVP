export type Store = {
    name:string,
    description:string,
    photo:string,
    id:number
}

export type PropsFormCreateStore = {
    formRef: React.RefObject<HTMLFormElement | null>,

}