import '@testing-library/jest-dom';
import { fireEvent, render } from "@testing-library/react";
import { InputWithLabel } from "@/components/forms/inputWithLabel";


describe("InputWithLabel",()=>{
    const id = "testing"
    const placeholder = "lorem ipstu"
    const className = "product"
    const MockedInput = ()=><input type="text" placeholder={placeholder}  className={className} id={id}/>
    it("should render the component correctly",()=>{
        const textLabel = "Product name"
        const {getByPlaceholderText,getByText} =render(
            <InputWithLabel textLabel={textLabel} inputName={id}>
                <MockedInput/>
            </InputWithLabel>
        )
        const input = getByPlaceholderText(placeholder)
        const label = getByText(textLabel)
        expect(getByText(textLabel)).toBeInTheDocument();
        expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
        expect(input.className).toBe(className)
        expect(input.id).toBe(id)
        expect(label).toHaveAttribute("for", id);

        fireEvent.change(input, { target: { value: 'test' } });

        expect(input).toHaveValue('test');
    })
})