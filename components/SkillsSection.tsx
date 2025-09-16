'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useState, useEffect, useRef } from 'react'
import { Code, Palette, Users, Database, Globe, Smartphone, BrainCircuit, Briefcase, CreditCard } from 'lucide-react'

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
        { name: "HTML5 & CSS3", level: 80, description: "Crafting semantic, responsive web layouts with modern standards" },
        { name: "JavaScript", level: 60, description: "Building dynamic, interactive UIs with modern JavaScript" },
        { name: "ReactJS", level: 78, description: "Developing modern web apps with React and Next.js ecosystems" },
        { name: "TypeScript", level: 74, description: "Enhancing JavaScript with type safety for scalable applications" },
        { name: "Tailwind CSS", level: 75, description: "Designing with utility-first CSS for rapid, responsive UIs" },
        { name: "Bootstrap", level: 85, description: "Creating responsive designs with Bootstrap framework" },
        { name: "Framer Motion", level: 85, description: "Adding smooth animations to enhance user experience" },
        { name: "JSP", level: 75, description: "Building dynamic web pages with JavaServer Pages" },
        { name: "JSTL", level: 70, description: "Using JSP Standard Tag Library for web development" }
      ]
    },
    {
      title: "Backend Development",
      icon: Database,
      colorScheme: "from-cyan-500 to-blue-500",
      skills: [
        { name: "Python", level: 70, description: "Building robust backend systems with Python" },
        { name: "FastAPI", level: 63, description: "Creating high-performance APIs with Python's FastAPI" },
        { name: "Java", level: 68, description: "Developing enterprise-grade applications with Spring ecosystem" },
        { name: "Spring MVC", level: 55, description: "Building scalable web applications with Spring MVC" },
        //{ name: "Spring Security", level: 53, description: "Implementing authentication and authorization" },
        //{ name: "Spring Data JPA", level: 53, description: "Simplifying data access with Spring Data JPA" },
        //{ name: "Hibernate", level: 78, description: "Managing database interactions with ORM" },
        //{ name: "PHP", level: 68, description: "Server-side scripting for web applications" },
        { name: "Laravel", level: 68, description: "Building elegant web applications with Laravel framework" },
        { name: "MySQL", level: 83, description: "Designing and querying relational databases" },
        //{ name: "WebSocket", level: 75, description: "Implementing real-time communication for applications" },
        //{ name: "Maven", level: 75, description: "Managing Java project builds and dependencies" },
        //{ name: "Tomcat", level: 70, description: "Deploying Java applications on Tomcat server" }
      ]
    },
    {
      title: "AI & Machine Learning",
      icon: BrainCircuit,
      colorScheme: "from-violet-500 to-purple-500",
      skills: [
        { name: "Generative AI", level: 60, description: "Leveraging AI for business and recruiting solutions" },
        { name: "Hugging Face Transformers", level: 65, description: "Implementing NLP models for text analysis" },
        { name: "Whisper (OpenAI)", level: 70, description: "Using OpenAI's Whisper for speech-to-text transcription" },
        { name: "SpeechRecognition", level: 65, description: "Integrating speech recognition in applications" },
        { name: "PyAudio", level: 68, description: "Audio processing and recording with Python" },
        { name: "Ollama", level: 70, description: "Utilizing Ollama for local LLM deployments" }
      ]
    },
    /*
    {
      title: "Payment & API Integration",
      icon: CreditCard, // You may need to import this icon
      colorScheme: "from-green-500 to-emerald-500",
      skills: [
        { name: "Stripe API", level: 80, description: "Integrating secure payment processing with Stripe" },
        { name: "REST API Development", level: 85, description: "Building and consuming RESTful web services" },
        { name: "API Integration", level: 82, description: "Connecting applications with third-party services" }
      ]
    },
    */
    {
      title: "UI/UX Design",
      icon: Palette,
      colorScheme: "from-pink-500 to-rose-500",
      skills: [
        { name: "User Experience Design", level: 85, description: "Designing user-centered interfaces and workflows" },
        { name: "User Research", level: 80, description: "Conducting user research to inform design decisions" },
        { name: "Prototyping", level: 80, description: "Creating interactive prototypes for usability testing" },
        { name: "User Personas", level: 75, description: "Developing personas to guide UX strategies" },
        { name: "Responsive Design", level: 90, description: "Ensuring seamless experiences across devices" },
        { name: "Axure RP", level: 75, description: "Designing wireframes and prototypes with Axure RP" },
        { name: "Usability Testing", level: 78, description: "Conducting tests to validate design decisions" }
      ]
    },
    {
      title: "DevOps & Tools",
      icon: Globe,
      colorScheme: "from-emerald-500 to-teal-500",
      skills: [
        { name: "Git/GitHub", level: 90, description: "Managing version control and collaborative workflows" },
        //{ name: "Docker", level: 75, description: "Containerizing applications for consistent deployment" },
        //{ name: "CI/CD", level: 78, description: "Automating testing and deployment pipelines" },
        { name: "Stripe API", level: 69, description: "Integrating secure payment processing with Stripe" },
        { name: "REST API Development", level: 64, description: "Building and consuming RESTful web services" },
        { name: "API Integration", level: 67, description: "Connecting applications with third-party services" },
        { name: "Maven", level: 63, description: "Managing Java project builds and dependencies" },
        { name: "Tomcat", level: 67, description: "Deploying Java applications on Tomcat server" },
        { name: "Vercel", level: 80, description: "Deploying and hosting modern web applications" }
      ]
    },
    /*
    {
      title: "Business & Management",
      icon: Briefcase, // You may need to import this icon
      colorScheme: "from-indigo-500 to-purple-500",
      skills: [
        { name: "Business Analysis", level: 73, description: "Analyzing business requirements and processes" },
        { name: "Talent Management", level: 75, description: "AI-driven talent acquisition and management strategies" },
        { name: "Project Management", level: 76, description: "Applying Agile and Scrum for project delivery" },
        { name: "AI for Business Strategy", level: 78, description: "Leveraging AI for business transformation" }
      ]
    },
    */
    {
      title: "Soft Skills",
      icon: Users,
      colorScheme: "from-amber-500 to-orange-500",
      skills: [
        { name: "Problem Solving", level: 81, description: "Tackling complex challenges with analytical thinking" },
        //{ name: "Team Leadership", level: 76, description: "Guiding teams to achieve project goals" },
        { name: "Adaptability", level: 88, description: "Thriving in dynamic, fast-paced environments" },
        { name: "Communication", level: 68, description: "Collaborating effectively with teams and stakeholders" },
        //{ name: "Analytical Thinking", level: 88, description: "Breaking down complex problems systematically" },
        { name: "Cross-functional Collaboration", level: 82, description: "Driving alignment and synergy across diverse teams, fostering effective communication and coordination in Agile/Scrum environments" }
      ]
    }
  ];

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