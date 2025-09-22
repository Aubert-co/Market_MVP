import {deleteImages,generateImages} from './src/tests/assets/generate'
import {prisma} from './src/lib/prisma'
export default async function (){
    await deleteImages()
    await prisma.$disconnect()
    
    console.log('apos tudo')
}  