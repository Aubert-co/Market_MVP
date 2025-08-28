import '@testing-library/jest-dom';
import {   render ,fireEvent} from "@testing-library/react";
import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import {Login} from '@/pages/login'
import * as service from  '@/services/loginOrRegister'
import { act } from 'react';

const serviceMoked = jest.spyOn(service,'serviceLoginOrRegister')

describe("should handle service response",()=>{
    const email = "lucas@gmail.com"
    const password = "123456"
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should display the success message when the service returns status 201",async()=>{
        serviceMoked.mockResolvedValue({status:201,message:'Sucess'})
        const {queryByPlaceholderText,getByText,container}= render(
                 
                   <Router>
                   <Routes>
                       <Route
                       path="/"
                       element={<Login/>}
                       />
                   </Routes>
                   </Router>
            )
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLInputElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement

        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:password}})
        
        await act(async()=>{
            fireEvent.click(btnSubmit)
        })
        expect(serviceMoked).toHaveBeenCalledTimes(1)
        expect(serviceMoked).toHaveBeenCalledWith({
            email,password,typeForm:'login'
        })

        expect( container).toHaveTextContent('Você fez login com sucesso, você será redirecionado')
      
    })
    it("should display the error message when the service returns status 401",async()=>{
        serviceMoked.mockResolvedValue({status:401,message:'error'})
        const {queryByPlaceholderText,getByText,container}= render(
                 
                   <Router>
                   <Routes>
                       <Route
                       path="/"
                       element={<Login/>}
                       />
                   </Routes>
                   </Router>
            )
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLInputElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement

        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:password}})
        
        await act(async()=>{
            fireEvent.click(btnSubmit)
        })
        expect(serviceMoked).toHaveBeenCalledTimes(1)
        expect(serviceMoked).toHaveBeenCalledWith({
            email,password,typeForm:'login'
        })

        expect( container).toHaveTextContent('Usuário ou senha inválidos')
    })
     it("should display the success message when the service returns status 500",async()=>{
        serviceMoked.mockResolvedValue({status:500,message:'error'})
        const {queryByPlaceholderText,getByText,container}= render(
                 
                   <Router>
                   <Routes>
                       <Route
                       path="/"
                       element={<Login/>}
                       />
                   </Routes>
                   </Router>
            )
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLInputElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement

        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:password}})
        
        await act(async()=>{
            fireEvent.click(btnSubmit)
        })
        expect(serviceMoked).toHaveBeenCalledTimes(1)
        expect(serviceMoked).toHaveBeenCalledWith({
            email,password,typeForm:'login'
        })

        expect( container).toHaveTextContent('Erro interno, tente novamente')
    })
})


describe("when the input are invalids",()=>{
    const email = "lucas@gmail.com"
    const password = "123456"
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should display the error message when the email is invalid",async()=>{
        let invalidEmail = ""
        serviceMoked.mockResolvedValue({status:201,message:'Sucess'})
        const {queryByPlaceholderText,getByText,getByTestId}= render(
                 
                   <Router>
                   <Routes>
                       <Route
                       path="/"
                       element={<Login/>}
                       />
                   </Routes>
                   </Router>
            )
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLInputElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement

        fireEvent.change(byEmail,{target:{value:invalidEmail}})
        fireEvent.change(byPassword,{target:{value:password}})
        
        await act(async()=>{
            fireEvent.click(btnSubmit)
        })
        expect(serviceMoked).toHaveBeenCalledTimes(0)
       

        expect( getByTestId("message_content")).toHaveTextContent('Digite um e-mail válido')
    })
    it("should display the error message when the password is invalid",async()=>{
   
        let invalidPassword = 1
        serviceMoked.mockResolvedValue({status:201,message:'Sucess'})
        const {queryByPlaceholderText,getByText,container}= render(
                 
                   <Router>
                   <Routes>
                       <Route
                       path="/"
                       element={<Login/>}
                       />
                   </Routes>
                   </Router>
            )
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLInputElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement

        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:invalidPassword}})
        
        await act(async()=>{
            fireEvent.click(btnSubmit)
        })
        expect(serviceMoked).toHaveBeenCalledTimes(0)
       

        expect( container).toHaveTextContent('Digite uma senha válida')
    })
     it("should display the error message when the email and password is empty",async()=>{
        let invalidEmail = ""
        let invalidPassword = ""
        serviceMoked.mockResolvedValue({status:201,message:'Sucess'})
        const {queryByPlaceholderText,getByText,container}= render(
                 
                   <Router>
                   <Routes>
                       <Route
                       path="/"
                       element={<Login/>}
                       />
                   </Routes>
                   </Router>
            )
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLInputElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLInputElement
        const btnSubmit = getByText("Enviar") as HTMLButtonElement

        fireEvent.change(byEmail,{target:{value:invalidEmail}})
        fireEvent.change(byPassword,{target:{value:invalidPassword}})
        
        await act(async()=>{
            fireEvent.click(btnSubmit)
        })
        expect(serviceMoked).toHaveBeenCalledTimes(0)
       

        expect( container ).toHaveTextContent('Digite um e-mail válido')
    })
})