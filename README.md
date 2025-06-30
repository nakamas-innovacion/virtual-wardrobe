# 👗 Wardrobe App - Arquitectura Modular

Una aplicación completa de gestión de armario virtual con funcionalidades avanzadas de gamificación, planificación y catálogo virtual.

## 🏗️ **Estructura del Proyecto**

```
src/
├── services/           # Lógica de negocio modular
│   ├── OutfitAI.js          # IA para generación de outfits
│   ├── GamificationService.js # Sistema de puntos y logros
│   ├── WardrobeService.js     # Gestión de prendas y desgaste
│   ├── PlannerService.js      # Planificación semanal/mensual
│   └── CatalogService.js      # Catálogo virtual y pruebas
│
├── components/         # Componentes UI reutilizables
│   ├── ui/
│   │   ├── BottomNavigation.jsx
│   │   ├── LoadingScreen.jsx
│   │   └── NotificationSystem.jsx
│   └── common/         # Componentes comunes
│
├── views/             # Vistas principales de la app
│   ├── HomeView.jsx
│   ├── WardrobeView.jsx
│   ├── AddClothingView.jsx
│   ├── OutfitSuggestionView.jsx
│   ├── ProfileView.jsx
│   ├── PlannerView.jsx
│   ├── CatalogView.jsx
│   └── GameView.jsx
│
├── hooks/             # Custom Hooks
│   ├── useLocalStorage.js
│   ├── useNotifications.js
│   ├── useWeather.js
│   ├── useOutfitGenerator.js
│   ├── useGamification.js
│   └── useWardrobe.js
│
├── data/              # Datos iniciales y configuración
│   └── initialData.js
│
└── App.js             # Componente principal
```

## 🔧 **Servicios Modulares**

### 1. **OutfitAI** - Inteligencia Artificial para Outfits

```javascript
import { OutfitAI } from './services/OutfitAI'

// Generar outfit basado en clima
const outfit = OutfitAI.generateOutfit(clothingItems, weatherData)

// Generar múltiples opciones
const options = OutfitAI.generateMultipleOutfits(clothingItems, weatherData, 3)

// Evaluar compatibilidad entre prendas
const compatibility = OutfitAI.evaluateCompatibility(item1, item2)
```

**Características:**
- ✨ Generación inteligente basada en clima
- 🎨 Evaluación de compatibilidad de colores
- 🌦️ Adaptación automática a condiciones meteorológicas
- 📊 Consejos de estilo personalizados

---

### 2. **GamificationService** - Sistema de Puntos y Logros

```javascript
import { GamificationService } from './services/GamificationService'

const gamification = new GamificationService()

// Calcular puntos por outfit
const points = gamification.calculateOutfitPoints(outfit)

// Verificar subida de nivel
const newLevel = gamification.checkLevelUp(oldPoints, newPoints)

// Obtener progreso de logros
const progress = gamification.calculateAchievementProgress('fashionista', userStats, items)
```

**Características:**
- 🏆 Sistema de logros dinámico
- 📈 Niveles y progreso
- 🔥 Racha diaria con bonificaciones
- 💡 Recomendaciones de mejora

---

### 3. **WardrobeService** - Gestión de Prendas y Desgaste

```javascript
import { WardrobeService } from './services/WardrobeService'

const wardrobe = new WardrobeService()

// Aplicar desgaste por uso
const wornItem = wardrobe.applyWear(item, 'rainy')

// Obtener estadísticas del armario
const stats = wardrobe.getWardrobeStats(items)

// Sugerir mantenimiento
const suggestions = wardrobe.suggestMaintenance(item)
```

**Características:**
- 👕 Seguimiento de condición de prendas
- 🌧️ Desgaste realista basado en clima
- 📊 Estadísticas detalladas del armario
- 🔧 Sugerencias de mantenimiento

---

### 4. **PlannerService** - Planificación de Outfits

```javascript
import { PlannerService } from './services/PlannerService'

const planner = new PlannerService()

// Generar plan semanal
const weeklyPlan = planner.generateWeeklyPlan(items, weatherData)

// Validar planificación
const validation = planner.validateOutfitPlan(date, outfit, items)

// Exportar a calendario
const icsFile = planner.exportToCalendar(plannedOutfits, 'ics')
```

**Características:**
- 📅 Planificación semanal y mensual
- ⚠️ Detección de conflictos de prendas
- 📱 Recordatorios y notificaciones
- 📊 Análisis de patrones de uso

---

### 5. **CatalogService** - Catálogo Virtual y Pruebas

```javascript
import { CatalogService } from './services/CatalogService'

const catalog = new CatalogService()

// Analizar compatibilidad con armario
const analysis = catalog.analyzeCompatibility(catalogItem, userWardrobe)

// Prueba virtual
const tryOnResult = catalog.virtualTryOn(catalogItem, userProfile)

// Generar wishlist inteligente
const wishlist = catalog.generateSmartWishlist(wardrobe, preferences)
```

**Características:**
- 🛍️ Catálogo virtual con productos externos
- 🔍 Análisis de compatibilidad inteligente
- 👗 Sistema de prueba virtual
- 💡 Wishlist automática basada en gaps del armario

## 🎣 **Custom Hooks**

### useLocalStorage
Persistencia automática de datos en localStorage:

```javascript
const [userData, setUserData] = useLocalStorage('userData', defaultValue)
```

### useNotifications
Sistema de notificaciones con auto-remove:

```javascript
const { notifications, addNotification, removeNotification } = useNotifications()
addNotification('¡Outfit completado!', 'success')
```

### useGamification
Gestión completa del sistema de gamificación:

```javascript
const { userData, achievements, addPoints, updateStreak } = useGamification(initialData, items)
```

### useWardrobe
Gestión avanzada del armario con filtros y búsqueda:

```javascript
const { 
  items, wardrobeStats, addItem, applyWear, filteredItems 
} = useWardrobe(initialItems)
```

## 🚀 **Uso de la Aplicación**

### Configuración Inicial

```javascript
// App.js
import { OutfitAI } from './services/OutfitAI'
import { GamificationService } from './services/GamificationService'
// ... otros servicios

function App() {
  // Servicios
  const gamificationService = new GamificationService()
  const wardrobeService = new WardrobeService()
  // ... configuración
}
```

### Flujo Típico de Usuario

1. **Inicialización**: Carga datos del localStorage
2. **Generación de Outfit**: IA sugiere outfit basado en clima
3. **Usar Outfit**: Usuario acepta y gana puntos
4. **Desgaste**: Prendas se desgastan automáticamente
5. **Logros**: Sistema verifica logros completados
6. **Planificación**: Usuario puede planificar outfits futuros
7. **Catálogo**: Explorar nuevas prendas virtualmente

## 🎮 **Funcionalidades Implementadas**

### ✅ **Core Features**
- [x] Gestión completa de armario virtual
- [x] IA para generación de outfits
- [x] Sistema de desgaste realista (wear-off/tear-off)
- [x] Gamificación con puntos, niveles y logros
- [x] Planificador semanal/mensual
- [x] Catálogo virtual con pruebas

### ✅ **Advanced Features**
- [x] Análisis de compatibilidad de prendas
- [x] Wishlist inteligente
- [x] Estadísticas detalladas del armario
- [x] Sistema de notificaciones
- [x] Persistencia en localStorage
- [x] Responsive design

### 🔮 **Extensiones Futuras**
- [ ] Integración con APIs de clima reales
- [ ] Reconocimiento de imágenes con IA
- [ ] Social features (compartir outfits)
- [ ] Integración con e-commerce
- [ ] Machine Learning para preferencias
- [ ] Realidad aumentada para pruebas

## 🛠️ **Instalación y Configuración**

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build
```

### Dependencias Principales
- React 19+
- Lucide React (iconos)
- Tailwind CSS (styling)

## 📱 **Componentes de Vista**

Cada vista es completamente modular y recibe servicios como props:

```javascript
// Ejemplo: HomeView
function HomeView({ 
  onNavigate, 
  weatherData, 
  outfitSuggestion, 
  userData,
  addNotification 
}) {
  // Lógica de la vista
}
```

## 🔧 **Personalización**

### Agregar Nuevo Servicio

1. Crear archivo en `src/services/NewService.js`
2. Implementar clase con métodos necesarios
3. Importar en `App.js`
4. Inyectar en componentes que lo necesiten

### Agregar Nueva Funcionalidad

1. Extender servicio existente o crear nuevo
2. Actualizar tipos/interfaces si es necesario
3. Crear hook personalizado si aplica
4. Implementar en componentes de vista

## 📊 **Estructura de Datos**

### Prenda (ClothingItem)
```javascript
{
  id: number,
  name: string,
  category: 'tops' | 'bottoms' | 'shoes' | 'accessories',
  brand: string,
  color: string,
  season: 'spring' | 'summer' | 'fall' | 'winter' | 'all',
  condition: number, // 0-100
  timesWorn: number,
  lastWorn: string | null,
  image: string
}
```

### Usuario (UserData)
```javascript
{
  level: number,
  points: number,
  streak: number,
  outfitsUsed: number,
  lastActiveDate: string
}
```

### Outfit Generado
```javascript
{
  title: string,
  description: string,
  advice: string,
  items: ClothingItem[],
  weatherType: string,
  generated: string
}
```

## 🎯 **Beneficios de la Arquitectura Modular**

1. **Mantenibilidad**: Cada servicio es independiente
2. **Testabilidad**: Servicios pueden probarse por separado
3. **Escalabilidad**: Fácil agregar nuevas funcionalidades
4. **Reutilización**: Servicios pueden usarse en múltiples vistas
5. **Separación de responsabilidades**: Lógica de negocio separada de UI

## 🤝 **Contribución**

Para contribuir al proyecto:

1. Fork el repositorio
2. Crear rama para feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

---

**Desarrollado con ❤️ para revolucionar la gestión de armarios virtuales**