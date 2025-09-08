'use client'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect, useRef } from 'react'
import { GraduationCap, Award, BookOpen, Code, Palette, Target, Calendar, MapPin, Star, TrendingUp } from 'lucide-react'

interface EducationCardProps {
  degree: string
  institution: string
  description: string
  yearRange: string
  type: 'formal' | 'self-taught' | 'certification' | 'bootcamp'
  skills: string[]
  achievements?: string[]
  index: number
  isVisible: boolean
}

function EducationCard({ 
  degree, 
  institution, 
  description, 
  yearRange, 
  type, 
  skills, 
  achievements, 
  index, 
  isVisible 
}: EducationCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const typeConfig = {
    formal: { 
      icon: GraduationCap, 
      color: 'from-purple-500 to-blue-500',
      bgColor: 'from-purple-50 to-blue-50',
      borderColor: 'border-purple-500'
    },
    'self-taught': { 
      icon: BookOpen, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-500'
    },
    certification: { 
      icon: Award, 
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-500'
    },
    bootcamp: { 
      icon: Code, 
      color: 'from-cyan-500 to-teal-500',
      bgColor: 'from-cyan-50 to-teal-50',
      borderColor: 'border-cyan-500'
    }
  }

  const config = typeConfig[type]
  const TypeIcon = config.icon

  return (
    <div 
      className={`relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Timeline connector */}
      <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300" />
      
      {/* Timeline dot */}
      <div className={`hidden md:flex absolute left-6 top-8 w-5 h-5 bg-gradient-to-r ${config.color} rounded-full items-center justify-center shadow-lg z-10`}>
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>

      {/* Education card */}
      <div className="md:ml-16">
        <Card 
          className={`group border-l-4 ${config.borderColor} bg-gradient-to-r ${config.bgColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated background */}
          <div className={`absolute inset-0 bg-gradient-to-r ${config.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-gradient-to-r ${config.color} rounded-full opacity-30 animate-bounce`}
                style={{
                  left: `${10 + i * 25}%`,
                  top: `${15 + i * 20}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>

          <CardContent className="p-8 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              
              {/* Main content */}
              <div className="flex-1 space-y-4">
                {/* Header with icon */}
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${config.color} rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <TypeIcon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                      {degree}
                    </CardTitle>
                    <CardDescription className="text-lg font-semibold text-purple-600 mt-1 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {institution}
                    </CardDescription>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed text-lg">
                  {description}
                </p>

                {/* Skills learned */}
                {skills.length > 0 && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-800 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Key Skills Acquired
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, skillIndex) => (
                        <Badge 
                          key={skillIndex}
                          variant="secondary" 
                          className={`bg-white/80 text-gray-700 border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-default`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {achievements && achievements.length > 0 && (
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-800 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      Notable Achievements
                    </h5>
                    <ul className="space-y-2">
                      {achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start space-x-2 text-gray-700">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Year badge */}
              <div className="flex-shrink-0">
                <Badge 
                  variant="secondary" 
                  className={`bg-gradient-to-r ${config.color} text-white px-6 py-3 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {yearRange}
                </Badge>
              </div>
            </div>
          </CardContent>

          {/* Progress indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className={`h-full bg-gradient-to-r ${config.color} transition-all duration-700 ${
                isHovered ? 'w-full' : 'w-0'
              }`}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function EducationSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const educationData = [
    {
      degree: "Bachelor of Science in Information Technology (BSIT) with a specialization in Software Engineering",
      institution: "University of the Cebu - Banilad",
      description: "Comprehensive program covering software development, systems analysis, and project management. Gained hands-on experience through internships and collaborative projects, focusing on real-world applications and industry best practices.",
      yearRange: "2024-Present",
      type: 'formal' as const,
      skills: ["Python", "JavaScript", "React", "Node.js", "HTML/CSS", "Git", "Problem Solving"],
      achievements: [
        "Built 15+ personal projects from scratch",
        "Mastered Python and JavaScript ecosystems",
        "Developed strong debugging and problem-solving skills",
        "Created responsive, user-friendly web applications"
      ]
    },
  /*
    {
      degree: "Frontend Development Specialization",
      institution: "freeCodeCamp & MDN Web Docs",
      description: "Deep dive into modern frontend technologies with emphasis on React ecosystem, responsive design, and user experience. Completed comprehensive courses and built real-world projects to solidify understanding.",
      yearRange: "2024",
      type: 'certification' as const,
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "State Management", "API Integration"],
      achievements: [
        "Completed 300+ hours of structured learning",
        "Built portfolio of responsive web applications",
        "Mastered modern React patterns and hooks"
      ]
    } */
    {
      degree: "Creative Arts & Design Foundation",
      institution: "Self-Directed Study",
      description: "Developed strong foundation in visual arts, design principles, and creative thinking. This background significantly influences my approach to UI/UX design and helps me create visually appealing, user-centered applications.",
      yearRange: "2021-Present",
      type: 'self-taught' as const,
      skills: ["Digital Art", "Design Principles", "Color Theory", "Typography", "User Psychology", "Creative Thinking"],
      achievements: [
        "Developed unique artistic perspective for UI design",
        "Learned to balance aesthetics with functionality",
        "Built strong foundation in visual communication"
      ]
    },
    {
      degree: "Applied Degree in Software Engineering (BDSE)",
      institution: "Lithan Academy Singapore",
      description: "Comprehensive study of server-side development, database design, and API architecture. Focused on building scalable, secure backend systems and understanding full-stack application architecture.",
      yearRange: "2024-Present",
      type: 'bootcamp' as const,
      skills: ["Node.js", "Express", "MySQL", "API Design", "Authentication", "Deployment", "Java", "Python", "ML"],
      achievements: [
        "Built and deployed multiple full-stack applications",
        "Mastered database design and optimization",
        "Implemented secure authentication systems"
      ]
    }
  ]

  return (
    <section 
      id="education" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #f1f5f9 75%, #ffffff 100%)'
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-cyan-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Learning 
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            My educational path combines self-directed learning, practical projects, and continuous skill development in the ever-evolving world of technology.
          </p>
          
          <div className="mt-8 w-32 h-1 bg-gradient-to-r from-purple-600 to-cyan-600 mx-auto rounded-full" />
        </div>

        {/* Education timeline */}
        <div className="relative space-y-12">
          {/* Timeline line for desktop */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 via-blue-300 to-cyan-300 opacity-30" />

          {educationData.map((edu, index) => (
            <EducationCard
              key={index}
              degree={edu.degree}
              institution={edu.institution}
              description={edu.description}
              yearRange={edu.yearRange}
              type={edu.type}
              skills={edu.skills}
              achievements={edu.achievements}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Learning philosophy */}
        <div className={`mt-20 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Card className="bg-gradient-to-r from-brand-darkest via-brand-dark to-brand-medium text-white border-0 shadow-2xl relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-32 h-32 border border-white/20 rounded-full"
                  style={{
                    left: `${i * 20}%`,
                    top: `${i % 2 === 0 ? '10%' : '60%'}`,
                    animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>

            <CardContent className="p-12 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  Continuous Learning Philosophy
                </h3>
                
                <p className="text-xl leading-relaxed mb-8 opacity-90">
                  "Education is not a destination, but a journey. Every day brings new opportunities to learn, grow, and push the boundaries of what's possible with code."
                </p>

                {/* Learning stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                  {[
                    { label: 'Hours Coding', value: '1000+' },
                    { label: 'Projects Built', value: '9+' },
                    { label: 'Technologies', value: '33+' },
                    { label: 'Still Learning', value: '∞' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <div className="text-sm opacity-80 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next goals section */}
        <div className={`mt-16 transition-all duration-1000 delay-1200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-brand-darkest mb-8">What's Next?</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  title: "Advanced React Patterns", 
                  icon: Code, 
                  color: "from-brand-darkest to-brand-dark",
                  description: "Diving deeper into React optimization and architecture"
                },
                { 
                  title: "Cloud Architecture", 
                  icon: Target, 
                  color: "from-brand-medium to-brand-light",
                  description: "Mastering AWS, Docker, and scalable deployments"
                },
                { 
                  title: "Mobile Development", 
                  icon: Palette, 
                  color: "from-brand-dark to-brand-medium",
                  description: "Expanding into React Native and Flutter"
                }
              ].map((goal, index) => {
                const GoalIcon = goal.icon
                return (
                  <Card key={index} className="bg-card/90 backdrop-blur-sm border border-brand-light/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className={`w-12 h-12 bg-gradient-to-br ${goal.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md`}>
                        <GoalIcon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-brand-darkest mb-2">{goal.title}</h4>
                      <p className="text-sm text-brand-dark">{goal.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </section>
  )
}