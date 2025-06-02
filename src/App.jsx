import './App.css'
import React, { useState, useEffect } from 'react'
import HomeView from './views/Home'
import WardrobeView from './views/Wardrobe'
import AddClothingView from './views/AddClothing'
import OutfitSuggestionView from './views/OutfitSuggestion'
import ProfileView from './views/Profile'
import BottomNavigation from './components/ui/Navigation'
import OutfitAI from './components/ui/AIsuggestion'

function App() {
  const [activeView, setActiveView] = useState('home')
  const [clothingItems, setClothingItems] = useState([
    {
      id: 1,
      name: 'Camisa Blanca',
      category: 'tops',
      brand: 'Zara',
      color: 'bg-white',
      season: 'all',
      image: 'https://b2ctreckcl.vtexassets.com/arquivos/ids/169126-800-auto?v=638695409461730000&width=800&height=auto&aspect=true'
    },
    {
      id: 2,
      name: 'Jeans Azules',
      category: 'bottoms',
      brand: 'H&M',
      color: 'bg-blue-600',
      season: 'all',
      image: 'https://www.zazadorali.cl/wp-content/uploads/2023/08/JN8000-AZUL-01.jpg'
    },
    {
      id: 3,
      name: 'Sneakers Blancos',
      category: 'shoes',
      brand: 'Nike',
      color: 'bg-white',
      season: 'spring',
      image: 'https://i.pinimg.com/736x/a8/38/84/a838843f2b0b10fc157683f44df3a2e3.jpg'
    },
    {
      id: 4,
      name: 'Blazer Negro',
      category: 'tops',
      brand: 'Mango',
      color: 'bg-black',
      season: 'fall',
      image: 'https://hmchile.vtexassets.com/arquivos/ids/6674801/Blazer-de-botonadura-sencilla-Slim-Fit---Negro---H-M-CL.jpg?v=638755438210430000'
    },
    {
      id: 5,
      name: 'Vestido Floral',
      category: 'tops',
      brand: 'Bershka',
      color: 'bg-pink-200',
      season: 'summer',
      image: '/api/placeholder/300/300'
    },
    {
      id: 6,
      name: 'Pantalón Negro',
      category: 'bottoms',
      brand: 'Uniqlo',
      color: 'bg-black',
      season: 'all',
      image: '/api/placeholder/300/300'
    },
    {
      id: 7,
      name: 'Botas de Cuero',
      category: 'shoes',
      brand: 'Dr. Martens',
      color: 'bg-amber-800',
      season: 'winter',
      image: '/api/placeholder/300/300'
    },
    {
      id: 8,
      name: 'Bufanda de Lana',
      category: 'accessories',
      brand: 'Massimo Dutti',
      color: 'bg-gray-600',
      season: 'winter',
      image: '/api/placeholder/300/300'
    }
  ])

  const [weatherData, setWeatherData] = useState({
    location: 'Santiago, Chile',
    temp: 22,
    max: 25,
    min: 15,
    description: 'Soleado'
  })

  const [outfitSuggestion, setOutfitSuggestion] = useState(null)

  React.useEffect(() => {
    const newOutfit = OutfitAI.generateOutfit(clothingItems, weatherData)
    setOutfitSuggestion(newOutfit)
  }, [clothingItems, weatherData])

  // Función para regenerar outfit manualmente
  const regenerateOutfit = () => {
    const newOutfit = OutfitAI.generateOutfit(clothingItems, weatherData)
    setOutfitSuggestion(newOutfit)
  }

  const handleAddClothing = (newItem) => {
    setClothingItems([...clothingItems, newItem])
  }

  const renderActiveView = () => {
    if (!outfitSuggestion) return null // Esperar a que se genere el outfit

    switch (activeView) {
      case 'home':
        return (
          <HomeView 
            onNavigate={setActiveView}
            weatherData={weatherData}
            outfitSuggestion={outfitSuggestion}
            onRegenerateOutfit={regenerateOutfit}
          />
        )
      case 'wardrobe':
        return (
          <WardrobeView 
            onNavigate={setActiveView}
            clothingItems={clothingItems}
          />
        )
      case 'add':
        return (
          <AddClothingView 
            onNavigate={setActiveView}
            onAddClothing={handleAddClothing}
          />
        )
      case 'outfit':
        return (
          <OutfitSuggestionView 
            onNavigate={setActiveView}
            outfitSuggestion={outfitSuggestion}
            weatherData={weatherData}
            onRegenerateOutfit={regenerateOutfit}
          />
        )
      case 'profile':
        return (
          <ProfileView 
            onNavigate={setActiveView}
          />
        )
      default:
        return (
          <HomeView 
            onNavigate={setActiveView}
            weatherData={weatherData}
            outfitSuggestion={outfitSuggestion}
            onRegenerateOutfit={regenerateOutfit}
          />
        )
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {renderActiveView()}
      <BottomNavigation activeView={activeView} onNavigate={setActiveView} />
    </div>
  )
}

export default App
