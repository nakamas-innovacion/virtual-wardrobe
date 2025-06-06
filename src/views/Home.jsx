import { User, MapPin, Sun, Sparkles, Camera, Shirt } from 'lucide-react'

const HomeView = ({ onNavigate, weatherData, outfitSuggestion, onRegenerateOutfit }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pt-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Buenos días</h1>
            <p className="text-slate-600">¿Qué te pondrás hoy?</p>
          </div>
          <div className="w-15 h-15 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <img 
                src={"https://img.freepik.com/foto-gratis/mujer-posando-tiro-medio-estudio_23-2149883753.jpg?semt=ais_hybrid&w=740"} 
                alt="User" 
                className="w-full h-full rounded-full object-cover"
              />
            <User className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Weather Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-600">{weatherData.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Sun className="w-8 h-8 text-yellow-500" />
                <div>
                  <span className="text-2xl font-bold text-slate-800">{weatherData.temp}°</span>
                  <p className="text-sm text-slate-600">{weatherData.description}</p>
                </div>
              </div>
            </div>
            <div className="text-right text-sm text-slate-500">
              <p>Máx: {weatherData.max}°</p>
              <p>Mín: {weatherData.min}°</p>
            </div>
          </div>
        </div>

        {/* Outfit Suggestion */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Outfit del día</h3>
            </div>
            <button 
              onClick={onRegenerateOutfit}
              className="bg-gradient-to-r from-pink-500 to-purple-500 bg-opacity-20 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-30 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
          
          <p className="mb-4 opacity-90">{outfitSuggestion.description}</p>
          
          <div className="flex gap-3 mb-4">
            {outfitSuggestion.items.slice(0, 3).map((item, index) => (
              <div key={index} className="w-12 h-12 bg-white bg-opacity-20 rounded-lg overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => onNavigate('outfit')}
            className="bg-gradient-to-r from-pink-500 to-purple-500 bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-30 transition-colors"
          >
            Ver outfit completo
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => onNavigate('add')}
            className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center gap-3 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-slate-700 font-medium">Añadir ropa</span>
          </button>
          <button 
            onClick={() => onNavigate('wardrobe')}
            className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center gap-3 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Shirt className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-slate-700 font-medium">Mi armario</span>
          </button>
        </div>
      </div>
    </div>
  )
}


export default HomeView