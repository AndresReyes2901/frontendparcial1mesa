import { useEffect, useState } from "react";
import { obtenerProductosRecomendados } from "../../Api/Product";

export const Home = () => {
  const [productosRecomendados, setProductoRecomendados] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await obtenerProductosRecomendados();
        setProductoRecomendados(data);
      } catch (error) {
        console.error("Error al Cargar Productos", error.message);
      }
    };
    cargarProductos();
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Hero Section Modificado */}
      <div className="relative bg-gradient-to-r from-pink-500 to-purple-500 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Texto del Hero */}
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Bienvenidos a <span className="text-yellow-300">eComerciaIA</span>
              </h1>
              <p className="mt-4 text-lg text-white/90 max-w-lg mx-auto md:mx-0 mb-8">
                Tu destino para encontrar los mejores productos tecnológicos al mejor precio.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <a
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 h-auto rounded-full"
                >
                  Ver Productos
                </a>
                <a
                  href="/category/electronics"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground bg-white/10 hover:bg-white/20 text-white border-white px-8 py-3 h-auto rounded-full"
                >
                  Ofertas Especiales
                </a>
              </div>
            </div>

            {/* Imagen del Hero */}
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop"
                  alt="Tecnología moderna"
                  className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-xl hidden md:block">
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-100 rounded-full p-2">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Envío Gratis</p>
                      <p className="text-xs text-gray-500">En compras mayores a $99</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Productos Recomendados */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recomendados para ti</h2>

        {productosRecomendados.length === 0 ? (
          <p className="text-center text-gray-500">No hay recomendaciones disponibles.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productosRecomendados.map((producto) => (
              <div
                key={producto.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
              >
                {/* Imagen del producto o predeterminada */}
                <img
                  src={producto.img_url || "/default-image.png"}
                  alt={producto.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-image.png"; // Imagen local en /public
                  }}
                />
                <h3 className="text-sm font-semibold text-center mb-1">{producto.name}</h3>
                <p className="text-green-700 font-bold text-sm">${Number(producto.price).toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
