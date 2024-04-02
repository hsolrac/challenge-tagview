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
        <Heading size='md'>{product.nome}</Heading>
      </CardHeader>
      <CardBody>
        <Image
          objectFit='cover'
          src={product.imagem}
          alt={product.nome}
        />
        <Text>{Currency.format(product.preco)}</Text>
      </CardBody>
    </Card>     
  )
}

export default ProductCard;

