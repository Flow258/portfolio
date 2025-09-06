'use client'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Menu, X, Home, User, Code, GraduationCap, Briefcase, Mail } from 'lucide-react'

interface NavigationProps {
  activeSection: string
  scrollToSection: (section: string) => void
}

export default function Navigation({ activeSection, scrollToSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail }
  ]

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100)
      
      setIsScrolled(scrollTop > 50)
      setScrollProgress(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (section: string) => {
    scrollToSection(section)
    setIsMenuOpen(false)
  }

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-transparent z-[100]">
        <div 
          className="h-full bg-gradient-brand-dark transition-all duration-300 ease-out shadow-lg"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-brand-light/50' 
          : 'bg-white/90 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div 
              className="flex-shrink-0 cursor-pointer group transition-all duration-300" 
              onClick={() => handleNavClick('home')}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-lg">
                    <span className="text-brand-lightest text-lg font-bold">AD</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-brand rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
                </div>
                <span className="hidden sm:block text-xl font-bold text-brand-darkest group-hover:text-brand-medium transition-colors duration-300">
                  Ashley Dave
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-1 bg-brand-light/30 backdrop-blur-sm rounded-full p-1 border border-brand-light/60">
                {navItems.map((item) => {
                  const IconComponent = item.icon
                  const isActive = activeSection === item.id
                  
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      onClick={() => handleNavClick(item.id)}
                      className={`relative flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 group ${
                        isActive
                          ? 'text-brand-lightest bg-brand-darkest shadow-md'
                          : 'text-brand-medium hover:text-brand-darkest hover:bg-white hover:shadow-sm'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="font-medium">{item.label}</span>
                      
                      {/* Active indicator dot */}
                      {isActive && (
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-brand-lightest rounded-full animate-pulse"></div>
                      )}
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Tablet Navigation (icons only) */}
            <div className="hidden md:flex lg:hidden items-center space-x-1 bg-brand-light/30 backdrop-blur-sm rounded-full p-1">
              {navItems.map((item) => {
                const IconComponent = item.icon
                const isActive = activeSection === item.id
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavClick(item.id)}
                    className={`relative p-3 rounded-full transition-all duration-300 hover:scale-110 group ${
                      isActive
                        ? 'text-brand-lightest bg-brand-darkest shadow-md'
                        : 'text-brand-medium hover:text-brand-darkest hover:bg-white'
                    }`}
                    title={item.label}
                  >
                    <IconComponent className="h-4 w-4" />
                    {isActive && (
                      <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-brand-lightest rounded-full animate-pulse"></div>
                    )}
                  </Button>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className={`relative p-2.5 rounded-full transition-all duration-300 ${
                  isMenuOpen 
                    ? 'text-brand-lightest bg-brand-darkest shadow-lg' 
                    : 'text-brand-dark hover:text-brand-lightest hover:bg-brand-darkest'
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <div className="relative w-5 h-5">
                  <Menu className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
                  <X className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-50'}`} />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-400 ${
        isMenuOpen 
          ? 'opacity-100 pointer-events-auto' 
          : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop with blur */}
        <div 
          className={`absolute inset-0 bg-brand-darkest/80 backdrop-blur-lg transition-all duration-400 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Mobile Menu Panel */}
        <div className={`absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-brand-light/50 transform transition-all duration-500 ${
          isMenuOpen 
            ? 'translate-y-0 opacity-100 scale-100' 
            : '-translate-y-8 opacity-0 scale-95'
        }`}>
          
          {/* Menu Header */}
          <div className="px-6 py-4 border-b border-brand-light/50">
            <h3 className="text-lg font-semibold text-brand-darkest">Navigation</h3>
            <p className="text-sm text-brand-medium">Jump to any section</p>
          </div>
          
          {/* Menu Items */}
          <div className="p-4 space-y-2">
            {navItems.map((item, index) => {
              const IconComponent = item.icon
              const isActive = activeSection === item.id
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full justify-start text-left px-4 py-4 text-base font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden ${
                    isActive
                      ? 'text-brand-lightest bg-brand-darkest shadow-lg'
                      : 'text-brand-dark hover:text-brand-darkest hover:bg-brand-light/30'
                  }`}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: isMenuOpen ? `slideInUp 0.4s ease-out ${index * 50}ms both` : 'none'
                  }}
                >
                  <div className="flex items-center space-x-3 relative z-10">
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-brand-lightest/20' 
                        : 'bg-brand-light group-hover:bg-brand-medium/30'
                    }`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-brand-medium/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                </Button>
              )
            })}
          </div>
          
          {/* Menu Footer */}
          <div className="px-6 py-4 border-t border-brand-light/50 bg-brand-lightest/50">
            <p className="text-xs text-brand-medium text-center">
              Press <kbd className="px-1.5 py-0.5 bg-brand-light rounded text-xs">ESC</kbd> to close
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .logo-glow {
          filter: drop-shadow(0 0 8px rgba(27, 63, 88, 0.3));
        }
        
        .logo-glow:hover {
          filter: drop-shadow(0 0 12px rgba(27, 63, 88, 0.5));
        }
      `}</style>
    </>
  )
}