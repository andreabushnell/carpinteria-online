import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

  return (
    <div className="border border-surface p-xs flex flex-col w-full bg-white transition-shadow hover:shadow-md h-full">
      <img
        src={product.image || '/placeholder.png'}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <h3 className="font-semibold mt-xs mb-2 truncate" title={product.name}>
        {product.name}
      </h3>

      <div className="mt-auto flex justify-between items-center">

        <p className="text-accent font-medium">${product.price}</p>

        <Link
          to={`/products/${product.id}`}
          className="bg-slate-800 text-white px-3 py-1 text-sm rounded hover:bg-slate-700 transition-colors text-center"
        >
          Ver
        </Link>

      </div>
    </div>
  );
}