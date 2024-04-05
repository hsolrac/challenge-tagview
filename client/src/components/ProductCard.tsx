import React from 'react'
import { Product } from '../types/Product'
import { Currency }  from '../util/Currency'
import { Card, CardBody, Image, CardHeader, Heading, Text  } from '@chakra-ui/react'

type ProductCardProps = {
  product: Product;
  openModal: (product: Product) => void;
}

function ProductCard({product, openModal}: ProductCardProps ) {
  return (
    <Card style={{cursor: 'pointer'}} onClick={() => openModal(product)}>
      <CardHeader>
        <Image
          objectFit='cover'
          src={product.imagem}
          alt={product.nome}
        />
      </CardHeader>
      <CardBody>
        <Heading size='md'>{product.nome}</Heading>
        <Text>{Currency.format(product.preco)}</Text>
      </CardBody>
    </Card>     
  )
}

export default ProductCard;

