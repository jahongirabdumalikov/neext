import React from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import '@/styles/product-card.scss';

interface ProductCardProps {
  product: Product;
  onClick: (productId: number) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-card__image" onClick={() => onClick(product.id)}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={200}
          priority
        />
      </div>
      <div className="product-card__content">
        <h3 className="product-card__title" onClick={() => onClick(product.id)}>{product.title}</h3>
        <div className="product-card__price">${product.price}</div>
        <div className="product-card__rating">
         
        </div>
      
    
      </div>
    </div>
  );
}; 