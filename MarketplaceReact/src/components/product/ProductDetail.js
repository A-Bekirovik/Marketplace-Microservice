import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Correctly define error state
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    console.log("Deleting product with id: ", id);
    setIsLoading(true);
    try {
      const response = await api.delete(`/products/${productId}`);

      if (response.status === 200 || response.status === 204) {
        alert("Product deleted successfully!");
        navigate("/");
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error deleting product: ", error);
    } finally {
      setIsLoading(false);
    }

    navigate("/");
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details", error);
        setError("Failed to load product details.");
      }
    };
    fetchProductDetails();
  }, [productId, setError]); // Include setError in dependencies

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-6 bg-white rounded-md max-w-xl mx-auto mt-5 shadow-md text-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-3">
        {product.productName}
      </h1>
      <p className="text-lg text-gray-700 mb-3">{product.productDescription}</p>
      <p className="text-lg font-bold text-green-600">
        Price: ${product.productPrice}
      </p>
      <div className="flex justify-center gap-4 mt-6">
        <Link
          to={`/products/${productId}/ProductUpdate`}
          className="bg-blue text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Update
        </Link>
        <button
          className={`bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => handleDelete(productId)}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
        <Link
          to="/"
          className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
        >
          Back
        </Link>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}{" "}
      {/* Display error if it exists */}
    </div>
  );
};

export default ProductDetail;
