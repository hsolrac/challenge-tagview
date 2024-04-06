import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { SimpleGrid, Text  } from '@chakra-ui/react'
import { Product } from '../types/Product'
import ProductCard from './ProductCard'
import Modal from './Modal'

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
      const product: Product = products.filter((product) => product.id === params.idProduto)[0]
      setSelectedProduct(product)
      setOpenModal(true)
    }
  }, [location]) 


  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  return (
    <SimpleGrid spacing={4} columns={4}>
      {products.length === 0 && <Text>Nenhum resultado encontrado</Text>}
      {products.map((product, index) => (
        <ProductCard key={index} isLoaded={isLoaded} product={product} openModal={(product: Product) => openModal(product)} /> 
      ))}
      <Modal open={isOpenModal} product={selectedProduct} onClose={() => setOpenModal(false)} />
    </SimpleGrid>
  )
}

export default ProductList;
