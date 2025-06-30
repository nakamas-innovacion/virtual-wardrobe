// src/components/ui/NotificationSystem.jsx
import React from 'react'
import { 
  CheckCircle, AlertCircle, Info, X, 
  Trophy, Sparkles, AlertTriangle 
} from 'lucide-react'

const NotificationSystem = ({ notifications, onRemove }) => {
  if (!notifications || notifications.length === 0) return null

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500',
          icon: CheckCircle,
          iconColor: 'text-green-100'
        }
      case 'error':
        return {
          bg: 'bg-red-500',
          icon: AlertCircle,
          iconColor: 'text-red-100'
        }
      case 'warning':
        return {
          bg: 'bg-yellow-500',
          icon: AlertTriangle,
          iconColor: 'text-yellow-100'
        }
      case 'achievement':
        return {
          bg: 'bg-purple-500',
          icon: Trophy,
          iconColor: 'text-purple-100'
        }
      case 'points':
        return {
          bg: 'bg-blue-500',
          icon: Sparkles,
          iconColor: 'text-blue-100'
        }
      default: // info
        return {
          bg: 'bg-slate-500',
          icon: Info,
          iconColor: 'text-slate-100'
        }
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => {
        const style = getNotificationStyle(notification.type)
        const Icon = style.icon

        return (
          <NotificationCard
            key={notification.id}
            notification={notification}
            style={style}
            Icon={Icon}
            onRemove={onRemove}
          />
        )
      })}
    </div>
  )
}

const NotificationCard = ({ notification, style, Icon, onRemove }) => {
  const handleRemove = () => {
    onRemove(notification.id)
  }

  return (
    <div className={`${style.bg} text-white rounded-lg shadow-lg p-4 transform transition-all duration-300 animate-slide-in-right`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-relaxed">
            {notification.message}
          </p>
          
          {notification.timestamp && (
            <p className="text-xs opacity-75 mt-1">
              {new Date(notification.timestamp).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          )}
        </div>

        <button
          onClick={handleRemove}
          className="flex-shrink-0 text-white hover:text-gray-200 transition-colors p-1 hover:bg-black hover:bg-opacity-20 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Barra de progreso para auto-dismiss */}
      {notification.type !== 'error' && (
        <div className="mt-3 h-1 bg-black bg-opacity-20 rounded-full overflow-hidden">
          <div className="h-full bg-white bg-opacity-50 rounded-full animate-progress" />
        </div>
      )}
    </div>
  )
}

// Agregar estilos CSS personalizados (normalmente estarían en un archivo CSS)
const style = document.createElement('style')
style.textContent = `
  @keyframes slide-in-right {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes progress {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }

  .animate-slide-in-right {
    animation: slide-in-right 0.3s ease-out;
  }

  .animate-progress {
    animation: progress 5s linear;
  }
`

// Solo agregar estilos una vez
if (!document.querySelector('[data-notification-styles]')) {
  style.setAttribute('data-notification-styles', 'true')
  document.head.appendChild(style)
}

export default NotificationSystem