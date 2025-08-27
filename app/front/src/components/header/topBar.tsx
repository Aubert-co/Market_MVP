import { Link, useNavigate } from "react-router-dom"
import { SearchBar } from "./seachBar"
import { FaShoppingCart, FaUser } from "react-icons/fa"

export const TopBar = ()=>{
    const navigate = useNavigate()
    return(
        <>
            <div className="logo">
                <Link to={"/"}>SUPERSTORE</Link>
            </div>
            <SearchBar/>
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