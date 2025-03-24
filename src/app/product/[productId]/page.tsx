"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import "@/styles/product.scss";
import { Product } from "@/types/product";
import { getProductById } from "@/utils/API";
import Loading from "@/components/Loading";

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = Number(params.productId);
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        setError("Mahsulot topilmadi");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.productId]);

  if (loading) {
    return (
      <main className="product">
        <div className="product__container">
          <Loading />
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product">
        <div className="product__container">
          <div className="error">{error}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="product">
      <div className="product__container container">
        <div className="product__content">
          <div className="product__gallery">
            <div className="product__main-image">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={500}
                height={500}
                className="product__img"
                priority
              />
            </div>
            <div className="product__images">
              {product.images.map((image, index) => (
                <div key={index} className="product__image-thumbnail">
                  <Image
                    src={image}
                    alt={`${product.title} - ${index + 1}`}
                    width={100}
                    height={100}
                    className="product__thumbnail"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
