import { Collapse } from "@/components/collapse"
import { fireEvent, getByText, render } from "@testing-library/react"

describe("Component collapse",()=>{
    it("should toggle the content visibility when the title is clicked",()=>{
        const text = "lorem ipstu"
        const title = "show"
        const MockedComponent = ()=><h1>{text}</h1>
        const {queryByText,container,queryByTestId}=render(
            <Collapse title={title}>
                <MockedComponent/>
            </Collapse>
        )

        expect( queryByText(text) ).not.toBeInTheDocument()
        expect(queryByText(title)).toBeInTheDocument()
        expect(queryByTestId("up")).not.toBeInTheDocument()
        expect(queryByTestId("down")).toBeInTheDocument()

        const buttonShow = container.querySelector('span') as HTMLElement
        fireEvent.click( buttonShow )
         expect(queryByTestId("up")).toBeInTheDocument()
        expect(queryByTestId("down")).not.toBeInTheDocument()
        expect(queryByText(text)).toBeInTheDocument()

        fireEvent.click( buttonShow )
        expect(queryByText(text)).not.toBeInTheDocument()
        expect(queryByTestId("up")).not.toBeInTheDocument()
        expect(queryByTestId("down")).toBeInTheDocument()
    })
})