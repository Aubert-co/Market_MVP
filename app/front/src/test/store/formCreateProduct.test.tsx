import { FormCreateProduct } from "@/components/forms/formCreateProduct"
import { categories } from "@/constants"
import * as services from "@/services/admStore.services"
import { fireEvent, render, waitFor } from "@testing-library/react"

const spyService = jest.spyOn(services,'serviceCreateProduct')
describe("component FormCreateProduct services",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    const file = new File(["testing"], "test-image.png", { type: "image/png" })
    const body = {
        name:'store name',
        description:'a'.repeat(20),
        price:"29",
        category:categories[0],
        stock:"50",
        image:file
    }
    it("should call the service successfully when all inputs are valid",async()=>{
        spyService.mockResolvedValue({status:201,message:'Sucess'})
        const {container,getByPlaceholderText,getByTestId,getByText} = render(
            <FormCreateProduct/>
        )
        const name = getByPlaceholderText("Ex: camisa polo")
        const file = getByTestId("image-product")
        const description = getByPlaceholderText("Ex: uma camisa para eventos...")
        const price = getByPlaceholderText("Ex: 19.99")
        const stock = getByPlaceholderText("Ex: 10")
        const category = getByTestId("select-product")

        const submit = getByText("Enviar")

        fireEvent.change(name,{target:{value:body.name}})
        fireEvent.change(file,{target:{files:[body.image]}})
        fireEvent.change(description,{target:{value:body.description}})
        fireEvent.change(price,{target:{value:body.price}})
        fireEvent.change(stock,{target:{value:body.stock}})
        fireEvent.change(category,{target:{value:body.category}})

        fireEvent.click( submit )

        await waitFor(()=>{
            expect( container ).toHaveTextContent('Produto criado com sucesso')
        },{timeout:1000})

        expect( spyService ).toHaveBeenCalledTimes(1)
        expect( spyService ).toHaveBeenCalledWith( body )
    })
    it("should return an error message when the service returns status 400",async()=>{
        spyService.mockResolvedValue({status:400,message:'Sucess'})
        const {container,getByPlaceholderText,getByTestId,getByText} = render(
            <FormCreateProduct/>
        )
        const name = getByPlaceholderText("Ex: camisa polo")
        const file = getByTestId("image-product")
        const description = getByPlaceholderText("Ex: uma camisa para eventos...")
        const price = getByPlaceholderText("Ex: 19.99")
        const stock = getByPlaceholderText("Ex: 10")
        const category = getByTestId("select-product")

        const submit = getByText("Enviar")

        fireEvent.change(name,{target:{value:body.name}})
        fireEvent.change(file,{target:{files:[body.image]}})
        fireEvent.change(description,{target:{value:body.description}})
        fireEvent.change(price,{target:{value:body.price}})
        fireEvent.change(stock,{target:{value:body.stock}})
        fireEvent.change(category,{target:{value:body.category}})

        fireEvent.click( submit )

        await waitFor(()=>{
            expect( container ).toHaveTextContent('Algo deu errado ao criar produto!')
        },{timeout:1000})

        expect( spyService ).toHaveBeenCalledTimes(1)
        expect( spyService ).toHaveBeenCalledWith( body )
    })
     it("should return an error message when the service returns status 422",async()=>{
        spyService.mockResolvedValue({status:422,message:'Sucess'})
        const {container,getByPlaceholderText,getByTestId,getByText} = render(
            <FormCreateProduct/>
        )
        const name = getByPlaceholderText("Ex: camisa polo")
        const file = getByTestId("image-product")
        const description = getByPlaceholderText("Ex: uma camisa para eventos...")
        const price = getByPlaceholderText("Ex: 19.99")
        const stock = getByPlaceholderText("Ex: 10")
        const category = getByTestId("select-product")

        const submit = getByText("Enviar")

        fireEvent.change(name,{target:{value:body.name}})
        fireEvent.change(file,{target:{files:[body.image]}})
        fireEvent.change(description,{target:{value:body.description}})
        fireEvent.change(price,{target:{value:body.price}})
        fireEvent.change(stock,{target:{value:body.stock}})
        fireEvent.change(category,{target:{value:body.category}})

        fireEvent.click( submit )

        await waitFor(()=>{
            expect( container ).toHaveTextContent("Campos inválidos!")
        },{timeout:1000})

        expect( spyService ).toHaveBeenCalledTimes(1)
        expect( spyService ).toHaveBeenCalledWith( body )
    })
})

describe("when the name is invalid",()=>{
     beforeEach(()=>{
        jest.clearAllMocks()
    })
    const file = new File(["testing"], "test-image.png", { type: "image/png" })
    const body = {
        name:'',
        description:'a'.repeat(20),
        price:"29",
        category:categories[0],
        stock:"50",
        image:file
    }
    it("should prevent calling the service when the name is empty",async()=>{
        spyService.mockResolvedValue({status:201,message:'Sucess'})
        const {container,getByPlaceholderText,getByTestId,getByText} = render(
            <FormCreateProduct/>
        )
        const name = getByPlaceholderText("Ex: camisa polo")
        const file = getByTestId("image-product")
        const description = getByPlaceholderText("Ex: uma camisa para eventos...")
        const price = getByPlaceholderText("Ex: 19.99")
        const stock = getByPlaceholderText("Ex: 10")
        const category = getByTestId("select-product")

        const submit = getByText("Enviar")

        fireEvent.change(name,{target:{value:body.name}})
        fireEvent.change(file,{target:{files:[body.image]}})
        fireEvent.change(description,{target:{value:body.description}})
        fireEvent.change(price,{target:{value:body.price}})
        fireEvent.change(stock,{target:{value:body.stock}})
        fireEvent.change(category,{target:{value:body.category}})

        fireEvent.click( submit )

        await waitFor(()=>{
            expect( container ).toHaveTextContent('Digite um nome válido')
        },{timeout:1000})

        expect( spyService ).toHaveBeenCalledTimes(0)
     
    })
})

describe("when the description is invalid",()=>{
     beforeEach(()=>{
        jest.clearAllMocks()
    })
    const file = new File(["testing"], "test-image.png", { type: "image/png" })
    const body = {
        name:'lorem iptsu',
        description:'',
        price:"29",
        category:categories[0],
        stock:"50",
        image:file
    }
    it("should prevent calling the service when the description is empty",async()=>{
        spyService.mockResolvedValue({status:201,message:'Sucess'})
        const {container,getByPlaceholderText,getByTestId,getByText} = render(
            <FormCreateProduct/>
        )
        const name = getByPlaceholderText("Ex: camisa polo")
        const file = getByTestId("image-product")
        const description = getByPlaceholderText("Ex: uma camisa para eventos...")
        const price = getByPlaceholderText("Ex: 19.99")
        const stock = getByPlaceholderText("Ex: 10")
        const category = getByTestId("select-product")

        const submit = getByText("Enviar")

        fireEvent.change(name,{target:{value:body.name}})
        fireEvent.change(file,{target:{files:[body.image]}})
        fireEvent.change(description,{target:{value:body.description}})
        fireEvent.change(price,{target:{value:body.price}})
        fireEvent.change(stock,{target:{value:body.stock}})
        fireEvent.change(category,{target:{value:body.category}})

        fireEvent.click( submit )

        await waitFor(()=>{
            expect( container ).toHaveTextContent('Digite uma descrição válida')
        },{timeout:1000})

        expect( spyService ).toHaveBeenCalledTimes(0)
     
    })
})

describe("when the price is invalid",()=>{
     beforeEach(()=>{
        jest.clearAllMocks()
    })
    const file = new File(["testing"], "test-image.png", { type: "image/png" })
    const body = {
        name:'lorem isptu',
        description:'a'.repeat(25),
        price:"29b",
        category:categories[0],
        stock:"50",
        image:file
    }
    it("should prevent calling the service when the price is empty",async()=>{
        spyService.mockResolvedValue({status:201,message:'Sucess'})
        const {container,getByPlaceholderText,getByTestId,getByText} = render(
            <FormCreateProduct/>
        )
        const name = getByPlaceholderText("Ex: camisa polo")
        const file = getByTestId("image-product")
        const description = getByPlaceholderText("Ex: uma camisa para eventos...")
        const price = getByPlaceholderText("Ex: 19.99")
        const stock = getByPlaceholderText("Ex: 10")
        const category = getByTestId("select-product")

        const submit = getByText("Enviar")

        fireEvent.change(name,{target:{value:body.name}})
        fireEvent.change(file,{target:{files:[body.image]}})
        fireEvent.change(description,{target:{value:body.description}})
        fireEvent.change(price,{target:{value:body.price}})
        fireEvent.change(stock,{target:{value:body.stock}})
        fireEvent.change(category,{target:{value:body.category}})

        fireEvent.click( submit )

        await waitFor(()=>{
            expect( container ).toHaveTextContent('Digite um preço válido, apenas números')
        },{timeout:1000})

        expect( spyService ).toHaveBeenCalledTimes(0)
     
    })
})

describe("when the stock is invalid",()=>{
     beforeEach(()=>{
        jest.clearAllMocks()
    })
    const file = new File(["testing"], "test-image.png", { type: "image/png" })
    const body = {
        name:'lorem isptu',
        description:'a'.repeat(25),
        price:"29",
        category:categories[0],
        stock:"50b",
        image:file
    }
    it("should prevent calling the service when the price is empty",async()=>{
        spyService.mockResolvedValue({status:201,message:'Sucess'})
        const {container,getByPlaceholderText,getByTestId,getByText} = render(
            <FormCreateProduct/>
        )
        const name = getByPlaceholderText("Ex: camisa polo")
        const file = getByTestId("image-product")
        const description = getByPlaceholderText("Ex: uma camisa para eventos...")
        const price = getByPlaceholderText("Ex: 19.99")
        const stock = getByPlaceholderText("Ex: 10")
        const category = getByTestId("select-product")

        const submit = getByText("Enviar")

        fireEvent.change(name,{target:{value:body.name}})
        fireEvent.change(file,{target:{files:[body.image]}})
        fireEvent.change(description,{target:{value:body.description}})
        fireEvent.change(price,{target:{value:body.price}})
        fireEvent.change(stock,{target:{value:body.stock}})
        fireEvent.change(category,{target:{value:body.category}})

        fireEvent.click( submit )

        await waitFor(()=>{
            expect( container ).toHaveTextContent('Digite um estoque válido , apenas números')
        },{timeout:1000})

        expect( spyService ).toHaveBeenCalledTimes(0)
     
    })
})


describe("when the category is invalid",()=>{
     beforeEach(()=>{
        jest.clearAllMocks()
    })
    const file = new File(["testing"], "test-image.png", { type: "image/png" })
    const body = {
        name:'lorem isptu',
        description:'a'.repeat(25),
        price:"",
        category:'lorem ',
        stock:"50",
        image:file
    }
    it("should prevent calling the service when the price is empty",async()=>{
        spyService.mockResolvedValue({status:201,message:'Sucess'})
        const {container,getByPlaceholderText,getByTestId,getByText} = render(
            <FormCreateProduct/>
        )
        const name = getByPlaceholderText("Ex: camisa polo")
        const file = getByTestId("image-product")
        const description = getByPlaceholderText("Ex: uma camisa para eventos...")
        const price = getByPlaceholderText("Ex: 19.99")
        const stock = getByPlaceholderText("Ex: 10")
        const category = getByTestId("select-product")

        const submit = getByText("Enviar")

        fireEvent.change(name,{target:{value:body.name}})
        fireEvent.change(file,{target:{files:[body.image]}})
        fireEvent.change(description,{target:{value:body.description}})
        fireEvent.change(price,{target:{value:body.price}})
        fireEvent.change(stock,{target:{value:body.stock}})
        fireEvent.change(category,{target:{value:body.category}})

        fireEvent.click( submit )

        await waitFor(()=>{
            expect( container ).toHaveTextContent('Selecione uma categoria')
        },{timeout:1000})

        expect( spyService ).toHaveBeenCalledTimes(0)
     
    })
})

describe("when the image is invalid",()=>{
     beforeEach(()=>{
        jest.clearAllMocks()
    })

    const body = {
        name:'lorem isptu',
        description:'a'.repeat(25),
        price:"29",
        category:categories[0],
        stock:"50",
        image:''
    }
    it("should prevent calling the service when the image is empty",async()=>{
        spyService.mockResolvedValue({status:201,message:'Sucess'})
        const {container,getByPlaceholderText,getByTestId,getByText} = render(
            <FormCreateProduct/>
        )
        const name = getByPlaceholderText("Ex: camisa polo")
        const file = getByTestId("image-product")
        const description = getByPlaceholderText("Ex: uma camisa para eventos...")
        const price = getByPlaceholderText("Ex: 19.99")
        const stock = getByPlaceholderText("Ex: 10")
        const category = getByTestId("select-product")

        const submit = getByText("Enviar")

        fireEvent.change(name,{target:{value:body.name}})
        fireEvent.change(file,{target:{files:[body.image]}})
        fireEvent.change(description,{target:{value:body.description}})
        fireEvent.change(price,{target:{value:body.price}})
        fireEvent.change(stock,{target:{value:body.stock}})
        fireEvent.change(category,{target:{value:body.category}})

        fireEvent.click( submit )

        await waitFor(()=>{
            expect( container ).toHaveTextContent('Adicione uma imagem válida')
        },{timeout:1000})

        expect( spyService ).toHaveBeenCalledTimes(0)
     
    })
})