import { FormCreateStore } from "@/components/forms/formCreateStore"
import {  fireEvent, render ,waitFor} from "@testing-library/react"
import * as service from '@/services/store.services'
import { BrowserRouter } from "react-router-dom"


const mockedService = jest.spyOn(service,'serviceCreateStore')

describe("component FormCreateStore",()=>{
    const mockFormRef: React.RefObject<HTMLFormElement | null> = {
              current: {
                value: '',
                focus: jest.fn(),
              } as unknown as HTMLFormElement,
    };
    const file = new File(["testing"], "test-image.png", { type: "image/png" })
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should call service and show success when creating a store",async()=>{
        mockedService.mockResolvedValue({status:201,message:'Success'})
        const name = "testing"
        const description = "description"
        const {queryByPlaceholderText,getByText,queryByTestId,getByTestId}= render(
            <BrowserRouter>
                <FormCreateStore formRef={mockFormRef}/>
            </BrowserRouter>
        )
        const storeName = queryByPlaceholderText("Ex: EletronicArts") as HTMLInputElement
        const storeDescription = queryByPlaceholderText("Ex: Produtos eletrônicos diversos") as HTMLInputElement
        const imgFIle = queryByTestId("image-file") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement
      
        fireEvent.change(imgFIle,{target:{
            files:[file]
        }})
        fireEvent.change( storeName ,{target:{value:name}})
        fireEvent.change(storeDescription,{target:{value:description}})
        fireEvent.click(btnSubmit)
        
        await waitFor(()=>{
            const messageElement = getByTestId("message_content")
            expect(messageElement).toHaveTextContent("Loja criada com sucesso!")
        })
      
        
      
        expect( mockedService ).toHaveBeenCalledTimes(1)
        expect( mockedService ).toHaveBeenCalledWith({
            name,
            description,
            image:expect.objectContaining({
            name: "test-image.png",
            type: "image/png",
        })})
    })
    it("should not call the service and should show 'Digite um nome válido' when name is empty",async()=>{
        mockedService.mockResolvedValue({status:201,message:'Success'})
        const name = ""
        const description = "description"
        const {queryByPlaceholderText,getByText,queryByTestId,getByTestId}= render(
            <BrowserRouter>
                <FormCreateStore formRef={mockFormRef}/>
            </BrowserRouter>
        )
        const storeName = queryByPlaceholderText("Ex: EletronicArts") as HTMLInputElement
        const storeDescription = queryByPlaceholderText("Ex: Produtos eletrônicos diversos") as HTMLInputElement
        const imgFIle = queryByTestId("image-file") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement
      
        fireEvent.change(imgFIle,{target:{
            files:[file]
        }})
        fireEvent.change( storeName ,{target:{value:name}})
        fireEvent.change(storeDescription,{target:{value:description}})
        fireEvent.click(btnSubmit)
        
        await waitFor(()=>{
            const messageElement = getByTestId("message_content")
            expect(messageElement).toHaveTextContent("Digite um nome válido")
        })
      
        expect( mockedService ).toHaveBeenCalledTimes(0)
    })
     it("should not call the service and should show 'Digite um nome válido' when name has less than 4 character",async()=>{
        mockedService.mockResolvedValue({status:201,message:'Success'})
        const name = "v1d"
        const description = "description"
       const {queryByPlaceholderText,getByText,queryByTestId,getByTestId}= render(
            <BrowserRouter>
                <FormCreateStore formRef={mockFormRef}/>
            </BrowserRouter>
        )
        const storeName = queryByPlaceholderText("Ex: EletronicArts") as HTMLInputElement
        const storeDescription = queryByPlaceholderText("Ex: Produtos eletrônicos diversos") as HTMLInputElement
        const imgFIle = queryByTestId("image-file") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement
      
        fireEvent.change(imgFIle,{target:{
            files:[file]
        }})
        fireEvent.change( storeName ,{target:{value:name}})
        fireEvent.change(storeDescription,{target:{value:description}})
        fireEvent.click(btnSubmit)
        
        await waitFor(()=>{
            const messageElement = getByTestId("message_content")
            expect(messageElement).toHaveTextContent("Digite um nome válido")
        })
      
        expect( mockedService ).toHaveBeenCalledTimes(0)
    })
     it("should not call the service and should show 'Digite um nome válido' when description is empty",async()=>{
        mockedService.mockResolvedValue({status:201,message:'Success'})
        const name = "vsdee"
        const description = ""
       const {queryByPlaceholderText,getByText,queryByTestId,getByTestId}= render(
            <BrowserRouter>
                <FormCreateStore formRef={mockFormRef}/>
            </BrowserRouter>
        )
        const storeName = queryByPlaceholderText("Ex: EletronicArts") as HTMLInputElement
        const storeDescription = queryByPlaceholderText("Ex: Produtos eletrônicos diversos") as HTMLInputElement
        const imgFIle = queryByTestId("image-file") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement
      
        fireEvent.change(imgFIle,{target:{
            files:[file]
        }})
        fireEvent.change( storeName ,{target:{value:name}})
        fireEvent.change(storeDescription,{target:{value:description}})
        fireEvent.click(btnSubmit)
        
        await waitFor(()=>{
            const messageElement = getByTestId("message_content")
            expect(messageElement).toHaveTextContent("Digite uma descrição válida até 200 letras")
        })
      
        expect( mockedService ).toHaveBeenCalledTimes(0)
    })
    it("should not call the service and should show 'Digite um nome válido' when description is longer than 200 characters",async()=>{
        mockedService.mockResolvedValue({status:201,message:'Success'})
        const name = "vsdee"
        const description = "a".repeat(201)
        const {queryByPlaceholderText,getByText,queryByTestId,getByTestId}= render(
            <BrowserRouter>
                <FormCreateStore formRef={mockFormRef}/>
            </BrowserRouter>
        )
        const storeName = queryByPlaceholderText("Ex: EletronicArts") as HTMLInputElement
        const storeDescription = queryByPlaceholderText("Ex: Produtos eletrônicos diversos") as HTMLInputElement
        const imgFIle = queryByTestId("image-file") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement
      
        fireEvent.change(imgFIle,{target:{
            files:[file]
        }})
        fireEvent.change( storeName ,{target:{value:name}})
        fireEvent.change(storeDescription,{target:{value:description}})
        fireEvent.click(btnSubmit)
        
        await waitFor(()=>{
            const messageElement = getByTestId("message_content")
            expect(messageElement).toHaveTextContent("Digite uma descrição válida até 200 letras")
        })
      
        expect( mockedService ).toHaveBeenCalledTimes(0)
    })
    it("should not call the service and should show 'Adicione uma imagem válida' when image is empty",async()=>{
        mockedService.mockResolvedValue({status:201,message:'Success'})
        const name = "vsdee"
        const description = "a".repeat(201)
        const {queryByPlaceholderText,getByText,getByTestId}= render(
            <BrowserRouter>
                <FormCreateStore formRef={mockFormRef}/>
            </BrowserRouter>
        )
        const storeName = queryByPlaceholderText("Ex: EletronicArts") as HTMLInputElement
        const storeDescription = queryByPlaceholderText("Ex: Produtos eletrônicos diversos") as HTMLInputElement
     
        const btnSubmit = getByText("Enviar") as HTMLButtonElement
      
        
        fireEvent.change( storeName ,{target:{value:name}})
        fireEvent.change(storeDescription,{target:{value:description}})
        fireEvent.click(btnSubmit)
        
        await waitFor(()=>{
            const messageElement = getByTestId("message_content")
            expect(messageElement).toHaveTextContent("Digite uma descrição válida até 200 letras")
        })
      
        expect( mockedService ).toHaveBeenCalledTimes(0)
    })
    it("should not call the service and should show 'Adicione uma imagem válida' when image is not of type image",async()=>{
        const file = new File(["testing"], "test-image.png", { type: "text/plain" })
        mockedService.mockResolvedValue({status:201,message:'Success'})
        const name = "vsdee"
        const description = "a".repeat(201)
        const {queryByPlaceholderText,getByText,queryByTestId,getByTestId}= render(
            <BrowserRouter>
                <FormCreateStore formRef={mockFormRef}/>
            </BrowserRouter>
        )
        const storeName = queryByPlaceholderText("Ex: EletronicArts") as HTMLInputElement
        const storeDescription = queryByPlaceholderText("Ex: Produtos eletrônicos diversos") as HTMLInputElement
        const imgFIle = queryByTestId("image-file") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement
      
        fireEvent.change(imgFIle,{target:{
            files:[file]
        }})
        fireEvent.change( storeName ,{target:{value:name}})
        fireEvent.change(storeDescription,{target:{value:description}})
        fireEvent.click(btnSubmit)
        
        await waitFor(()=>{
            const messageElement = getByTestId("message_content")
            expect(messageElement).toHaveTextContent("Digite uma descrição válida até 200 letras")
        })
      
        expect( mockedService ).toHaveBeenCalledTimes(0)
    })
     it("should render the message 'Falha ao criar a loja. Certifique-se de que a imagem é válida' when service returns status 422",async()=>{
        mockedService.mockResolvedValue({status:422,message:'Success'})
        const name = "testing"
        const description = "description"
        const {queryByPlaceholderText,getByText,queryByTestId,getByTestId}= render(
            <BrowserRouter>
                <FormCreateStore formRef={mockFormRef}/>
            </BrowserRouter>
        )
        const storeName = queryByPlaceholderText("Ex: EletronicArts") as HTMLInputElement
        const storeDescription = queryByPlaceholderText("Ex: Produtos eletrônicos diversos") as HTMLInputElement
        const imgFIle = queryByTestId("image-file") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement
      
        fireEvent.change(imgFIle,{target:{
            files:[file]
        }})
        fireEvent.change( storeName ,{target:{value:name}})
        fireEvent.change(storeDescription,{target:{value:description}})
        fireEvent.click(btnSubmit)
        
        await waitFor(()=>{
            const messageElement = getByTestId("message_content")
            expect(messageElement).toHaveTextContent("Falha ao criar a loja. Certifique-se de que a imagem é válida")
        })
      
        
      
        expect( mockedService ).toHaveBeenCalledTimes(1)
        expect( mockedService ).toHaveBeenCalledWith({
            name,
            description,
            image:expect.objectContaining({
            name: "test-image.png",
            type: "image/png",
        })})
    })
    it("should render the message 'Já existe uma loja com esse nome, tente outro' when service returns status 422",async()=>{
        mockedService.mockResolvedValue({status:409,message:'Success'})
        const name = "testing"
        const description = "description"
       const {queryByPlaceholderText,getByText,queryByTestId,getByTestId}= render(
            <BrowserRouter>
                <FormCreateStore formRef={mockFormRef}/>
            </BrowserRouter>
        )
        const storeName = queryByPlaceholderText("Ex: EletronicArts") as HTMLInputElement
        const storeDescription = queryByPlaceholderText("Ex: Produtos eletrônicos diversos") as HTMLInputElement
        const imgFIle = queryByTestId("image-file") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement
      
        fireEvent.change(imgFIle,{target:{
            files:[file]
        }})
        fireEvent.change( storeName ,{target:{value:name}})
        fireEvent.change(storeDescription,{target:{value:description}})
        fireEvent.click(btnSubmit)
        
        await waitFor(()=>{
            const messageElement = getByTestId("message_content")
            expect(messageElement).toHaveTextContent("Já existe uma loja com esse nome, tente outro")
        })
      
        
      
        expect( mockedService ).toHaveBeenCalledTimes(1)
        expect( mockedService ).toHaveBeenCalledWith({
            name,
            description,
            image:expect.objectContaining({
            name: "test-image.png",
            type: "image/png",
        })})
    })
    it("should render the message 'Algo deu errado ao criar a sua loja!' when service returns status greater than 422",async()=>{
        mockedService.mockResolvedValue({status:423,message:'Success'})
        const name = "testing"
        const description = "description"
        const {queryByPlaceholderText,getByText,queryByTestId,getByTestId}= render(
            <BrowserRouter>
                <FormCreateStore formRef={mockFormRef}/>
            </BrowserRouter>
        )
        const storeName = queryByPlaceholderText("Ex: EletronicArts") as HTMLInputElement
        const storeDescription = queryByPlaceholderText("Ex: Produtos eletrônicos diversos") as HTMLInputElement
        const imgFIle = queryByTestId("image-file") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement
      
        fireEvent.change(imgFIle,{target:{
            files:[file]
        }})
        fireEvent.change( storeName ,{target:{value:name}})
        fireEvent.change(storeDescription,{target:{value:description}})
        fireEvent.click(btnSubmit)
        
        await waitFor(()=>{
            const messageElement = getByTestId("message_content")
            expect(messageElement).toHaveTextContent("Algo deu errado ao criar a sua loja!")
        })
      
        
      
        expect( mockedService ).toHaveBeenCalledTimes(1)
        expect( mockedService ).toHaveBeenCalledWith({
            name,
            description,
            image:expect.objectContaining({
            name: "test-image.png",
            type: "image/png",
        })})
    })
})