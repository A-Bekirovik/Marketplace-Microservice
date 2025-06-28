import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

function ProductCreate() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState([]);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !productDescription || !productPrice) {
      alert("Please fill in all required fields.");
      return;
    }

    const newProduct = {
      productName,
      productDescription,
      productImage,
      productPrice,
      productCategory,
    };

    try {
      const response = await api.post("/products", newProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        alert("Product created successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("There was an error creating the product:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Create New Product
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Product Name:
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Product Description:
          </label>
          <textarea
            className="w-full border border-gray-300 p-2 rounded-md"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Product Image:
          </label>
          <input
            type="file"
            className="w-full border border-gray-300 p-2 rounded-md"
            onChange={(e) => setProductImage(e.target.files[0])}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Product Price:
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={productPrice}
            onChange={(e) => setProductPrice(parseFloat(e.target.value))}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Product Category:
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value.split(","))}
            placeholder="Enter categories separated by commas"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductCreate;
