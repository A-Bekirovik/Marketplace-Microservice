import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

function ProductUpdate() {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productImage: null,
    productPrice: 0,
    productCategory: "",
  });
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/products/${productId}`, product, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Product updated successfully!");
        navigate("/"); // Redirect to home or product list after update
      }
    } catch (error) {
      console.error("There was an error updating the product:", error);
      setError("Failed to update the product.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      <div className="text-2xl font-semibold text-gray-800 mb-6">
        Edit Product
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-gray-700 font-medium mb-1"
          >
            Product Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-md"
            id="productName"
            name="productName"
            value={product.productName}
            onChange={handleInput}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="productDescription"
            className="block text-gray-700 font-medium mb-1"
          >
            Product Description
          </label>
          <textarea
            className="w-full border border-gray-300 p-2 rounded-md"
            id="productDescription"
            name="productDescription"
            value={product.productDescription}
            onChange={handleInput}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="productPrice"
            className="block text-gray-700 font-medium mb-1"
          >
            Product Price
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 p-2 rounded-md"
            id="productPrice"
            name="productPrice"
            value={product.productPrice}
            onChange={handleInput}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="productCategory"
            className="block text-gray-700 font-medium mb-1"
          >
            Product Category
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-md"
            id="productCategory"
            name="productCategory"
            value={product.productCategory}
            onChange={handleInput}
            placeholder="Enter categories separated by commas"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="productImage"
            className="block text-gray-700 font-medium mb-1"
          >
            Product Image (Optional)
          </label>
          <input
            type="file"
            className="w-full border border-gray-300 p-2 rounded-md"
            id="productImage"
            name="productImage"
            onChange={(e) =>
              setProduct({ ...product, productImage: e.target.files[0] })
            }
          />
        </div>

        <button
          type="submit"
          className="bg-blue text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-colors duration-300"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default ProductUpdate;
