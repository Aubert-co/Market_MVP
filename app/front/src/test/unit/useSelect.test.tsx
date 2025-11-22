import { useSelect } from "@/hooks/useSelect"
import { fireEvent, render, } from "@testing-library/react"

const mockDatas = [{value:'Eletrônicos',text:'Eletrônicos'},{value:'Todas',text:'Todas'}]
describe("component useSelectCategory",()=>{
    it("should update the select options correctly",()=>{
        const selected = "Eletrônicos"
        const MockComponent = ()=>{
            const {Select} = useSelect({datas:mockDatas,text:'Selecione uma categoria'})
        
            return <Select/>
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