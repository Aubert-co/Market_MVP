import { StoreProducts } from "@/pages/store/storeProducts"
import {  render, waitFor } from "@testing-library/react"
import * as services from "@/services/store/storeProducts"
import { FixtureStoreProducts } from "@/test/fixtures/store.fixtures"
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event"
import * as storageStore from "@/storage/store.storage"
import { useLocation } from "react-router-dom";


function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.search}</div>;
}
const mockService = jest.spyOn(services,'getStoreProducts')
const mockGetStoreInfo = jest.spyOn(storageStore,'getStorageStore')

describe("store product",()=>{
    it("should close the sidebar when the drawer opens, and close the drawer when the sidebar opens",async ()=>{
        mockGetStoreInfo.mockReturnValue({
            name:'Lojinha',photo:'lorem',description:'testing',id:43
        })
        mockService.mockResolvedValue({
            datas:FixtureStoreProducts,
            status:201,totalPages:5,currentPage:1,message:"ok"
        })
        const { getByRole } =  render(
        <MemoryRouter initialEntries={["/store/products"]}>
            <Routes>
            <Route path="/store/products" element={<StoreProducts />} />
            </Routes>
        </MemoryRouter>
        );

        const createProductButton = getByRole("button", {
            name: /criar produto/i,
        });
     
        const user = userEvent.setup();
        const openSidebar = getByRole("button", { name: /open menu/i })

        expect( openSidebar).toBeVisible()

        await user.click(createProductButton);

        const dialog = getByRole("dialog", {name: /criar produto/i,})
       
        expect( dialog ).toBeVisible();

        await user.click( openSidebar );

        const closeSidebar = getByRole("button", { name: /close menu/i })

        expect( closeSidebar ).toBeVisible()

        expect(dialog ).not.toBeVisible()
    })
})

describe("store/product open product modal",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should open the product modal, click on edit, and show the edit drawer",async()=>{
        mockGetStoreInfo.mockReturnValue({
            name:'Lojinha',photo:'lorem',description:'testing',id:43
        })
        mockService.mockResolvedValue({
            datas:FixtureStoreProducts,
            status:201,totalPages:5,currentPage:1,message:"ok"
        })
        const [product] = FixtureStoreProducts
        const { getByRole,queryByText } =  render(
            <MemoryRouter initialEntries={["/store/products"]}>
                <Routes>
                <Route path="/store/products" element={<StoreProducts />} />
                </Routes>
            </MemoryRouter>
        );
      
        await waitFor(()=>{
            expect(queryByText(product.name)).toBeInTheDocument()
        })
        const user = userEvent.setup();
        await user.click(
            getByRole("button", {
                name: new RegExp(`abrir modal do produto ${product.name}`, "i"),
            })
        );
        expect( queryByText("Detalhes do produto")).toBeInTheDocument()
        expect(getByRole("button", {
                name: new RegExp(`desativar produto ${product.name}`,"i")
            })
        ).toBeInTheDocument()

        await user.click(
            getByRole("button", {
                name: new RegExp(`editar produto ${product.name}`,"i")
            })
        );
        expect( queryByText("Editar produto") ).toBeInTheDocument()
    })
})


describe("store/product filters",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should initialize inputs, selects, and pagination state based on URL parameters",async()=>{
        mockGetStoreInfo.mockReturnValue({
            name:'Lojinha',photo:'lorem',description:'testing',id:43
        })
        mockService.mockResolvedValue({
            datas:FixtureStoreProducts,
            status:201,totalPages:5,currentPage:2,message:"ok"
        })
        const initialValuesUrl = {
            page:2,category:"Roupas",orderby:"price_desc",searchValue:"testimg"
        }
         const { getByRole  } =  render(
            <MemoryRouter initialEntries={[
                    `/store/products?categoria=${initialValuesUrl.category}&orderby=${initialValuesUrl.orderby}&q=${initialValuesUrl.searchValue}&page=${initialValuesUrl.page}`,
                    ]}>
                <Routes>
                    <Route path="/store/products" element={<StoreProducts />} />
                </Routes>
            </MemoryRouter>
        );
        const selectCategory = getByRole("combobox", { name: /selecione uma categoria/i })
        const selectOrderby = getByRole("combobox",{name:/selecione um filtro/i}) 
    
        await waitFor(()=>{
            expect( mockService ).toHaveBeenCalledTimes(1)
            expect(mockService).toHaveBeenCalledWith({
                nextPage:initialValuesUrl.page,
                name:initialValuesUrl.searchValue,
                category:initialValuesUrl.category,
                orderby:initialValuesUrl.orderby
            })
            expect(selectCategory).toHaveValue(initialValuesUrl.category);
            expect(selectOrderby).toHaveValue(initialValuesUrl.orderby)
            expect(getByRole("button", { current: "page" })).toHaveTextContent(initialValuesUrl.page.toString());
        })
    })
    it("should update the URL params when selecting a product order option",async()=>{

        mockGetStoreInfo.mockReturnValue({
            name:'Lojinha',photo:'lorem',description:'testing',id:43
        })
        mockService.mockResolvedValue({
            datas:FixtureStoreProducts,
            status:201,totalPages:5,currentPage:1,message:"ok"
        })
       
        const {  getByRole ,getByTestId} =  render(
            <MemoryRouter initialEntries={["/store/products"]}>
                <Routes>
                    <Route path="/store/products" element={<StoreProducts />} />
               
                </Routes>
                     <LocationDisplay/>
            </MemoryRouter>
        );
      
        const selectOrderby = getByRole("combobox",{name:/selecione um filtro/i}) 
        

        const user = userEvent.setup();
        
        await user.selectOptions(selectOrderby, "Maior preço");

        expect(selectOrderby).toHaveValue("price_desc");
        
        expect(getByTestId("location")).toHaveTextContent("?orderby=price_desc")
       
        
    })
     it("should update the URL params when selecting a product category",async()=>{

        mockGetStoreInfo.mockReturnValue({
            name:'Lojinha',photo:'lorem',description:'testing',id:43
        })
        mockService.mockResolvedValue({
            datas:FixtureStoreProducts,
            status:201,totalPages:5,currentPage:1,message:"ok"
        })
       
        const {  getByRole ,getByTestId} =  render(
            <MemoryRouter initialEntries={["/store/products"]}>
                <Routes>
                    <Route path="/store/products" element={<StoreProducts />} />
               
                </Routes>
                     <LocationDisplay/>
            </MemoryRouter>
        );
        
        const selectCategory = getByRole("combobox", { name: /selecione uma categoria/i })
    
        const user = userEvent.setup();
        
        await user.selectOptions(selectCategory, "Roupas");

        expect(selectCategory).toHaveValue("Roupas");
        
        expect(getByTestId("location")).toHaveTextContent("?categoria=Roupas")
       
        
    })
    it("should update the URL params when selecting a product category",async()=>{

        mockGetStoreInfo.mockReturnValue({
            name:'Lojinha',photo:'lorem',description:'testing',id:43
        })
        mockService.mockResolvedValue({
            datas:FixtureStoreProducts,
            status:201,totalPages:5,currentPage:1,message:"ok"
        })
       
        const {  getByRole ,getByTestId} =  render(
            <MemoryRouter initialEntries={["/store/products"]}>
                <Routes>
                    <Route path="/store/products" element={<StoreProducts />} />
               
                </Routes>
                     <LocationDisplay/>
            </MemoryRouter>
        );
        
        const selectCategory = getByRole("combobox", { name: /selecione uma categoria/i })
    
        const user = userEvent.setup();
        
        await user.selectOptions(selectCategory, "Roupas");

        expect(selectCategory).toHaveValue("Roupas");
        
        expect(getByTestId("location")).toHaveTextContent("?categoria=Roupas")
       
    })
    it("should update the URL with params when the search input changes and the search button is clicked",async()=>{

        mockGetStoreInfo.mockReturnValue({
            name:'Lojinha',photo:'lorem',description:'testing',id:43
        })
        mockService.mockResolvedValue({
            datas:FixtureStoreProducts,
            status:201,totalPages:5,currentPage:1,message:"ok"
        })
       
        const {  getByPlaceholderText ,getByText ,getByTestId} =  render(
            <MemoryRouter initialEntries={["/store/products"]}>
                <Routes>
                    <Route path="/store/products" element={<StoreProducts />} />
               
                </Routes>
                     <LocationDisplay/>
            </MemoryRouter>
        );
        const searchValue = "Tenis"
        const inputSearch = getByPlaceholderText("FAÇA UMA BUSCA")
        const btnSendSearch = getByText("BUSCAR")
        const user = userEvent.setup()
        
        await user.type(inputSearch,searchValue)
        
        await user.click( btnSendSearch )

        expect(getByTestId("location")).toHaveTextContent(`?q=${searchValue}`)

        expect(mockService).toHaveBeenCalledWith({
            category: "Todas",
            name: "Tenis",
            nextPage: 1,
            orderby: "price_asc"
        })
    })
     it("should update the URL correctly with the page params",async()=>{

        mockGetStoreInfo.mockReturnValue({
            name:'Lojinha',photo:'lorem',description:'testing',id:43
        })
        mockService.mockResolvedValueOnce({
            datas:FixtureStoreProducts,
            status:201,totalPages:5,currentPage:1,message:"ok"
        })
         .mockResolvedValueOnce({
            datas: FixtureStoreProducts,
            status: 201,
            totalPages: 5,
            currentPage: 2,
            message: "ok"
        })
        const {   getByTestId,getByLabelText } =  render(
            <MemoryRouter initialEntries={["/store/products"]}>
                <Routes>
                    <Route path="/store/products" element={<StoreProducts />} />
               
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
            nextPage:2,category:"Todas",name:"",orderby:"price_asc"
        })
    })
    it("should change the url correctly with all params when inputs change",async()=>{

        mockGetStoreInfo.mockReturnValue({
            name:'Lojinha',photo:'lorem',description:'testing',id:43
        })
        mockService.mockResolvedValueOnce({
            datas:FixtureStoreProducts,
            status:201,totalPages:5,currentPage:1,message:"ok"
        })
        .mockResolvedValue({
            datas:FixtureStoreProducts,
            status:201,totalPages:5,currentPage:3,message:"ok"
        })
        const {  getByPlaceholderText ,getByText ,getByTestId,getByRole,getByLabelText} =  render(
            <MemoryRouter initialEntries={["/store/products"]}>
                <Routes>
                    <Route path="/store/products" element={<StoreProducts />} />
               
                </Routes>
                     <LocationDisplay/>
            </MemoryRouter>
        );
        const user = userEvent.setup();
        const searchValue = "Tenis"
        const category = "Roupas"
        const orderBy = "price_desc"
        const nextPage = 3;
        const inputSearch = getByPlaceholderText("FAÇA UMA BUSCA")
        const btnSendSearch = getByText("BUSCAR")
      
        const selectCategory = getByRole("combobox", { name: /selecione uma categoria/i })
        const selectOrderby = getByRole("combobox",{name:/selecione um filtro/i}) 
        
        await waitFor(async()=>{
            const changePage = getByLabelText(`Ir para página ${nextPage}`)
            await user.click(changePage)
        })
        
        await user.selectOptions(selectOrderby, "Maior preço");

        expect(selectOrderby).toHaveValue(orderBy);
        
        await user.selectOptions(selectCategory, category);

        expect(selectCategory).toHaveValue( category );
        
        await user.type(inputSearch,searchValue)
        
        await user.click( btnSendSearch )

        expect(getByTestId("location")).toHaveTextContent(`?page=${nextPage}&orderby=${orderBy}&categoria=${category}&q=${searchValue}`)

       
        expect( mockService ).toHaveBeenLastCalledWith({
            category,name:searchValue,orderby:orderBy,
            nextPage
        })
    })
})