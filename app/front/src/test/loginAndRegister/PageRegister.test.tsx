import '@testing-library/jest-dom';
import {   render ,fireEvent} from "@testing-library/react";
import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import * as service from  '../../services/loginOrRegister'
import { act } from 'react';
import { Register } from '../../pages/register';



const serviceMoked = jest.spyOn(service,'serviceLoginOrRegister')

describe("should handle service response",()=>{
    const email = "lucas@gmail.com"
    const password = "123456"
    const name = "josef"
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    beforeAll(()=>{
        window.HTMLElement.prototype.scrollIntoView = jest.fn()
    })
    it("should display the success message when the service returns status 201",async()=>{
        serviceMoked.mockResolvedValue({status:201,message:'Sucess'})
        const {queryByPlaceholderText,getByText,container}= render(
                 
                   <Router>
                   <Routes>
                       <Route
                       path="/"
                       element={<Register/>}
                       />
                   </Routes>
                   </Router>
            )
      
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLInputElement
        const byName = queryByPlaceholderText("Ex: joao") as HTMLInputElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLInputElement
        const repeatPassword = queryByPlaceholderText("Igual a do campo senha") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement

        expect(byEmail).toBeInTheDocument()
        fireEvent.change(byName,{target:{value:name}})
        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:password}})
        fireEvent.change(repeatPassword,{target:{value:password }})
        await act(async()=>{
            fireEvent.click(btnSubmit)
        })
       
        expect(serviceMoked).toHaveBeenCalledTimes(1)
        expect(serviceMoked).toHaveBeenCalledWith({
           name, email,password,typeForm:'register'
        })
        expect( container ).toHaveTextContent('Você criou sua conta com sucesso, você será redirecionado')
       
      
    })
    it("should display the error message when the service returns status 422",async()=>{
        serviceMoked.mockResolvedValue({status:422,message:'Sucess'})
        const {queryByPlaceholderText,getByText,container}= render(
                 
                   <Router>
                   <Routes>
                       <Route
                       path="/"
                       element={<Register/>}
                       />
                   </Routes>
                   </Router>
            )
      
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLInputElement
        const byName = queryByPlaceholderText("Ex: joao") as HTMLInputElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLInputElement
        const repeatPassword = queryByPlaceholderText("Igual a do campo senha") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement

        expect(byEmail).toBeInTheDocument()
        fireEvent.change(byName,{target:{value:name}})
        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:password}})
        fireEvent.change(repeatPassword,{target:{value:password }})
        await act(async()=>{
            fireEvent.click(btnSubmit)
        })
       
        expect(serviceMoked).toHaveBeenCalledTimes(1)
        expect(serviceMoked).toHaveBeenCalledWith({
           name, email,password,typeForm:'register'
        })
        expect( container ).toHaveTextContent('Nome, email ou senha inválidos.')
       
    })
     it("should display the success message when the service returns status 409",async()=>{
        serviceMoked.mockResolvedValue({status:409,message:'Sucess'})
        const {queryByPlaceholderText,getByText,container}= render(
                 
                   <Router>
                   <Routes>
                       <Route
                       path="/"
                       element={<Register/>}
                       />
                   </Routes>
                   </Router>
            )
      
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLInputElement
        const byName = queryByPlaceholderText("Ex: joao") as HTMLInputElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLInputElement
        const repeatPassword = queryByPlaceholderText("Igual a do campo senha") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement

        expect(byEmail).toBeInTheDocument()
        fireEvent.change(byName,{target:{value:name}})
        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:password}})
        fireEvent.change(repeatPassword,{target:{value:password }})
        await act(async()=>{
            fireEvent.click(btnSubmit)
        })
       
        expect(serviceMoked).toHaveBeenCalledTimes(1)
        expect(serviceMoked).toHaveBeenCalledWith({
           name, email,password,typeForm:'register'
        })

        expect( container ).toHaveTextContent('Confira seus dados e tente novamente. Caso já tenha uma conta, faça login.')
    })
    it("should display the success message when the service returns status 500",async()=>{
        serviceMoked.mockResolvedValue({status:500,message:'Sucess'})
        const {queryByPlaceholderText,getByText,container}= render(
                 
                   <Router>
                   <Routes>
                       <Route
                       path="/"
                       element={<Register/>}
                       />
                   </Routes>
                   </Router>
            )
      
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLInputElement
        const byName = queryByPlaceholderText("Ex: joao") as HTMLInputElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLInputElement
        const repeatPassword = queryByPlaceholderText("Igual a do campo senha") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement

        expect(byEmail).toBeInTheDocument()
        fireEvent.change(byName,{target:{value:name}})
        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:password}})
        fireEvent.change(repeatPassword,{target:{value:password }})
        await act(async()=>{
            fireEvent.click(btnSubmit)
        })
       
        expect(serviceMoked).toHaveBeenCalledTimes(1)
        expect(serviceMoked).toHaveBeenCalledWith({
           name, email,password,typeForm:'register'
        })

        expect( container ).toHaveTextContent('Ocorreu um erro inesperado.')
    })
})


describe("when the input are invalids",()=>{
    const email = "lucas@gmail.com"
    const password = "123456"
    const name = "josef"
    const invalidName = ""
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    beforeAll(()=>{
        window.HTMLElement.prototype.scrollIntoView = jest.fn()
    })
    it("should not call the service and show an error message when the name is empty",async()=>{
        serviceMoked.mockResolvedValue({status:201,message:'Sucess'})
        const {queryByPlaceholderText,getByText,container}= render(
                 
                   <Router>
                   <Routes>
                       <Route
                       path="/"
                       element={<Register/>}
                       />
                   </Routes>
                   </Router>
            )
      
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLInputElement
        const byName = queryByPlaceholderText("Ex: joao") as HTMLInputElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLInputElement
        const repeatPassword = queryByPlaceholderText("Igual a do campo senha") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement

        expect(byEmail).toBeInTheDocument()
        fireEvent.change(byName,{target:{value:invalidName}})
        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:password}})
        fireEvent.change(repeatPassword,{target:{value:password }})
        await act(async()=>{
            fireEvent.click(btnSubmit)
        })
       
        expect(serviceMoked).toHaveBeenCalledTimes(0)
       
        expect( container ).toHaveTextContent('Digite um nome válido')
       
      
    })
    it("should not call the service and show an error message when the name is shorter than 4",async()=>{
        serviceMoked.mockResolvedValue({status:201,message:'Sucess'})
        const {queryByPlaceholderText,getByText,container}= render(
                 
                   <Router>
                   <Routes>
                       <Route
                       path="/"
                       element={<Register/>}
                       />
                   </Routes>
                   </Router>
            )
      
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLInputElement
        const byName = queryByPlaceholderText("Ex: joao") as HTMLInputElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLInputElement
        const repeatPassword = queryByPlaceholderText("Igual a do campo senha") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement

        expect(byEmail).toBeInTheDocument()
        fireEvent.change(byName,{target:{value:'e3ae'}})
        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:password}})
        fireEvent.change(repeatPassword,{target:{value:password }})
        await act(async()=>{
            fireEvent.click(btnSubmit)
        })
       
        expect(serviceMoked).toHaveBeenCalledTimes(0)
       
        expect( container ).toHaveTextContent('Digite um nome válido')
       
      
    })
    it("should not call the service and show an error message when the password is invalid",async()=>{
        serviceMoked.mockResolvedValue({status:201,message:'Sucess'})
        const {queryByPlaceholderText,getByText,container}= render(
                 
                   <Router>
                   <Routes>
                       <Route
                       path="/"
                       element={<Register/>}
                       />
                   </Routes>
                   </Router>
            )
      
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLInputElement
        const byName = queryByPlaceholderText("Ex: joao") as HTMLInputElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLInputElement
        const repeatPassword = queryByPlaceholderText("Igual a do campo senha") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement

        expect(byEmail).toBeInTheDocument()
        fireEvent.change(byName,{target:{value:'e3ase'}})
        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:''}})
        fireEvent.change(repeatPassword,{target:{value:password }})
        await act(async()=>{
            fireEvent.click(btnSubmit)
        })
       
        expect(serviceMoked).toHaveBeenCalledTimes(0)
       
        expect( container ).toHaveTextContent('Digite uma senha válida')
       
      
    })
    it("should not call the service and show an error message when the password and repeat password do not match",async()=>{
        serviceMoked.mockResolvedValue({status:201,message:'Sucess'})
        const {queryByPlaceholderText,getByText,container}= render(
                 
                   <Router>
                   <Routes>
                       <Route
                       path="/"
                       element={<Register/>}
                       />
                   </Routes>
                   </Router>
            )
      
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLInputElement
        const byName = queryByPlaceholderText("Ex: joao") as HTMLInputElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLInputElement
        const repeatPassword = queryByPlaceholderText("Igual a do campo senha") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement

        expect(byEmail).toBeInTheDocument()
        fireEvent.change(byName,{target:{value:'e3ase'}})
        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:'1234567'}})
        fireEvent.change(repeatPassword,{target:{value:'123456' }})
        await act(async()=>{
            fireEvent.click(btnSubmit)
        })
       
        expect(serviceMoked).toHaveBeenCalledTimes(0)
       
        expect( container ).toHaveTextContent('As senhas não coincidem')
       
      
    })
})