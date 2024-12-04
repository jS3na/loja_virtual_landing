import Image from "next/image"

const ProdutoCard = ({ product, isPromotion = false, promoPrice = "" }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-indigo-100">
        <div className="relative h-48">
            <Image
                src={product.image_url}
                alt={product.nome}
                layout="fill"
                objectFit="cover"
            />
            {isPromotion && (
                <span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Promoção
                </span>
            )}
        </div>
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 text-indigo-800">{product.nome}</h3>
            <p className="text-sm text-indigo-600 mb-2">{product.categoria?.nome || 'Categoria não especificada'}</p>
            <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-blue-700">
                    {isPromotion ? (
                        <>
                            <span className="line-through text-gray-400 mr-2">R${product.preco}</span>
                            <span className="text-blue-600">R${promoPrice}</span>
                        </>
                    ) : (
                        `R$${product.preco}`
                    )}
                </p>
            </div>
        </div>
    </div>
)

export { ProdutoCard };