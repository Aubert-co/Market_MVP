import {  useState } from "react"


type Props = {
    searchEvent:SearchEvent
    initialValue?:string
}

type SearchEvent = (params:string)=>void


export const SearchBar = ({searchEvent,initialValue}:Props)=>{
    const [searchValue,setSearchValue] = useState<string>( initialValue ?? "")
    const onClick = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
      
        if(searchValue.length ===0)return;

        searchEvent( searchValue )
        
    }
    return (
        <form onSubmit={(e)=>onClick(e)} className="search" name="form_search">
            <div className="search-items">
                <input value={searchValue} 
                    onChange={(e)=>setSearchValue(e.target.value)}
                    name="input_search"  minLength={2} maxLength={20}
                    className="input_search"
                    placeholder="FAÇA UMA BUSCA"/>
                <button className="btn_search" name="btn_search" type="submit" >BUSCAR</button>
            </div>
        </form>
    )
}