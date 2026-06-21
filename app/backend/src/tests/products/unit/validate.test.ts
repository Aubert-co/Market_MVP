import { ErrorMessage } from "@/helpers/ErrorMessage"
import { validateFilterProducts } from "@/modules/products/validators/products.validators"
import { Request } from "express"


describe("validateFilterProducts",()=>{
    it("should correctly handle values when not sent or when sending",async()=>{
        const req = {query:{
            name:"",category:"Roupas",

        }} as unknown as Request
        const {orderBy,category,name,maxPrice,minPrice} = validateFilterProducts(req)
        
        expect(orderBy).toEqual("asc")
        expect(category).toEqual(req.query.category)
        expect(name).toBeUndefined()
        expect(maxPrice).toBeUndefined()
        expect(minPrice).toBeUndefined()
    })
    it("should render the correct maxPrice and minPrice when valid values are provided",async()=>{
        const query = {
            name:"test",category:"Roupas",maxPrice:"35.99",
            minPrice:"3.99"

        }
         const req = {query} as unknown as Request
        const {orderBy,category,name,maxPrice,minPrice} = validateFilterProducts(req)
        
        expect(orderBy).toEqual("asc")
        expect(category).toEqual(req.query.category)
        expect(name).toEqual(req.query.name)
        expect(maxPrice).toBe(Number(query.maxPrice))
        expect(minPrice).toBe(Number(query.minPrice))
    })
    it("should throw an error when minPrice is greater than maxPrice",async()=>{ 
        const query = {
            name:"",category:"Roupas",maxPrice:"35.99",
            minPrice:"36.99"

        }
        const req = {query} as unknown as Request
        try{
             validateFilterProducts(req)
        }catch(err:any){
            expect(err).toBeInstanceOf(ErrorMessage)
            expect(err.status).toEqual(400)
            expect(err.message).toEqual("Minimum price cannot be greater than maximum price")
        }
    })
     it("should correctly handle a valid maxPrice when minPrice is not provided",async()=>{
        const query = {
            name:"",category:"Roupas",maxPrice:"35.99",
        }
         const req = {query} as unknown as Request
        const {orderBy,category,name,maxPrice} = validateFilterProducts(req)
        
        expect(orderBy).toEqual("asc")
        expect(category).toEqual(req.query.category)
        expect(name).toBeUndefined()
        expect(maxPrice).toBe(Number(query.maxPrice))
        
    })
     it("should render the correct minPrice when a valid minPrice is provided without maxPrice",async()=>{
        const query = {
            name:"",category:"Roupas",minPrice:"35.99",
        }
         const req = {query} as unknown as Request
        const {orderBy,category,name,minPrice} = validateFilterProducts(req)
        
        expect(orderBy).toEqual("asc")
        expect(category).toEqual(req.query.category)
        expect(name).toBeUndefined()
        expect(minPrice).toBe(Number(query.minPrice))
        
    })
    it("should throw an error when minPrice is provided but the value is invalid",async()=>{
        const query = {
            name:"",category:"Roupas",minPrice:"35.99t",
        }
         const req = {query} as unknown as Request
         
         try{
            validateFilterProducts(req)
         }catch(err){
            expect(err).toBeInstanceOf(ErrorMessage)
        }
    })
     it("should throw an error when maxPrice is provided but the value is invalid",async()=>{
        const query = {
            name:"",category:"Roupas",maxPrice:"35.b9t",
        }
         const req = {query} as unknown as Request
         
         try{
            validateFilterProducts(req)
         }catch(err){
            expect(err).toBeInstanceOf(ErrorMessage)
        }
    })
    it("should throw an error when name is provided but the value is invalid",async()=>{
        const query = {
            name:"cami||te",category:"Roupas",
        }
         const req = {query} as unknown as Request
         
         try{
            validateFilterProducts(req)
         }catch(err:any){
            expect(err).toBeInstanceOf(ErrorMessage)
            expect(err.message).toEqual("Invalid name format")
        }
    })
      it("should throw an error when category is provided but the value is invalid",async()=>{
        const query = {
            name:"camisa",category:"invalid category",
        }
         const req = {query} as unknown as Request
         
         try{
            validateFilterProducts(req)
         }catch(err:any){
            expect(err).toBeInstanceOf(ErrorMessage)
            expect(err.message).toEqual("Invalid category provided")
        }
    })
})