import React, { useEffect, useState } from "react";

const Check = () => {
  const [products, setProducts] = useState([]);      // ← array, not string
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    // better name and proper placement
    async function fetchProducts() {
      try {
        const res  = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();                // ← await here
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();  // ← actually call it once, on mount
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold">Product List</h1>
      {/* <ul>
        {products.map(p => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul> */}
      {products.map(p=>
        <h1>{p.title}</h1>
      )}
    </>
  );
};

export default Check;
