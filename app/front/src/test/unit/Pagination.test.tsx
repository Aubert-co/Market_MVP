import { act, fireEvent, render } from "@testing-library/react"
import { usePagination } from "@/components/pagination"
import { useEffect } from "react"

describe("test pagination",()=>{
    let mockNavigate =jest.fn()
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it('should render the buttons correctly, with page 1 having the active class',()=>{
        const MockComponent = ()=>{
            const {setPagesInfos,Pagination} = usePagination(mockNavigate)
            useEffect(()=>{
                setPagesInfos({
                currentPage:1,
                totalPages:10
            })
            },[])
            return <Pagination/>
        }
        const {container,getAllByTestId,getByText} = render(
            <MockComponent/>
        )
        expect( getAllByTestId('pagination')).toHaveLength(10)
        expect( container ).toHaveTextContent("1")
        expect( getAllByTestId('pagination')[0]).toHaveClass('active')
        
        getAllByTestId('pagination')
        .map((val,index)=>{
            if(index ===0){
                expect(val).toHaveClass('active')
                return
            }
            expect(val).not.toHaveClass()
        })

        act(()=>{
            const button2 = getByText('2')
            fireEvent.click(button2)
        })
        expect(getByText("2")).toHaveClass("active")
        getAllByTestId('pagination')
        .map((val,index)=>{
            if(index === 1){
                expect(val).toHaveClass('active')
                return
            }
            expect(val).not.toHaveClass()
        })
        expect(mockNavigate).toHaveBeenCalledWith(2)
        expect(mockNavigate).toHaveBeenCalledTimes(1)
    })
    it("should activate the class and call mockNavigate with the correct page number when changing to page 2",()=>{
         const MockComponent = ()=>{
            const {setPagesInfos,Pagination} = usePagination(mockNavigate)
            useEffect(()=>{
                setPagesInfos({
                currentPage:1,
                totalPages:10
            })
            },[])
            return <Pagination/>
        }
        const {getAllByTestId,getByText} = render(
            <MockComponent/>
        )
        act(()=>{
            const button2 = getByText('2')
            fireEvent.click(button2)
        })
        expect(getByText("2")).toHaveClass("active")
        getAllByTestId('pagination')
        .map((val,index)=>{
            if(index === 1){
                expect(val).toHaveClass('active')
                return
            }
            expect(val).not.toHaveClass()
        })
        expect(mockNavigate).toHaveBeenCalledWith(2)
        expect(mockNavigate).toHaveBeenCalledTimes(1)
    })
})