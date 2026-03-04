import { useSelect } from "@/hooks/useSelect"
import type { Category } from "@/types/filters.types"
import {  render, renderHook, } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const mockDatas = [{value:'Eletrônicos',text:'Eletrônicos'},{value:'Todas',text:'Todas'}]
describe("component useSelectCategory",()=>{
    it("should update the select options correctly",async()=>{
        const selected = "Eletrônicos"
        const cbSelected  = jest.fn()
        const MockComponent = ()=>{
            const {Select} = useSelect({datas:mockDatas,text:'Selecione uma categoria',
                name:"input-select",cbSelected})
        
            return <Select/>
        }
        const {getByRole} = render(
            <MockComponent/>
        )
        const select = getByRole('combobox');
        const user = userEvent.setup()
        await user.selectOptions(select, selected);

        expect((select as HTMLSelectElement).value).toBe(selected);
        expect( cbSelected ).toHaveBeenCalledTimes(1)
        expect(cbSelected).toHaveBeenCalledWith(selected)
        await user.selectOptions(select,'Todas')
        expect(cbSelected).toHaveBeenCalledWith('Todas')
        expect((select as HTMLSelectElement).value).toBe('Todas');
       
    })
    it("should initialize with first option when no initialValue", () => {
        const { result } = renderHook(() =>
                useSelect<Category>({
                datas:mockDatas,
                text: "Selecione categoria",
                name: "category",
                initialValue:"Roupas"
                })
        );

        expect(result.current.selected).toBe("Roupas");
    });
})