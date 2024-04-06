import React, { useState, ChangeEvent, FormEvent } from 'react';
import { createProduct } from '../../services/api'
import { Product } from '../../types/Product'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Currency } from '../../util/Currency'
import { Field, Form, Formik, useFormik } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Textarea,
  Heading,
  ButtonGroup
} from '@chakra-ui/react'


function validateName(value: string) {
  let error
  if (!value) {
    error = 'Nome é obrigatório'
  } else if (value.length < 3) {
    error = 'Nome deve ter pelo menos 3 letras'
  }
  return error
}

function validatePrice(value: number) {
  let error
  if (!value) {
    error = 'Preço é obrigatório'
  } else if (value < 10) {
    error = 'Preço deve ser maior que 10'
  }
  return error
}

function validateDescription(value: string) {
  let error
  if (!value) {
    error = 'Descrição é obrigatório'
  } else if (value.length < 30) {
    error = 'Descrição deve ter pelo menos 30 letras'
  } else if (value.length > 255) {
    error = 'Descrição deve ter no maximo 255 letras'
  }
  return error
}

function ProductForm() {
  const [value, setValue] = useState('');
  const format = (value: string) => Currency.format(Number(value));

  return (
    <>
      <div style={{ margin: 'auto', width: '50%', paddingTop: '10%' }}>
        <Heading>Cadastro de Produto</Heading>
        <Formik
          initialValues={{ 
            nome: '',
            preco: '', 
            descricao: '', 
            imagem: ''
          }}
          onSubmit={(values, actions) => {
            createProduct(values).then(_ => 
              actions.resetForm()
            ).catch(error => 
              console.error(error)
            ).finally(() => {
              actions.setSubmitting(false)
            })
          }}
        >
          {(props) => (
            <Form>
              <Field name='nome' validate={validateName}>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.nome && form.touched.nome}>
                    <FormLabel>Nome</FormLabel>
                    <Input {...field} placeholder='Nome' />
                    <FormErrorMessage>{form.errors.nome}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='preco' validate={validatePrice}>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.preco && form.touched.preco}>
                    <FormLabel>Preço</FormLabel>
                    <Input {...field} placeholder='R$ 0,00' type="number"/>
                    <FormErrorMessage>{form.errors.preco}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='descricao' validate={validateDescription}>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.descricao && form.touched.descricao}>
                    <FormLabel>Descrição</FormLabel>
                    <Textarea {...field} placeholder='Descrição' />
                    <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='imagem' validate={''}>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.imagem && form.touched.imagem}>
                    <FormLabel>Imagem</FormLabel>
                    <Input {...field} type='file' />
                    <FormErrorMessage>{form.errors.imagem}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <ButtonGroup variant='outline' spacing='6'>
                <Button
                  mt={4}
                  colorScheme='teal'
                  isLoading={props.isSubmitting}
                  type='submit'
                >
                  Salvar
                </Button>
                <Button
                  as='a'
                  href="/"
                  mt={4}
                >
                  Cancelar
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </>
  );
}

export default ProductForm;

