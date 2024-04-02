import React, { useState, ChangeEvent, FormEvent } from 'react';
import { createProduct } from '../../services/api'
import { Product } from '../../types/Product'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductForm () {
  const [product, setProduct] = useState<Product>({
    nome: '',
    descricao: '',
    preco: 0,
    imagem: ''
  });

  const [error, setError] = useState<string[]>([])

  const handleInputChange = (e: any): void => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files && e.target.files[0];
    if(file){
      const imageUrl = URL.createObjectURL(file);
      setProduct({ ...product, imagem: imageUrl });
    }
  };

  const saveProduct = async (e: FormEvent) => {
    e.preventDefault();
    setProduct({
      nome: '',
      descricao: '',
      preco: 0,
      imagem:'' 
    });
    try {
      await createProduct(product);
    } catch(error){
      setError(error.message)
    }
  };

  return (
    <form onSubmit={saveProduct}>
      <label>Nome</label>
      <input type="text" name="nome" value={product.nome} onChange={handleInputChange} required />

      <label>Descrição</label>
      <input type="text" name="descricao" value={product.descricao} onChange={handleInputChange} required />

      <label>Preço</label>
      <input type="number" name="preco" value={product.preco} onChange={handleInputChange} required />

      <label>Imagem</label>
      <input type="file" name="imagem" onChange={handleFileChange} accept="image/*" />

      <button type="submit">Salvar</button>
      <ToastContainer />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}

export default ProductForm;

