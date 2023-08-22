import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    console.log(data);
    setProducts(data.products);
    setFilteredProducts(data.products);
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    if (minPriceFilter !== '') {
      filtered = filtered.filter(product => product.price >= parseFloat(minPriceFilter));
    }

    if (maxPriceFilter !== '') {
      filtered = filtered.filter(product => product.price <= parseFloat(maxPriceFilter));
    }

    setFilteredProducts(filtered);
  };

  const sortProducts = () => {
    const sorted = [...filteredProducts];

    if (sortBy === 'name') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(sorted);
  };

  return (
    <div className="App">
      <h1>Product Catalog</h1>
      <div>
        <label htmlFor="category">Category:</label>
        <select id="category" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="">All</option>
          <option value="smartphones">smartphones</option>
          <option value="groceries">groceries</option>
        </select>

        <label htmlFor="minPrice">Min Price:</label>
        <input type="number" id="minPrice" value={minPriceFilter} onChange={e => setMinPriceFilter(e.target.value)} />

        <label htmlFor="maxPrice">Max Price:</label>
        <input type="number" id="maxPrice" value={maxPriceFilter} onChange={e => setMaxPriceFilter(e.target.value)} />

        <button onClick={applyFilters}>Apply Filters</button>
      </div>
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="price">Price</option>
        
        </select>

        <button onClick={sortProducts}>Sort</button>
      </div>
      <div className="product-list">
        {filteredProducts.length>0 && filteredProducts.map(product => (
          <div className="product" key={product.id}>
            <img src={product.images[0]} alt={product.name} />
            <div>
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
