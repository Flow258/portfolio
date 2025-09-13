'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect, useRef } from 'react'
import { Code, Palette, Coffee, Heart, Lightbulb, Target, Calendar, MapPin } from 'lucide-react'

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('story')
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const interests = [
    { name: 'Digital Art', icon: Palette, color: 'bg-brand-medium' },
    { name: 'Problem Solving', icon: Lightbulb, color: 'bg-brand-dark' },
    { name: 'Creative Coding', icon: Code, color: 'bg-brand-darkest' },
    { name: 'UI/UX Design', icon: Target, color: 'bg-brand-medium' },
    { name: 'Learning', icon: Heart, color: 'bg-brand-dark' },
    { name: 'Coffee', icon: Coffee, color: 'bg-brand-darkest' }
  ]

  const stats = [
    { label: 'Years Learning', value: '3+', icon: Calendar },
    { label: 'Projects Built', value: '10+', icon: Code },
    { label: 'Based in', value: 'Philippines', icon: MapPin }
  ]

  const tabs = [
    { id: 'story', label: 'My Story', icon: Heart },
    { id: 'journey', label: 'Dev Journey', icon: Code },
    { id: 'passion', label: 'What Drives Me', icon: Lightbulb }
  ]

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'story':
        return (
          <div className="space-y-6">
            <p className="text-lg text-brand-dark leading-relaxed">
              Hi there! I'm Ashley Dave, a passionate FullStuckDev who discovered the magic of coding three years ago. What started as curiosity about how websites work has blossomed into a full-blown love affair with technology.
            </p>
            <p className="text-lg text-brand-dark leading-relaxed">
              Coming from an artistic background, I see coding as another form of creative expression. Every line of code is like a brushstroke, and every application is a canvas where logic meets creativity. This unique perspective helps me build not just functional software, but beautiful, user-centric experiences.
            </p>
          </div>
        )
      case 'journey':
        return (
          <div className="space-y-6">
            <p className="text-lg text-brand-dark leading-relaxed">
              My coding journey began with Python—falling in love with its elegance and readability. Soon after, I dove into JavaScript and discovered the incredible world of web development. Each new concept felt like unlocking a superpower.
            </p>
            <p className="text-lg text-brand-dark leading-relaxed">
              From building my first "Hello World" to creating complex full-stack applications, every project has been a stepping stone. I've learned that the best way to master coding is by building real projects, making mistakes, and constantly pushing the boundaries of what I thought was possible.
            </p>
          </div>
        )
      case 'passion':
        return (
          <div className="space-y-6">
            <p className="text-lg text-brand-dark leading-relaxed">
              What drives me is the thrill of turning ideas into reality. There's something magical about writing code that solves real problems and improves people's lives. I'm passionate about creating clean, efficient code that's not just functional, but elegant.
            </p>
            <p className="text-lg text-brand-dark leading-relaxed">
              My goal is to bridge the gap between technology and human needs. I believe the best applications are those that users don't have to think about—they just work beautifully. That's the kind of developer I strive to be every single day.
            </p>
          </div>
        )
    }
  }

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-brand-lightest"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-light/20 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-medium/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-5xl md:text-6xl font-bold text-brand-darkest mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-brand-dark mx-auto rounded-full" />
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left side - Interactive content */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            
            {/* Tab navigation */}
            <div className="flex flex-wrap gap-2 bg-brand-light/50 p-2 rounded-2xl backdrop-blur-sm">
              {tabs.map((tab) => {
                const TabIcon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'bg-brand-darkest text-brand-lightest shadow-lg transform scale-105'
                        : 'text-brand-dark hover:text-brand-darkest hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Tab content */}
            <Card className="border border-brand-light shadow-lg bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="min-h-[200px]">
                  {renderTabContent()}
                </div>
              </CardContent>
            </Card>

            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon
                return (
                  <Card 
                    key={index}
                    className="text-center p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/95 backdrop-blur-sm border border-brand-light"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-10 h-10 bg-brand-darkest rounded-lg flex items-center justify-center">
                          <StatIcon className="w-5 h-5 text-brand-lightest" />
                        </div>
                        <div className="text-2xl font-bold text-brand-darkest">{stat.value}</div>
                        <div className="text-sm text-brand-medium font-medium">{stat.label}</div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Right side - Profile image and interests */}
          <div className={`space-y-8 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            
            {/* Profile image card */}
            <Card className="overflow-hidden border-0 shadow-2xl group">
              <CardContent className="p-0 relative">
                <div className="relative">
                  {/* Profile image container */}
                  <div className="aspect-square bg-gradient-brand flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
                    {/* Replace this with your actual image */}
                    <img 
                      src="/images/about_me.jpg"
                      alt="Ashley Dave N. Aqluzalas"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    {/* Fallback */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-lightest" style={{ display: 'none' }}>
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                        <Code className="w-12 h-12" />
                      </div>
                      <span className="text-2xl font-bold">Ashley Dave</span>
                      <span className="text-lg opacity-90">Full Stack Developer</span>
                    </div>
                  </div>
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darkest/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Floating info */}
                  <div className="absolute bottom-6 left-6 right-6 text-brand-lightest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <h4 className="text-xl font-bold mb-1">Ashley Dave N. Aqluzalas</h4>
                    <p className="text-sm opacity-90">Full Stuck Developer & Creative</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interests and passions */}
            <Card className="bg-brand-light/30 border border-brand-light shadow-lg">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold text-brand-darkest mb-6 flex items-center">
                  <Heart className="w-6 h-6 mr-3 text-red-500" />
                  What I Love
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  {interests.map((interest, index) => {
                    const InterestIcon = interest.icon
                    return (
                      <div
                        key={index}
                        className="group relative overflow-hidden"
                      >
                        <Badge 
                          variant="secondary" 
                          className={`w-full justify-center py-3 px-4 text-sm font-medium ${interest.color} text-brand-lightest hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-default border-0`}
                        >
                          <InterestIcon className="w-4 h-4 mr-2" />
                          {interest.name}
                        </Badge>
                        
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      </div>
                    )
                  })}
                </div>

                {/* Fun fact */}
                <div className="mt-8 p-4 bg-white/90 rounded-xl border border-brand-light">
                  <p className="text-sm text-brand-medium italic text-center">
                    💡 "I believe the best code is like art—functional, beautiful, and tells a story."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Timeline highlight */}
            <Card className="bg-brand-light/20 border border-brand-light shadow-lg">
              <CardContent className="p-8">
                <h4 className="text-xl font-bold text-brand-darkest mb-6">Quick Timeline</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-brand-darkest rounded-full"></div>
                    
                    <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-brand-medium rounded-full animate-pulse"></div>
                    <div>
                      <div className="font-semibold text-brand-darkest">2025 - Growing</div>
                      <div className="text-sm text-brand-medium">Building projects & learning daily</div>
                    </div>

                    <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-brand-dark rounded-full"></div>
                    <div>
                      <div className="font-semibold text-brand-darkest">2024 - Full Stack</div>
                      <div className="text-sm text-brand-medium">Learn Java, React, Node.js & databases</div>
                    </div>
                  </div>

                  </div>
                    <div>
                      <div className="font-semibold text-brand-darkest">2023 - Started Coding</div>
                      <div className="text-sm text-brand-medium">Began learning Python & web development</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to action 
        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Card className="bg-gradient-brand text-brand-lightest border-0 shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing Together</h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                I'm always excited to collaborate on new projects, discuss ideas, or just chat about the latest in tech and design.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        */}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}