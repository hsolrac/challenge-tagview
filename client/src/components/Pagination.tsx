import React from 'react';
import { Paginate } from 'react-paginate-chakra-ui';
import { Stack } from '@chakra-ui/react';

type PaginationProps = {
  page: number;
  totalPages: number;
  limit: number;
  handlePageClick: (page: number) => void;
}

function Pagination({page, totalPages = 1, limit = 10, handlePageClick}: PaginationProps){
  return (
     <Stack p={5}>
      <div>Página: {page+1}</div>
      <Paginate
        page={page}
        count={totalPages}
        pageSize={limit}
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

