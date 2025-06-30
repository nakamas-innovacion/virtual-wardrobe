import { useState } from 'react'
import { ArrowLeft, Search, Heart, Star, ShoppingBag, Filter, TrendingUp, Eye, Plus, Bookmark, X, Check, Sparkles, Users, Zap } from 'lucide-react'
import {CatalogService} from '../services/CatalogService'
import { mockCatalogData } from '../data/initialData'

const CatalogView = ({ onNavigate, onAddToWardrobe, clothingItems = [] }) => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [likedItems, setLikedItems] = useState(new Set([2, 5]))
  const [viewMode, setViewMode] = useState('grid')
  const [selectedForTryOn, setSelectedForTryOn] = useState([])
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false)
  const [outfitAnalysis, setOutfitAnalysis] = useState(null)
  
  const catalogService = new CatalogService()
  
  const categories = [
    { id: 'all', label: 'Todo', icon: '👗' },
    { id: 'tops', label: 'Tops', icon: '👔' },
    { id: 'bottoms', label: 'Pantalones', icon: '👖' },
    { id: 'shoes', label: 'Zapatos', icon: '👟' },
    { id: 'accessories', label: 'Accesorios', icon: '👜' }
  ]
  
  const filters = [
    { id: 'all', label: 'Todo' },
    { id: 'trending', label: 'Tendencia', icon: TrendingUp },
    { id: 'new', label: 'Nuevo', icon: Plus },
    { id: 'sale', label: 'Oferta', icon: Star },
    { id: 'featured', label: 'Destacado', icon: Bookmark }
  ]

  const filteredItems = mockCatalogData.filter(item => {
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory
    const filterMatch = activeFilter === 'all' || item.tags.includes(activeFilter)
    const searchMatch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && filterMatch && searchMatch
  })

  const formatPrice = (price) => {
    return price.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    })
  }

  const toggleLike = (itemId) => {
    const newLikedItems = new Set(likedItems)
    if (newLikedItems.has(itemId)) {
      newLikedItems.delete(itemId)
    } else {
      newLikedItems.add(itemId)
    }
    setLikedItems(newLikedItems)
  }

  const handleAddToWardrobe = (item) => {
    if (onAddToWardrobe) {
      onAddToWardrobe({
        id: Date.now(),
        name: item.name,
        category: item.category,
        brand: item.brand,
        color: `bg-${item.colors[0].toLowerCase().replace(' ', '-')}`,
        season: item.season,
        image: item.image
      })
    }
    alert(`${item.name} agregado al armario!`)
  }

  const toggleTryOn = (item) => {
    const isSelected = selectedForTryOn.find(selected => selected.id === item.id)
    
    if (isSelected) {
      setSelectedForTryOn(selectedForTryOn.filter(selected => selected.id !== item.id))
    } else {
      // Limitar a 4 prendas para la prueba virtual
      if (selectedForTryOn.length < 4) {
        setSelectedForTryOn([...selectedForTryOn, item])
      } else {
        alert('Máximo 4 prendas para la prueba virtual')
      }
    }
  }

  const startVirtualTryOn = () => {
    if (selectedForTryOn.length === 0) {
      alert('Selecciona al menos una prenda para probar')
      return
    }

    const virtualOutfit = catalogService.createVirtualOutfit(selectedForTryOn, clothingItems)
    setOutfitAnalysis(virtualOutfit)
    setShowVirtualTryOn(true)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    if (score >= 40) return 'bg-orange-100'
    return 'bg-red-100'
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => onNavigate('home')}>
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-800">Catálogo de Moda</h1>
            <div className="ml-auto flex gap-2">
              {selectedForTryOn.length > 0 && (
                <button 
                  onClick={startVirtualTryOn}
                  className="bg-purple-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Probar ({selectedForTryOn.length})
                </button>
              )}
              <button 
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Filter className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar marcas, estilos, colores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-full text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Trending Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Prueba Virtual Inteligente</h2>
          </div>
          <p className="text-sm opacity-90">Selecciona prendas y usa IA para ver cómo combinan antes de comprar</p>
          <div className="flex gap-2 mt-4">
            <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs">#VirtualTryOn</span>
            <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs">#SmartStyling</span>
            <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs">#AIFashion</span>
          </div>
        </div>

        {/* Try On Selection Bar */}
        {selectedForTryOn.length > 0 && (
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-slate-800">Seleccionadas para probar</h3>
              <button 
                onClick={() => setSelectedForTryOn([])}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {selectedForTryOn.map(item => (
                <div key={item.id} className="flex-shrink-0 relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <button 
                    onClick={() => toggleTryOn(item)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={startVirtualTryOn}
              className="w-full mt-3 bg-purple-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Analizar Combinación
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-xl font-bold text-purple-600">{mockCatalogData.length}</div>
            <div className="text-xs text-slate-500">Productos</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-xl font-bold text-pink-600">{new Set(mockCatalogData.map(item => item.brand)).size}</div>
            <div className="text-xs text-slate-500">Marcas</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-xl font-bold text-blue-600">{filteredItems.length}</div>
            <div className="text-xs text-slate-500">Filtrados</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-slate-700 mb-3">Filtros</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  activeFilter === filter.id 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {filter.icon && <filter.icon className="w-4 h-4" />}
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-slate-700 mb-3">Categorías</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  activeCategory === category.id 
                  ? 'bg-slate-800 text-white' 
                  : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">
            {filteredItems.length} productos encontrados
          </h3>
          <button className="text-sm text-purple-600 hover:text-purple-700">
            Ordenar por popularidad
          </button>
        </div>

        {/* Products Grid */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
          {filteredItems.map(item => {
            const isSelectedForTryOn = selectedForTryOn.find(selected => selected.id === item.id)
            
            return (
              <div key={item.id} className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''} ${isSelectedForTryOn ? 'ring-2 ring-purple-500' : ''}`}>
                <div className={`bg-slate-100 relative ${viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'aspect-square'}`}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Action buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button 
                      onClick={() => toggleLike(item.id)}
                      className="w-8 h-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                    >
                      <Heart className={`w-4 h-4 transition-colors ${likedItems.has(item.id) ? 'text-red-500 fill-red-500' : 'text-slate-600'}`} />
                    </button>
                    
                    <button 
                      onClick={() => toggleTryOn(item)}
                      className={`w-8 h-8 backdrop-blur-sm rounded-full flex items-center justify-center transition-all ${
                        isSelectedForTryOn 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-white bg-opacity-80 text-slate-600 hover:bg-opacity-100'
                      }`}
                      title="Seleccionar para prueba virtual"
                    >
                      {isSelectedForTryOn ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {item.tags.includes('sale') && (
                      <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                      </div>
                    )}
                    {item.tags.includes('new') && (
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Nuevo
                      </div>
                    )}
                    {item.tags.includes('featured') && (
                      <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        ⭐ Destacado
                      </div>
                    )}
                  </div>

                  {/* Quick view */}
                  {/* <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <button className="bg-white text-slate-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transform translate-y-2 hover:translate-y-0 transition-transform">
                      <Eye className="w-4 h-4" />
                      Vista rápida
                    </button>
                  </div> */}
                </div>
                
                <div className="p-4 flex-1">
                  <div className="mb-2">
                    <h3 className="font-medium text-slate-800 mb-1 line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.brand}</p>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-slate-600">{item.rating}</span>
                    <span className="text-xs text-slate-400">({item.reviews})</span>
                  </div>
                  
                  {/* Colors */}
                  <div className="flex gap-1 mb-3">
                    {item.colors.slice(0, 3).map((color, index) => (
                      <div 
                        key={index}
                        className="w-4 h-4 rounded-full border border-slate-200"
                        style={{ backgroundColor: color === 'Negro' ? '#000' : color === 'Blanco' ? '#fff' : color === 'Beige' ? '#f5f5dc' : '#666' }}
                        title={color}
                      ></div>
                    ))}
                    {item.colors.length > 3 && (
                      <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="text-xs text-slate-600">+{item.colors.length - 3}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-semibold text-slate-800">{formatPrice(item.price)}</span>
                    {item.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">{formatPrice(item.originalPrice)}</span>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => handleAddToWardrobe(item)}
                    className="w-full bg-purple-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Agregar al armario
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Load More */}
        {filteredItems.length > 0 && (
          <button className="w-full mt-6 bg-white border border-slate-200 text-slate-700 py-3 rounded-full font-medium hover:bg-slate-50 transition-colors">
            Cargar más productos ({mockCatalogData.length - filteredItems.length} restantes)
          </button>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">No se encontraron productos</h3>
            <p className="text-slate-500 mb-4">Intenta cambiar los filtros o la búsqueda</p>
            <button 
              onClick={() => {
                setActiveCategory('all')
                setActiveFilter('all')
                setSearchQuery('')
              }}
              className="bg-purple-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-purple-600 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Virtual Try-On Modal */}
      {showVirtualTryOn && outfitAnalysis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Análisis de Outfit</h2>
                <button 
                  onClick={() => setShowVirtualTryOn(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Outfit Items */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {outfitAnalysis.items.map(item => (
                  <div key={item.id} className="bg-slate-50 rounded-xl p-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-20 object-cover rounded-lg mb-2"
                    />
                    <h4 className="font-medium text-sm text-slate-800 truncate">{item.name}</h4>
                    <p className="text-xs text-slate-500">{item.brand}</p>
                  </div>
                ))}
              </div>

              {/* Overall Score */}
              <div className={`rounded-xl p-4 mb-4 ${getScoreBg(outfitAnalysis.compatibility)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-800">Puntuación General</span>
                  <span className={`text-2xl font-bold ${getScoreColor(outfitAnalysis.compatibility)}`}>
                    {outfitAnalysis.compatibility}/100
                  </span>
                </div>
                <p className="text-sm text-slate-600">{outfitAnalysis.analysis.feedback}</p>
              </div>

              {/* Price Summary */}
              <div className="bg-purple-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-800">Precio Total</span>
                  <span className="text-xl font-bold text-purple-600">
                    {formatPrice(outfitAnalysis.totalPrice)}
                  </span>
                </div>
              </div>

              {/* Detailed Analysis */}
              {outfitAnalysis.analysis.details && outfitAnalysis.analysis.details.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-slate-800 mb-3">Análisis Detallado</h3>
                  <div className="space-y-2">
                    {outfitAnalysis.analysis.details.slice(0, 3).map((detail, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-700">
                            {detail.items[0]} + {detail.items[1]}
                          </span>
                          <span className={`text-sm font-medium ${getScoreColor(detail.avgScore)}`}>
                            {Math.round(detail.avgScore)}/100
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-slate-500">Color:</span>
                            <span className={`ml-1 ${detail.color.compatible ? 'text-green-600' : 'text-red-600'}`}>
                              {Math.round(detail.color.score)}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">Estilo:</span>
                            <span className={`ml-1 ${detail.style.compatible ? 'text-green-600' : 'text-red-600'}`}>
                              {Math.round(detail.style.score)}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">Temporada:</span>
                            <span className={`ml-1 ${detail.season.compatible ? 'text-green-600' : 'text-red-600'}`}>
                              {Math.round(detail.season.score)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {outfitAnalysis.suggestions && outfitAnalysis.suggestions.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-slate-800 mb-3">Sugerencias de Mejora</h3>
                  <div className="space-y-2">
                    {outfitAnalysis.suggestions.slice(0, 2).map((suggestion, index) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-blue-800">{suggestion.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    selectedForTryOn.forEach(item => handleAddToWardrobe(item))
                    setShowVirtualTryOn(false)
                    setSelectedForTryOn([])
                  }}
                  className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Comprar Todo el Outfit
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setShowVirtualTryOn(false)}
                    className="py-2 px-4 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                  >
                    Cerrar
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedForTryOn([])
                      setShowVirtualTryOn(false)
                    }}
                    className="py-2 px-4 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                  >
                    Nueva Prueba
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CatalogView