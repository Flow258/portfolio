'use client'
import { Button } from '@/components/ui/button'
import { useEffect, useState, useRef } from 'react'

// Type definitions for VANTA and THREE
declare global {
  interface Window {
    VANTA?: {
      BIRDS: (options: VantaBirdsOptions) => VantaEffect
    }
    THREE?: any
  }
}

interface VantaBirdsOptions {
  el: HTMLElement
  THREE: any
  mouseControls?: boolean
  touchControls?: boolean
  gyroControls?: boolean
  minHeight?: number
  minWidth?: number
  scale?: number
  scaleMobile?: number
  backgroundColor?: number
  color1?: number
  color2?: number
  colorMode?: string
  birdSize?: number
  wingSpan?: number
  speedLimit?: number
  separation?: number
  alignment?: number
  cohesion?: number
  quantity?: number
}

interface VantaEffect {
  destroy: () => void
}

interface HeroSectionProps {
  scrollToSection: (section: string) => void
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [vantaEffect, setVantaEffect] = useState<VantaEffect | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let effect: VantaEffect | null = null
    let threeScript: HTMLScriptElement | null = null
    let vantaScript: HTMLScriptElement | null = null

    const initVanta = async () => {
      try {
        if (typeof window !== 'undefined' && heroRef.current) {
          // Load Three.js first
          threeScript = document.createElement('script')
          threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
          
          threeScript.onload = () => {
            // Load VANTA after Three.js is loaded
            vantaScript = document.createElement('script')
            vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js'
            
            vantaScript.onload = () => {
              if (heroRef.current && window.VANTA?.BIRDS && (window as any).THREE) {
                effect = window.VANTA.BIRDS({
                  el: heroRef.current,
                  THREE: (window as any).THREE,
                  mouseControls: true,
                  touchControls: true,
                  gyroControls: false,
                  minHeight: 200.00,
                  minWidth: 200.00,
                  scale: 1.00,
                  scaleMobile: 0.8,
                  // Stunning gradient background
                  backgroundColor: 0x0a0a1a, // Deep space black
                  color1: 0xff6b6b, // Coral red
                  color2: 0x4ecdc4, // Teal cyan
                  colorMode: 'lerpGradient',
                  // Bird behavior - more dynamic and fluid
                  birdSize: 1.8,
                  wingSpan: 25,
                  speedLimit: 6, // Faster, more dynamic
                  separation: 20, // More spread out
                  alignment: 15, // Better flocking
                  cohesion: 8, // Looser grouping for more organic movement
                  quantity: 4 // 2^4 = 16 birds for more life
                  // Additional customizations for smoother animation
                })
                setVantaEffect(effect)
              }
            }
            
            vantaScript.onerror = () => {
              console.error('Failed to load VANTA.js')
            }
            
            document.head.appendChild(vantaScript)
          }
          
          threeScript.onerror = () => {
            console.error('Failed to load Three.js')
          }
          
          document.head.appendChild(threeScript)
        }
      } catch (error) {
        console.error('Error initializing VANTA effect:', error)
      }
    }

    initVanta()
    
    // Trigger fade-in animation
    const timer = setTimeout(() => setIsVisible(true), 100)

    return () => {
      clearTimeout(timer)
      if (effect) {
        effect.destroy()
      }
      if (vantaScript && document.head.contains(vantaScript)) {
        document.head.removeChild(vantaScript)
      }
      if (threeScript && document.head.contains(threeScript)) {
        document.head.removeChild(threeScript)
      }
    }
  }, [])

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="min-h-screen relative flex items-center justify-center pt-16 overflow-hidden"
      style={{ 
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f23 50%, #000000 100%)'
      }}
    >
      {/* Dynamic overlay with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20 z-10 pointer-events-none animate-pulse" />
      
      {/* Floating particles overlay */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-300/50 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-purple-300/40 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-pink-300/60 rounded-full animate-bounce delay-700"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
        {/* Profile Circle - Gentle floating only */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          <div className="relative w-48 h-48 mx-auto mb-8 group animate-gentle-float">
            {/* Static border ring - no spinning */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-full opacity-75 blur-sm"></div>
            
            {/* Main profile circle */}
            <div className="relative w-full h-full bg-gradient-to-br from-purple-400 via-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 backdrop-blur-md transform group-hover:scale-105 transition-transform duration-500 overflow-hidden">
              {/* Profile Image */}
              <img 
                src="/images/hero_image.png"
                alt="Ashley Dave N. Aqluzalas"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              {/* Fallback initials (hidden by default, shown if image fails) */}
              <span className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold drop-shadow-xl tracking-wider" style={{ display: 'none' }} id="profile-fallback">
                AD
              </span>
            </div>
            
            {/* Glowing effect - static */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-500/20 to-cyan-400/20 rounded-full blur-xl"></div>
          </div>
        </div>
                
        {/* Main Heading - Enhanced typography */}
        <h1 className={`text-4xl md:text-7xl font-extrabold text-white mb-6 transition-all duration-1000 delay-300 drop-shadow-2xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          Hi, I'm <br className="md:hidden" />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Ashley Dave N. Aqluzalas
            </span>
            {/* Animated underline */}
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 transform scale-x-0 animate-scale-x opacity-80"></div>
          </span>
        </h1>
                
        {/* Subtitle - More dynamic */}
        <p className={`text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-500 drop-shadow-lg ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          <span className="font-light">Full Stack</span> <span className="font-bold text-cyan-300">Developer</span>
          <span className="block text-lg md:text-xl mt-2 text-gray-400 font-normal">
            Crafting digital experiences with passion & precision
          </span>
        </p>
                
        {/* CTA Button - More interactive */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          <Button
            onClick={() => scrollToSection('about')}
            size="lg"
            className="relative group bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-10 py-5 text-xl font-semibold hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/30 backdrop-blur-sm hover:border-white/50 rounded-full overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Button content */}
            <span className="relative z-10 flex items-center">
              Discover My Journey
              <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
            
            {/* Shine effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
          </Button>
        </div>
      </div>
    </section>
  )
}