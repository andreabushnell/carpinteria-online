export default function ProductDetailPanel({ product, children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-md border border-surface p-sm bg-white rounded-sm shadow-sm w-full items-start">
      
      <div className="w-full h-80 md:h-96 bg-slate-50 flex items-center justify-center overflow-hidden border border-surface rounded-xxs">
        <img 
          src={product.image || '/placeholder.png'} 
          alt={product.name} 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="flex flex-col space-y-sm w-full">
        <div>
          <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
            Carpintería Artesanal
          </span>
          <h1 className="text-2xl font-bold font-display mt-xxs text-slate-900">
            {product.name}
          </h1>
        </div>

        <p className="text-xl font-semibold text-accent font-body">
          ${product.price}
        </p>

        <div className="border-t border-surface pt-xs">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-700 mb-xxs">
            Descripción del Producto
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-body">
            {product.description || "Esta pieza exclusiva está fabricada a mano por nuestros maestros carpinteros, utilizando maderas seleccionadas de la más alta calidad y un acabado natural protector."}
          </p>
        </div>

        {children && (
          <div className="pt-xs">
            {children}
          </div>
        )}

      </div>
    </div>
  );
}