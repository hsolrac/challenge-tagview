import React, { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../services/api';
import ProductList from '../components/ProductList';

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  return (
    <div style={{margin: '5%'}}>
      <ProductList products={products}  />
    </div>
  );
}

export default HomePage;

