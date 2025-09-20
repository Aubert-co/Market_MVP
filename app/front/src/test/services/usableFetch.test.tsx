import { usableFetch, usableFetchWithPages } from "@/services/fetchs"

type MockReturn = {
    value:string
}
type Body = {
    name:string
}
describe("usableFetch",()=>{
  const mockService = jest.fn()
  const setDatas = jest.fn()

  beforeEach(()=>{
    jest.clearAllMocks()
  })
  it("should call service and setDatas correctly", async ()=>{
    const datas = [{value:32}]
    const message  ="lorem iptsu"
    const status = 201

    mockService.mockResolvedValue({datas, message, status})

    await usableFetch<MockReturn,Body>({
      service: mockService,
      setDatas,
      body:{name:'jose'}
    })

    expect(mockService).toHaveBeenCalledTimes(1)
    expect(mockService).toHaveBeenCalledWith({name:"jose"})
    expect(setDatas).toHaveBeenCalledTimes(1)
    expect(setDatas).toHaveBeenCalledWith({datas,message,status}) 
  })
  it("should execute service and update setDatas if body is empty", async ()=>{
    const datas = [{value:32}]
    const message  ="lorem iptsu"
    const status = 201

    mockService.mockResolvedValue({datas, message, status})

    await usableFetch<MockReturn,{}>({
      service: mockService,
      setDatas,
      body:{}
    })

    expect(mockService).toHaveBeenCalledTimes(1)
    expect(mockService).toHaveBeenCalledWith({})
    expect(setDatas).toHaveBeenCalledTimes(1)
    expect(setDatas).toHaveBeenCalledWith({datas,message,status}) 
  })
  it("should handle errors correctly when service throws", async ()=>{
    const datas = [{value:32}]
    const message  ="lorem iptsu"
    const status = 201

    mockService.mockRejectedValue({datas, message, status})

    await usableFetch<MockReturn,{}>({
      service: mockService,
      setDatas,
      body:{}
    })

    expect(mockService).toHaveBeenCalledTimes(1)
    expect(mockService).toHaveBeenCalledWith({})
    expect(setDatas).toHaveBeenCalledTimes(1)
    expect(setDatas).toHaveBeenCalledWith({datas:[],message:'Algo deu errado!',status:500}) 
  })
})


describe("usableFetchWithPages",()=>{
    const mockService = jest.fn()
    const setDatas = jest.fn()
    const setPages = jest.fn()
  beforeEach(()=>{
    jest.clearAllMocks()
  })
  it("should call service and setDatas correctly", async ()=>{
    const datas = [{value:32}]
    const message  ="lorem iptsu"
    const status = 201
    const currentPage = 15
    const totalPages =300
    mockService.mockResolvedValue({datas, message, status,currentPage,totalPages})

    await usableFetchWithPages<MockReturn,Body>({
      service: mockService,
      setDatas,
      body:{name:'jose'},
      setPages
    })

    expect(mockService).toHaveBeenCalledTimes(1)
    expect(mockService).toHaveBeenCalledWith({name:"jose"})
    expect(setDatas).toHaveBeenCalledTimes(1)
    expect(setDatas).toHaveBeenCalledWith({datas,message,status}) 
    expect(setPages).toHaveBeenCalledTimes(1)
    expect(setPages).toHaveBeenCalledWith({currentPage,totalPages})
  })
  it("should execute service and update setDatas if body is empty", async ()=>{
    const datas = [{value:32}]
    const message  ="lorem iptsu"
    const status = 201
    const currentPage = 15
    const totalPages =300
    mockService.mockResolvedValue({datas, message, status,currentPage,totalPages})

    await usableFetchWithPages<MockReturn,{}>({
      service: mockService,
      setDatas,
      body:{},
      setPages
    })

    expect(mockService).toHaveBeenCalledTimes(1)
    expect(mockService).toHaveBeenCalledWith({})
    expect(setDatas).toHaveBeenCalledTimes(1)
    expect(setDatas).toHaveBeenCalledWith({datas,message,status}) 
    expect(setPages).toHaveBeenCalledTimes(1)
    expect(setPages).toHaveBeenCalledWith({currentPage,totalPages})
  })
    it("should handle errors correctly when service throws", async ()=>{
   
    mockService.mockRejectedValueOnce('')

    await usableFetchWithPages<MockReturn,{}>({
      service: mockService,
      setDatas,
      body:{},
      setPages
    })

    expect(mockService).toHaveBeenCalledTimes(1)
    expect(mockService).toHaveBeenCalledWith({})
    expect(setDatas).toHaveBeenCalledTimes(1)
    expect(setDatas).toHaveBeenCalledWith({datas:[],message:'Algo deu errado!',status:500}) 
    expect(setPages).toHaveBeenCalledTimes(1)
    expect(setPages).toHaveBeenCalledWith({currentPage:1,totalPages:1})
  })
})
