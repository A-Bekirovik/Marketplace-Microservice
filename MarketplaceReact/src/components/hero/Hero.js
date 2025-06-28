import { Link } from "react-router-dom";

export const Hero = ({ products }) => {
  return (
    <div className="flex flex-wrap justify-center gap-5 p-5">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.productId}
            className="bg-white border border-gray-300 p-5 rounded-md w-56 text-center shadow-md transition-transform transform hover:scale-105"
          >
            <h3 className="text-blue mb-2">
              <Link to={`/products/${product.productId}`}>
                {product.productName}
              </Link>
            </h3>
            <p className="text-gray-700 mb-2">{product.productDescription}</p>
            <p className="text-green-600 font-bold">
              Price: ${product.productPrice}
            </p>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Hero;
