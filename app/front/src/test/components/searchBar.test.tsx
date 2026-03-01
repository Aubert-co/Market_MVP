import { fireEvent, render } from "@testing-library/react";
import { SearchBar } from "@/components/header/seachBar";

const searchEvent = jest.fn()
describe("component SearchBar",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    
    it("should call searchEvent when the input length is greater than 1",()=>{
        const searchFor = "lorem isptu"
        const {getByPlaceholderText,getByText}=render(
            <SearchBar searchEvent={searchEvent}/>
        )
        const input = getByPlaceholderText("FAÇA UMA BUSCA")
        const button = getByText("BUSCAR")
        fireEvent.change(input,{target:{value:searchFor}})
        fireEvent.click( button )

        expect(searchEvent).toHaveBeenCalledWith( searchFor )
        expect(searchEvent).toHaveBeenCalledTimes(1)
    })
    it("should not change the page when the input is null",()=>{
        const searchFor = ""
        const {getByPlaceholderText,getByText}=render(
            <SearchBar searchEvent={searchEvent}/>
        )
        const input = getByPlaceholderText("FAÇA UMA BUSCA")
        const button = getByText("BUSCAR")
        fireEvent.change(input,{target:{value:searchFor}})
        fireEvent.click( button )

        expect(searchEvent).not.toHaveBeenCalled()
    })
})

