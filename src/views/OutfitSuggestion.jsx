import { ArrowLeft, Check, Sun, Sparkles, Share2 } from "lucide-react"

const OutfitSuggestionView = ({ onNavigate, outfitSuggestion, weatherData, onRegenerateOutfit }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white bg-opacity-80 backdrop-blur-sm px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('home')}>
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-800">Outfit del día</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Weather Context */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Sun className="w-6 h-6 text-yellow-500" />
            <span className="font-medium text-slate-800">Perfecto para hoy</span>
          </div>
          <p className="text-slate-600 text-sm">{weatherData.temp}° • {weatherData.description}</p>
        </div>

        {/* Outfit Display */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {outfitSuggestion.items.map((item, index) => (
              <div key={index} className="aspect-square bg-slate-100 rounded-xl overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-800">{outfitSuggestion.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{outfitSuggestion.description}</p>
            
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-slate-500">Combinación recomendada por IA</span>
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button className="w-full bg-purple-500 text-white py-4 rounded-full font-medium text-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2">
            <Check className="w-5 h-5" />
            Me gusta este outfit
          </button>
          
          <div className="flex gap-3">
            <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-full font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Compartir
            </button>
            <button onClick={(onRegenerateOutfit)} className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-full font-medium hover:bg-slate-50 transition-colors">
              Nuevo outfit
            </button>
          </div>
        </div>

        {/* Style Tips */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 mt-6 text-white">
          <h4 className="font-semibold mb-2">💡 Tip de estilo</h4>
          <p className="text-sm opacity-90">Los colores neutros como el beige y blanco son perfectos para el clima soleado de hoy. ¡Te verás fresco y elegante!</p>
        </div>
      </div>
    </div>
  )
}


export default OutfitSuggestionView