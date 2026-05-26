// features/cart/components/AddToCartButton.jsx
import { useState } from "react";
import { addCartItem } from "../../../api/endpoints/cart"; 

export default function AddToCartButton({ productId }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const cartItemData = {
        product_id: productId,
        quantity: 1
      };

      const data = await addCartItem(cartItemData);
      console.log("Producto añadido al carrito con éxito:", data);


    } catch (error) {
      console.error("Error al añadir el producto al carrito:", error);
      alert("Hubo un problema al añadir el producto al carrito.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="w-full md:w-auto bg-slate-800 text-white px-xl py-xs rounded-sm font-semibold hover:bg-slate-700 transition-colors cursor-pointer text-center text-sm shadow-xs disabled:opacity-50"
    >
      {isAdding ? "Añadiendo..." : "Añadir al Carrito"}
    </button>
  );
}