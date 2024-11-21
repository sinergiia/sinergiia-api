import { Send } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { submitLeadForm } from '../lib/api'

type FormData = {
  name: string
  email: string
  phone: string
  message: string
}

export default function LeadForm() {
  const mutation = useMutation({
    mutationFn: (data: FormData) => submitLeadForm(data)
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    mutation.mutate({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string
    })
  }

  if (mutation.isSuccess) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <div className="text-green-600 p-4 bg-green-50 rounded-lg text-center">
          ¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Solicita tu Evaluación Gratuita
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Juan Pérez"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo Electrónico *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="juan@empresa.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="+34 600 00 00 00"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje (opcional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Cuéntanos sobre tus necesidades de automatización"
          />
        </div>

        {mutation.isError && (
          <div className="text-red-600 p-4 bg-red-50 rounded-lg">
            Error al enviar el formulario. Por favor, inténtalo de nuevo.
          </div>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? (
            'Enviando...'
          ) : (
            <>
              Solicitar Evaluación
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}