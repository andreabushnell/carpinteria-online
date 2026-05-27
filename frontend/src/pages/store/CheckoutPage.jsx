import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCart } from "../../api/endpoints/cart";
import { createOrder } from "../../api/endpoints/orders"; 

export default function CheckoutPage() {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "España"
  });
  
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    const loadCartData = async () => {
      try {
        const data = await getCart();
        const userCart = data.results && data.results[0];
        const items = userCart?.items || [];
        
        if (items.length === 0 && !isLoading) {
          navigate("/cart");
        }
        setCartItems(items);
      } catch (error) {
        console.error("Error al cargar los datos para el checkout:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCartData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = 
    formData.fullName.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.zipCode.trim() !== "";

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (item.product?.price || 0) * item.quantity;
  }, 0);
  const shippingCosts = subtotal > 0 ? 15.00 : 0.00;
  const total = subtotal + shippingCosts;

  const handleSubmitOrder = async () => {
    setIsTouched(true);
    if (!isFormValid) return;

    try {
      const fullAddressString = `${formData.fullName} - ${formData.address}, ${formData.zipCode}, ${formData.city}, ${formData.country}`;
      
      await createOrder({
        shipping_address: fullAddressString
      });

      navigate("/order-success");
    } catch (error) {
      console.error("Error al procesar el pedido en el servidor:", error);
      alert("Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-sm py-xl text-center text-slate-600 font-body">
        Preparando tu pasarela de pago...
      </div>
    );
  }

  return (
    <div className="col-span-8 container mx-auto px-sm py-md w-full max-w-5xl">
      
      <div className="mb-sm">
        <Link 
          to="/cart" 
          className="inline-flex items-center space-x-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group py-xxs"
        >
          <span className="text-lg transform group-hover:-translate-x-0.5 transition-transform">
            &#8592;
          </span>
          <span className="font-medium text-sm font-body">
            Volver al carrito
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-md border border-surface p-sm bg-white rounded-sm shadow-sm w-full items-start">
        
        <div className="md:col-span-2 flex flex-col w-full">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-700 mb-sm border-b border-surface pb-xxs">
            Información de Envío
          </h2>

          <form className="space-y-sm font-body text-sm pr-xs">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-xxs">Nombre Completo</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full p-xs border rounded-xxs focus:outline-none focus:border-slate-900 transition-colors ${
                  isTouched && !formData.fullName.trim() ? "border-red-400 bg-red-50" : "border-surface"
                }`}
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-xxs">Dirección de entrega</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full p-xs border rounded-xxs focus:outline-none focus:border-slate-900 transition-colors ${
                  isTouched && !formData.address.trim() ? "border-red-400 bg-red-50" : "border-surface"
                }`}
                placeholder="Calle Mayor Nro 14, Piso 2B"
              />
            </div>

            <div className="grid grid-cols-2 gap-sm">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-xxs">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full p-xs border rounded-xxs focus:outline-none focus:border-slate-900 transition-colors ${
                    isTouched && !formData.city.trim() ? "border-red-400 bg-red-50" : "border-surface"
                  }`}
                  placeholder="Madrid"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-xxs">Código Postal</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={`w-full p-xs border rounded-xxs focus:outline-none focus:border-slate-900 transition-colors ${
                    isTouched && !formData.zipCode.trim() ? "border-red-400 bg-red-50" : "border-surface"
                  }`}
                  placeholder="28001"
                />
              </div>
            </div>

            {isTouched && !isFormValid && (
              <p className="text-xs text-red-500 font-semibold italic pt-xxs">
                ⚠️ Por favor, rellena todos los campos obligatorios para continuar.
              </p>
            )}
          </form>
        </div>

        <div className="md:col-span-1 bg-slate-50 p-sm border border-surface rounded-xxs flex flex-col space-y-xs w-full md:sticky md:top-4">
          <div>
            <span className="text-xxs uppercase tracking-wider text-neutral-400 font-semibold">
              Resumen del pedido
            </span>
            <h2 className="text-md font-bold font-display text-slate-900 mt-xxs">
              Total a pagar
            </h2>
          </div>

          <div className="border-t border-surface pt-xs space-y-xxs text-xs font-body">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Gastos de envío</span>
              <span>${shippingCosts.toFixed(2)}</span>
            </div>
            
            <div className="border-t border-surface pt-xs flex justify-between font-bold text-sm text-slate-900">
              <span>Total final</span>
              <span className="text-accent">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-xs">
            <button
              type="button"
              onClick={handleSubmitOrder}
              disabled={isTouched && !isFormValid}
              className={`w-full text-center px-sm py-xs font-medium text-xs uppercase tracking-wider transition-all rounded-xxs font-display shadow-sm ${
                isFormValid 
                  ? "bg-slate-900 hover:bg-slate-800 text-white cursor-pointer" 
                  : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-75"
              }`}
            >
              Tramitar pedido
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}