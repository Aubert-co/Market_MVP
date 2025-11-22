import {  fireEvent, render } from "@testing-library/react";
import SideBar from '../../components/shared/sidebar'
import  {BrowserRouter} from "react-router-dom"
import {selectMenuItem,sideBarMenuItems} from "../../constants/menuItems"
const mockedUsedNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}))

describe("component SideBar",()=>{
    let setState = jest.fn()
   
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should not show the sidebar when isOpen is false",()=>{
        const {container,queryByTestId,getByTestId}=render(
            <BrowserRouter>
                 <SideBar isOpen={false} setOpen={setState} storeName="testing" items={ selectMenuItem("Cupons")}/>
            </BrowserRouter>
        )
 
  
        expect(container.querySelector("aside")).toHaveStyle("transform:translateX(-100%)")
        expect( queryByTestId("close-toggle")).not.toBeInTheDocument()
        expect( queryByTestId("open-toggle") ).toBeInTheDocument()
    
        fireEvent.click(getByTestId('open-toggle'))

      
        expect(setState).toHaveBeenCalledTimes(1)
        expect(setState).toHaveBeenCalledWith(true)
    })
    it("should show the sidebar when isOpen is true and render all menu items correctly",()=>{
       const activeMenu = "Cupons"
        const {container,queryByTestId,getByTestId,queryAllByTestId}=render(
            <BrowserRouter>
                 <SideBar isOpen={true} setOpen={setState} storeName="testing" items={ selectMenuItem( activeMenu )}/>
            </BrowserRouter>
        )
        const siderBarItems = queryAllByTestId("sidebar-link")

        siderBarItems.map((val,index)=>{
            const sidebarValues = sideBarMenuItems[index]
            expect( val ).toHaveAttribute('href',sidebarValues.linkTo)
            const li = val.querySelector("li")
            const label = li?.querySelector(".item-label")
            expect( label).toHaveTextContent( sidebarValues.label)
            
            if(sidebarValues.label === activeMenu){
                expect( li ).toHaveClass("menu-item active")
            }else{
                expect( li ).toHaveClass("menu-item")
            }
    
        })
        expect(container.querySelector("aside")).toHaveStyle("transform:translateX(0)")
        expect( queryByTestId("close-toggle")).toBeInTheDocument()
        expect( queryByTestId("open-toggle") ).not.toBeInTheDocument()
        
        fireEvent.click(getByTestId('close-toggle'))

      
        expect(setState).toHaveBeenCalledTimes(1)
        expect(setState).toHaveBeenCalledWith(false)
    })
})