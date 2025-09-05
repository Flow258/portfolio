// components/AnimatedSection.tsx
'use client'

import { useEffect, useState, useRef } from 'react'

interface AnimatedSectionProps {
  children: React.ReactNode
  animation?: string
  delay?: number
  className?: string
}

export default function AnimatedSection({ 
  children, 
  animation = 'animate-fade-in-up', 
  delay = 0,
  className = '' 
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? animation : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  )
}