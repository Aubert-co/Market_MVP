import { RenderDataState } from "@/components/renderDataState"
import {  render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

type DatasMock = {
 name:string
}
 const MockComponent = ()=><h1 data-testid="mocked">OLa</h1>

describe("RenderDataState component",()=>{
   
    it("should render the error message when the status is 500",()=>{
        const status = 500
        const datas = [{name:'jose'}] as DatasMock[]
        const {queryByTestId} = render(
            <BrowserRouter>
                <RenderDataState<DatasMock>
            status={status}
            datas={datas}
            errorMessage="Deu errado"
            emptyMessage="Dados vazios"
            skeletonLoading={{classLoading:'',length:1,classImg:''}}
            >
                <MockComponent/>
            </RenderDataState>
            </BrowserRouter>
        )
        const emptyMessage = queryByTestId("render-empty")
        const mockComponent = queryByTestId("mocked")
        const hasError = queryByTestId("render-error")
        const isLogged = queryByTestId("render-logged")

        expect( emptyMessage ).not.toBeInTheDocument()
        expect( mockComponent).not.toBeInTheDocument()
        expect( hasError).toBeInTheDocument()
        expect(isLogged).not.toBeInTheDocument()
    })

   it("should render the login message when the status is 401",()=>{
        const status = 401
        const datas = [{name:"maria"}] as DatasMock[]
        const {queryByTestId} = render(
            <BrowserRouter>
                <RenderDataState<DatasMock>
            status={status}
            datas={datas}
            errorMessage="Deu errado"
            emptyMessage="Dados vazios"
              skeletonLoading={{classLoading:'',length:1,classImg:''}}
            >
                <MockComponent/>
            </RenderDataState>
            </BrowserRouter>
        )
        const emptyMessage = queryByTestId("render-empty")
        const mockComponent = queryByTestId("mocked")
        const hasError = queryByTestId("render-error")
        const isLogged = queryByTestId("render-logged")

        expect( emptyMessage ).not.toBeInTheDocument()
        expect( mockComponent).not.toBeInTheDocument()
        expect( hasError).not.toBeInTheDocument()
        expect(isLogged).toBeInTheDocument()
    })
    it("should render the skeleton when the status is 0",()=>{
        const status = 0
        const datas = [{name:'jose'}] as DatasMock[]
        const {queryByTestId} = render(
            <BrowserRouter>
                <RenderDataState<DatasMock>
            status={status}
            datas={datas}
            errorMessage="Deu errado"
            emptyMessage="Dados vazios"
              skeletonLoading={{classLoading:'',length:1,classImg:''}}
            >
                <MockComponent/>
            </RenderDataState>
            </BrowserRouter>
        )
        const emptyMessage = queryByTestId("render-empty")
        const mockComponent = queryByTestId("mocked")
        const hasError = queryByTestId("render-error")
        const isLogged = queryByTestId("render-logged")
        const skeleton = queryByTestId("skeleton")
       
        expect(skeleton).toBeInTheDocument()
        expect( emptyMessage ).not.toBeInTheDocument()
        expect( mockComponent).not.toBeInTheDocument()
        expect( hasError).not.toBeInTheDocument()
        expect(isLogged).not.toBeInTheDocument()
    })
     it("should render the MockComponent when the status is 200 and the datas is valid",()=>{
        const status = 200
        const datas = [{name:'lucas'}] as DatasMock[]
        const {queryByTestId,queryByText} = render(
            <BrowserRouter>
                <RenderDataState<DatasMock>
            status={status}
            datas={datas}
            errorMessage="Deu errado"
            emptyMessage="Dados vazios"
              skeletonLoading={{classLoading:'',length:1,classImg:''}}
            >
                <MockComponent/>
            </RenderDataState>
            </BrowserRouter>
        )
        const emptyMessage = queryByTestId("render-empty")
        const mockComponent = queryByTestId("mocked")
        const hasError = queryByTestId("render-error")
        const isLogged = queryByTestId("render-logged")

        expect(queryByText("Carregando...")).not.toBeInTheDocument()
        expect( emptyMessage ).not.toBeInTheDocument()
        expect( mockComponent).toBeInTheDocument()
        expect( hasError).not.toBeInTheDocument()
        expect(isLogged).not.toBeInTheDocument()
    })
    it("should render the empty message when the status are 200 and the datas is empty",()=>{
        const status = 200
        const datas = [] as DatasMock[]
        const {queryByTestId,queryByText} = render(
            <BrowserRouter>
                <RenderDataState<DatasMock>
            status={status}
            datas={datas}
            errorMessage="Deu errado"
            emptyMessage="Dados vazios"
              skeletonLoading={{classLoading:'',length:1,classImg:''}}
            >
                <MockComponent/>
            </RenderDataState>
            </BrowserRouter>
        )
        const emptyMessage = queryByTestId("render-empty")
        const mockComponent = queryByTestId("mocked")
        const hasError = queryByTestId("render-error")
        const isLogged = queryByTestId("render-logged")

        expect(queryByText("Carregando...")).not.toBeInTheDocument()
        expect( emptyMessage ).toBeInTheDocument()
        expect( mockComponent).not.toBeInTheDocument()
        expect( hasError).not.toBeInTheDocument()
        expect(isLogged).not.toBeInTheDocument()
    })
})