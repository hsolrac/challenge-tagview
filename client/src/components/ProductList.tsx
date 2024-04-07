import React, { useState, useEffect } from 'react'
import { useLocation, GetScrollRestorationKeyFunction } from 'react-router-dom';
import { SimpleGrid, Text, Skeleton  } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify';
import { Product } from '../types/Product'
import ProductCard from './ProductCard'
import Modal from './Modal'
import { getProducts } from '../services/api'

type ProductProps = {
  products: Product[];
  isLoaded: boolean;
}

function ProductList({ products, isLoaded}: ProductProps ) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams: any = new URLSearchParams(location.search);
    const params: any = {};

    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }

    if(params.idProduto) {
      loadProductModal(params)
    }
  }, [products]) 

  const loadProductModal = async (params: any) => {
    const product: Product = products.filter((product: Product) => product.id === params.idProduto)[0]
    openModal(product)
  }

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  return (
    <SimpleGrid spacing={4} columns={4}>
      {products.length === 0 && 
        <Skeleton isLoaded={isLoaded}>
          <Text>Nenhum produto encontrado</Text>
        </Skeleton>
      }
      {products.map((product, index) => (
        <ProductCard key={index} isLoaded={isLoaded} product={product} openModal={(product: Product) => openModal(product)} /> 
      ))}
      <Modal open={isOpenModal} product={selectedProduct} onClose={() => setOpenModal(false)} />
      <ToastContainer />
    </SimpleGrid>
  )
}

export default ProductList;
