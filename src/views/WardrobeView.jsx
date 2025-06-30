// src/views/WardrobeView.jsx
import React, { useState, useMemo } from 'react'
import { 
  ArrowLeft, Search, Heart, Plus, Filter, SortAsc, 
  Shirt, Eye, MoreVertical, AlertTriangle, Sparkles 
} from 'lucide-react'

const WardrobeView = ({ 
  onNavigate, 
  clothingItems, 
  wardrobeService, 
  onUseOutfit,
  addNotification 
}) => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('condition')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  const categories = [
    { id: 'all', label: 'Todo', icon: '👕' },
    { id: 'tops', label: 'Tops', icon: '👔' },
    { id: 'bottoms', label: 'Pantalones', icon: '👖' },
    { id: 'shoes', label: 'Zapatos', icon: '👟' },
    { id: 'accessories', label: 'Accesorios', icon: '👜' }
  ]

  // Filtrar y ordenar items
  const filteredItems = useMemo(() => {
    let filtered = clothingItems

    // Filtrar por categoría
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory)
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      filtered = wardrobeService.searchItems(filtered, searchQuery)
    }

    // Ordenar
    return wardrobeService.sortItems(filtered, sortBy)
  }, [clothingItems, activeCategory, searchQuery, sortBy, wardrobeService])

  // Estadísticas del armario
  const wardrobeStats = wardrobeService.getWardrobeStats(clothingItems)
  const itemsNeedingCare = wardrobeService.getItemsNeedingCare(clothingItems)

  const handleItemAction = (item, action) => {
    switch (action) {
      case 'favorite':
        addNotification(`${item.name} añadido a favoritos`, 'success')
        break
      case 'use': {
        // Crear outfit con este item
        const quickOutfit = {
          title: `Outfit con ${item.name}`,
          description: 'Outfit de uso rápido',
          items: [item]
        }
        onUseOutfit(quickOutfit)
        addNotification(`Usaste ${item.name}`, 'success')
        break
      }
      case 'details':
        // Mostrar detalles del item
        setSelectedItems([item])
        break
      case 'restore':
        // Simular restauración
        addNotification(`${item.name} enviado a restauración`, 'info')
        break
    }
  }

  const getConditionColor = (condition) => {
    if (condition >= 80) return 'text-green-600 bg-green-100'
    if (condition >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getConditionText = (condition) => {
    if (condition >= 80) return 'Excelente'
    if (condition >= 60) return 'Bueno'
    return 'Necesita cuidado'
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => onNavigate('home')}>
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-slate-800">Mi Armario</h1>
              <p className="text-sm text-slate-500">
                {filteredItems.length} de {clothingItems.length} prendas
              </p>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <Filter className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Barra de búsqueda */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar en tu armario..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-full text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtros expandibles */}
          {showFilters && (
            <div className="bg-slate-50 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <SortAsc className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Ordenar por:</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'condition', label: 'Condición' },
                  { id: 'timesWorn', label: 'Más usado' },
                  { id: 'lastWorn', label: 'Último uso' },
                  { id: 'name', label: 'Nombre' }
                ].map(sort => (
                  <button
                    key={sort.id}
                    onClick={() => setSortBy(sort.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      sortBy === sort.id 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {sort.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Alerta de prendas que necesitan cuidado */}
        {itemsNeedingCare.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-medium text-amber-800">Prendas que necesitan cuidado</h3>
            </div>
            <p className="text-sm text-amber-700 mb-3">
              {itemsNeedingCare.length} {itemsNeedingCare.length === 1 ? 'prenda necesita' : 'prendas necesitan'} atención
            </p>
            <div className="flex gap-2">
              {itemsNeedingCare.slice(0, 3).map(item => (
                <div key={item.id} className="w-8 h-8 rounded-lg overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
              ))}
              {itemsNeedingCare.length > 3 && (
                <div className="w-8 h-8 bg-amber-200 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-amber-700">+{itemsNeedingCare.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-lg font-bold text-purple-600">{wardrobeStats.total}</div>
            <div className="text-xs text-slate-500">Total prendas</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-lg font-bold text-green-600">{wardrobeStats.averageCondition}%</div>
            <div className="text-xs text-slate-500">Condición promedio</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-lg font-bold text-blue-600">{wardrobeStats.totalWears}</div>
            <div className="text-xs text-slate-500">Usos totales</div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors flex items-center gap-2 ${
                activeCategory === category.id 
                ? 'bg-purple-500 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Clothing Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredItems.map(item => (
              <ClothingCard 
                key={item.id}
                item={item}
                onAction={handleItemAction}
                getConditionColor={getConditionColor}
                getConditionText={getConditionText}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Shirt className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              {searchQuery ? 'No se encontraron prendas' : 'No tienes prendas en esta categoría'}
            </h3>
            <p className="text-slate-500 mb-4">
              {searchQuery 
                ? 'Intenta con otros términos de búsqueda' 
                : 'Añade algunas prendas para comenzar'
              }
            </p>
            <button 
              onClick={() => onNavigate('add')}
              className="bg-purple-500 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors"
            >
              Añadir primera prenda
            </button>
          </div>
        )}

        {/* Add Button */}
        <button 
          onClick={() => onNavigate('add')}
          className="fixed bottom-24 right-6 w-14 h-14 bg-purple-500 rounded-full shadow-lg flex items-center justify-center hover:bg-purple-600 transition-all transform hover:scale-105"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )
}

// Componente para cada prenda
const ClothingCard = ({ item, onAction, getConditionColor, getConditionText }) => {
  const [showMenu, setShowMenu] = useState(false)

  const daysSinceLastWorn = item.lastWorn 
    ? Math.floor((new Date() - new Date(item.lastWorn)) / (1000 * 60 * 60 * 24))
    : null

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm relative group">
      {/* Imagen */}
      <div className="aspect-square bg-slate-100 relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay con acciones */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onAction(item, 'use')}
              className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-colors"
              title="Usar ahora"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
            </button>
            <button 
              onClick={() => onAction(item, 'details')}
              className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-colors"
              title="Ver detalles"
            >
              <Eye className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Indicadores de estado */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
            {Math.round(item.condition)}%
          </span>
        </div>

        <div className="absolute top-2 right-2">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <MoreVertical className="w-4 h-4 text-slate-600" />
          </button>
          
          {/* Menú contextual */}
          {showMenu && (
            <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border p-1 z-10">
              <button 
                onClick={() => onAction(item, 'favorite')}
                className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 rounded flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Favorito
              </button>
              {item.condition < 70 && (
                <button 
                  onClick={() => onAction(item, 'restore')}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 rounded flex items-center gap-2 text-amber-600"
                >
                  <Sparkles className="w-4 h-4" />
                  Restaurar
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Información */}
      <div className="p-4">
        <h3 className="font-medium text-slate-800 mb-1 truncate">{item.name}</h3>
        <p className="text-sm text-slate-500 mb-2">{item.brand}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Estado:</span>
            <span className={`font-medium ${
              item.condition >= 80 ? 'text-green-600' : 
              item.condition >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {getConditionText(item.condition)}
            </span>
          </div>
          
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Usos:</span>
            <span className="text-slate-700">{item.timesWorn || 0} veces</span>
          </div>
          
          {daysSinceLastWorn !== null && (
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Último uso:</span>
              <span className="text-slate-700">
                {daysSinceLastWorn === 0 ? 'Hoy' : 
                 daysSinceLastWorn === 1 ? 'Ayer' : 
                 `Hace ${daysSinceLastWorn} días`}
              </span>
            </div>
          )}
        </div>

        {/* Barra de condición */}
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500">Condición</span>
            <span className="text-slate-700">{Math.round(item.condition)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                item.condition >= 80 ? 'bg-green-500' : 
                item.condition >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${item.condition}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WardrobeView