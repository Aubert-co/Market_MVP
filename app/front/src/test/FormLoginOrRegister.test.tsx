import '@testing-library/jest-dom';
import {  fireEvent, render } from "@testing-library/react";
import { FormLoginOrRegister } from "../components/forms/formLoginOrRegister";
import React from "react";
import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import { MessageProvider } from '../context/messageContext';

describe("FormLoginOrRegister ",()=>{
    const mockSubmitEvent = jest.fn();
    const name = "lucas"
    const email = "lucas@gmail.com"
    const password = "1234567"
    const mockFormRef: React.RefObject<HTMLInputElement | null> = {
          current: {
            value: '',
            focus: jest.fn(),
          } as unknown as HTMLInputElement,
        };
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should display the correct inputs for the 'Register' form type",()=>{
        const {queryByPlaceholderText,getByText}= render(
           <MessageProvider>
            <Router>
            <Routes>
                <Route
                path="/"
                element={
                    <FormLoginOrRegister
                    formRef={mockFormRef}
                    type="Register"
                    submitEvent={mockSubmitEvent}
                    />
                }
                />
            </Routes>
            </Router>
        </MessageProvider>
        )
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com")
        const byPassword = queryByPlaceholderText("Digite uma senha forte!")
        const byName = queryByPlaceholderText("Ex: joao")
        const byRepPassword = queryByPlaceholderText("Igual a do campo senha")

        expect(byEmail).toBeInTheDocument()
        expect(byPassword).toBeInTheDocument()
        expect(byName).toBeInTheDocument()
        expect(byRepPassword).toBeInTheDocument()
        expect(getByText("Cadastro")).toBeInTheDocument()
    })
     it("should call the submit function when the 'Register' form is fully completed",()=>{
        const {queryByPlaceholderText,getByText}= render(
           <MessageProvider>
            <Router>
            <Routes>
                <Route
                path="/"
                element={
                    <FormLoginOrRegister
                    formRef={mockFormRef}
                    type="Register"
                    submitEvent={mockSubmitEvent}
                    />
                }
                />
            </Routes>
            </Router>
        </MessageProvider>
        )
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLElement
        const byName = queryByPlaceholderText("Ex: joao") as HTMLElement
        const byRepPassword = queryByPlaceholderText("Igual a do campo senha") as HTMLElement
        const btnSubmit = getByText("Enviar")
        const linkToPageLogin = getByText("Já tem uma conta faça login!")

        expect(linkToPageLogin).toBeInTheDocument()
        
        expect(getByText("Cadastro")).toBeInTheDocument()
        
        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:password}})
        fireEvent.change(byRepPassword,{target:{value:password}})
        fireEvent.change(byName,{target:{value:name}})

        fireEvent.click(btnSubmit)
        
        expect(mockSubmitEvent).toHaveBeenCalledTimes(1)
        expect(mockSubmitEvent).toHaveBeenCalledWith({name,password,email, setMessageParams: expect.any(Function)})
    })
    it("should call the submit function when all inputs are filled and the form type is 'Login'",()=>{
        const {queryByPlaceholderText,getByText}= render(
           <MessageProvider>
            <Router>
            <Routes>
                <Route
                path="/"
                element={
                    <FormLoginOrRegister
                    formRef={mockFormRef}
                    type="Login"
                    submitEvent={mockSubmitEvent}
                    />
                }
                />
            </Routes>
            </Router>
        </MessageProvider>
        )
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLElement
        const byName = queryByPlaceholderText("Ex: joao") as HTMLElement
        const byRepPassword = queryByPlaceholderText("Igual a do campo senha") as HTMLElement
        const btnSubmit = getByText("Enviar")
        const linkToPageLogin = getByText("Não tem uma conta crie uma agora!")

        expect(linkToPageLogin).toBeInTheDocument()
        expect(byName).toBeNull()
        expect(byRepPassword).toBeNull()
        expect(getByText("Login")).toBeInTheDocument()
        
        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:password}})


        fireEvent.click(btnSubmit)
        
        expect(mockSubmitEvent).toHaveBeenCalledTimes(1)
        expect(mockSubmitEvent).toHaveBeenCalledWith(
        expect.objectContaining({
            name:"",
            password,
            email,
            setMessageParams: expect.any(Function),
        })
        );
    })
})