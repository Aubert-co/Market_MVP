import { Coupon } from "@/pages/coupon"
import * as service from "@/services/coupons.services"
import { render, waitFor } from "@testing-library/react"
import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"

const spyService = jest.spyOn(service,'availableCoupons')
describe("Coupon page",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should render 'Ainda não há cupons disponíveis' when no data is provided",async()=>{
        spyService.mockResolvedValue({message:'success',status:200,datas:[]})
        const {getByText} = render(
            <Router>
            <Routes>
                <Route
                path="/"
                element={<Coupon/>}
                />
            </Routes>
            </Router>
        ) 
        await waitFor(()=>{
            expect( getByText("Ainda não há cupons disponiveis")).toBeInTheDocument()
        })
    })
      it("should render 'Algo deu errado ao carregar os cupons' when the status is 500",async()=>{
        spyService.mockResolvedValue({message:'success',status:500,datas:[]})
        const {getByText} = render(
            <Router>
            <Routes>
                <Route
                path="/"
                element={<Coupon/>}
                />
            </Routes>
            </Router>
        ) 
        await waitFor(()=>{
            expect( getByText("Algo deu errado ao carregar os cupons")).toBeInTheDocument()
        })
    })
})