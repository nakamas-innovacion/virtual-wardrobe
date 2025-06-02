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
      { name: 'Camisa Blanca', image: 'https://b2ctreckcl.vtexassets.com/arquivos/ids/169126-800-auto?v=638695409461730000&width=800&height=auto&aspect=true' },
      { name: 'Jeans Azules', image: 'https://www.zazadorali.cl/wp-content/uploads/2023/08/JN8000-AZUL-01.jpg' },
      { name: 'Sneakers Blancos', image: 'https://i.pinimg.com/736x/a8/38/84/a838843f2b0b10fc157683f44df3a2e3.jpg' }
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
