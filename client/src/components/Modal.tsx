import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import { Product } from '../types/Product';
import { Currency } from '../util/Currency'

type ModalProductProps = {
  open: boolean;
  onClose: () => void;
  product: Product | null;
};

function ModalProduct({ open, onClose, product }: ModalProductProps) {
  if (!product) return null;

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{product.nome}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {product.descricao}
          {Currency.format(product.preco)}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalProduct;

