'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

let toastListeners: ((toast: Toast) => void)[] = []

export function showToast(message: string, type: ToastType = 'info') {
  const toast: Toast = {
    id: `toast_${Date.now()}_${Math.random()}`,
    message,
    type,
  }
  toastListeners.forEach((listener) => listener(toast))
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const listener = (toast: Toast) => {
      setToasts((prev) => [...prev, toast])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id))
      }, 5000)
    }

    toastListeners.push(listener)
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener)
    }
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />,
    error: <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />,
    info: <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  }

  const styles = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles[toast.type]} border rounded-lg p-4 shadow-lg flex items-start gap-3 animate-in slide-in-from-right`}
        >
          {icons[toast.type]}
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => removeToast(toast.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
