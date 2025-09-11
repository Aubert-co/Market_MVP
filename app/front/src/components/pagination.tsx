import { useState } from "react"
import type { PageInfo } from "@/types/services.types";

type CallBackChangePage = (page:number)=>void
type RenderNumbers = PageInfo&{
  handlePageChange:CallBackChangePage
}

export const renderNumbers = ({totalPages,currentPage,handlePageChange}:RenderNumbers)=>{
    const pageNumbers = [];
    
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          data-testid={`pagination`}
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? 'active' : ''}
          style={{
            padding: '10px',
            margin: '0 5px',
            cursor: 'pointer',
            backgroundColor: i === currentPage ? '#007bff' : '#f8f9fa',
            color: i === currentPage ? '#fff' : '#000',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
}

export const usePagination = (cbChangePage:CallBackChangePage)=>{
  
    const [pageInfos,setPagesInfos] = useState<PageInfo>({
        totalPages:1,
        currentPage:1
    })
    const handlePageChange = (newPage:number)=>{
        if(newPage === pageInfos.currentPage)return;
         setPagesInfos((prev) => ({
            ...prev,
            currentPage: newPage
        }));
        cbChangePage(newPage)
    }
    const Pagination = ()=>{
      return(  
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {renderNumbers({totalPages:pageInfos.totalPages,currentPage:pageInfos.currentPage,handlePageChange})}
        </div>
      )
    }

    return {pageInfos,setPagesInfos,Pagination}
}