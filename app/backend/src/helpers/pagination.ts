import { Pagination,ReturnPagination } from "../types/pagination.types"
export const pagination = ({totalItems,page,limit}:Pagination):ReturnPagination=>{
  const totalPages = Math.ceil(totalItems/limit)
  if(page > totalPages){
    page = totalPages
  }
  const skip = (page -1)* limit
  return{
    currentPage:page,
    skip,
    totalPages
  }
}
export const calcSkipPages = (page:number,limit:number):number=>(page-1)*limit
