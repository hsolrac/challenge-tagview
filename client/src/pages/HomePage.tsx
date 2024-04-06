import React, { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../services/api';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination'

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number | null>(null);
  const [headers, setHeaders] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);


  const handlePageClick = (page: number) => {
    setPage(page);
  };

  const handleLimitForPage =  (limit: number) => {
    setPage(0)
    setPerPage(limit)
  }

  useEffect(() => {
    fetchProduct(page+1, perPage);
  }, [page, perPage]);

  const fetchProduct = async (page: number, perPage: number | null) => {
    try {
      const { data, headers }  = await getProducts(page, perPage);
      setHeaders(headers);
      setProducts(data);
      setIsLoaded(true)
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  return (
    <div style={{margin: '5%'}}>
      <ProductList products={products} isLoaded={isLoaded}  />
      {headers && 
      <Pagination page={page} 
        totalCount={headers['total-count']} 
        isLoaded={isLoaded}
        totalPages={headers['page-items']} 
        handlePageClick={handlePageClick} 
        handleLimitForPage={handleLimitForPage}
      />}    
    </div>
  );
}

export default HomePage;

