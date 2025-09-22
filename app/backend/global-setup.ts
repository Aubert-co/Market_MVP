import {deleteImages,generateImages} from './src/tests/assets/generate'



export default async function (){
    try{
        await generateImages()
    }catch(err:any){
        throw new Error('Global-setup'+err.message)
    }
   
}
 