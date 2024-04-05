import React from 'react';
import { Paginate } from 'react-paginate-chakra-ui';
import { Stack } from '@chakra-ui/react';

type PaginationProps = {
  page: number;
  totalPages: number;
  totalCount: number;
  handlePageClick: (page: number) => void;
  handleLimitForPage: (limit: number) => void;
}

function Pagination({page, totalPages = 1 , totalCount = 1, handlePageClick, handleLimitForPage}: PaginationProps){
  
  return (
     <Stack p={5}>
      <div>Página: {page+1}</div>
      <select onChange={(e) => handleLimitForPage(Number(e.target.value))}>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={totalCount}>Todos</option>
      </select>
      <Paginate
        page={page}
        count={totalCount}
        pageSize={totalPages}
        onPageChange={handlePageClick}
        shadow="lg"
        fontWeight="blue"
        variant="outline"
        border="1px solid"
      />
    </Stack>  
  );
}

export default Pagination;

