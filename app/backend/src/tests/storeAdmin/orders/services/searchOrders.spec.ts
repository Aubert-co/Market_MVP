import { ErrorMessage } from "@/helpers/ErrorMessage";
import { AdminOrderService } from "@/modules/storeAdmin/orders/orders.services";
import { SearchOrdersDTO } from "@/modules/storeAdmin/orders/orders.types";


const mockRepository = {
    search:jest.fn(),
    getLastOrders:jest.fn()
}

describe("AdminOrderService method getLastOrders",()=>{
    it("should call the search method correctly",async()=>{
        
        mockRepository.search.mockResolvedValue({datas:['hi'],pageInfo:{
            totalItems:50
        }})
        const storeId = 35
        const admin = new AdminOrderService(mockRepository)
        const searchOrders =  await admin.searchOrders({
            storeId,page:1,limit:5,search:'testing'
        })

        expect(searchOrders.datas).toEqual(['hi'])
        expect(searchOrders.pagination).toEqual({
            totalPages:10,skip:0,currentPage:1
        })
        expect(mockRepository.search).toHaveBeenCalledWith({
            storeId,orderBy:"desc",
            pagination:{
                limit:5,
                skip:0,
            },
            search:'testing',
            status:undefined
        } satisfies SearchOrdersDTO)
    })
    it("should handle errors correctly when the search method throws",async()=>{
        try{
            mockRepository.search.mockRejectedValue(new Error('Algo deu errado'))
            const storeId = 35
            const admin = new AdminOrderService(mockRepository)
            await admin.searchOrders({
                storeId,page:2,limit:5
            })

            expect(mockRepository.search).toHaveBeenCalledWith({
                storeId,orderBy:"desc",
                pagination:{
                    limit:5,
                    skip:0,
                    
                },
                search:undefined,
                status:undefined
            } satisfies SearchOrdersDTO)

        }catch(err:unknown){
            expect(err).toBeInstanceOf(ErrorMessage)
            if(err instanceof ErrorMessage){
                expect(err.status).toEqual(500)
                expect(err.message).toEqual('Failed to search orders.')
                expect(err.service).toEqual('OrdersServices')
                expect(err.action).toEqual('searchOrders')
                expect(err.prismaError).toBeUndefined()
            }
        
        }
    })
    
})