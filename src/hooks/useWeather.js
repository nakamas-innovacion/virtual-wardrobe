// src/hooks/useWeather.js
import { useState, useEffect } from 'react'

export function useWeather(location = 'Santiago, Chile') {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        // Simulación de API call - en producción usar una API real
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Datos simulados con variación aleatoria
        const baseTemp = 20
        const variation = (Math.random() - 0.5) * 10
        
        const weatherTypes = ['Soleado', 'Nublado', 'Parcialmente nublado', 'Despejado']
        const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)]
        
        setWeatherData({
          location,
          temp: Math.round(baseTemp + variation),
          max: Math.round(baseTemp + variation + 5),
          min: Math.round(baseTemp + variation - 5),
          description: randomWeather,
          humidity: Math.round(Math.random() * 40 + 30), // 30-70%
          windSpeed: Math.round(Math.random() * 15 + 5), // 5-20 km/h
          uvIndex: Math.round(Math.random() * 10 + 1), // 1-11
          lastUpdated: new Date().toISOString()
        })
        
        setError(null)
      } catch (err) {
        setError('Error al obtener datos del clima')
        console.error('Weather fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
    
    // Actualizar cada hora
    const interval = setInterval(fetchWeather, 60 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [location])

  const refreshWeather = () => {
    setLoading(true)
    // Trigger useEffect to refetch
    setWeatherData(null)
  }

  return {
    weatherData,
    loading,
    error,
    refreshWeather
  }
}