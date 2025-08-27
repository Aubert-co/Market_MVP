import { useState } from "react"


type Pages = {
    totalPages:number,
    currentPage:number
}
type RenderButtons = Pages&{
    handlePageChange:(page:number)=>void
}
export const renderNumbers = ({totalPages,currentPage,handlePageChange}:RenderButtons)=>{
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
type ChangePage = (page:number)=>void
export const usePagination = (changePage:ChangePage)=>{
  
    const [pageInfos,setPagesInfos] = useState<Pages>({
        totalPages:1,
        currentPage:1
    })
    const handlePageChange = (newPage:number)=>{
        if(newPage === pageInfos.currentPage)return;
         setPagesInfos((prev) => ({
            ...prev,
            currentPage: newPage
        }));
        changePage(newPage)
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