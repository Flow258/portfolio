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
                  // Brand color background - using your darkest blue
                  backgroundColor: 0x001b2e, // Your brand darkest
                  color1: 0x537692, // Your brand medium
                  color2: 0xb3cde4, // Your brand light
                  colorMode: 'lerpGradient',
                  // Bird behavior - more dynamic and fluid
                  birdSize: 1.8,
                  wingSpan: 25,
                  speedLimit: 6, // Faster, more dynamic
                  separation: 20, // More spread out
                  alignment: 15, // Better flocking
                  cohesion: 8, // Looser grouping for more organic movement
                  quantity: 4 // 2^4 = 16 birds for more life
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

  // Handle resume opening in new tab
  const handleResumeView = () => {
    window.open('/files/Resume_Ashley-Dave-N-Alquizalas.pdf', '_blank')
  }

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="min-h-screen relative flex items-center justify-center pt-16 overflow-hidden bg-brand-darkest"
    >
      {/* Dynamic overlay with brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/30 via-transparent to-brand-medium/20 z-10 pointer-events-none animate-pulse" />
      
      {/* Floating particles overlay using brand colors */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-lightest/40 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-brand-light/60 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-brand-medium/50 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-brand-light/70 rounded-full animate-bounce delay-700"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
        {/* Profile Circle - Using brand colors */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          <div className="relative w-48 h-48 mx-auto mb-8 group animate-gentle-float">
            {/* Brand gradient border ring */}
            <div className="absolute inset-0 bg-gradient-brand rounded-full opacity-75 blur-sm"></div>
            
            {/* Main profile circle */}
            <div className="relative w-full h-full bg-gradient-brand rounded-full flex items-center justify-center shadow-2xl border-4 border-brand-lightest/30 backdrop-blur-md transform group-hover:scale-105 transition-transform duration-500 overflow-hidden">
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
              <span className="absolute inset-0 flex items-center justify-center text-brand-lightest text-6xl font-bold drop-shadow-xl tracking-wider" style={{ display: 'none' }} id="profile-fallback">
                AD
              </span>
            </div>
            
            {/* Glowing effect with brand colors */}
            <div className="absolute inset-0 bg-gradient-brand/20 rounded-full blur-xl"></div>
          </div>
        </div>
                
        {/* Main Heading - Enhanced typography with brand colors */}
        <h1 className={`text-4xl md:text-7xl font-extrabold text-brand-lightest mb-6 transition-all duration-1000 delay-300 drop-shadow-2xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          Hi, I'm <br className="md:hidden" />
          <span className="relative inline-block">
            <span className="text-brand">
              Ashley Dave N. Alquizalas
            </span>
            {/* Animated underline with brand colors */}
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-brand-light transform scale-x-0 animate-scale-x opacity-80"></div>
          </span>
        </h1>
                
        {/* Subtitle - More dynamic with brand colors */}
        <p className={`text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-brand-light via-brand-lightest to-brand-light mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-500 drop-shadow-lg ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          <span className="font-light">Full Stack</span> <span className="font-bold text-brand-light">Developer</span>
          <span className="block text-lg md:text-xl mt-2 text-brand-light/80 font-normal">
            Crafting digital experiences with passion & precision
          </span>
        </p>
                
        {/* Buttons Container */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          {/* Main CTA Button */}
          <Button
            onClick={() => scrollToSection("about")}
            size="lg"
            className="relative group bg-brand-dark text-white px-10 py-5 text-xl font-semibold hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-brand-lightest/30 backdrop-blur-sm hover:border-brand-lightest/50 rounded-full overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Discover My Journey
              <svg
                className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </span>
          </Button>

          {/* Resume View Button */}
          <Button
            onClick={handleResumeView}
            variant="outline"
            size="lg"
            className="relative group bg-transparent text-brand-lightest px-8 py-5 text-lg font-semibold border-2 border-brand-light hover:bg-brand-light hover:text-brand-dark transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 rounded-full backdrop-blur-sm"
          >
            <span className="relative z-10 flex items-center">
              <svg
                className="mr-3 w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              View Resume
            </span>
          </Button>
        </div>

        {/* Additional brand accent - floating elements */}
        <div className="absolute top-1/4 left-0 w-20 h-20 bg-brand-medium/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-brand-light/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  )
}