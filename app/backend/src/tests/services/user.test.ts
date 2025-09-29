import {UserService} from '../../services/user.services'
import bcrypt from 'bcrypt'
import * as tokens from '../../helpers/AuthTokens'




const spyAcessToken = jest.spyOn(tokens,'generateAccessToken')
const spyRefreshTOken = jest.spyOn(tokens,'generateRefreshToken')
const spyHash = jest.spyOn(bcrypt,'hash')
const mockUserRep = {
    findByEmail:jest.fn(),
    createUserAccount:jest.fn(),
    findUserById:jest.fn()
}
const user = new UserService( mockUserRep )
describe("method loginUser",()=>{
  
    beforeEach(()=>{
        jest.clearAllMocks()
    })
   
   
    it("should successfully log in a user",async()=>{
        const id = 34
        const email = "lorem@ipstu.com"
        const password = "lorempit=qlçeew"
        mockUserRep.findByEmail.mockResolvedValue( {id,email,password} )
        jest.spyOn(bcrypt,'compare').mockResolvedValue(true as never)
      
        const {userId,accessToken,refreshToken} = await user.loginUser(email,password)
        
        
        expect( mockUserRep.findByEmail ).toHaveBeenCalledWith( email )
        expect( mockUserRep.findByEmail ).toHaveBeenCalledTimes( 1 )
        expect( userId ).toEqual(id)
        expect(spyAcessToken).toHaveBeenCalledTimes(1)
        expect( spyAcessToken ).toHaveBeenCalledWith( id )
        expect(spyRefreshTOken).toHaveBeenCalledTimes(1)
        expect(spyRefreshTOken).toHaveBeenCalledWith(id)
    })
     it("should throw an error when the user is not found",async()=>{
        try{
            
            const id = 34
            const email = "lorem@ipstu.com"
            const password = "lorempit=qlçeew"
           
           
             mockUserRep.findByEmail.mockResolvedValue('')
            await user.loginUser(email,password)
            
            
            expect( mockUserRep.findByEmail ).toHaveBeenCalledWith( email )
            expect( mockUserRep.findByEmail ).toHaveBeenCalledTimes( 1 )
        
            expect(spyAcessToken).toHaveBeenCalledTimes(0)
            expect(spyRefreshTOken).toHaveBeenCalledTimes(0)
   
        }catch(err:any){
            
            expect(err.status).toEqual( 400 )
            expect(err.message).toEqual("Invalid email or password")
        }
    })
    it("should return an error when bcrypt.compare does not match",async()=>{
         try{
            
            const id = 34
            const email = "lorem@ipstu.com"
            const password = "lorempit=qlçeew"
           
            jest.spyOn(bcrypt,'compare').mockReturnValue(false as never)
            mockUserRep.findByEmail.mockResolvedValue({id,name:'jose',password})
            await user.loginUser(email,password)
            
            
            expect( mockUserRep.findByEmail ).toHaveBeenCalledWith( email )
            expect( mockUserRep.findByEmail ).toHaveBeenCalledTimes( 1 )
        
            expect(spyAcessToken).toHaveBeenCalledTimes(0)
            expect(spyRefreshTOken).toHaveBeenCalledTimes(0)
   
        }catch(err:any){
            
            expect(err.status).toEqual( 400 )
            expect(err.message).toEqual("Invalid email or password")
        }
    })
})

describe("method createUserAccount",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should return an error when a user is found",async()=>{
        const email = "lorem@ipstu.com"
        const password = "lorempit=qlçeew"
        const name = "josef"
        mockUserRep.findByEmail.mockResolvedValue('')
        const hashedPassword = "1834jjeqwebg333"
        spyHash.mockResolvedValue(hashedPassword as never)

        await user.createUserAccount({
            email,password,name
        })

        expect(spyHash).toHaveBeenCalledTimes(1)
        expect( spyHash).toHaveBeenCalledWith( password,10 )
        
        expect( mockUserRep.createUserAccount ).toHaveBeenCalledTimes(1)
        expect( mockUserRep.createUserAccount).toHaveBeenCalledWith({
            name,email,password:hashedPassword
        })
    })
    it("should create a user account successfully",async()=>{
        const email = "lorem@ipstu.com"
        const password = "lorempit=qlçeew"
        const name = "josef"
        mockUserRep.findByEmail.mockResolvedValue({name:'jose'})
        const hashedPassword = "1834jjeqwebg333"
        spyHash.mockResolvedValue(hashedPassword as never)

        try{
            await user.createUserAccount({
            email,password,name
            })
        }catch(err:any){
            expect(err.status).toEqual(409)
            expect(err.message).toEqual("User already exists")
        }

    })
    
})