import { ErrorMessage } from "@/helpers/ErrorMessage";
import { AdminOrderService } from "@/modules/storeAdmin/orders/orders.services";


const mockRepository = {
    search:jest.fn(),
    getLastOrders:jest.fn()
}

describe("AdminOrderService method getLastOrders",()=>{
    it("should call the getLastOrders method correctly",async()=>{
        mockRepository.getLastOrders.mockResolvedValue({datas:['test']})
        const storeId = 35
        const admin = new AdminOrderService(mockRepository)
        const getLastOrders =  await admin.getLastOrders(storeId)

        expect(getLastOrders).toEqual(['test'])
        expect(mockRepository.getLastOrders).toHaveBeenCalledWith({
            storeId,orderBy:"desc"
        })
    })
     it("should handle errors correctly when the getLastOrders method throws",async()=>{
       try{
            mockRepository.getLastOrders.mockRejectedValue(new Error("fail"))
            const storeId = 35
            const admin = new AdminOrderService(mockRepository)
            const getLastOrders =  await admin.getLastOrders(storeId)

            expect(getLastOrders).toEqual(['test'])
            expect(mockRepository.getLastOrders).toHaveBeenCalledWith({
                storeId,orderBy:"desc"
            })
       }catch(err:unknown){
            expect(err).toBeInstanceOf(ErrorMessage)
            if(err instanceof ErrorMessage){
                expect(err.status).toEqual(500)
                expect(err.message).toEqual('Failed to get store last orders.')
                expect(err.service).toEqual('OrdersServices')
                expect(err.action).toEqual('getLastOrders')
                expect(err.prismaError).toBeUndefined()
            }
       }
    })
})