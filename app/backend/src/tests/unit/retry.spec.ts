import { retry } from "@/helpers/retry"

type Func = {
    name:string
}
let callMe = jest.fn()
 const func2 = async({name}:Func)=>{
    callMe()
    return {success:true,data:name}
}
describe("retry",()=>{
    
    beforeEach(()=>{
        jest.clearAllMocks()
    })
   
    it("should call the function only once when it already returns success",async()=>{
        const result = await retry({
            func:func2,
            body:{name:"josef"},
            retries:25
        })

        expect(result).toHaveProperty("success")
        expect(result.data).toEqual("josef")
        expect(callMe).toHaveBeenCalledTimes(1)
    })
})