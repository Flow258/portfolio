// components/ProjectsSection.tsx
'use client'
import { useState } from 'react'
import ProjectCard from '@/components/ProjectCard'
import CertificateCard from '@/components/CertificateCard'
import { Button } from '@/components/ui/button'

type ProjectFilter = 'all' | 'web' | 'mobile' | 'fullstack'

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all')
  const [showAllProjects, setShowAllProjects] = useState(false)

  const projects = [
    {
      title: "Enomy Finances",
      description: "A JSP-based financial management platform built with Spring MVC, Hibernate, and MySQL. Features include user authentication, transaction tracking, currency conversion, investment calculations, and role-based access control. Designed for reliability and scalability.",
      technologies: [
        "Spring MVC",
        "Spring Security",
        "Spring Data JPA",
        "Hibernate",
        "MySQL",
        "JSP",
        "JSTL",
        "Maven",
        "Tomcat"
      ],
      githubUrl: "https://github.com/Flow258/enomy-finances-website",
      gradient: "from-green-400 to-blue-500",
      imageUrl: "/project_image/enomy_finances.jpg",
      category: "fullstack" as const,
      status: "archived" as const
      //featured: true
    },
    {
      title: "DOBU Martial Art Gym",
      description: "A responsive, single-page timetable for a martial arts gym. Features a dynamic schedule that allows users to filter classes by day of the week and type of martial art. Built with vanilla JavaScript for a fast and lightweight user experience.",
      technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
      liveUrl: "https://flow258.github.io/DOBU-Martail-Art-Gym/index.html", // Replace with your live deployment link
      githubUrl: "https://github.com/Flow258/DOBU-Martail-Art-Gym", // Replace with your GitHub repo link
      gradient: "from-red-500 to-orange-500",
      imageUrl: "/project_image/dobu-gym.png", // Suggested image path
      category: "web" as const,
      status: "completed" as const
    },
    {
      title: "Weather Analytics Dashboard",
      description: "Interactive weather dashboard with data visualization, historical trends, and location-based forecasts. Features beautiful charts and responsive design.",
      technologies: ["React", "Chart.js", "Weather API", "CSS Modules"],
      liveUrl: "https://weather-dashboard-demo.netlify.app",
      githubUrl: "https://github.com/Flow258/weather-dashboard",
      gradient: "from-orange-400 to-red-500",
      imageUrl: "/projects/weather.jpg",
      category: "web" as const,
      status: "completed" as const
    },
    /*
    {
      title: "Mobile Fitness Tracker",
      description: "React Native fitness tracking app with workout logging, progress visualization, and social features. Clean UI with smooth animations and offline support.",
      technologies: ["React Native", "Expo", "Firebase", "AsyncStorage"],
      githubUrl: "https://github.com/Flow258/fitness-tracker",
      gradient: "from-pink-400 to-purple-500",
      imageUrl: "/projects/fitness.jpg",
      category: "mobile" as const,
      status: "in-progress" as const
    },
    */
    {
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing projects and skills. Built with modern web technologies and optimized for performance and SEO.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://ashleydave.dev",
      githubUrl: "https://github.com/Flow258/portfolio",
      gradient: "from-indigo-400 to-blue-500",
      category: "web" as const,
      status: "completed" as const
    },
    {
      title: "Jumpstart Voice-to-Text Assistant",
      description: "An AI-powered voice-to-text assistant designed for a customer support environment that transcribes speech and provides real-time NLP analysis.",
      technologies: ["Python", "FastAPI", "WebSocket", "Whisper (OpenAI)", "Hugging Face Transformers", "PyAudio", "SpeechRecognition"],
      githubUrl: "https://github.com/Flow258/Voice-to-Text",
      imageUrl: "/project_jump_ai.png",
      gradient: "from-violet-400 to-purple-500",
      category: "fullstack" as const,
      status: "archived" as const
    }
  ]

  const certificates = [
    {
      name: "AWS Certified Solutions Architect",
      organization: "Amazon",
      year: "2024",
      description: "Comprehensive certification demonstrating expertise in designing distributed systems on AWS. Covers architectural best practices, security, and cost optimization.",
      borderColor: "border-orange-500",
      credentialUrl: "https://aws.amazon.com/verification",
      skills: ["AWS", "Cloud Architecture", "Lambda", "S3", "EC2", "RDS"],
      verified: true,
      certificateId: "AWS-SAA-C03-123456789"
    },
    {
      name: "Google Cloud Professional Developer",
      organization: "Google",
      year: "2024",
      description: "Professional certification focusing on application development, deployment, and monitoring in Google Cloud Platform environment.",
      borderColor: "border-blue-500",
      credentialUrl: "https://cloud.google.com/certification",
      skills: ["GCP", "Kubernetes", "Cloud Functions", "App Engine"],
      verified: true,
      certificateId: "GCP-PCD-987654321"
    },
    {
      name: "Meta Front-End Developer",
      organization: "Meta",
      year: "2023",
      description: "Comprehensive program covering modern front-end development with React, advanced JavaScript concepts, and user experience design principles.",
      borderColor: "border-blue-600",
      credentialUrl: "https://coursera.org/verify/professional-cert",
      skills: ["React", "JavaScript", "HTML/CSS", "UX/UI Design", "Testing"],
      verified: true,
      certificateId: "META-FED-456789123"
    },
    {
      name: "Full Stack Web Development",
      organization: "FreeCodeCamp",
      year: "2023",
      description: "Intensive certification covering full-stack development with modern frameworks, databases, and deployment strategies.",
      borderColor: "border-green-500",
      skills: ["JavaScript", "Node.js", "React", "MongoDB", "Express"],
      verified: true
    }
  ]

  const filterCategories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'web', label: 'Web Apps', count: projects.filter(p => p.category === 'web').length },
    //{ id: 'mobile', label: 'Mobile', count: projects.filter(p => p.category === 'mobile').length },
    { id: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const displayedProjects = showAllProjects 
    ? filteredProjects 
    : filteredProjects.slice(0, 6)

  return (
    <section id="projects" className="py-12 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
            Project &{' '}
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            A collection of my recent work, showcasing various technologies and problem-solving approaches. 
            Each project represents a unique challenge and learning opportunity.
          </p>
        </div>

        {/* Project Filters */}
        <div className="flex justify-center mb-8 sm:mb-12 px-4">
          <div className="inline-flex flex-wrap items-center justify-center bg-background border rounded-lg p-1 gap-1 max-w-full">
            {filterCategories.map((category) => (
              <Button
                key={category.id}
                size="sm"
                variant={activeFilter === category.id ? "default" : "ghost"}
                onClick={() => setActiveFilter(category.id as ProjectFilter)}
                className="relative transition-all duration-200 text-xs sm:text-sm whitespace-nowrap"
              >
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">{category.label.replace(' Apps', '').replace(' Stack', '')}</span>
                <span className="ml-1 sm:ml-2 text-xs bg-muted text-muted-foreground px-1.5 sm:px-2 py-0.5 rounded-full">
                  {category.count}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 px-4 sm:px-0">
          {displayedProjects.map((project, index) => (
            <div 
              key={`${activeFilter}-${index}`}
              className="animate-fade-in-up w-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {filteredProjects.length > 6 && (
          <div className="text-center mb-16 sm:mb-20 px-4">
            <Button
              onClick={() => setShowAllProjects(!showAllProjects)}
              variant="outline"
              size="lg"
              className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-full sm:w-auto"
            >
              {showAllProjects ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Show Less
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">View All Projects ({filteredProjects.length - 6} more)</span>
                  <span className="sm:hidden">View All ({filteredProjects.length - 6} more)</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </Button>
          </div>
        )}

        {/* Certificates Section */}
        <div className="border-t pt-16 sm:pt-20 px-4 sm:px-0">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Certificates & Achievements</h3>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and continuous learning achievements that validate my expertise 
              and commitment to staying current with industry standards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="animate-fade-in-up w-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CertificateCard {...cert} />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 sm:mt-20 pt-8 sm:pt-12 border-t px-4 sm:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">{projects.length}+</div>
              <p className="text-sm sm:text-base text-muted-foreground">Projects Completed</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">{certificates.length}</div>
              <p className="text-sm sm:text-base text-muted-foreground">Certifications</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                {Array.from(new Set(projects.flatMap(p => p.technologies))).length}+
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">Technologies</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">2+</div>
              <p className="text-sm sm:text-base text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}