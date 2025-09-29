import {StoreDashboardService} from '../../services/storeDashboard.services'

const mockStoreRep = {
    getStoreOrders:jest.fn(),
    countOrders:jest.fn(),
    getTotalViews:jest.fn()
}

const  mockPendingOrders = {
  product: {
    name: "Produto A",
    price: 99.9,
    imageUrl: "https://example.com/produto-a.jpg",
  },
  total: 199.8,
  quantity: 2,
  user: {
    name: "João da Silva",
  },
};

const storeDash = new StoreDashboardService( mockStoreRep )
describe("class StoreDashboardService",()=>{
    it("should call the services correctly and return the valid data",async()=>{
        const countOrders = 495
        const getTotalViews = 3999
        mockStoreRep.countOrders.mockResolvedValue(countOrders)
        mockStoreRep.getStoreOrders.mockResolvedValue(mockPendingOrders)
        mockStoreRep.getTotalViews.mockResolvedValue(getTotalViews)
        const storeId = 34
        const {orders,views} = await storeDash.getDashboard( storeId )

        expect(orders.cancelled).toEqual(countOrders)
        expect(orders.completed).toEqual(countOrders)
        expect(orders.pending).toEqual(countOrders)
        expect(orders.lastPending).toEqual(mockPendingOrders)
        expect(views.total).toEqual(getTotalViews)

        expect( mockStoreRep.countOrders).toHaveBeenCalledTimes(3)
        expect(mockStoreRep.countOrders).toHaveBeenNthCalledWith(1,'completed',storeId)
        expect(mockStoreRep.countOrders).toHaveBeenNthCalledWith(2,'pending',storeId)
        expect(mockStoreRep.countOrders).toHaveBeenNthCalledWith(3,'cancelled',storeId)

        expect( mockStoreRep.getTotalViews).toHaveBeenCalledTimes(1)
        expect( mockStoreRep.getTotalViews).toHaveBeenCalledWith(storeId)

        expect( mockStoreRep.getStoreOrders).toHaveBeenCalledTimes(1)
        expect( mockStoreRep.getStoreOrders).toHaveBeenCalledWith('pending',storeId)
    })
    it("should return 0 and an empty array when all services throw an error" ,async()=>{
        const countOrders = 495
        const getTotalViews = 3999
        mockStoreRep.countOrders.mockRejectedValue(countOrders)
        mockStoreRep.getStoreOrders.mockRejectedValue(mockPendingOrders)
        mockStoreRep.getTotalViews.mockRejectedValue(getTotalViews)
        const storeId = 34
        const {orders,views} = await storeDash.getDashboard( storeId )

        expect(orders.cancelled).toEqual(0)
        expect(orders.completed).toEqual(0)
        expect(orders.pending).toEqual(0)
        expect(orders.lastPending).toEqual([])
        expect(views.total).toEqual(0)

        expect( mockStoreRep.countOrders).toHaveBeenCalledTimes(3)
        expect(mockStoreRep.countOrders).toHaveBeenNthCalledWith(1,'completed',storeId)
        expect(mockStoreRep.countOrders).toHaveBeenNthCalledWith(2,'pending',storeId)
        expect(mockStoreRep.countOrders).toHaveBeenNthCalledWith(3,'cancelled',storeId)

        expect( mockStoreRep.getTotalViews).toHaveBeenCalledTimes(1)
        expect( mockStoreRep.getTotalViews).toHaveBeenCalledWith(storeId)

        expect( mockStoreRep.getStoreOrders).toHaveBeenCalledTimes(1)
        expect( mockStoreRep.getStoreOrders).toHaveBeenCalledWith('pending',storeId)
    })
    it("should return 0 when only one count service throws an error and the others return the correct values",async()=>{
        const countOrders = 495
        const getTotalViews = 3999
        mockStoreRep.countOrders.mockRejectedValueOnce(countOrders)
        mockStoreRep.countOrders.mockResolvedValue(countOrders)

        mockStoreRep.getStoreOrders.mockResolvedValue(mockPendingOrders)
        mockStoreRep.getTotalViews.mockResolvedValue(getTotalViews)
        const storeId = 34
        const {orders,views} = await storeDash.getDashboard( storeId )

        expect(orders.completed).toEqual(0)
        expect(orders.pending).toEqual(countOrders)
        expect(orders.cancelled).toEqual(countOrders)
       
      
        expect(orders.lastPending).toEqual(mockPendingOrders)
        expect(views.total).toEqual(getTotalViews)

        expect( mockStoreRep.countOrders).toHaveBeenCalledTimes(3)
        expect(mockStoreRep.countOrders).toHaveBeenNthCalledWith(1,'completed',storeId)
        expect(mockStoreRep.countOrders).toHaveBeenNthCalledWith(2,'pending',storeId)
        expect(mockStoreRep.countOrders).toHaveBeenNthCalledWith(3,'cancelled',storeId)

        expect( mockStoreRep.getTotalViews).toHaveBeenCalledTimes(1)
        expect( mockStoreRep.getTotalViews).toHaveBeenCalledWith(storeId)

        expect( mockStoreRep.getStoreOrders).toHaveBeenCalledTimes(1)
        expect( mockStoreRep.getStoreOrders).toHaveBeenCalledWith('pending',storeId)
    })
    it("should return an empty array and the other values correctly when only getStoreOrders throws",async()=>{
        const countOrders = 495
        const getTotalViews = 3999
   
        mockStoreRep.countOrders.mockResolvedValue(countOrders)

        mockStoreRep.getStoreOrders.mockRejectedValue(mockPendingOrders)
        mockStoreRep.getTotalViews.mockResolvedValue(getTotalViews)
        const storeId = 34
        const {orders,views} = await storeDash.getDashboard( storeId )

        expect(orders.completed).toEqual(countOrders)
        expect(orders.pending).toEqual(countOrders)
        expect(orders.cancelled).toEqual(countOrders)
       
      
        expect(orders.lastPending).toEqual([])
        expect(views.total).toEqual(getTotalViews)

        expect( mockStoreRep.countOrders).toHaveBeenCalledTimes(3)
        expect(mockStoreRep.countOrders).toHaveBeenNthCalledWith(1,'completed',storeId)
        expect(mockStoreRep.countOrders).toHaveBeenNthCalledWith(2,'pending',storeId)
        expect(mockStoreRep.countOrders).toHaveBeenNthCalledWith(3,'cancelled',storeId)

        expect( mockStoreRep.getTotalViews).toHaveBeenCalledTimes(1)
        expect( mockStoreRep.getTotalViews).toHaveBeenCalledWith(storeId)

        expect( mockStoreRep.getStoreOrders).toHaveBeenCalledTimes(1)
        expect( mockStoreRep.getStoreOrders).toHaveBeenCalledWith('pending',storeId)
    })
    it("should return 0 and the other values correctly when only getTotalViews throws",async()=>{
        const countOrders = 495
        const getTotalViews = 3999
   
        mockStoreRep.countOrders.mockResolvedValue(countOrders)

        mockStoreRep.getStoreOrders.mockResolvedValue(mockPendingOrders)
        mockStoreRep.getTotalViews.mockRejectedValue(getTotalViews)
        const storeId = 34
        const {orders,views} = await storeDash.getDashboard( storeId )

        expect(orders.completed).toEqual(countOrders)
        expect(orders.pending).toEqual(countOrders)
        expect(orders.cancelled).toEqual(countOrders)
       
      
        expect(orders.lastPending).toEqual(mockPendingOrders)
        expect(views.total).toEqual(0)

        expect( mockStoreRep.countOrders).toHaveBeenCalledTimes(3)
        expect(mockStoreRep.countOrders).toHaveBeenNthCalledWith(1,'completed',storeId)
        expect(mockStoreRep.countOrders).toHaveBeenNthCalledWith(2,'pending',storeId)
        expect(mockStoreRep.countOrders).toHaveBeenNthCalledWith(3,'cancelled',storeId)

        expect( mockStoreRep.getTotalViews).toHaveBeenCalledTimes(1)
        expect( mockStoreRep.getTotalViews).toHaveBeenCalledWith(storeId)

        expect( mockStoreRep.getStoreOrders).toHaveBeenCalledTimes(1)
        expect( mockStoreRep.getStoreOrders).toHaveBeenCalledWith('pending',storeId)
    })
})