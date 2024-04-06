import React from 'react';
import { Paginate } from 'react-paginate-chakra-ui';
import { Stack, Skeleton, SkeletonCircle, SkeletonText, Box } from '@chakra-ui/react';

type PaginationProps = {
  page: number;
  totalPages: number;
  totalCount: number;
  handlePageClick: (page: number) => void;
  handleLimitForPage: (limit: number) => void;
  isLoaded: boolean;
}

function Pagination({page, totalPages = 1 , totalCount = 1, handlePageClick, handleLimitForPage, isLoaded}: PaginationProps){
  
  return (
     <Stack p={5}>
      <Skeleton  height='40px' isLoaded={isLoaded}>
        <Box>Página: {page+1}</Box>
      </Skeleton>
      <Skeleton  height='40px' isLoaded={isLoaded}>
        <select onChange={(e) => handleLimitForPage(Number(e.target.value))}>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={totalCount}>Todos</option>
        </select>
      </Skeleton>
      <Skeleton  height='40px' isLoaded={isLoaded}>
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
      </Skeleton>
    </Stack>  
  );
}

export default Pagination;

