import { StoreService } from "../modules/store/services/store.services";
import { prisma } from "../lib/prisma";
import { StoreRepository } from "../modules/store/repository/store.repository";
import { VerifyStoreOwnership } from "../middleware/verifyStoreOwnership";


export function makeVerifyStoreMiddle(){
    const storeRepository = new StoreRepository(prisma)
    const storeService = new StoreService(storeRepository)
    return new VerifyStoreOwnership(storeService)
} 