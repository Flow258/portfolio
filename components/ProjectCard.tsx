// components/ProjectCard.tsx
'use client'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl: string
  gradient: string
  imageUrl?: string
  status?: 'completed' | 'in-progress' | 'archived'
  featured?: boolean
}

export default function ProjectCard({ 
  title, 
  description, 
  technologies, 
  liveUrl, 
  githubUrl, 
  gradient, 
  imageUrl,
  status = 'completed',
  featured = false
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const statusConfig = {
    completed: { color: 'bg-green-500', label: 'Live' },
    'in-progress': { color: 'bg-yellow-500', label: 'In Progress' },
    archived: { color: 'bg-gray-500', label: 'Archived' }
  }

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
        featured ? 'ring-2 ring-primary/20 shadow-lg' : 'hover:shadow-xl'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            ⭐ Featured
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-20">
        <div className={`${statusConfig[status].color} text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1`}>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>{statusConfig[status].label}</span>
        </div>
      </div>

      {/* Project Image/Placeholder */}
      <div className={`relative h-56 bg-gradient-to-br ${gradient} overflow-hidden`}>
        {imageUrl && !imageError ? (
          <>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={`object-cover transition-all duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              onError={() => setImageError(true)}
            />
            {/* Overlay on hover */}
            <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="text-white text-center space-y-2">
                <div className="text-lg font-semibold">View Project</div>
                <div className="flex space-x-2">
                  {liveUrl && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                      onClick={(e) => {
                        e.preventDefault()
                        window.open(liveUrl, '_blank', 'noopener,noreferrer')
                      }}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                    onClick={(e) => {
                      e.preventDefault()
                      window.open(githubUrl, '_blank', 'noopener,noreferrer')
                    }}
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Code
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/80">
            <svg className="w-16 h-16 mb-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-lg font-semibold opacity-90">{title}</span>
            <span className="text-sm opacity-60">Project Preview</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <CardContent className="p-6 space-y-4">
        {/* Title and Description */}
        <div className="space-y-2">
          <CardTitle className="heading-sm group-hover:text-primary transition-colors duration-200">
            {title}
          </CardTitle>
          <CardDescription className="body-normal leading-relaxed">
            {description}
          </CardDescription>
        </div>

        {/* Technologies */}
        <div className="space-y-2">
          <p className="body-xs text-muted-foreground">Built with</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs hover:bg-muted transition-colors duration-200 cursor-default"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex space-x-2">
            {liveUrl && (
              <Button 
                size="sm"
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                onClick={() => window.open(liveUrl, '_blank', 'noopener,noreferrer')}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </Button>
            )}
            <Button 
              size="sm"
              variant="ghost"
              className="hover:bg-muted transition-all duration-200"
              onClick={() => window.open(githubUrl, '_blank', 'noopener,noreferrer')}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Source
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}