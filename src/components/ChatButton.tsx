import { useState } from 'react'
import { Bot, X } from 'lucide-react'

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-white rounded-xl shadow-lg p-4 w-80 md:w-96 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Chat con IA</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="h-96 border rounded-lg p-4 mb-4 overflow-y-auto">
            <p className="text-gray-600">
              ¡Hola! Soy el asistente virtual de SinergiIA. ¿En qué puedo ayudarte?
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-50"
      >
        <Bot className="w-5 h-5" />
        <span>Chat con IA</span>
      </button>
    </>
  )
}