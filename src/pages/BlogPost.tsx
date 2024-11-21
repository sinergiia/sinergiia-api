import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Artículo no encontrado
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Lo sentimos, el artículo que buscas no existe o ha sido movido.
        </p>
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link 
        to="/blog"
        className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al blog
      </Link>

      <img 
        src={post.image} 
        alt={post.title} 
        className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
      />

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <time>{post.date}</time>
        <span>{post.readTime}</span>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {post.title}
      </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8">
          {post.description}
        </p>
      </div>
    </article>
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