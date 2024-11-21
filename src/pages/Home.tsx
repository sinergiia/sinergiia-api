import { Brain, Zap, BarChart3 } from 'lucide-react'
import LeadForm from '../components/LeadForm'

export default function Home() {
  return (
    <>
      <section className="min-h-[90vh] bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <Brain className="w-16 h-16 mx-auto md:mx-0 mb-8" />
              <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                Automatización Inteligente<br />
                para tu PYME
              </h1>
              <p className="text-xl sm:text-2xl text-gray-100 mb-8">
                Potencia tu negocio con Inteligencia Artificial. Optimiza procesos, reduce costes y
                aumenta la productividad de tu empresa.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Beneficios de la Automatización<br />
            Inteligente
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Descubre cómo la IA puede transformar tu negocio y llevarlo al siguiente nivel
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              icon={<Zap className="w-8 h-8 text-indigo-600" />}
              title="Eficiencia Operativa"
              description="Automatiza tareas repetitivas y reduce el tiempo dedicado a procesos manuales."
            />
            <BenefitCard
              icon={<BarChart3 className="w-8 h-8 text-indigo-600" />}
              title="Análisis Avanzado"
              description="Obtén insights valiosos de tus datos para tomar mejores decisiones."
            />
            <BenefitCard
              icon={<Brain className="w-8 h-8 text-indigo-600" />}
              title="IA Personalizada"
              description="Soluciones adaptadas a las necesidades específicas de tu PYME."
            />
          </div>
        </div>
      </section>
    </>
  )
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}