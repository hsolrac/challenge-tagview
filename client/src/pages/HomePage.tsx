import React, { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import ModalProduct from '../components/Modal';
import { getProducts } from '../services/api';
import { Box, Image, Text } from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';


function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [queryParams, setQueryParams] = useState<any>({});

  const location = useLocation();


  useEffect(() => {
    const searchParams: any = new URLSearchParams(location.search);
    const params: any = {};

    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }

    setQueryParams(params);

    if(queryParams.idProduto) {
      filterProduct(queryParams.idProduto)
    }
  }, [location.search])


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

  console.log(products)

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const filterProduct = (id: string) => {
    const product: Product = products.filter((product) => product.id === id)[0]
    setSelectedProduct(product)
    setOpenModal(true)
  }

  return (
    <div>
      {products && products.map((product) => (
        <Box key={product.id} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box p="6">
            <Box  alignItems="baseline">
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {product.nome}
              </Box>
            </Box>

            <Box mt="1" onClick={() => openModal(product)} fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
              {product.nome}
            </Box>
            <Box>
              <Text mt="2">${product.preco}</Text>
            </Box>
          </Box>
        </Box>
      ))}
      <ModalProduct open={isOpenModal} onClose={() => setOpenModal(false)} product={selectedProduct} />
    </div>
  );
}

export default HomePage;

