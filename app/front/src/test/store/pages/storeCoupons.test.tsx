import {   render, waitFor } from "@testing-library/react"
import { couponsFixture } from "@/test/fixtures/store.fixtures"
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event"
import * as storageStore from "@/storage/store.storage"
import { useLocation } from "react-router-dom";
import { StoreCoupons } from "@/pages/store/storeCoupons";
import * as services from "@/services/store/couponAdmin.service"

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.search}</div>;
}
const mockService = jest.spyOn(services,'getStoreCoupons')
const mockGetStoreInfo = jest.spyOn(storageStore,'getStorageStore')

describe("store coupons",()=>{
    it("should close the sidebar when the drawer opens, and close the drawer when the sidebar opens",async ()=>{
        mockGetStoreInfo.mockReturnValue({
            name:'Lojinha',photo:'lorem',description:'testing',id:43
        })
        mockService.mockResolvedValue({
            datas:couponsFixture,
            status:201,totalPages:5,currentPage:1,message:"ok"
        })
        const { getByRole } =  render(
        <MemoryRouter initialEntries={["/loja/cupons"]}>
            <Routes>
            <Route path="/loja/cupons" element={<StoreCoupons />} />
            </Routes>
        </MemoryRouter>
        );

        const createCouponBtn = getByRole("button", {
            name: /criar cupom/i,
        });
     
        const user = userEvent.setup();
        const openSidebar = getByRole("button", { name: /open menu/i })

        expect( openSidebar ).toBeVisible()

        await user.click(createCouponBtn);

        const dialog = getByRole("dialog", {name: /criar cupom/i,})
       
        expect( dialog ).toBeVisible();

        await user.click( openSidebar );

        const closeSidebar = getByRole("button", { name: /close menu/i })

        expect( closeSidebar ).toBeVisible()

        expect( dialog ).not.toBeVisible()
    })
})

describe("coupons filters",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should correctly update the URL with the page param",async()=>{

        mockGetStoreInfo.mockReturnValue({
            name:'Lojinha',photo:'lorem',description:'testing',id:43
        })
        mockService.mockResolvedValueOnce({
            datas:couponsFixture,
            status:201,totalPages:5,currentPage:1,message:"ok"
        })
         .mockResolvedValue({
            datas: couponsFixture,
            status: 201,
            totalPages: 5,
            currentPage: 2,
            message: "ok"
        })
        const {   getByTestId,getByLabelText } =  render(
            <MemoryRouter initialEntries={["/loja/cupons"]}>
                <Routes>
                    <Route path="/loja/cupons" element={<StoreCoupons />} />
                </Routes>
                     <LocationDisplay/>
            </MemoryRouter>
        );
      
        const user = userEvent.setup()
    
        await waitFor(async()=>{
            const changePage = getByLabelText("Ir para página 2")
            await user.click(changePage)
           
         
        },{timeout:3000})
        
        expect(getByTestId("location")).toHaveTextContent("?page=2")

        expect(mockService).toHaveBeenLastCalledWith({
            nextPage:2,couponStatus:"all"
        })
    })
    it("should update the URL when the select filter changes",async()=>{

        mockGetStoreInfo.mockReturnValue({
            name:'Lojinha',photo:'lorem',description:'testing',id:43
        })
        mockService.mockResolvedValue({
            datas:couponsFixture,
            status:201,totalPages:5,currentPage:1,message:"ok"
        })
        
        const {   getByTestId ,getByRole} =  render(
            <MemoryRouter initialEntries={["/loja/cupons"]}>
                <Routes>
                    <Route path="/loja/cupons" element={<StoreCoupons />} />
                </Routes>
                     <LocationDisplay/>
            </MemoryRouter>
        );
      
        const user = userEvent.setup()
    
        const selectStatus = getByRole("combobox", { name: /filtrar por status/i })

        await user.selectOptions(selectStatus,'cupons ativos')

        expect(getByTestId("location")).toHaveTextContent("?status=active")

        expect(mockService).toHaveBeenLastCalledWith({
            couponStatus:"active",nextPage:1,
        })
    })
    it("should update the URL params when all filters change",async()=>{

        mockGetStoreInfo.mockReturnValue({
            name:'Lojinha',photo:'lorem',description:'testing',id:43
        })
        mockService.mockResolvedValueOnce({
            datas:couponsFixture,
            status:201,totalPages:5,currentPage:1,message:"ok"
        })
        .mockResolvedValue({
            datas:couponsFixture,
            status:201,totalPages:5,currentPage:2,message:"ok"
        })
        const {   getByTestId ,getByRole ,getByLabelText} =  render(
            <MemoryRouter initialEntries={["/loja/cupons"]}>
                <Routes>
                    <Route path="/loja/cupons" element={<StoreCoupons />} />
                </Routes>
                     <LocationDisplay/>
            </MemoryRouter>
        );
      
        const user = userEvent.setup()
    
        const selectStatus = getByRole("combobox", { name: /filtrar por status/i })

        await waitFor(async()=>{
            const changePage = getByLabelText("Ir para página 2")
            await user.click(changePage)
           
         
        },{timeout:3000})
        
      
        await user.selectOptions(selectStatus,'cupons ativos')

        expect(getByTestId("location")).toHaveTextContent("?page=2&status=active")

        expect(mockService).toHaveBeenLastCalledWith({
            couponStatus:"active",nextPage:2,
        })
    })
    it("should send the correct values to fetch when URL params are present",async()=>{

        mockGetStoreInfo.mockReturnValue({
            name:'Lojinha',photo:'lorem',description:'testing',id:43
        })
        mockService.mockResolvedValueOnce({
            datas:couponsFixture,
            status:201,totalPages:5,currentPage:2,message:"ok"
        })
       
        const couponStatus = "active"
        const nextPage = 2
        const {getByRole,queryByTestId} = render(
            <MemoryRouter initialEntries={[`/loja/cupons?page=${nextPage}&status=${couponStatus}`]}>
                <Routes>
                    <Route path="/loja/cupons" element={<StoreCoupons />} />
                </Routes>
                     <LocationDisplay/>
            </MemoryRouter>
        );
        const selectStatus = getByRole("combobox", { name: /filtrar por status/i })
        
        expect( selectStatus ).toHaveValue(couponStatus)

        await waitFor(()=>{
            expect(mockService)
            .toHaveBeenCalledWith({
                couponStatus,nextPage
            })
        })
        expect(queryByTestId("location")).toHaveTextContent(`?page=${nextPage}&status=${couponStatus}`)
    })
})