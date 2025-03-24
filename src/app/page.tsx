"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pagination, Stack, FormControl, InputLabel, Select, MenuItem, Box, IconButton, Tooltip } from '@mui/material';
import { Clear } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import '@/styles/home.scss';
import { Product, ProductsResponse } from '@/types/product';
import { getProducts } from '@/utils/API';
import Loading from '@/components/Loading';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>('all');
  const [brand, setBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const { data, isLoading, error } = useQuery<ProductsResponse>({
    queryKey: ['products', page],
    queryFn: () => getProducts(100, 0), 
    placeholderData: (previousData) => previousData,
  });

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
    setPage(1); 
  };

  const handleBrandChange = (event: any) => {
    setBrand(event.target.value);
    setPage(1); 
  };

  const handlePriceRangeChange = (event: any) => {
    setPriceRange(event.target.value);
    setPage(1); 
  };

  const handleClearFilters = () => {
    setCategory('all');
    setBrand('all');
    setPriceRange('all');
    setPage(1);
  };

  const hasActiveFilters = category !== 'all' || brand !== 'all' || priceRange !== 'all';

  if (isLoading) {
    return (
      <main className="home">
        <div className="home__container">
          <Loading />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="home">
        <div className="home__container">
          <div className="error">Mahsulotlar yuklanmadi</div>
        </div>
      </main>
    );
  }

  let filteredProducts = data?.products || [];
  
  if (category !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }
  
  if (brand !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.brand === brand);
  }
  
  if (priceRange !== 'all') {
    const [min, max] = priceRange.split('-').map(Number);
    filteredProducts = filteredProducts.filter(product => 
      product.price >= min && product.price <= max
    );
  }

  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(skip, skip + ITEMS_PER_PAGE);

  const categories = Array.from(new Set(data?.products.map(p => p.category) || []));
  const brands = Array.from(new Set(data?.products.map(p => p.brand) || []));

  return (
    <main className="home">
      <div className="home__container">
        
       
        
        <div className="home__products">
          {paginatedProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={handleProductClick}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Stack spacing={2} alignItems="center" className="home__pagination">
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
      </div>
    </main>
  );
}
