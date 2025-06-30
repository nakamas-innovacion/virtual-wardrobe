// src/App.js
import React, { useState, useEffect } from 'react'
import { OutfitAI } from './services/OutfitAI'
import { GamificationService } from './services/GamificationService'
import { WardrobeService } from './services/WardrobeService'
import { PlannerService } from './services/PlannerService'
import { CatalogService } from './services/CatalogService'

// Componentes de vistas
import HomeView from './views/HomeView'
import WardrobeView from './views/WardrobeView'
import AddClothingView from './views/AddClothingView'
import OutfitSuggestionView from './views/OutfitSuggestionView'
import ProfileView from './views/ProfileView'
import PlannerView from './views/PlannerView'
import CatalogView from './views/CatalogView'
import GameView from './views/GamificationView'

// Componentes UI
import BottomNavigation from './components/ui/BottomNavigation'
import LoadingScreen from './components/ui/LoadingScreen'
import NotificationSystem from './components/ui/NotificationSystem'

// Hooks personalizados
import { useLocalStorage } from './hooks/useLocalStorage'
import { useNotifications } from './hooks/useNotifications'

// Datos iniciales
import { initialClothingItems, initialWeatherData, mockCatalogData, achievementsData, userProfileData } from './data/initialData'

function App() {
  // Estados principales
  const [activeView, setActiveView] = useState('home')
  const [loading, setLoading] = useState(true)
  const [userLevel, setUserLevel] = useState(2)
  const [userPoints, setUserPoints] = useState(1250)
  const [userStreak, setUserStreak] = useState(7)
  
  // Servicios
  const gamificationService = new GamificationService()
  const wardrobeService = new WardrobeService()
  const plannerService = new PlannerService()
  const catalogService = new CatalogService()
  
  // Estados de usuario con localStorage
  const [userData, setUserData] = useLocalStorage('userData', {
    level: 2,
    points: 1250,
    streak: 7,
    outfitsUsed: 35,
    coordinatedOutfits: 15,
    seasonalOutfits: 3,
    lastActiveDate: new Date().toISOString().split('T')[0]
  })
  
  // Estados de datos
  const [clothingItems, setClothingItems] = useLocalStorage('clothingItems', initialClothingItems)
  const [weatherData, setWeatherData] = useState(initialWeatherData)
  const [outfitSuggestion, setOutfitSuggestion] = useState(null)
  const [outfitPlanner, setOutfitPlanner] = useLocalStorage('outfitPlanner', { weekly: {}, monthly: {} })
  
  // Sistema de notificaciones
  const { notifications, addNotification, removeNotification } = useNotifications()

  // Inicialización de la app
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simular carga inicial
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Verificar y actualizar racha
        updateStreakStatus()
        
        // Generar outfit inicial
        const initialOutfit = OutfitAI.generateOutfit(clothingItems, weatherData)
        setOutfitSuggestion(initialOutfit)
        
        setLoading(false)
      } catch (error) {
        console.error('Error inicializando la app:', error)
        addNotification('Error al cargar la aplicación', 'error')
        setLoading(false)
      }
    }
    
    initializeApp()
  }, [])

  // Actualizar estado de racha
  const updateStreakStatus = () => {
    const streakUpdate = gamificationService.updateStreak(
      userData.lastActiveDate, 
      new Date().toISOString().split('T')[0]
    )
    
    let newStreak = userData.streak
    
    switch (streakUpdate) {
      case 'continue':
        newStreak = userData.streak + 1
        addNotification(`¡Racha de ${newStreak} días! 🔥`, 'success')
        break
      case 'reset':
        newStreak = 1
        addNotification('Tu racha se reinició. ¡Comencemos de nuevo!', 'info')
        break
      case 'same':
        // Mismo día, no hacer nada
        break
    }
    
    setUserData(prev => ({
      ...prev,
      streak: newStreak,
      lastActiveDate: new Date().toISOString().split('T')[0]
    }))
  }

  // Función para usar outfit y ganar puntos
  const useOutfit = (outfit) => {
    try {
      const pointsEarned = gamificationService.calculateOutfitPoints(outfit, userData.streak > 0)
      const newPoints = userData.points + pointsEarned
      
      // Verificar subida de nivel
      const newLevel = gamificationService.checkLevelUp(userData.points, newPoints)
      
      // Aplicar desgaste a las prendas
      const weatherConditions = OutfitAI.getWeatherType(weatherData)
      const updatedItems = clothingItems.map(item => {
        const outfitItem = outfit.items.find(oi => oi.id === item.id)
        if (outfitItem) {
          return wardrobeService.applyWear(item, weatherConditions)
        }
        return item
      })
      
      // Actualizar estados
      setClothingItems(updatedItems)
      setUserData(prev => ({
        ...prev,
        points: newPoints,
        level: newLevel || prev.level,
        outfitsUsed: prev.outfitsUsed + 1
      }))
      
      // Notificaciones
      addNotification(`¡+${pointsEarned} puntos ganados!`, 'success')
      
      if (newLevel) {
        addNotification(`¡Subiste al nivel ${newLevel}! 🎉`, 'success')
      }
      
      // Verificar logros
      checkAchievements(updatedItems)
      
    } catch (error) {
      console.error('Error al usar outfit:', error)
      addNotification('Error al procesar el outfit', 'error')
    }
  }

  // Verificar logros completados
  const checkAchievements = (currentItems) => {
    const userStats = gamificationService.calculateUserStats(userData, currentItems)
    const completedAchievements = gamificationService.checkCompletedAchievements(userStats, currentItems)
    
    completedAchievements.forEach(achievement => {
      addNotification(`¡Logro desbloqueado: ${achievement.name}! ${achievement.icon}`, 'achievement')
    })
  }

  // Regenerar outfit
  const regenerateOutfit = () => {
    try {
      const newOutfit = OutfitAI.generateOutfit(clothingItems, weatherData)
      setOutfitSuggestion(newOutfit)
      addNotification('Nuevo outfit generado', 'info')
    } catch (error) {
      console.error('Error al regenerar outfit:', error)
      addNotification('Error al generar nuevo outfit', 'error')
    }
  }

  // Agregar nueva prenda
  const handleAddClothing = (newItemData) => {
    try {
      const newItem = wardrobeService.createNewItem(newItemData)
      setClothingItems(prev => [...prev, newItem])
      addNotification(`${newItem.name} agregado al armario`, 'success')
      
      // Navegar de vuelta al armario
      setActiveView('wardrobe')
    } catch (error) {
      console.error('Error al agregar prenda:', error)
      addNotification(error.message, 'error')
    }
  }

  // Planificar outfit
  const planOutfit = (date, outfit) => {
    try {
      const validation = plannerService.validateOutfitPlan(date, outfit, clothingItems)
      
      if (!validation.isValid) {
        validation.errors.forEach(error => addNotification(error, 'error'))
        return
      }
      
      validation.warnings.forEach(warning => addNotification(warning, 'warning'))
      
      const plannedOutfit = plannerService.planOutfit(date, outfit)
      
      setOutfitPlanner(prev => ({
        ...prev,
        weekly: {
          ...prev.weekly,
          [date]: plannedOutfit
        }
      }))
      
      addNotification('Outfit planificado correctamente', 'success')
    } catch (error) {
      console.error('Error al planificar outfit:', error)
      addNotification('Error al planificar outfit', 'error')
    }
  }

  // Probar prenda del catálogo
  const tryOnCatalogItem = (catalogItem) => {
    try {
      const compatibility = catalogService.analyzeCompatibility(catalogItem, clothingItems)
      const virtualTryOn = catalogService.virtualTryOn(catalogItem, userData)
      
      return {
        catalogItem,
        compatibility,
        virtualTryOn,
        recommendation: compatibility.overallScore >= 70 ? 'Altamente recomendado' :
                      compatibility.overallScore >= 50 ? 'Buena opción' :
                      'Considera otras alternativas'
      }
    } catch (error) {
      console.error('Error en prueba virtual:', error)
      addNotification('Error en la prueba virtual', 'error')
      return null
    }
  }

  // Renderizar vista activa
  const renderActiveView = () => {
    if (!outfitSuggestion && !loading) return null

    const commonProps = {
      onNavigate: setActiveView,
      addNotification
    }

    switch (activeView) {
      case 'home':
        return (
          <HomeView 
            {...commonProps}
            weatherData={weatherData}
            outfitSuggestion={outfitSuggestion}
            onRegenerateOutfit={regenerateOutfit}
            userData={userData}
          />
        )
        
      case 'wardrobe':
        return (
          <WardrobeView 
            {...commonProps}
            clothingItems={clothingItems}
            wardrobeService={wardrobeService}
            onUseOutfit={useOutfit}
          />
        )
        
      case 'add':
        return (
          <AddClothingView 
            {...commonProps}
            onAddClothing={handleAddClothing}
            wardrobeService={wardrobeService}
          />
        )
        
      case 'outfit':
        return (
          <OutfitSuggestionView 
            {...commonProps}
            outfitSuggestion={outfitSuggestion}
            weatherData={weatherData}
            onRegenerateOutfit={regenerateOutfit}
            onUseOutfit={useOutfit}
            userData={userData}
          />
        )
        
      case 'profile':
        return (
          <ProfileView 
            {...commonProps}
            userData={userData}
            clothingItems={clothingItems}
            gamificationService={gamificationService}
            userLevel={userData.level}
            userPoints={userData.points}
            userStreak={userData.streak}
          />
        )
        
      case 'planner':
        return (
          <PlannerView 
            {...commonProps}
            outfitPlanner={outfitPlanner}
            onPlanOutfit={planOutfit}
            clothingItems={clothingItems}
            weatherData={weatherData}
            plannerService={plannerService}
          />
        )
        
      case 'catalog':
        return (
          <CatalogView 
            {...commonProps}
            externalCatalog={mockCatalogData}
            onTryOn={tryOnCatalogItem}
            clothingItems={clothingItems}
            catalogService={catalogService}
          />
        )
        
      case 'game':
        return (
          <GameView 
            {...commonProps}
            userData={userData}
            clothingItems={clothingItems}
            gamificationService={gamificationService}
            userLevel={userData.level}
            userPoints={userData.points}
            userStreak={userData.streak}
            achievements={gamificationService.getAchievements()}
          />
        )
        
      default:
        return (
          <HomeView 
            {...commonProps}
            weatherData={weatherData}
            outfitSuggestion={outfitSuggestion}
            onRegenerateOutfit={regenerateOutfit}
            userData={userData}
          />
        )
    }
  }

  // Mostrar pantalla de carga
  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 relative">
      {/* Contenido principal */}
      {renderActiveView()}
      
      {/* Navegación inferior */}
      <BottomNavigation 
        activeView={activeView} 
        onNavigate={setActiveView}
        userData={userData}
      />
      
      {/* Sistema de notificaciones */}
      <NotificationSystem 
        notifications={notifications}
        onRemove={removeNotification}
      />
    </div>
  )
}

export default App