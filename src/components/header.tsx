"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import "@/styles/header.scss";

const Header = () => {
  const router = useRouter();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo">
          Shop
        </Link>

        <form onSubmit={handleSearch} className="header__search">
          <div className="header__search-wrapper">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="header__search-input"
            />
            <button type="submit" className="header__search-button">
              <Search className="header__search-icon" size={20} />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
