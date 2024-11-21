import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
        Blog: Innovación y Automatización
      </h1>
      <p className="text-xl text-gray-600 text-center mb-16">
        Descubre las últimas tendencias y mejores prácticas en automatización e IA para PYMEs
      </p>

      <p>THIS IS A TEST DRIVE</p>
      
      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  )
}

function BlogCard({ slug, date, readTime, title, description, image }: BlogPost) {
  return (
    <Link to={`/blog/${slug}`} className="block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <time>{date}</time>
            <span>{readTime}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <span className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors flex items-center gap-2">
            Leer más
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

interface BlogPost {
  slug: string
  date: string
  readTime: string
  title: string
  description: string
  image: string
}

const blogPosts: BlogPost[] = [
  {
    slug: 'ia-transformando-pymes-espana',
    date: '15 Mar 2024',
    readTime: '5 min',
    title: 'Cómo la IA está Transformando las PYMEs en España',
    description: 'Descubre las últimas tendencias en automatización inteligente y cómo las pequeñas empresas están aprovechando la IA para crecer.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    slug: 'guia-automatizacion-procesos',
    date: '12 Mar 2024',
    readTime: '7 min',
    title: 'Guía Práctica: Automatización de Procesos para PYMEs',
    description: 'Una guía paso a paso para implementar automatización en tu negocio, desde la identificación de procesos hasta la medición de resultados.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    slug: 'casos-exito-roi-ia',
    date: '8 Mar 2024',
    readTime: '6 min',
    title: 'Casos de Éxito: ROI de la IA en Pequeñas Empresas',
    description: 'Análisis detallado de cómo diferentes PYMEs han logrado un retorno de inversión significativo mediante la implementación de IA.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  }
]