'use client'
import { useState } from 'react'
import ProjectCard from '@/components/ProjectCard'
//import CertificateCard from '@/components/CertificateCard'
import { Button } from '@/components/ui/button'
import { image } from 'framer-motion/client'

type ProjectFilter = 'all' | 'web' | 'mobile' | 'fullstack'

interface Certificate {
  name: string
  organization: string
  year: string
  description: string
  borderColor: string
  credentialUrl?: string
  skills: string[]
  verified: boolean
  certificateId?: string
  program?: string
  providerId?: string
  activityId?: string
  pdusContactHours?: number
  completionDate?: string
  pdfUrl?: string
  likes?: number
  downloads?: number
  badge?: string
  featured?: boolean
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all')
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [certificateLikes, setCertificateLikes] = useState<Record<string, number>>({})
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set())
  const [showCertificateDetails, setShowCertificateDetails] = useState<Record<string, boolean>>({})

  const projects = [
    {
      title: "Meals on Wheels Laravel Application",
      description: "Built a charity meal delivery system with a 5-member team, featuring a CRUD dashboard, secure donations, meal planning, and location-based hot/cold meal delivery. Developed the donations dashboard system, designed and implemented the supporting database schema, and integrated Stripe as the secure payment gateway for seamless donation processing.",
      technologies: [
        "PHP",
        "Laravel",
        "React.js",
        "Stripe API",
        "MySQL"
      ],
      githubUrl: "https://github.com/Flow258/meals-on-wheels",
      gradient: "from-orange-400 to-red-500",
      imageUrl: "/project_image/meals_on_wheels.png",
      category: "fullstack" as const,
      status: "completed" as const
    },
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
    },
    {
      title: "DOBU Martial Art Gym",
      description: "A responsive, single-page timetable for a martial arts gym. Features a dynamic schedule that allows users to filter classes by day of the week and type of martial art. Built with vanilla JavaScript for a fast and lightweight user experience.",
      technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
      liveUrl: "https://flow258.github.io/DOBU-Martail-Art-Gym/index.html",
      githubUrl: "https://github.com/Flow258/DOBU-Martail-Art-Gym",
      gradient: "from-red-500 to-orange-500",
      imageUrl: "/project_image/dobu-gym.png",
      category: "web" as const,
      status: "completed" as const
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing projects and skills. Built with modern web technologies and optimized for performance and SEO.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://portfolio-7fdc.vercel.app/",
      githubUrl: "https://github.com/Flow258/portfolio",
      imageUrl: "/project_image/portfolio.png",
      gradient: "from-indigo-400 to-blue-500",
      category: "web" as const,
      status: "completed" as const
    },
    {
      title: "Jumpstart Voice-to-Text Assistant",
      description: "An AI-powered voice-to-text assistant designed for a customer support environment that transcribes speech and provides real-time NLP analysis.",
      technologies: ["Python", "FastAPI", "WebSocket", "Whisper (OpenAI)", "Hugging Face Transformers", "PyAudio", "SpeechRecognition"],
      githubUrl: "https://github.com/Flow258/Voice-to-Text",
      imageUrl: "/project_image/project_jump_ai.png",
      gradient: "from-violet-400 to-purple-500",
      category: "fullstack" as const,
      status: "archived" as const
    }
  ]

  const certificates: Certificate[] = [
    {
      name: "Generative AI, Recruiting, and Talent Acquisition",
      organization: "Project Management Institute (PMI)",
      year: "2025",
      description: "Course focused on leveraging Generative AI for recruiting and talent acquisition, emphasizing talent management and AI-driven business strategies.",
      borderColor: "border-gray-500",
      credentialUrl: "https://www.pmi.org/",
      skills: ["Talent Management", "Artificial Intelligence for Business", "Generative AI for Recruiting"],
      verified: true,
      certificateId: "d12c51f53abb998c697e349128de07cf6271c87b8f2393d12560aa082bbeb07f",
      program: "PMI® Registered Education Provider",
      providerId: "#4101",
      activityId: "41014F2SHS",
      pdusContactHours: 0.50,
      completionDate: "Mar 04, 2025 at 07:50AM UTC",
      pdfUrl: "/certificates/CertificateOfCompletion_Generative AI Recruiting and Talent Acquisition.pdf",
      likes: 42,
      downloads: 23,
      //badge: "🏆",
      //featured: true
    },
    {
      "name": "Learning Relational Databases",
      "organization": "LinkedIn",
      "year": "2025",
      "description": "Self-study course covering the top skills in Relational Databases, completed in accordance with the standards of the National Registry of CPE Sponsors.",
      "borderColor": "border-gray-500",
      "credentialUrl": "https://www.nasbaregistry.org",
      "skills": ["Relational Databases", "Information Technology"],
      "verified": true,
      "certificateId": "54a9255b8f604277fd89b22c0cf59d8c00c821e14a39c52d6a1379b68efe6a85",
      "program": "National Association of State Boards of Accountancy (NASBA)",
      "providerId": "#140940",
      "pdusContactHours": 4.80,
      "completionDate": "Sep 05, 2025 at 08:45AM UTC",
      "pdfUrl": "/certificates/CertificateOfCompletion_Learning Relational Databases.pdf",
      "likes": 0,
      "downloads": 0
    },
    {
      "name": "Business Analysis Professional Development",
      "organization": "International Institute of Business Analysis (IIBA®)",
      "year": "2025",
      "description": "Completed an IIBA® endorsed professional development activity, earning 1.00 Continuing Development Unit (CDU) for advancing skills in business analysis.",
      "borderColor": "border-gray-500",
      "credentialUrl": "https://www.iiba.org/",
      "skills": ["Business Analysis", "Continuing Development"],
      "verified": true,
      "certificateId": "65bc58a9bfcfce90ca8b79a6a1bac7d50ab2cd8a42ab2f5c3a1f85389e718e02",
      "program": "International Institute of Business Analysis (IIBA®)",
      "providerId": "#189294",
      "activityId": "2752",
      "pdusContactHours": 1.00,
      "completionDate": "May 19, 2025 at 04:46AM UTC",
      "pdfUrl": "/certificates/CertificateOfCompletion_Business Analysis Foundations Enterprise.pdf",
      "likes": 0,
      "downloads": 0
    },
    {
      "name": "Generative AI for Business Leaders",
      "organization": "LinkedIn",
      "year": "2025",
      "description": "Self-study course covering Artificial Intelligence for Business, Generative AI for Management, and Generative AI, completed in accordance with the standards of the National Registry of CPE Sponsors.",
      "borderColor": "border-gray-500",
      "credentialUrl": "https://www.nasbaregistry.org",
      "skills": ["Artificial Intelligence for Business", "Generative AI for Management", "Generative AI"],
      "verified": true,
      "certificateId": "d7faf6f91f9eb02830c667c4a38fbaacaa81f49a52512912f49a84320a467f76",
      "program": "National Association of State Boards of Accountancy (NASBA)",
      "providerId": "#140940",
      "pdusContactHours": 1.80,
      "completionDate": "Feb 26, 2025 at 04:31AM UTC",
      "pdfUrl": "/certificates/CertificateOfCompletion_Generative AI for Business Leaders.pdf",
      "likes": 0,
      "downloads": 0
    },
    {
      "name": "UX Design: 4 Ideation",
      "organization": "LinkedIn",
      "year": "2024",
      "description": "Self-study course covering User Experience Design (UED), focusing on ideation techniques to enhance UX workflows.",
      "borderColor": "border-gray-500",
      "credentialUrl": "https://www.linkedin.com/learning/",
      "skills": ["User Experience Design (UED)"],
      "verified": true,
      "certificateId": "0c89d93d6df1e822d2cc089e789dda4e76213779e7ae0c945a0c4b2901fed8ef",
      "program": "LinkedIn Learning",
      //"providerId": null,
      "pdusContactHours": 0.37,
      "completionDate": "Nov 19, 2024 at 02:53AM UTC",
      "pdfUrl": "/certificates/CertificateOfCompletion_UX Design 4 Ideation.pdf",
      "likes": 0,
      "downloads": 0
    },
    {
      "name": "UX Foundations: Usability Testing",
      "organization": "LinkedIn",
      "year": "2024",
      "description": "Self-study course covering usability testing and core User Experience (UX) evaluation methodologies.",
      "borderColor": "border-gray-500",
      "credentialUrl": "https://www.linkedin.com/learning/",
      "skills": ["Usability Testing", "User Experience (UX)"],
      "verified": true,
      "certificateId": "2fbfd5c8e863b6d6b38a9948f997007aab6a4a071829f264920099a0bad66578",
      "program": "LinkedIn Learning",
      //"providerId": null,
      "pdusContactHours": 1.48,
      "completionDate": "Nov 19, 2024 at 09:34AM UTC",
      "pdfUrl": "/certificates/CertificateOfCompletion_UX Foundations Usability Testing.pdf",
      "likes": 0,
      "downloads": 0
    },
    {
      "name": "UX Foundations: Prototyping (2017)",
      "organization": "LinkedIn",
      "year": "2024",
      "description": "Self-study course covering user interface prototyping principles and practices.",
      "borderColor": "border-gray-500",
      "credentialUrl": "https://www.linkedin.com/learning/",
      "skills": ["User Interface Prototyping"],
      "verified": true,
      "certificateId": "fee02da1b7dee25093e0eb7609372a60accb928ea7af3043b665deebc99dc658",
      "program": "LinkedIn Learning",
      //"providerId": null,
      "pdusContactHours": 1.30,
      "completionDate": "Nov 27, 2024 at 04:48AM UTC",
      "pdfUrl": "/certificates/CertificateOfCompletion_UX Foundations Prototyping 2017.pdf",
      "likes": 0,
      "downloads": 0
    },
    {
      "name": "UX Design: 6 Paper Prototyping",
      "organization": "LinkedIn",
      "year": "2024",
      "description": "Self-study course covering paper prototyping techniques in UX design.",
      "borderColor": "border-gray-500",
      "credentialUrl": "https://www.linkedin.com/learning/",
      "skills": ["User Experience Design (UED)"],
      "verified": true,
      "certificateId": "31c64c50db5f610a72f1436ce9a8c62de2380303b3bdac17425064c15734d649",
      "program": "LinkedIn Learning",
      //"providerId": null,
      "pdusContactHours": 0.40,
      "completionDate": "Nov 19, 2024 at 06:44AM UTC",
      "pdfUrl": "/certificates/CertificateOfCompletion_UX Design 6 Paper Prototyping.pdf",
      "likes": 0,
      "downloads": 0
    },
    {
      "name": "UX Design: 5 Creating Scenarios and Storyboards",
      "organization": "LinkedIn",
      "year": "2024",
      "description": "Self-study course covering scenario creation and storyboarding in UX design workflows.",
      "borderColor": "border-gray-500",
      "credentialUrl": "https://www.linkedin.com/learning/",
      "skills": ["User Experience Design (UED)"],
      "verified": true,
      "certificateId": "164b4115e712e8050e410af361fa4435e34403f12a8d2eeb1b7d46a1a20c62d0",
      "program": "LinkedIn Learning",
      //"providerId": null,
      "pdusContactHours": 0.33,
      "completionDate": "Nov 19, 2024 at 04:57AM UTC",
      "pdfUrl": "/certificates/CertificateOfCompletion_UX Design 5 Creating Scenarios and Storyboards.pdf",
      "likes": 0,
      "downloads": 0
    },
    {
      "name": "UX Design: 3 Creating Personas",
      "organization": "LinkedIn",
      "year": "2024",
      "description": "Self-study course covering persona development as part of UX design.",
      "borderColor": "border-gray-500",
      "credentialUrl": "https://www.linkedin.com/learning/",
      "skills": ["User Personas"],
      "verified": true,
      "certificateId": "ca43e61499e724ed0eb06fae4e0723265be46cd64f7af9524571594ec94bef9d",
      "program": "LinkedIn Learning",
      //"providerId": null,
      "pdusContactHours": 0.42,
      "completionDate": "Nov 19, 2024 at 01:42AM UTC",
      "pdfUrl": "/certificates/CertificateOfCompletion_UX Design 3 Creating Personas.pdf",
      "likes": 0,
      "downloads": 0
    },
    {
      "name": "UX Design: 2 Analyzing User Data",
      "organization": "LinkedIn",
      "year": "2024",
      "description": "Self-study course covering user data analysis techniques for UX design.",
      "borderColor": "border-gray-500",
      "credentialUrl": "https://www.linkedin.com/learning/",
      "skills": ["User Analysis"],
      "verified": true,
      "certificateId": "b637119c7c02a5cb8c1c8b62db80dd1a38f515d92f9e61ff5f2da7bba24a3a3e",
      "program": "LinkedIn Learning",
      //"providerId": null,
      "pdusContactHours": 0.50,
      "completionDate": "Nov 18, 2024 at 09:06AM UTC",
      "pdfUrl": "/certificates/CertificateOfCompletion_UX Design 2 Analyzing User Data.pdf",
      "likes": 0,
      "downloads": 0
    },
    {
      "name": "UX Design: 1 Overview",
      "organization": "LinkedIn",
      "year": "2024",
      "description": "Self-study course providing an overview of User Experience Design (UED).",
      "borderColor": "border-gray-500",
      "credentialUrl": "https://www.linkedin.com/learning/",
      "skills": ["User Experience Design (UED)"],
      "verified": true,
      "certificateId": "78c9409a76b7e79f2e61c5a622f5e5a356f921bbf7c7781f13522eabb0a22196",
      "program": "LinkedIn Learning",
      //"providerId": null,
      "pdusContactHours": 0.22,
      "completionDate": "Nov 18, 2024 at 08:13AM UTC",
      "pdfUrl": "/certificates/CertificateOfCompletion_UX Design 1 Overview.pdf",
      "likes": 0,
      "downloads": 0
    },
  /*
    {
      name: "Full Stack Web Development",
      organization: "FreeCodeCamp",
      year: "2023",
      description: "Intensive certification covering full-stack development with modern frameworks, databases, and deployment strategies.",
      borderColor: "border-green-500",
      skills: ["JavaScript", "Node.js", "React", "MongoDB", "Express"],
      verified: true,
      pdfUrl: "/certificates/freecodecamp-fullstack.pdf",
      likes: 29,
      downloads: 18,
      badge: "🔥"
    }
      */
  ]

  // Initialize likes from certificate data
  useState(() => {
    const initialLikes: Record<string, number> = {}
    certificates.forEach(cert => {
      if (cert.certificateId && cert.likes) {
        initialLikes[cert.certificateId] = cert.likes
      }
    })
    setCertificateLikes(initialLikes)
  })

  const handleLike = (certificateId: string) => {
    if (!certificateId) return
    
    const isLiked = userLikes.has(certificateId)
    const newUserLikes = new Set(userLikes)
    
    if (isLiked) {
      newUserLikes.delete(certificateId)
      setCertificateLikes(prev => ({
        ...prev,
        [certificateId]: (prev[certificateId] || 0) - 1
      }))
    } else {
      newUserLikes.add(certificateId)
      setCertificateLikes(prev => ({
        ...prev,
        [certificateId]: (prev[certificateId] || 0) + 1
      }))
    }
    
    setUserLikes(newUserLikes)
  }

  const handleOpenPdf = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank')
  }

  const toggleCertificateDetails = (certificateId: string) => {
    if (!certificateId) return
    setShowCertificateDetails(prev => ({
      ...prev,
      [certificateId]: !prev[certificateId]
    }))
  }

  const filterCategories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'web', label: 'Web Apps', count: projects.filter(p => p.category === 'web').length },
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

        {/* Enhanced Certificates Section */}
        <div className="border-t pt-16 sm:pt-20 px-4 sm:px-0">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Certificates & Achievements 
              <span className="ml-2 text-yellow-500">🏆</span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and continuous learning achievements that validate my expertise 
              and commitment to staying current with industry standards.
            </p>
            
            {/* Certificate Stats */}
            <div className="flex justify-center gap-6 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-red-500"></span>
                <span>{Object.values(certificateLikes).reduce((sum, likes) => sum + likes, 0)} total likes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500"></span>
                <span>{certificates.reduce((sum, cert) => sum + (cert.downloads || 0), 0)} downloads</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {certificates.map((cert, index) => {
              const certificateId = cert.certificateId || `cert-${index}`
              const isLiked = userLikes.has(certificateId)
              const currentLikes = certificateLikes[certificateId] || cert.likes || 0
              const showDetails = showCertificateDetails[certificateId]

              return (
                <div
                  key={certificateId}
                  className="animate-fade-in-up w-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`relative group bg-background rounded-xl border-2 ${cert.borderColor} p-6 hover:shadow-lg transition-all duration-300 ${cert.featured ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}`}>
                    
                    {/* Featured Badge */}
                    {cert.featured && (
                      <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                        Featured ⭐
                      </div>
                    )}

                    {/* Certificate Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {cert.badge && <span className="text-2xl">{cert.badge}</span>}
                          <h4 className="text-lg font-bold text-foreground">{cert.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{cert.organization}</p>
                        <p className="text-xs text-muted-foreground">{cert.year}</p>
                      </div>
                      
                      {cert.verified && (
                        <div className="flex items-center text-green-500 text-xs">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{cert.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {cert.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground">
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground">
                          +{cert.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Interaction Bar */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4">
                        {/* Like Button */}
                        <button
                          onClick={() => handleLike(certificateId)}
                          className={`flex items-center gap-1 text-sm transition-colors ${
                            isLiked 
                              ? 'text-red-500 hover:text-red-600' 
                              : 'text-muted-foreground hover:text-red-500'
                          }`}
                        >
                          <svg className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>{currentLikes}</span>
                        </button>

                        {/* Download Count */}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{cert.downloads || 0}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Details Toggle */}
                        <button
                          onClick={() => toggleCertificateDetails(certificateId)}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showDetails ? 'Hide Details' : 'Show Details'}
                        </button>

                        {/* PDF View */}
                        {cert.pdfUrl && (
                          <button
                            onClick={() => handleOpenPdf(cert.pdfUrl!)}
                            className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs rounded-md hover:bg-primary/90 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View PDF
                          </button>
                        )}

                        {/* Credential Link */}
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1 border text-xs rounded-md hover:bg-muted transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Verify
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Expandable Details */}
                    {showDetails && (
                      <div className="mt-4 pt-4 border-t text-xs text-muted-foreground space-y-2">
                        {cert.certificateId && (
                          <div>
                            <strong>Certificate ID:</strong> {cert.certificateId}
                          </div>
                        )}
                        {cert.program && (
                          <div>
                            <strong>Program:</strong> {cert.program}
                          </div>
                        )}
                        {cert.providerId && (
                          <div>
                            <strong>Provider ID:</strong> {cert.providerId}
                          </div>
                        )}
                        {cert.activityId && (
                          <div>
                            <strong>Activity ID:</strong> {cert.activityId}
                          </div>
                        )}
                        {cert.pdusContactHours && (
                          <div>
                            <strong>PDUs/Contact Hours:</strong> {cert.pdusContactHours}
                          </div>
                        )}
                        {cert.completionDate && (
                          <div>
                            <strong>Completion Date:</strong> {cert.completionDate}
                          </div>
                        )}
                        {cert.skills.length > 3 && (
                          <div>
                            <strong>All Skills:</strong> {cert.skills.join(', ')}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
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
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">3+</div>
              <p className="text-sm sm:text-base text-muted-foreground">Years of Learning Coding</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}