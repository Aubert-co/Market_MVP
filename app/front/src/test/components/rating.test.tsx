import { Rating } from "@/components/ratings"
import { render } from "@testing-library/react"

describe("Component Rating",()=>{
    it("should display the rating text and render the correct number of stars",()=>{
        const text = "lorem ipsty"
        const {queryByText ,queryAllByTestId} =render(
            <Rating text={text} value={3}/>
        )
        expect(queryByText(text)).toBeInTheDocument()

        expect( queryAllByTestId("star")).toHaveLength(3)
        expect(queryAllByTestId("regstar")).toHaveLength(2)
        expect(queryAllByTestId("halfstart")).toHaveLength(0)
    })
     it("should render 5 empty stars when the rating value is 0",()=>{
       
        const {queryByTestId ,queryAllByTestId} =render(
            <Rating  value={0}/>
        )
        expect(queryByTestId('rating-text')).not.toBeInTheDocument()

        expect( queryAllByTestId("star")).toHaveLength(0)
        expect(queryAllByTestId("regstar")).toHaveLength(5)
        expect(queryAllByTestId("halfstart")).toHaveLength(0)
    })
   it("should render the rating component correctly with full, half, and empty stars", () => {  
        const { queryByTestId, queryAllByTestId } = render(
            <Rating value={3.5} />
        )

        expect(queryByTestId("rating-text")).not.toBeInTheDocument()

        expect(queryAllByTestId("star")).toHaveLength(3)       
        expect(queryAllByTestId("halfstar")).toHaveLength(1)   
        expect(queryAllByTestId("regstar")).toHaveLength(1)    
    })

})