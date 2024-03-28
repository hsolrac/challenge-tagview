import React, { useState, ChangeEvent, FormEvent } from 'react';
import { createProduct } from '../../services/api'
import { Product } from '../../types/Product'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductForm: React.FC = () => {

  const [product, setProduct] = useState<Product>({
    nome: '',
    descricao: '',
    preco: 0,
    imagem: null
  });

  const [error, setError] = useState<string[]>([])

  const handleInputChange = (e: any): void => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files && e.target.files[0];
    setProduct({ ...product, imagem: file || null });
  };

  const saveProduct = async (e: FormEvent) => {
    e.preventDefault();
    setProduct({
      nome: '',
      descricao: '',
      preco: 0,
      imagem: null
    });
    try {
      await createProduct(product);
    } catch(error){
      setError(error.message)
    }

    console.log(error)
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

