import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useBoxMessage } from "../../components/boxMessages";




describe("BoxMessage",()=>{
    beforeEach(()=>{
        jest.useFakeTimers()
    })
    
  
    it("should render for 3 seconds by default when no duration is provided",async()=>{
        const TestComponent= () => {
            const { setMessage,BoxMessage } = useBoxMessage()
            const onClick = ()=>{
                setMessage({content:'lorem ipstu',type:'info'})
            }
            return (
                <>
                    <BoxMessage/>
                    <button onClick={onClick}>Click</button>
                </>
               
            )
        }
        const {getByText,queryByText,container} = render(
            <TestComponent/>
        )
        const button = getByText('Click');
        const text = 'lorem ipstu'
        fireEvent.click(button)
        expect(queryByText(text)).toBeVisible()
        expect(container.querySelector('div')).toHaveClass('message_info')
        await waitFor(()=>{
            expect(queryByText(text)).toBeVisible()
        },{timeout:2999})
        await waitFor(()=>{
            expect(queryByText(text)).toBeNull()
        },{timeout:3001 })
    })
   it("should render the div with type 'error' correctly",async()=>{
        const TestComponent= () => {
            const { setMessage,BoxMessage } = useBoxMessage()
            const onClick = ()=>{
                setMessage({content:'lorem ipstu',type:'error'})
            }
            return (
                <>
                    <BoxMessage/>
                    <button onClick={onClick}>Click</button>
                </>
               
            )
        }
        const {getByText,queryByText,container} = render(
            <TestComponent/>
        )
        const button = getByText('Click');
        const text = 'lorem ipstu'
        fireEvent.click(button)
        expect(queryByText(text)).toBeVisible()
        expect(container.querySelector('div')).toHaveClass('message_error')
        await waitFor(()=>{
            expect(queryByText(text)).toBeVisible()
        },{timeout:2999})
        await waitFor(()=>{
            expect(queryByText(text)).toBeNull()
        },{timeout:3001 })
    })
    it("should render the div with type 'success' correctly",async()=>{
        const TestComponent= () => {
            const { setMessage,BoxMessage } = useBoxMessage()
            const onClick = ()=>{
                setMessage({content:'lorem ipstu',type:'success'})
            }
            return (
                <>
                    <BoxMessage/>
                    <button onClick={onClick}>Click</button>
                </>
               
            )
        }
        const {getByText,queryByText,container} = render(
            <TestComponent/>
        )
        const button = getByText('Click');
        const text = 'lorem ipstu'
        fireEvent.click(button)
        expect(queryByText(text)).toBeVisible()
        expect(container.querySelector('div')).toHaveClass('message_success')
        await waitFor(()=>{
            expect(queryByText(text)).toBeVisible()
        },{timeout:2999})
        await waitFor(()=>{
            expect(queryByText(text)).toBeNull()
        },{timeout:3001 })
    })
})