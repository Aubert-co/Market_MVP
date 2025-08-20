import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from "@testing-library/react";
import { BoxMessage } from "../components/boxMessages";
import { MessageProvider,useMessage } from "../context/messageContext";



describe("BoxMessage",()=>{
    beforeEach(()=>{
        jest.useFakeTimers()
    })
    
  
    it("should render for 3 seconds by default when no duration is provided",async()=>{
        const TestComponent= () => {
            const { setMessage } = useMessage();
            const onClick = ()=>{
                setMessage({content:'lorem ipstu',type:'info'})
            }
            return <button onClick={onClick}>Click</button>
        }
        const {getByText,queryByText,container} = render(
            <MessageProvider >
                <BoxMessage/>
                <TestComponent/>
            </MessageProvider>
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
    it("should render correctly for 2seconds",async()=>{
        const TestComponent= () => {
            const { setMessage } = useMessage();
            const onClick = ()=>{
                setMessage({content:'lorem ipstu',type:'error'},2000)
            }
            return <button onClick={onClick}>Click</button>
        }
        const {getByText,queryByText,container} = render(
            <MessageProvider >
                <BoxMessage/>
                <TestComponent/>
            </MessageProvider>
        )
        const button = getByText('Click');
        const text = 'lorem ipstu'
        fireEvent.click(button)
        expect(queryByText(text)).toBeVisible()
        expect(container.querySelector('div')).toHaveClass('message_error')
        await waitFor(()=>{
            expect(queryByText(text)).toBeVisible()
        },{timeout:1999})
        await waitFor(()=>{
            expect(queryByText(text)).toBeNull()
        },{timeout:2001 })
    })
    it("should render correctly for 10 seconds",async()=>{
        const TestComponent= () => {
            const { setMessage } = useMessage();
            const onClick = ()=>{
                setMessage({content:'lorem ipstu',type:'success'},10000)
            }
            return <button onClick={onClick}>Click</button>
        }
        const {getByText,queryByText,container} = render(
            <MessageProvider >
                <BoxMessage/>
                <TestComponent/>
            </MessageProvider>
        )
        const button = getByText('Click');
        const text = 'lorem ipstu'
        fireEvent.click(button)
        expect(queryByText(text)).toBeVisible()
        expect(container.querySelector('div')).toHaveClass('message_success')
        await waitFor(()=>{
            expect(queryByText(text)).toBeVisible()
        },{timeout:9999})
        await waitFor(()=>{
            expect(queryByText(text)).toBeNull()
        },{timeout:10001 })
    })
})