import { Link, useNavigate } from "react-router-dom"
import { SearchBar, useSearch } from "./seachBar"
import { FaShoppingCart, FaUser } from "react-icons/fa"

export const TopBar = ()=>{
    const navigate = useNavigate()
    const {searchEvent} = useSearch({mode:'navigate'})
    return(
        <>
            <div className="logo">
                <Link to={"/"}>SUPERSTORE</Link>
            </div>
            <SearchBar searchEvent={searchEvent}/>
            <nav>
                <i>
                    <FaShoppingCart onClick={()=>navigate("/perfil/carrinho")}/>
                </i>

                <i>
                  <FaUser onClick={()=>navigate("/perfil/ordens")}/>
                </i>
            </nav>
        </>
    )
}