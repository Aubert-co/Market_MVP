import { BrowserRouter as Router ,Routes,Route, Outlet} from "react-router-dom"
import { Register } from "./register"
import { MessageProvider } from "../context/messageContext"
import { Login } from "./login"




export const App = ()=>{
    return(
    <MessageProvider>
    <Router>
        <Routes>
            <Route>
                <Route path="/registro" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Route>
        </Routes>
    </Router>
    </MessageProvider>
    )
}