import './App.css'
import { useState } from 'react'
import HomeView from './views/Home'
import WardrobeView from './views/Wardrobe'
import AddClothingView from './views/AddClothing'
import OutfitSuggestionView from './views/OutfitSuggestion'
import ProfileView from './views/Profile'
import BottomNavigation from './components/ui/Navigation'

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
      image: '/api/placeholder/300/300'
    },
    {
      id: 2,
      name: 'Jeans Azules',
      category: 'bottoms',
      brand: 'H&M',
      color: 'bg-blue-600',
      season: 'all',
      image: '/api/placeholder/300/300'
    },
    {
      id: 3,
      name: 'Sneakers Blancos',
      category: 'shoes',
      brand: 'Nike',
      color: 'bg-white',
      season: 'spring',
      image: '/api/placeholder/300/300'
    },
    {
      id: 4,
      name: 'Blazer Negro',
      category: 'tops',
      brand: 'Mango',
      color: 'bg-black',
      season: 'fall',
      image: '/api/placeholder/300/300'
    }
  ])

  const weatherData = {
    location: 'Santiago, Chile',
    temp: 22,
    max: 25,
    min: 15,
    description: 'Soleado'
  }

  const outfitSuggestion = {
    title: 'Look Casual Elegante',
    description: 'Perfecto para el clima soleado de hoy. Esta combinación te dará un look fresco y profesional ideal para cualquier ocasión.',
    items: [
      { name: 'Camisa Blanca', image: '/api/placeholder/150/150' },
      { name: 'Jeans Azules', image: '/api/placeholder/150/150' },
      { name: 'Sneakers Blancos', image: '/api/placeholder/150/150' }
    ]
  }

  const handleAddClothing = (newItem) => {
    setClothingItems([...clothingItems, newItem])
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return (
          <HomeView 
            onNavigate={setActiveView}
            weatherData={weatherData}
            outfitSuggestion={outfitSuggestion}
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
