// src/Routes/Client/Carrito.jsx
import { useCart } from "../../../Context/CarritoContext.jsx";
import { Minus, Plus, Trash2 } from "lucide-react";
import { redirectToCheckout } from "../../../Api/Stripe.js";
import { obtenerItemsCarrito } from "../../../Api/CarritoItem.js";
import { useEffect } from "react";

export const Carrito = () => {
  const {
    cart,
    clearCart,
    addToCart,
    removeFromCart,
    aumentarCantidad,
    disminuirCantidad,
  } = useCart();

  const handleCheckout = async () => {
    try {
      const items = await obtenerItemsCarrito();
      const payload = items.map((item) => ({
        product_id: item.product.id || item.product,
        quantity: item.quantity,
      }));

      await redirectToCheckout(payload, () => {
        clearCart(); // ✅ Limpiar carrito en frontend
      });
    } catch (error) {
      console.error("Error al iniciar pago:", error);
      alert("No se pudo iniciar el pago.");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price * item.quantity),
    0
  );

  useEffect(() => {
    const itemEditado = JSON.parse(localStorage.getItem("editar_order_item"));
    if (itemEditado && itemEditado.id) {
      addToCart(itemEditado); // debe tener `.id` para funcionar
      localStorage.removeItem("editar_order_item");
    }
  }, []);

  return (
    <div className="lg:w-2/3">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Encabezado de la tabla (solo en pantalla grande) */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-gray-500">
          <div className="md:col-span-6">Producto</div>
          <div className="md:col-span-2 text-center">Precio</div>
          <div className="md:col-span-2 text-center">Cantidad</div>
          <div className="md:col-span-2 text-right">Total</div>
        </div>

        {/* Lista de productos */}
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 p-4">No hay productos en el carrito.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="border-b last:border-b-0 p-4 md:grid md:grid-cols-12 gap-4 items-center"
              >
                <div className="md:col-span-6 flex">
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={item.image} // Asegúrate de que los productos tengan una propiedad "image"
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex flex-col justify-between">
                    <a
                      href={`/product/${item.id}`}
                      className="font-medium text-gray-800 hover:text-shop-blue transition-colors"
                    >
                      {item.name}
                    </a>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="inline-flex items-center text-red-500 text-sm hover:text-red-700 mt-2"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Eliminar
                    </button>
                  </div>
                </div>

                {/* Precio */}
                <div className="md:col-span-2 text-center">
                  <span className="md:hidden text-gray-500">Precio:</span>
                  ${Number(item.price).toFixed(2)}
                </div>

                {/* Cantidad */}
                <div className="md:col-span-2 flex justify-between items-center mt-4 md:mt-0">
                  <span className="md:hidden text-gray-500">Cantidad:</span>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        disminuirCantidad(item.itemId, item.quantity, item.id)
                      }
                      className="w-8 h-8 border border-gray-300 rounded-l-md flex items-center justify-center"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-12 h-8 border-t border-b border-gray-300 text-center"
                      min="1"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      onClick={() =>
                        aumentarCantidad(item.itemId, item.quantity, item.id)
                      }
                      disabled={item.quantity >= item.stock}
                      className="w-8 h-8 border border-gray-300 rounded-r-md flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total por producto */}
                <div className="md:col-span-2 text-right">
                  <div className="flex justify-between md:block">
                    <span className="md:hidden text-gray-500">Total:</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Resumen del carrito */}
        <div className="mt-6 flex justify-between">
          <a
            href="/products"
            className="text-shop-blue hover:underline"
          >
            ← Continue Comprando
          </a>
          <div className="flex flex-col items-end">
            <span className="text-xl font-semibold">Total: ${total.toFixed(2)}</span>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
            >
              Realizar Pago
            </button>
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-2"
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

