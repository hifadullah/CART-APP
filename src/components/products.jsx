// src/components/Products.jsx
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice"; // Assuming you have an add action in your cartSlice

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.example.com/products"); // Replace with your API endpoint
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    dispatch(add(product));
  };

  return (
    <div className="products-container">
      {products.map((product) => (
        <Card key={product.id} style={{ width: "18rem" }} className="m-3">
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.title}
            style={{ width: "250px", height: "200px" }}
          />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
              Price: <i className="fa fa-inr"></i> {product.price}
            </Card.Text>
            <Button variant="dark" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Products;
