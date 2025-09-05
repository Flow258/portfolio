'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useState, useEffect, useRef } from 'react'
import { Code, Palette, Users, Database, Globe, Smartphone } from 'lucide-react'

interface Skill {
  name: string
  level: number
  description?: string
}

interface SkillCardProps {
  title: string
  icon: React.ComponentType<any>
  skills: Skill[]
  colorScheme: string
  index: number
  isVisible: boolean
}

function SkillCard({ title, icon: Icon, skills, colorScheme, index, isVisible }: SkillCardProps) {
  const [animatedLevels, setAnimatedLevels] = useState<number[]>(skills.map(() => 0))
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)

  // Animate progress bars when visible
  useEffect(() => {
    if (isVisible) {
      const timers = skills.map((skill, skillIndex) => 
        setTimeout(() => {
          setAnimatedLevels(prev => {
            const newLevels = [...prev]
            newLevels[skillIndex] = skill.level
            return newLevels
          })
        }, 200 + skillIndex * 150) // Stagger animations
      )

      return () => timers.forEach(clearTimeout)
    }
  }, [isVisible, skills])

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        animationDelay: `${index * 200}ms`,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid rgba(148, 163, 184, 0.1)'
      }}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r ${colorScheme} rounded-full opacity-30 animate-bounce`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      <CardHeader className="relative z-10">
        {/* Icon with enhanced styling */}
        <div className="relative mb-6">
          <div className={`w-20 h-20 bg-gradient-to-br ${colorScheme} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          {/* Glow effect */}
          <div className={`absolute inset-0 w-20 h-20 bg-gradient-to-br ${colorScheme} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 -z-10`} />
        </div>
        
        <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        {skills.map((skill, skillIndex) => (
          <div 
            key={skillIndex} 
            className="group/skill space-y-3"
            onMouseEnter={() => setHoveredSkill(skillIndex)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            {/* Skill header */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold text-sm group-hover/skill:text-gray-900 transition-colors duration-200">
                {skill.name}
              </span>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-bold transition-all duration-300 ${
                  hoveredSkill === skillIndex 
                    ? 'text-purple-600 scale-110' 
                    : 'text-gray-600'
                }`}>
                  {animatedLevels[skillIndex]}%
                </span>
                {/* Skill level indicator */}
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i < Math.floor(skill.level / 20)
                          ? `bg-gradient-to-r ${colorScheme}`
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Progress bar with enhanced styling */}
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${colorScheme} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                  style={{ 
                    width: `${animatedLevels[skillIndex]}%`,
                    boxShadow: hoveredSkill === skillIndex ? `0 0 20px rgba(147, 51, 234, 0.4)` : 'none'
                  }}
                >
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-shine" />
                </div>
              </div>
              
              {/* Skill description tooltip */}
              {skill.description && hoveredSkill === skillIndex && (
                <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 animate-fade-in-up z-20">
                  {skill.description}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Category stats */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Average: {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%</span>
            <span>{skills.length} skills</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SkillsSection() {
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

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Code,
      colorScheme: "from-purple-500 to-blue-500",
      skills: [
        { name: "HTML5 & CSS3", level: 95, description: "Building semantic and responsive web layouts" },
        { name: "Spring MVC", level: 80, description: "Java-based web application framework" },
        { name: "Flask", level: 75, description: "Lightweight Python web framework" },
        { name: "Reactjs/Next.js", level: 92, description: "Building modern web applications with React ecosystem" },
        { name: "TypeScript", level: 88, description: "Type-safe JavaScript development" },
        { name: "Tailwind CSS", level: 90, description: "Utility-first CSS framework" },
        { name: "JavaScript ES6+", level: 95, description: "Modern JavaScript features and best practices" }
      ]
    },
    {
      title: "Backend Development", 
      icon: Database,
      colorScheme: "from-cyan-500 to-blue-500",
      skills: [
        { name: "Node.js", level: 85, description: "Server-side JavaScript runtime" },
        { name: "Python", level: 80, description: "Versatile programming language" },
        { name: "MySQL", level: 82, description: "Advanced relational database" },
        { name: "Java", level: 78, description: "Object-oriented programming and enterprise application development" },
        { name: "PHP", level: 70, description: "Web development and server-side scripting" },
        { name: "FastAPI", level: 75, description: "High-performance Python web framework" }
        //{ name: "API Design", level: 88, description: "RESTful and GraphQL APIs" }
      ]
    },
    {
      title: "UI/UX Design",
      icon: Palette,
      colorScheme: "from-pink-500 to-rose-500",
      skills: [
        { name: "Figma", level: 85, description: "Interface design and prototyping" },
        { name: "User Research", level: 75, description: "Understanding user needs and behavior" },
        { name: "Responsive Design", level: 92, description: "Mobile-first design approach" },
        { name: "Design Systems", level: 80, description: "Consistent design patterns" }
      ]
    },
    {
      title: "DevOps & Tools",
      icon: Globe,
      colorScheme: "from-emerald-500 to-teal-500",
      skills: [
        { name: "Git/GitHub", level: 90, description: "Version control and collaboration" },
        { name: "Docker", level: 75, description: "Containerization and deployment" },
        //{ name: "AWS", level: 70, description: "Cloud infrastructure and services" },
        { name: "CI/CD", level: 78, description: "Automated testing and deployment" }
      ]
    },
/*
    {
      title: "Mobile Development",
      icon: Smartphone,
      colorScheme: "from-violet-500 to-purple-500",
      skills: [
        { name: "React Native", level: 82, description: "Cross-platform mobile apps" },
        { name: "Flutter", level: 75, description: "Google's UI toolkit" },
        { name: "iOS Development", level: 70, description: "Native iOS applications" },
        { name: "Android Development", level: 72, description: "Native Android applications" }
      ]
    },
*/
    {
      title: "Soft Skills",
      icon: Users,
      colorScheme: "from-amber-500 to-orange-500",
      skills: [
        { name: "Team Leadership", level: 88, description: "Leading and mentoring development teams" },
        { name: "Project Management", level: 85, description: "Agile and Scrum methodologies" },
        { name: "Communication", level: 75, description: "Effective verbal and written communication with teams and stakeholders" },
        { name: "Problem Solving", level: 90, description: "Analytical thinking and debugging" }
      ]
    }
  ]

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at top, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Technical 
              <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A comprehensive overview of my technical skills, tools, and technologies I work with to create exceptional digital experiences.
            </p>
          </div>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              title={category.title}
              icon={category.icon}
              skills={category.skills}
              colorScheme={category.colorScheme}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Skills summary */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Continuous Learning Journey
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Technology evolves rapidly, and so do I. I'm constantly learning new frameworks, tools, and best practices to stay at the forefront of web development.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-shine {
          animation: shine 2s infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}