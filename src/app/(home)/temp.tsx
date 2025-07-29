'use client';

import { useState } from 'react';
import styles from './home.module.css';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  favorite: boolean;
}

const initialProducts: Product[] = [
  { id: 1, name: "Keyboard", price: 50, quantity: 10, favorite: false },
  { id: 2, name: "Mouse", price: 20, quantity: 25, favorite: false },
  { id: 3, name: "Monitor", price: 200, quantity: 5, favorite: false }
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.quantity) {
      setProducts([...products, {
        id: products.length + 1,
        name: newProduct.name,
        price: Number(newProduct.price),
        quantity: Number(newProduct.quantity),
        favorite: false
      }]);
      setNewProduct({});
    }
  };

  const toggleFavorite = (id: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, favorite: !p.favorite } : p
    ));
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const totalValue = products.reduce((total, p) => total + p.price * p.quantity, 0);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Inventory Management</h1>
        
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name || ''}
            onChange={e => setNewProduct({...newProduct, name: e.target.value})}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price || ''}
            onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newProduct.quantity || ''}
            onChange={e => setNewProduct({...newProduct, quantity: Number(e.target.value)})}
          />
          <button onClick={addProduct} className={styles.primary}>Add Product</button>
        </div>

        <div className={styles.inventory}>
          {products.map(product => (
            <div key={product.id} className={styles.product}>
              <div 
                className={styles.heart}
                onClick={() => toggleFavorite(product.id)}
              >
                {product.favorite ? '❤️' : '🤍'}
              </div>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Total: ${product.price * product.quantity}</p>
              <p>Favorite: {product.favorite ? '1' : '0'}</p>
              <button 
                onClick={() => removeProduct(product.id)}
                className={styles.secondary}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className={styles.totalValue}>
          <h2>Total Inventory Value: ${totalValue}</h2>
        </div>
      </main>
    </div>
  );
}
