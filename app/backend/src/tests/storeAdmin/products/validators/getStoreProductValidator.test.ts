import { ErrorMessage } from "@/helpers/ErrorMessage"
import { getStoreProductValidator } from "@/modules/storeAdmin/products/validators/products.validators"
import { Request } from "express"

describe("getStoreProductValidator ", () => {
  it("should accept valid search and return parsed values", () => {
    const req = {
      params: {
        storeId: "1"
      },
      query: {
        page: 1,
        search: "test",
        category: "",
        priceOrder: "asc",
        limit: 5,
        stockOrder: "desc"
      }
    } as unknown as Request

    const result = getStoreProductValidator(req)

    expect(result.search).toBe("test")
    expect(result.page).toBe(1)
    expect(result.limit).toBe(5)
    expect(result.priceOrder).toEqual(req.query.priceOrder)
    expect(result.stockOrder).toEqual(req.query.stockOrder)
    expect(result.category).toBeUndefined()
  })

  it("should throw error when search is invalid", () => {
    const req = {
      params: {
        storeId: "1"
      },
      query: {
        page: 1,
        search: "!!!invalid!!!",
        category: "",
        priceOrder: "asc",
        limit: 5,
        stockOrder: "desc"
      }
    } as unknown as Request

    try{
        getStoreProductValidator(req)
     
    }catch(err:any){
        expect(err).toBeInstanceOf(ErrorMessage)
        expect(err.status).toEqual(422)
        expect(err.message).toEqual("Invalid search. Please check and try again.")
    }
  })
   it("should throw error when category is invalid", () => {
    const req = {
      params: {
        storeId: "1"
      },
      query: {
        page: 1,
        search: "",
        category: "invalid",
        priceOrder: "asc",
        limit: 5,
        stockOrder: "desc"
      }
    } as unknown as Request

    try{
        getStoreProductValidator(req)
     
    }catch(err:any){
        expect(err).toBeInstanceOf(ErrorMessage)
        expect(err.status).toEqual(422)
        expect(err.message).toEqual("Invalid category. Please check and try again.")
    }
  })
  it("should skip search validation when search is empty", () => {
    const req = {
      params: {
        storeId: "1"
      },
      query: {
        page: 1,
        search: "",
        category: "Roupas",
        
        limit: 5,

      }
    } as unknown as Request

    const result = getStoreProductValidator(req)

    expect(result.search).toBeUndefined()
    expect(result.category).toEqual(req.query.category)
    expect(result.stockOrder).toEqual("asc")
    expect(result.priceOrder).toEqual("asc")
  })
})