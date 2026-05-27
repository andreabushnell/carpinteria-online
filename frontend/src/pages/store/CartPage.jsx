import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; 
import CartItem from "../../features/cart/store/CartItem";
import { getCart, updateCartItemQuantity, removeCartItem } from "../../api/endpoints/cart";

export default function CartPage() {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCartData = async () => {
      try {
        const data = await getCart();
        const userCart = data.results && data.results[0];
        setCartItems(userCart?.items || []); 
      } catch (error) {
        console.error("Error al traer el carrito del servidor:", error);
        setCartItems([]); 
      } finally {
        setIsLoading(false);
      }
    };

    loadCartData();
  }, []);

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    try {
      await updateCartItemQuantity(cartItemId, newQuantity);
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("No se pudo actualizar la cantidad en el servidor:", error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);
      setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    } catch (error) {
      console.error("No se pudo eliminar el producto en el servidor:", error);
    }
  };

// 1. Calculamos el subtotal base de los productos
const subtotal = cartItems.reduce((acc, item) => {
  const price = item.product?.price || 0;
  return acc + price * item.quantity;
}, 0);

const iva = subtotal * 0.21;
const total = subtotal + iva;

  if (isLoading) {
    return (
      <div className="container mx-auto px-sm py-xl text-center text-slate-600 font-body">
        Cargando las piezas de tu carrito...
      </div>
    );
  }

  return (
    <div className="col-span-8 container mx-auto px-sm py-md w-full max-w-5xl">
      
      <div className="mb-sm">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group py-xxs"
        >
          <span className="text-lg transform group-hover:-translate-x-0.5 transition-transform">
            &#8592;
          </span>
          <span className="font-medium text-sm font-body">
            Volver al catálogo
          </span>
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="border border-surface p-xl bg-white rounded-sm shadow-sm text-center">
          <p className="text-sm text-slate-500 font-body italic mb-sm">
            Tu carrito de compras está vacío.
          </p>
          <Link
            to="/"
            className="inline-block px-sm py-xxs bg-slate-900 hover:bg-slate-800 text-white text-xs uppercase tracking-wider font-semibold rounded-xxs transition-colors"
          >
            Explorar piezas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md border border-surface p-sm bg-white rounded-sm shadow-sm w-full items-start">
          
          <div className="md:col-span-2 flex flex-col w-full">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-700 mb-sm border-b border-surface pb-xxs">
              Artículos seleccionados ({cartItems.length})
            </h2>
            
            <div className="flex flex-col max-h-[calc(100vh-240px)] overflow-y-auto pr-xs custom-scrollbar">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id} 
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
          </div>

          <div className="md:col-span-1 bg-slate-50 p-sm border border-surface rounded-xxs flex flex-col space-y-xs w-full md:sticky md:top-4">
            <div>
              <span className="text-xxs uppercase tracking-wider text-neutral-400 font-semibold">
                Resumen de Compra
              </span>
              <h2 className="text-md font-bold font-display text-slate-900 mt-xxs">
                Detalle del cobro
              </h2>
            </div>

<div className="border-t border-surface pt-xs space-y-xxs text-xs font-body">
  <div className="flex justify-between text-slate-600">
    <span>Subtotal (Base imponible)</span>
    <span>${subtotal.toFixed(2)}</span>
  </div>
  <div className="flex justify-between text-slate-600">
    <span>IVA (21%)</span>
    <span>${iva.toFixed(2)}</span>
  </div>
  
  <div className="border-t border-surface pt-xs flex justify-between font-bold text-sm text-slate-900">
    <span>Total (IVA incluido)</span>
    <span className="text-accent">${total.toFixed(2)}</span>
  </div>
</div>

            <div className="pt-xs">
              <button
                onClick={() => navigate("/checkout")}
                className="w-full text-center px-sm py-xs bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs uppercase tracking-wider transition-colors rounded-xxs font-display cursor-pointer shadow-sm"
              >
                Tramitar pedido
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}