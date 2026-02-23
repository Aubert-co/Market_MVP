import { fireEvent, render, renderHook } from "@testing-library/react";
import { SearchBar, useSearch } from "@/components/header/seachBar";
import  { MemoryRouter} from "react-router-dom"
import { act } from "react";

const mockedUsedNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}))
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


describe("hook useSearch",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
   it("should navigate when mode is navigate", () => {
    const { result } = renderHook(
      () => useSearch({ mode: "navigate" }),
      {
        wrapper: MemoryRouter
      }
    )

    act(() => {
      result.current.searchEvent("notebook")
    })

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/buscas/notebook")
  })

  it("should update searchProduct when mode is data", () => {
    const { result } = renderHook(
      () => useSearch({ mode: "data" }),
      {
        wrapper: MemoryRouter
      }
    )

    act(() => {
      result.current.searchEvent("mouse")
    })

    expect(result.current.searchProduct).toBe("mouse")
  })
})