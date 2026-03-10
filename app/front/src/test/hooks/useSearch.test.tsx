import {  renderHook } from "@testing-library/react";
import  { MemoryRouter} from "react-router-dom"
import { act } from "react";
import { useSearch } from "@/hooks/useSearch";

const mockedUsedNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}))

describe("hook useSearch",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
   it("should navigate when mode is navigate", () => {
    const value = "notebook"
    const { result } = renderHook(
      () => useSearch({ mode: "navigate" }),
      {
        wrapper: MemoryRouter
      }
    )

    act(() => {
      result.current.searchEvent( value  )
    })

    expect(mockedUsedNavigate).toHaveBeenCalledWith({
      pathname: "/buscas",
      search: `q=${value}`
    });
  })

  it("should update searchProduct when mode is data", () => {
    const { result } = renderHook(
      () => useSearch({ mode: "update" }),
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