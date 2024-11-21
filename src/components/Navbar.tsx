import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">SinergiIA</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#servicios">Servicios</NavLink>
            <NavLink href="#beneficios">Beneficios</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="#contacto">Contacto</NavLink>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              className="p-2" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink href="#servicios">Servicios</MobileNavLink>
            <MobileNavLink href="#beneficios">Beneficios</MobileNavLink>
            <MobileNavLink href="/blog">Blog</MobileNavLink>
            <MobileNavLink href="#contacto">Contacto</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <a 
      href={href}
      className="text-gray-600 hover:text-gray-900 transition-colors"
    >
      {children}
    </a>
  )
}

function MobileNavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <a 
      href={href}
      className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
    >
      {children}
    </a>
  )
}