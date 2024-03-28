import React, { useEffect, useState } from 'react';
import { Product } from '../types/Product'
import { getProducts } from '../services/api'
import { Box, Image, Text } from "@chakra-ui/react";

function HomePage () {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchProduct()
  }, [])

  console.log(products)

  const fetchProduct = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData)
    } catch (error) {
      console.error('Error fetching products', error)
    }
  }

  return (
    <div>
      {products && products.map((product) => (
         <Box key={product.id} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={product.imagem} alt={product.nome} />
            <Box p="6">
              <Box d="flex" alignItems="baseline">
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

              <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                {product.nome}
              </Box>
              <Box>
                <Text mt="2">${product.preco}</Text>
              </Box>
            </Box>
          </Box>
      ))}
    </div>
  )
}

export default HomePage;


