import { useState } from 'react'
import { ArrowLeft, Camera, Upload } from 'lucide-react'

const AddClothingView = ({ onNavigate, onAddClothing }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    color: '',
    season: '',
    image: null
  })

  const handleSubmit = () => {
    const newItem = {
      id: Date.now(),
      ...formData,
      image: '/api/placeholder/300/300'
    }
    onAddClothing(newItem)
    onNavigate('wardrobe')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('wardrobe')}>
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-800">Añadir Prenda</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Tomar Foto</h2>
              <div className="aspect-square bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center">
                <Camera className="w-12 h-12 text-slate-400 mb-4" />
                <p className="text-slate-500 text-center mb-4">Toma una foto de tu prenda</p>
                <button className="bg-purple-500 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors">
                  Abrir Cámara
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">O subir desde galería</h2>
              <button className="w-full border-2 border-slate-200 rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-purple-300 transition-colors">
                <Upload className="w-8 h-8 text-slate-400" />
                <span className="text-slate-600">Seleccionar imagen</span>
              </button>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full bg-purple-500 text-white py-4 rounded-full font-medium text-lg hover:bg-purple-600 transition-colors"
            >
              Continuar
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Detalles de la prenda</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nombre</label>
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Ej: Camisa blanca"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Categoría</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="tops">Tops</option>
                    <option value="bottoms">Pantalones</option>
                    <option value="shoes">Zapatos</option>
                    <option value="accessories">Accesorios</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Marca</label>
                  <input 
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Ej: Zara"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Temporada</label>
                  <select 
                    value={formData.season}
                    onChange={(e) => setFormData({...formData, season: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Seleccionar temporada</option>
                    <option value="spring">Primavera</option>
                    <option value="summer">Verano</option>
                    <option value="fall">Otoño</option>
                    <option value="winter">Invierno</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-full font-medium hover:bg-slate-300 transition-colors"
              >
                Atrás
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-1 bg-purple-500 text-white py-4 rounded-full font-medium hover:bg-purple-600 transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddClothingView