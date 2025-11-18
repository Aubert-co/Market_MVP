import { useSelectCategory } from "@/components/useSelectCategory"
import { fireEvent, render, } from "@testing-library/react"


describe("component useSelectCategory",()=>{
    it("should update the select options correctly",()=>{
        const selected = "Eletrônicos"
        const MockComponent = ()=>{
            const {SelectCategory} = useSelectCategory()
        
            return <SelectCategory/>
        }
        const {getByRole} = render(
            <MockComponent/>
        )
        const select = getByRole('combobox');

        fireEvent.change(select, { target: { value: selected } })
        expect((select as HTMLSelectElement).value).toBe(selected);

        fireEvent.change(select, { target: { value: 'Todas' } })

        expect((select as HTMLSelectElement).value).toBe('Todas');
    })
})