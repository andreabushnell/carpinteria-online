import { useCart } from "../features/cart/useCart";

export default function Cart() {
  const { cart } = useCart();

  if (!cart) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Tu carrito</h1>
      {cart.items.map(item => (
        <div key={item.id}>
          {item.product_name} × {item.quantity}
        </div>
      ))}
    </div>
  );
}