import { AdminOrderService } from "@/modules/storeAdmin/orders/orders.services";


const mockRepository = {
    search:jest.fn()
}

describe("AdminOrderService method getLastOrders",()=>{
    it("should call the search method correclyt",()=>{
        mockRepository.search.mockResolvedValue({datas:[]})
        const storeId = 35
        const admin = new AdminOrderService(mockRepository)
        admin.getLastOrders(storeId)

        expect(mockRepository.search).toHaveBeenCalledWith({
            storeId,orderBy:"desc"
        })
    })
    
})