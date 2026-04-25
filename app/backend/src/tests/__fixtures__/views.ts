import { ViewSource } from '@prisma/client'



export const views = [
  
  { productId: 1, userId: 1, sessionId: 's1', source: ViewSource.HOME },
  { productId: 1, userId: 2, sessionId: 's2', source: ViewSource.PRODUCT },
  { productId: 1, userId: 3, sessionId: 's3', source: ViewSource.FILTERS },
  { productId: 1, userId: null, sessionId: 's4', source: ViewSource.HOME },
  { productId: 1, userId: 2, sessionId: 's5', source: ViewSource.PRODUCT },


  { productId: 2, userId: 1, sessionId: 's6', source: ViewSource.HOME },
  { productId: 2, userId: 3, sessionId: 's7', source: ViewSource.PRODUCT },
  { productId: 2, userId: null, sessionId: 's8', source: ViewSource.FILTERS },
  { productId: 2, userId: 2, sessionId: 's9', source: ViewSource.HOME },


  { productId: 3, userId: 1, sessionId: 's10', source: ViewSource.PRODUCT },
  { productId: 3, userId: null, sessionId: 's11', source: ViewSource.HOME },
  { productId: 3, userId: 2, sessionId: 's12', source: ViewSource.FILTERS },


  { productId: 4, userId: 3, sessionId: 's13', source: ViewSource.HOME },
  { productId: 4, userId: null, sessionId: 's14', source: ViewSource.PRODUCT },


  { productId: 5, userId: 1, sessionId: 's15', source: ViewSource.FILTERS },


  { productId: 6, userId: null, sessionId: 's16', source: ViewSource.HOME }
]