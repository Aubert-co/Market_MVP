import { fireEvent, render, waitFor } from "@testing-library/react"
import { FormCreateCoupon } from "@/components/forms/formCreateCoupon"
import * as services from "@/services/admStore.services"

const spyService = jest.spyOn(services,'createCouponService')

describe("component FormCreateCoupon",()=>{
    const body = {
        code:"DESCONTO15",
        quantity:35,
        discount:15,
        discountType:"percent",
        expiresAt:"fivedays"
    }
    beforeEach(()=>{
        jest.clearAllMocks()
        jest.useFakeTimers()
    })
    it("should call the create service successfully when inputs are valid",async()=>{
        spyService.mockResolvedValue({status:201,message:''})
        
        const {container,getByPlaceholderText,getAllByTestId,getByText} = render(
            <FormCreateCoupon/>
        )
        const inputName = getByPlaceholderText("Ex: DESCONTO15")
        const [selectDiscount,selectDate] = getAllByTestId("select")
        const inputCuponValue =getByPlaceholderText("Ex: 15")
        const inputQuantity = getByPlaceholderText("Ex: 25")
        const btnSubmit = getByText("Criar")

        fireEvent.change(inputName,{target:{value:body.code}})
        fireEvent.change(inputCuponValue,{target:{value:body.discount}})
        fireEvent.change(inputQuantity,{target:{value:body.quantity}})
        fireEvent.change( selectDiscount,{target:{value:body.discountType}})
        fireEvent.change( selectDate,{target:{value:body.expiresAt}})

        fireEvent.click( btnSubmit )
        await waitFor(()=>{
            expect( container ).toHaveTextContent("Cupom criado com sucesso")
        },{timeout:1000})

        expect( spyService).toHaveBeenCalledTimes(1)
        expect( spyService).toHaveBeenCalledWith( body )

      
    })
})

describe("when quantity is invalid",()=>{
    const body = {
        code:"DESCONTO15",
        quantity:'e3',
        discount:15,
        discountType:"percent",
        expiresAt:"fivedays"
    }
    beforeEach(()=>{
        jest.clearAllMocks()
        jest.useFakeTimers()
    })
    it("should prevent service call and return an error message if the quantity is not a number",async()=>{
        spyService.mockResolvedValue({status:201,message:''})
        const quantity ="b3m"
        const {container,getByPlaceholderText,getAllByTestId,getByText} = render(
            <FormCreateCoupon/>
        )
        const inputName = getByPlaceholderText("Ex: DESCONTO15")
        const [selectDiscount,selectDate] = getAllByTestId("select")
        const inputCuponValue =getByPlaceholderText("Ex: 15")
        const inputQuantity = getByPlaceholderText("Ex: 25")
        const btnSubmit = getByText("Criar")

        fireEvent.change(inputName,{target:{value:body.code}})
        fireEvent.change(inputCuponValue,{target:{value:body.discount}})
        fireEvent.change(inputQuantity,{target:{value:quantity}})
        fireEvent.change( selectDiscount,{target:{value:body.discountType}})
        fireEvent.change( selectDate,{target:{value:body.expiresAt}})

        fireEvent.click( btnSubmit )
        await waitFor(()=>{
            expect( container ).toHaveTextContent('Quantidade inválida')
        },{timeout:1000})

        expect( spyService).not.toHaveBeenCalled()
      
    })
    it("should prevent service call and return an error message if the quantity is 50 or greater",async()=>{
        const quantity = 50
        spyService.mockResolvedValue({status:201,message:''})
        
        const {container,getByPlaceholderText,getAllByTestId,getByText} = render(
            <FormCreateCoupon/>
        )
        const inputName = getByPlaceholderText("Ex: DESCONTO15")
        const [selectDiscount,selectDate] = getAllByTestId("select")
        const inputCuponValue =getByPlaceholderText("Ex: 15")
        const inputQuantity = getByPlaceholderText("Ex: 25")
        const btnSubmit = getByText("Criar")

        fireEvent.change(inputName,{target:{value:body.code}})
        fireEvent.change(inputCuponValue,{target:{value:body.discount}})
        fireEvent.change(inputQuantity,{target:{value:quantity}})
        fireEvent.change( selectDiscount,{target:{value:body.discountType}})
        fireEvent.change( selectDate,{target:{value:body.expiresAt}})

        fireEvent.click( btnSubmit )
        await waitFor(()=>{
            expect( container ).toHaveTextContent('Quantidade não pode ser maior ou igual a 50')
        },{timeout:1000})

        expect( spyService).not.toHaveBeenCalled()
      
    })
})

describe("when code is invalid",()=>{
    const body = {
        code:"DESCONTO15",
        quantity:33,
        discount:15,
        discountType:"percent",
        expiresAt:"fivedays"
    }
     beforeEach(()=>{
        jest.clearAllMocks()
        jest.useFakeTimers()
    })
    it("should prevent service call and return an error message if the code length is 13 or greater",async()=>{
        spyService.mockResolvedValue({status:201,message:''})
        const code ="a".repeat(13)
        const {container,getByPlaceholderText,getAllByTestId,getByText} = render(
            <FormCreateCoupon/>
        )
        const inputName = getByPlaceholderText("Ex: DESCONTO15")
        const [selectDiscount,selectDate] = getAllByTestId("select")
        const inputCuponValue =getByPlaceholderText("Ex: 15")
        const inputQuantity = getByPlaceholderText("Ex: 25")
        const btnSubmit = getByText("Criar")

        fireEvent.change(inputName,{target:{value:code}})
        fireEvent.change(inputCuponValue,{target:{value:body.discount}})
        fireEvent.change(inputQuantity,{target:{value:body.quantity}})
        fireEvent.change( selectDiscount,{target:{value:body.discountType}})
        fireEvent.change( selectDate,{target:{value:body.expiresAt}})

        fireEvent.click( btnSubmit )
        await waitFor(()=>{
            expect( container ).toHaveTextContent('Digite um nome válido')
        },{timeout:1000})

        expect( spyService).not.toHaveBeenCalled()
      
    })
    it("should prevent service call and return an error message if the code is empty",async()=>{
        spyService.mockResolvedValue({status:201,message:''})
        const code =""
        const {container,getByPlaceholderText,getAllByTestId,getByText} = render(
            <FormCreateCoupon/>
        )
        const inputName = getByPlaceholderText("Ex: DESCONTO15")
        const [selectDiscount,selectDate] = getAllByTestId("select")
        const inputCuponValue =getByPlaceholderText("Ex: 15")
        const inputQuantity = getByPlaceholderText("Ex: 25")
        const btnSubmit = getByText("Criar")

        fireEvent.change(inputName,{target:{value:code}})
        fireEvent.change(inputCuponValue,{target:{value:body.discount}})
        fireEvent.change(inputQuantity,{target:{value:body.quantity}})
        fireEvent.change( selectDiscount,{target:{value:body.discountType}})
        fireEvent.change( selectDate,{target:{value:body.expiresAt}})

        fireEvent.click( btnSubmit )
        await waitFor(()=>{
            expect( container ).toHaveTextContent('Digite um nome válido')
        },{timeout:1000})

        expect( spyService).not.toHaveBeenCalled()
      
    })
   
})
 
describe("when discount is invalid",()=>{
    const body = {
        code:"DESCONTO15",
        quantity:33,
        discount:15,
        discountType:"percent",
        expiresAt:"fivedays"
    }
     beforeEach(()=>{
        jest.clearAllMocks()
        jest.useFakeTimers()
    })
    it("should prevent service call and return an error message if discount is 60 or more",async()=>{
        spyService.mockResolvedValue({status:201,message:''})
        const discount = 65
        const {container,getByPlaceholderText,getAllByTestId,getByText} = render(
            <FormCreateCoupon/>
        )
        const inputName = getByPlaceholderText("Ex: DESCONTO15")
        const [selectDiscount,selectDate] = getAllByTestId("select")
        const inputCuponValue =getByPlaceholderText("Ex: 15")
        const inputQuantity = getByPlaceholderText("Ex: 25")
        const btnSubmit = getByText("Criar")

        fireEvent.change(inputName,{target:{value:body.code}})
        fireEvent.change(inputCuponValue,{target:{value:discount}})
        fireEvent.change(inputQuantity,{target:{value:body.quantity}})
        fireEvent.change( selectDiscount,{target:{value:body.discountType}})
        fireEvent.change( selectDate,{target:{value:body.expiresAt}})

        fireEvent.click( btnSubmit )
        await waitFor(()=>{
            expect( container ).toHaveTextContent("Desconto não pode ser maior que 60")
        },{timeout:1000})

        expect( spyService).not.toHaveBeenCalled()
      
    })
    it("should prevent service call and return an error message if discount is negative",async()=>{
        spyService.mockResolvedValue({status:201,message:''})
        const discount = -1
        const {container,getByPlaceholderText,getAllByTestId,getByText} = render(
            <FormCreateCoupon/>
        )
        const inputName = getByPlaceholderText("Ex: DESCONTO15")
        const [selectDiscount,selectDate] = getAllByTestId("select")
        const inputCuponValue =getByPlaceholderText("Ex: 15")
        const inputQuantity = getByPlaceholderText("Ex: 25")
        const btnSubmit = getByText("Criar")

        fireEvent.change(inputName,{target:{value:body.code}})
        fireEvent.change(inputCuponValue,{target:{value:discount}})
        fireEvent.change(inputQuantity,{target:{value:body.quantity}})
        fireEvent.change( selectDiscount,{target:{value:body.discountType}})
        fireEvent.change( selectDate,{target:{value:body.expiresAt}})

        fireEvent.click( btnSubmit )
        await waitFor(()=>{
            expect( container ).toHaveTextContent("Desconto não pode ser igual ou menor que zero")
        },{timeout:1000})

        expect( spyService).not.toHaveBeenCalled()
      
    })
   
})

describe("services",()=>{
    const body = {
        code:"DESCONTO15",
        quantity:35,
        discount:15,
        discountType:"percent",
        expiresAt:"fivedays"
    }
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should return an error with status code 409",async()=>{
        spyService.mockResolvedValue({status:409,message:''})
       
        const {container,getByPlaceholderText,getAllByTestId,getByText} = render(
            <FormCreateCoupon/>
        )
        const inputName = getByPlaceholderText("Ex: DESCONTO15")
        const [selectDiscount,selectDate] = getAllByTestId("select")
        const inputCuponValue =getByPlaceholderText("Ex: 15")
        const inputQuantity = getByPlaceholderText("Ex: 25")
        const btnSubmit = getByText("Criar")

        fireEvent.change(inputName,{target:{value:body.code}})
        fireEvent.change(inputCuponValue,{target:{value:body.discount}})
        fireEvent.change(inputQuantity,{target:{value:body.quantity}})
        fireEvent.change( selectDiscount,{target:{value:body.discountType}})
        fireEvent.change( selectDate,{target:{value:body.expiresAt}})

        fireEvent.click( btnSubmit )
      
        await waitFor(()=>{
            expect( container ).toHaveTextContent("Já existe um cupom com esse nome")
        })
        expect( spyService).toHaveBeenCalledTimes(1)
        expect( spyService ).toHaveBeenCalledWith( body)
    })
     it("should return an error with message 'Limit of active coupons reached for this store.'",async()=>{
        spyService.mockResolvedValue({status:409,message:'Limit of active coupons reached for this store.'})
       
        const {container,getByPlaceholderText,getAllByTestId,getByText} = render(
            <FormCreateCoupon/>
        )
        const inputName = getByPlaceholderText("Ex: DESCONTO15")
        const [selectDiscount,selectDate] = getAllByTestId("select")
        const inputCuponValue =getByPlaceholderText("Ex: 15")
        const inputQuantity = getByPlaceholderText("Ex: 25")
        const btnSubmit = getByText("Criar")

        fireEvent.change(inputName,{target:{value:body.code}})
        fireEvent.change(inputCuponValue,{target:{value:body.discount}})
        fireEvent.change(inputQuantity,{target:{value:body.quantity}})
        fireEvent.change( selectDiscount,{target:{value:body.discountType}})
        fireEvent.change( selectDate,{target:{value:body.expiresAt}})

        fireEvent.click( btnSubmit )
      
        await waitFor(()=>{
            expect( container ).toHaveTextContent("Já existe um cupom com esse nome")
        })
        expect( spyService).toHaveBeenCalledTimes(1)
        expect( spyService ).toHaveBeenCalledWith( body)
    })
    it("should return an error when the status code is 500",async()=>{
        spyService.mockResolvedValue({status:501,message:''})
       
        const {container,getByPlaceholderText,getAllByTestId,getByText} = render(
            <FormCreateCoupon/>
        )
        const inputName = getByPlaceholderText("Ex: DESCONTO15")
        const [selectDiscount,selectDate] = getAllByTestId("select")
        const inputCuponValue =getByPlaceholderText("Ex: 15")
        const inputQuantity = getByPlaceholderText("Ex: 25")
        const btnSubmit = getByText("Criar")

        fireEvent.change(inputName,{target:{value:body.code}})
        fireEvent.change(inputCuponValue,{target:{value:body.discount}})
        fireEvent.change(inputQuantity,{target:{value:body.quantity}})
        fireEvent.change( selectDiscount,{target:{value:body.discountType}})
        fireEvent.change( selectDate,{target:{value:body.expiresAt}})

        fireEvent.click( btnSubmit )
      
        await waitFor(()=>{
            expect( container ).toHaveTextContent("Algo deu errado , tente novamente")
        })
        expect( spyService).toHaveBeenCalledTimes(1)
        expect( spyService ).toHaveBeenCalledWith( body)
    })
})