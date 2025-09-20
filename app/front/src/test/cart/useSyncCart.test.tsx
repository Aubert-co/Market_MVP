import { useSyncCart } from "@/hooks/useSyncCart"
import { render } from "@testing-library/react"
import * as services from '@/services/cart.services'
import * as storage from '@/storage/cart.storage'
import { act } from "react"
import { userCartMocks } from "../fixtures"
import { FIVE_MINUTES } from "@/constants"

const  [cart] = userCartMocks
const mockSync = jest.spyOn(services,'syncCart')
const mockGetStorage = jest.spyOn(storage,'getItemsFromCart')
describe("useSynCart",()=>{
    const MockComponent = ()=>{
        useSyncCart()
        return <h1>Ola</h1>
    }
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should not sync the cart when the storage returns empty",async()=>{
        mockGetStorage.mockReturnValue({cart:[],isSaved:false,updatedAt:0})
        
        render(
            <MockComponent/>
        )
        await act(async()=>{
            expect( mockGetStorage ).toHaveBeenCalledTimes(1)
            expect(mockSync).not.toHaveBeenCalledTimes(1)
        
        })
        
    })
     
     it("should not sync the cart when less than five minutes have passed",async()=>{
        const recentTimestamp = Date.now() -(FIVE_MINUTES-1000)

        mockGetStorage.mockReturnValue({cart:[cart],isSaved:false,updatedAt:recentTimestamp})
        
        render(
            <MockComponent/>
        )
        await act(async()=>{
            expect( mockGetStorage ).toHaveBeenCalledTimes(1)
            expect(mockSync).not.toHaveBeenCalled()
            
        
        })
        
    })
     it("should not sync the cart when the time is expired and it is saved",async()=>{
        const expiredTimestamp = Date.now() -(FIVE_MINUTES+1000)

        mockGetStorage.mockReturnValue({cart:[cart],isSaved:true,updatedAt:expiredTimestamp})
        
        render(
            <MockComponent/>
        )
        await act(async()=>{
            expect( mockGetStorage ).toHaveBeenCalledTimes(1)
            expect(mockSync).not.toHaveBeenCalled()
            
        
        })
        
    })
    it("should sync the cart when it is not saved and the time is expired",async()=>{
        const expiredTimestamp = Date.now() -(FIVE_MINUTES+1000)

        mockGetStorage.mockReturnValue({cart:[cart],isSaved:false,updatedAt:expiredTimestamp})
        
        render(
            <MockComponent/>
        )
        await act(async()=>{
            expect( mockGetStorage ).toHaveBeenCalledTimes(1)
            expect(mockSync).toHaveBeenCalledTimes(1)
            expect(mockSync).toHaveBeenCalledWith({cart:[cart]})
            
        
        })
        
    })
})