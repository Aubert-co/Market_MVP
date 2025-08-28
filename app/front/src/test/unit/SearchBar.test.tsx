import { fireEvent, render } from "@testing-library/react";
import { SearchBar } from "@/components/header/seachBar";
import  {BrowserRouter} from "react-router-dom"

const mockedUsedNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}))

describe("component SearchBar",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should change the page when the input is valid",()=>{
        const searchFor = "lorem isptu"
        const {getByPlaceholderText,getByText}=render(
            <BrowserRouter>
                 <SearchBar/>
            </BrowserRouter>
           
         
        )
        const input = getByPlaceholderText("FAÇA UMA BUSCA")
        const button = getByText("BUSCAR")
        fireEvent.change(input,{target:{value:searchFor}})
        fireEvent.click( button )

        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
        expect(mockedUsedNavigate).toHaveBeenCalledWith(`/buscas/${searchFor}`)
    })
    it("should not change the page when the input is null",()=>{
        const searchFor = ""
        const {getByPlaceholderText,getByText}=render(
            <BrowserRouter>
                 <SearchBar/>
            </BrowserRouter>
           
         
        )
        const input = getByPlaceholderText("FAÇA UMA BUSCA")
        const button = getByText("BUSCAR")
        fireEvent.change(input,{target:{value:searchFor}})
        fireEvent.click( button )

        expect(mockedUsedNavigate).toHaveBeenCalledTimes(0)

    })
    
})