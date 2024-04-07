import React from 'react'
import { Product } from '../types/Product'
import { Currency }  from '../util/Currency'
import { Card, CardBody, Image, CardHeader, Heading, Text, Skeleton  } from '@chakra-ui/react'

type ProductCardProps = {
  product: Product;
  openModal: (product: Product) => void;
  isLoaded: boolean
}

function ProductCard({product, openModal, isLoaded}: ProductCardProps ) {
  return (
    <Skeleton isLoaded={isLoaded}>
      <Card style={{cursor: 'pointer'}} onClick={() => openModal(product)}>
        <CardHeader>
          <Image
            fallbackSrc='https://via.placeholder.com/251x141'
            src={product.imagem}
            alt={product.nome}
          />
        </CardHeader>
        <CardBody>
          <Heading size='md'>{Currency.format(product.preco)}</Heading>
          <Text>{product.nome}</Text>
        </CardBody>
      </Card>     
    </Skeleton>
  )
}

export default ProductCard;

