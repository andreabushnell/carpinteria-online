import { Link } from "react-router-dom";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const productPrice = item.product?.price || 0;
  const productName = item.product?.name || "Cargando pieza...";
  const productId = item.product?.id || "";
  

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-sm first:pt-0 last:pb-0 border-b border-surface last:border-b-0 gap-sm">
      
      <div className="flex items-center space-x-sm w-full sm:w-auto">
        <div className="w-16 h-16 bg-slate-50 shrink-0 overflow-hidden border border-surface rounded-xxs">
          <img
            src={item.product?.image || "/placeholder.png"}
            alt={productName}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div>
          <Link 
            to={`/products/${productId}`} 
            className="text-sm font-bold text-slate-900 font-display hover:underline line-clamp-1"
          >
            {productName}
          </Link>
          <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
            Precio: ${productPrice}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-md pt-xxs sm:pt-0">
        
        <div className="flex items-center border border-surface rounded-xxs bg-slate-50">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="px-xs py-xxs hover:bg-slate-200 disabled:opacity-30 transition-colors text-xs font-bold cursor-pointer"
          >
            -
          </button>
          <span className="px-xs text-xs font-semibold font-body text-slate-800 min-w-5 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="px-xs py-xxs hover:bg-slate-200 transition-colors text-xs font-bold cursor-pointer"
          >
            +
          </button>
        </div>

        <div className="flex items-center space-x-sm">
          <p className="text-sm font-semibold text-slate-900 font-body min-w-16 text-right">
            ${(productPrice * item.quantity).toFixed(2)}
          </p>
          <button
            onClick={() => onRemove(item.id)}
            className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer text-base p-xxs"
            title="Eliminar artículo"
          >
            &#128465;
          </button>
        </div>

      </div>
    </div>
  );
}