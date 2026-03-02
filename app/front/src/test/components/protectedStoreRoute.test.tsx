import { ProtectedStoreRoutes } from "@/components/store/protectedStoreRoute"
import { render, waitFor } from "@testing-library/react"
import * as services from '@/services/store/store.services'
import { MemoryRouter, Routes, Route } from "react-router-dom"
import * as storage from '@/storage/store.storage'
import type { Store } from "@/types/store.types"


const mockService = jest.spyOn(services,'serviceGetStores')
const mockSaveStorage = jest.spyOn(storage,'saveStorageStore')
const MockComponent = ()=><h1>Ola mundo</h1>
const mockStore = {
    name:'lojinha',id:32,description:'lorem itpsu' ,photo:'photo'
} satisfies Store
describe('test',()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should redirect to the store component when status is 200 and the store exists",async()=>{
        mockService.mockResolvedValue({
            datas:mockStore,
            status:200,message:'tudo certo'
        })
        const {getByText} = render(
             <MemoryRouter initialEntries={["/admin"]}>
                <Routes>
                <Route element={<ProtectedStoreRoutes />}>
                    <Route path="/admin" element={<MockComponent />} />
                </Route>
                </Routes>
            </MemoryRouter>
        )

       await  waitFor(()=>{
            expect(getByText("Ola mundo")).toBeInTheDocument()
            expect(mockSaveStorage).toHaveBeenCalledWith( mockStore )
        })
    })

    it("should redirect to the login page when status is not 200",async()=>{
        mockService.mockResolvedValue({
            datas:mockStore,
            status:401,message:'tudo certo'
        })
        const {queryByText} = render(
             <MemoryRouter initialEntries={["/admin"]}>
                <Routes>
                <Route element={<ProtectedStoreRoutes />}>
                    <Route path="/admin" element={<MockComponent />} />
                </Route>
                 <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        )

       await  waitFor(()=>{
            expect(queryByText("Ola mundo")).not.toBeInTheDocument()
            expect(queryByText("Login Page")).toBeInTheDocument()
            expect(mockSaveStorage).not.toHaveBeenCalled()
        })
    })
    it("should redirect to the login page when status is not 200",async()=>{
        mockService.mockResolvedValue({
            datas:mockStore,
            status:500,message:'tudo certo'
        })
        const {queryByText} = render(
             <MemoryRouter initialEntries={["/admin"]}>
                <Routes>
                <Route element={<ProtectedStoreRoutes />}>
                    <Route path="/admin" element={<MockComponent />} />
                </Route>
                 <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        )

       await  waitFor(()=>{
            expect(queryByText("Ola mundo")).not.toBeInTheDocument()
            expect(queryByText("Login Page")).toBeInTheDocument()
            expect(mockSaveStorage).not.toHaveBeenCalled()
        })
    })
     it("should show the loading message when status equals 0",async()=>{
        mockService.mockResolvedValue({
            datas:mockStore,
            status:0,message:'tudo certo'
        })
        const {queryByText} = render(
             <MemoryRouter initialEntries={["/admin"]}>
                <Routes>
                <Route element={<ProtectedStoreRoutes />}>
                    <Route path="/admin" element={<MockComponent />} />
                </Route>
                 <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        )

       await  waitFor(()=>{
            expect(queryByText("Carregando...")).toBeInTheDocument()
            expect(mockSaveStorage).not.toHaveBeenCalled()
        })
    })
     it("should not redirect to the store dashboard when the status is OK and the store id is 0",async()=>{
        mockService.mockResolvedValue({
            datas:{name:'',id:0,description:'',photo:''},
            status:200,message:'tudo certo'
        })
        const {queryByText} = render(
             <MemoryRouter initialEntries={["/admin"]}>
                <Routes>
                <Route element={<ProtectedStoreRoutes />}>
                    <Route path="/admin" element={<MockComponent />} />
                </Route>
                 <Route path="/login" element={<div>Login Page</div>} />
                 <Route path="/abrir-loja" element={<div>Abrir Loja</div>} />
                </Routes>
            </MemoryRouter>
        )

       await  waitFor(()=>{
            expect(queryByText("Carregando...")).not.toBeInTheDocument()
            expect(queryByText("Abrir Loja")).toBeInTheDocument()
            expect(mockSaveStorage).not.toHaveBeenCalled()
        })
    })
    
})