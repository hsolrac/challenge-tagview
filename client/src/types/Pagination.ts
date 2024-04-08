export type PaginationProps = {
  page: number;
  totalPages: number;
  totalCount: number;
  handlePageClick: (page: number) => void;
  handleLimitForPage: (limit: number) => void;
  isLoaded: boolean;
}
