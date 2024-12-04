"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import api from "@/utils/api"
import CartLogo from '@/images/cart-logo.png'
import { ProdutoCard } from "@/components/ProdutoCard"

export default function Home() {
  const [produtos, setProdutos] = useState([])
  const [promocoes, setPromocoes] = useState([])
  const [categorias, setCategorias] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filteredProdutos, setFilteredProdutos] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    fetchProdutos()
    fetchCategorias()
    fetchPromocoes()
  }, [])

  useEffect(() => {
    filterProdutos()

    console.log(produtos)
    console.log(categorias)
    console.log(promocoes)
  }, [produtos, searchTerm, selectedCategory])

  useEffect(() => {

    console.log(produtos)
    console.log(categorias)
    console.log(promocoes)
  }, [promocoes])

  const fetchProdutos = async () => {
    setIsLoading(true)
    try {
      const response = await api.get("/produtos")
      setProdutos(response.data)
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategorias = async () => {
    setIsLoading(true)
    try {
      const response = await api.get("/categorias")
      setCategorias(response.data)
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchPromocoes = async () => {
    setIsLoading(true)
    try {
      const response = await api.get("/promocoes")
      setPromocoes(response.data)
    } catch (error) {
      console.error("Erro ao buscar promocoes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterProdutos = () => {
    let filtered = produtos
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.nome.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (selectedCategory) {
      filtered = filtered.filter(product => product.categoria.id.toString() === selectedCategory)
    }
    setFilteredProdutos(filtered)
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-indigo-50">
      <header className="text-center mb-12 bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-8 rounded-lg shadow-lg">
        <Image
          src={CartLogo}
          alt="Logo da Loja"
          width={120}
          height={120}
          className="mx-auto mb-4 bg-white p-2 rounded-full"
        />
        <h1 className="text-4xl font-bold mb-2">Bem-vindo à Nossa Loja Virtual</h1>
        <p className="text-xl">Descubra ofertas incríveis e produtos de qualidade!</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-[200px] px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-indigo-800"
        >
          <option value="">Todas as categorias</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id.toString()}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Promoções</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {promocoes.map((promocao) => (
            <ProdutoCard
              key={promocao.id}
              product={promocao.produto}
              isPromotion
              promoPrice={promocao.preco_promocao}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Nossos Produtos</h2>
        {isLoading ? (
          <p className="text-center text-indigo-600">Carregando produtos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProdutos.map((produto) => (
              <ProdutoCard key={produto.id} product={produto} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

