import {  HandlerFormUpsetProduct } from "@/components/forms/formUpsertProduct"
import { categories } from "@/constants"
import * as services from "@/services/store/productAdmin"
import type { UpsertProducts } from "@/types/storeDashboard.types"
import { fireEvent, render, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as storeStorage from '@/storage/store.storage'

const spyServiceUpdate = jest.spyOn(services,'serviceUpdateProduct')
const spyStorage = jest.spyOn(storeStorage,'getStorageStore')
const spyServiceCreate = jest.spyOn(services,'serviceCreateProduct')

const editRefs = {
    name:"testing",
    category:categories[3],
    price:"39",
    stock:"45",
    id:43,
    image:"url/image",
    description:"testaaaaaaaodo um novo valor"
} satisfies UpsertProducts
const file = new File(["testing"], "test-image.png", { type: "image/png" })
const onCancel = jest.fn()

const getInputs = (getByPlaceholderText:any,getByTestId:any)=>{
    const name = getByPlaceholderText("Ex: camisa polo")
    const file = getByTestId("image-product")
    const description = getByPlaceholderText("Ex: uma camisa para eventos...")
    const price = getByPlaceholderText("Ex: 19.99")
    const stock = getByPlaceholderText("Ex: 10")
    const category = getByTestId("select-product")
    
    return {
        name,
        category,
        price,stock,description,fileInput:file,
        
    }
}
 
const body = {
    name:'store name',
    description:'a'.repeat(20),
    price:"29",
    category:categories[0],
    stock:"50",
    image:file
}
describe("component FormUpsertProduct update product",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
   
    it("should not call the service when data has not changed",async()=>{
        spyServiceUpdate.mockResolvedValue({status:201,message:'Sucess'})
        spyStorage.mockReturnValue({name:'loja',id:35,photo:'eett',description:'lorem'})
        const user = userEvent.setup();
        const {container,getByTestId,getByText,getByPlaceholderText} = render(
            <HandlerFormUpsetProduct
                editRefs={editRefs}
                    type="update"
                    onCancel={onCancel}
                />
        )
        const {name,description,price,stock,category} = getInputs(getByPlaceholderText,getByTestId)

        expect(name).toHaveValue(editRefs.name)
        expect(description).toHaveValue(editRefs.description)
        expect(price).toHaveValue(Number(editRefs.price))
        expect(stock).toHaveValue(Number(editRefs.stock))
        expect(category).toHaveValue(editRefs.category)
        const submit = getByText("Enviar")
        await user.click(submit);

        await waitFor(()=>{
            expect( spyServiceUpdate ).not.toHaveBeenCalled()
            expect( container ).toHaveTextContent('Campos não foram alterados')
        },{timeout:1000})

       
    })
    it("should call the update service correctly",async()=>{
        spyServiceUpdate.mockResolvedValue({status:201,message:'Sucess'})
        spyStorage.mockReturnValue({name:'loja',id:35,photo:'eett',description:'lorem'})
        const user = userEvent.setup();
        const {container,getByTestId,getByText,getByPlaceholderText} = render(
            <HandlerFormUpsetProduct
                editRefs={editRefs}
                    type="update"
                    onCancel={onCancel}
                />
        )
        const {name,description,price,stock,category,fileInput} = getInputs(getByPlaceholderText,getByTestId)
        const selectCategory = categories[4]
        const getUpdateImage = getByTestId("upsert-image-update")
        expect(getUpdateImage).toBeInTheDocument()
        expect(name).toHaveValue(editRefs.name)
        expect(description).toHaveValue(editRefs.description)
        expect(price).toHaveValue(Number(editRefs.price))
        expect(stock).toHaveValue(Number(editRefs.stock))
        expect(category).toHaveValue(editRefs.category)

        await user.clear(name);
        await user.clear(description)
        await user.clear(price)
        await user.clear(stock)

        await user.type(name, body.name);
        await user.type(description, body.description);
        await user.type(price, String(body.price));
        await user.type(stock, String(body.stock));

        await user.selectOptions(category, selectCategory);

        await user.upload(fileInput, file);
        const submit = getByText("Enviar")
        await user.click(submit);
    
        await waitFor(()=>{
            expect( spyServiceUpdate ).toHaveBeenCalledTimes(1)
            expect( container ).toHaveTextContent('Sucesso ao atualizar o produto')
            expect( spyServiceUpdate ).toHaveBeenCalledWith({
                category:selectCategory,name:body.name,
                description:body.description,price:body.price,
                stock:body.stock,image:body.image,id:editRefs.id
            })
        },{timeout:1000})

       
    })
    it("should send only the file when all other inputs are empty.",async()=>{
        spyServiceUpdate.mockResolvedValue({status:201,message:'Sucess'})
         spyStorage.mockReturnValue({name:'loja',id:35,photo:'eett',description:'lorem'})
        const user = userEvent.setup();
        const {container,getByTestId,getByText,getByPlaceholderText} = render(
            <HandlerFormUpsetProduct
                editRefs={editRefs}
                    type="update"
                    onCancel={onCancel}
                />
        )
        const {name,description,price,stock,category,fileInput} = getInputs(getByPlaceholderText,getByTestId)
        const submit = getByText("Enviar")
        expect(name).toHaveValue(editRefs.name)
        expect(description).toHaveValue(editRefs.description)
        expect(price).toHaveValue(Number(editRefs.price))
        expect(stock).toHaveValue(Number(editRefs.stock))
        expect(category).toHaveValue(editRefs.category)
        
        await user.upload(fileInput, file);
        await user.click(submit);
        await waitFor(()=>{
             
            expect( spyServiceUpdate ).toHaveBeenCalledTimes(1)
            expect( container ).toHaveTextContent('Sucesso ao atualizar o produto')
            expect( spyServiceUpdate ).toHaveBeenCalledWith({
                category:"",name:"",
                description:"",price:"",
                stock:"",image:file,id:editRefs.id
            })
        },{timeout:1000})

       
    })
    it.each([
    {
        field: "name",
        testId: "upsert-name",
        newValue: body.name,
        expectedPayload: { name: body.name }
    },
    {
        field: "description",
        testId: "upsert-description",
        newValue: body.description,
        expectedPayload: { description: body.description }
    },
    {
        field: "price",
        testId: "upsert-price",
        newValue: body.price,
        expectedPayload: { price: body.price }
    },
    {
        field: "stock",
        testId: "upsert-stock",
        newValue: body.stock,
        expectedPayload: { stock: body.stock }
    },
    {
        field: "category",
        testId: "select-product",
        newValue: categories[2],
        expectedPayload: { category: categories[2   ] }
    }
   
    ])(
    "should send only %s when it is updated",
    async ({ testId, newValue, expectedPayload }) => {
        spyServiceUpdate.mockResolvedValue({ status: 201, message: "Success" })
         spyStorage.mockReturnValue({name:'loja',id:35,photo:'eett',description:'lorem'})

        const { container, getByTestId, getByText } = render(
        <HandlerFormUpsetProduct
            editRefs={editRefs}
            type="update"
            onCancel={onCancel}
        />
        )

        const input = getByTestId(testId)
        fireEvent.change(input, { target: { value: newValue } })

        fireEvent.click(getByText("Enviar"))
        
        await waitFor(() => {
        expect(spyServiceUpdate).toHaveBeenCalledTimes(1)
        expect(container).toHaveTextContent("Sucesso ao atualizar o produto")

        expect(spyServiceUpdate).toHaveBeenCalledWith({
            id: editRefs.id,
            image: undefined,
            name: "",
            description: "",
            price: "",
            stock: "",
            category: "",
            ...expectedPayload
            })
        })
    }
)
})

describe("component FormUpsertProduct create product",()=>{
       beforeEach(()=>{
        jest.clearAllMocks()
    })
     it("should return an error message when the service returns status 400",async()=>{
        spyServiceCreate.mockResolvedValue({status:400,message:'Sucess'})
         spyStorage.mockReturnValue({name:'loja',id:35,photo:'eett',description:'lorem'})
        const user = userEvent.setup()
        const {container,getByPlaceholderText,getByTestId,getByText} = render(
            <HandlerFormUpsetProduct
            editRefs={editRefs}
            type="create"
            onCancel={onCancel}
        />
        )
        const {name,description,stock,category,price,fileInput} = getInputs(getByPlaceholderText,getByTestId)

        const submit = getByText("Enviar")

        await user.type(name, body.name)

        await user.upload(fileInput, body.image)

        await user.type(description, body.description)

        await user.type(price, String(body.price))

        await user.type(stock, String(body.stock))

        await user.selectOptions(category, body.category)

        await user.click(submit)


        await waitFor(()=>{
            expect( container ).toHaveTextContent('Algo deu errado!')
        },{timeout:1000})

        expect( spyServiceCreate ).toHaveBeenCalledTimes(1)
        expect( spyServiceCreate ).toHaveBeenCalledWith( body )
    })
    it("should create a product succesfully",async()=>{
        spyServiceCreate.mockResolvedValue({status:201,message:'Sucess'})
         spyStorage.mockReturnValue({name:'loja',id:35,photo:'eett',description:'lorem'})
        const user = userEvent.setup()
        const {container,getByPlaceholderText,getByTestId,getByText} = render(
            <HandlerFormUpsetProduct
            editRefs={editRefs}
            type="create"
            onCancel={onCancel}
        />
        )
        const {name,description,stock,category,price,fileInput} = getInputs(getByPlaceholderText,getByTestId)

        const submit = getByText("Enviar")

        await user.type(name, body.name)

        await user.upload(fileInput, body.image)

        await user.type(description, body.description)

        await user.type(price, String(body.price))

        await user.type(stock, String(body.stock))

        await user.selectOptions(category, body.category)

        await user.click(submit)


        await waitFor(()=>{
            expect( container ).toHaveTextContent('Produto criado com sucesso')
        },{timeout:1000})

        expect( spyServiceCreate ).toHaveBeenCalledTimes(1)
        expect( spyServiceCreate ).toHaveBeenCalledWith( body )
    })
 it.each([
  {
    field: "name",
    errorMessage: "Digite um nome válido",
    fillExcept: async (user:any, inputs:any) => {
      await user.upload(inputs.file, body.image);
      await user.type(inputs.description, body.description);
      await user.type(inputs.price, String(body.price));
      await user.type(inputs.stock, String(body.stock));
      await user.selectOptions(inputs.category, body.category);
    },
  },
  {
    field: "description",
    errorMessage: "Digite uma descrição válida",
    fillExcept: async (user, inputs) => {
      await user.type(inputs.name, body.name);
      await user.upload(inputs.file, body.image);
      await user.type(inputs.price, String(body.price));
      await user.type(inputs.stock, String(body.stock));
      await user.selectOptions(inputs.category, body.category);
    },
  },
  {
    field: "price",
    errorMessage: "Digite um preço válido",
    fillExcept: async (user, inputs) => {
      await user.type(inputs.name, body.name);
      await user.upload(inputs.file, body.image);
      await user.type(inputs.description, body.description);
      await user.type(inputs.stock, String(body.stock));
      await user.selectOptions(inputs.category, body.category);
    },
  },
  {
    field: "stock",
    errorMessage: "Digite um estoque válido",
    fillExcept: async (user, inputs) => {
      await user.type(inputs.name, body.name);
      await user.upload(inputs.file, body.image);
      await user.type(inputs.description, body.description);
      await user.type(inputs.price, String(body.price));
      await user.selectOptions(inputs.category, body.category);
    },
  },
  {
    field: "category",
    errorMessage: "Selecione uma categoria",
    fillExcept: async (user, inputs) => {
        
        await user.upload(inputs.file, body.image);
        await user.type(inputs.description, body.description);
        await user.type(inputs.price, String(body.price));
        await user.type(inputs.stock, String(body.stock));
    },
    
  },
  {
    field: "file",
    errorMessage: "Adicione uma imagem",
    fillExcept: async (user, inputs) => {
      await user.type(inputs.name, body.name);
      await user.selectOptions(inputs.category, body.category);
      await user.type(inputs.description, body.description);
      await user.type(inputs.price, String(body.price));
      await user.type(inputs.stock, String(body.stock));
        
    },
    
  },
])(
  "should prevent calling the service when %s is empty",
  async ({ errorMessage, fillExcept }) => {
    spyServiceCreate.mockResolvedValue({ status: 201, message: "Sucess" });

    const user = userEvent.setup();

    const {
      container,
      getByPlaceholderText,
      getByTestId,
      getByText,
    } = render(<HandlerFormUpsetProduct
        type="create"
        editRefs={editRefs}
        onCancel={onCancel}
         />);

    const inputs = {
      name: getByPlaceholderText("Ex: camisa polo"),
      description: getByPlaceholderText("Ex: uma camisa para eventos..."),
      price: getByPlaceholderText("Ex: 19.99"),
      stock: getByPlaceholderText("Ex: 10"),
      category: getByTestId("select-product"),
      file: getByTestId("image-product"),
    };

    const submit = getByText("Enviar");

 
    await fillExcept(user, inputs);

    await user.click(submit);

    await waitFor(() => {
      expect(container).toHaveTextContent(errorMessage);
    });

    expect(spyServiceCreate).toHaveBeenCalledTimes(0);
  }
);

    
})