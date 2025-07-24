
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingBag } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const isEmpty = cart.items.length === 0;
  
  return (
    <>
      <Helmet>
        <title>Carrito de la compra | eCommerceIA</title>
        <meta name="description" content="Review and manage items in your shopping cart" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Carrito de la compra</h1>
            
            {isEmpty ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <ShoppingBag className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Su carrito está vacío</h2>
                <p className="text-gray-600 mb-6">
                Parece que aún no has añadido ningún producto a tu carrito.
                </p>
                <Button asChild>
                  <Link to="/products">Continue Comprando</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="lg:w-2/3">
                  <div className="bg-white rounded-lg shadow-sm">
                    {/* Headers */}
                    <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-gray-500">
                      <div className="md:col-span-6">Producto</div>
                      <div className="md:col-span-2 text-center">Precio</div>
                      <div className="md:col-span-2 text-center">Cantidad</div>
                      <div className="md:col-span-2 text-right">Total</div>
                    </div>
                    
                    {/* Items */}
                    {cart.items.map((item) => {
                      const { product } = item;
                      const price = product.discountPrice || product.price;
                      const total = price * item.quantity;
                      
                      return (
                        <div key={item.productId} className="border-b last:border-b-0">
                          <div className="p-4 md:grid md:grid-cols-12 gap-4 items-center">
                            {/* Product info (mobile and desktop) */}
                            <div className="md:col-span-6 flex">
                              <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                <img
                                    src={product.img_url || "/default-image.png"}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                
                              </div>
                              <div className="ml-4 flex flex-col justify-between">
                                <div>
                                  <Link 
                                    to={`/product/${product.id}`}
                                    className="font-medium text-gray-800 hover:text-shop-blue transition-colors"
                                  >
                                    {product.name}
                                  </Link>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.productId)}
                                  className="inline-flex items-center text-red-500 text-sm hover:text-red-700 mt-2"
                                >
                                  <Trash2 size={14} className="mr-1" />
                                  Remove
                                </button>
                              </div>
                            </div>
                            
                            {/* Price (mobile and desktop) */}
                            <div className="md:col-span-2 text-center mt-4 md:mt-0">
                              <div className="flex justify-between md:block">
                                <span className="md:hidden text-gray-500">Precio:</span>
                                <span>${price.toFixed(2)}</span>
                              </div>
                            </div>
                            
                            {/* Quantity (mobile and desktop) */}
                            <div className="md:col-span-2 flex justify-between md:justify-center items-center mt-4 md:mt-0">
                              <span className="md:hidden text-gray-500">Cantidad:</span>
                              <div className="flex items-center">
                                <button
                                  className="w-8 h-8 border border-gray-300 rounded-l-md flex items-center justify-center"
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  className="w-12 h-8 border-t border-b border-gray-300 text-center"
                                  value={item.quantity}
                                  min="1"
                                  onChange={(e) => updateQuantity(item.productId, Math.max(1, parseInt(e.target.value) || 1))}
                                />
                                <button
                                  className="w-8 h-8 border border-gray-300 rounded-r-md flex items-center justify-center"
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            
                            {/* Total (mobile and desktop) */}
                            <div className="md:col-span-2 text-right mt-4 md:mt-0">
                              <div className="flex justify-between md:block">
                                <span className="md:hidden text-gray-500">Total:</span>
                                <span className="font-medium">${total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Link to="/products" className="text-shop-blue hover:underline">
                      ← Continue Comprando
                    </Link>
                  </div>
                </div>
                
                {/* Order Summary */}
                <div className="lg:w-1/3">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Resumen del pedido</h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Envío</span>
                        <span>Calculado a pagar</span>
                      </div>
                      
                      <div className="border-t pt-4 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-6 bg-shop-blue hover:bg-shop-lightBlue h-12 text-base" asChild>
                      <Link to="/checkout">Proceder al pago</Link>
                    </Button>
                    
                    {/* Payment Methods */}
                    <div className="mt-6">
                      <p className="text-sm text-gray-500 mb-2">Aceptamos:</p>
                      <div className="flex space-x-2">
                        <div className="h-6 w-10 bg-gray-200 rounded"></div>
                        <div className="h-6 w-10 bg-gray-200 rounded"></div>
                        <div className="h-6 w-10 bg-gray-200 rounded"></div>
                        <div className="h-6 w-10 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CartPage;
