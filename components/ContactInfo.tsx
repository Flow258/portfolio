'use client'
import { useState } from 'react'

export default function ContactInfo() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const contactMethods = [
    {
      icon: "✉️",
      label: "Email",
      value: "asalquizalas@gmail.com",
      displayValue: "asalquizalas@gmail.com",
      gradient: "from-gray-900 to-gray-700",
      action: "copy"
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "Connect on LinkedIn",
      displayValue: "ashley-dave-alquizalas",
      gradient: "from-blue-600 to-blue-800",
      isLink: true,
      url: "https://www.linkedin.com/in/ashley-dave-alquizalas-647224379/"
    },
    {
      icon: "💻",
      label: "GitHub",
      value: "View my repositories",
      displayValue: "github.com/Flow258",
      gradient: "from-gray-800 to-black",
      isLink: true,
      url: "https://github.com/Flow258"
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+63 9660239815",
      displayValue: "+63 966 023 9815",
      gradient: "from-green-600 to-emerald-600",
      action: "copy"
    }
  ]

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(label)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="heading-lg text-balance">
          Let's Build Something 
          <span className="block text-muted-foreground">Amazing Together</span>
        </h3>
        <p className="body-large text-muted-foreground leading-relaxed">
          I'm always excited to discuss new opportunities, innovative projects, 
          and creative collaborations. Whether you have a project in mind or 
          just want to connect, I'd love to hear from you.
        </p>
      </div>

      <div className="space-y-4">
        {contactMethods.map((method, index) => (
          <div 
            key={index} 
            className={`group relative p-4 rounded-lg border transition-all duration-300 hover:shadow-md hover:border-gray-300 ${
              method.isLink ? 'cursor-pointer' : method.action === 'copy' ? 'cursor-pointer' : ''
            }`}
            onClick={() => {
              if (method.isLink && method.url) {
                window.open(method.url, '_blank', 'noopener,noreferrer')
              } else if (method.action === 'copy') {
                copyToClipboard(method.value, method.label)
              }
            }}
          >
            <div className="flex items-center space-x-4">
              {/* Icon */}
              <div className={`w-12 h-12 bg-gradient-to-br ${method.gradient} rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200`}>
                <span className="text-white text-xl">{method.icon}</span>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="body-small font-medium text-muted-foreground uppercase tracking-wide">
                      {method.label}
                    </p>
                    <p className="body-normal font-semibold text-foreground group-hover:text-primary transition-colors">
                      {method.displayValue}
                    </p>
                  </div>
                  
                  {/* Action indicator */}
                  <div className="flex items-center space-x-2">
                    {copiedItem === method.label && (
                      <span className="body-xs text-green-600 font-medium animate-fade-in-up">
                        Copied!
                      </span>
                    )}
                    {method.isLink && (
                      <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                    {method.action === 'copy' && (
                      <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Availability Status */}
      <div className="p-4 bg-muted rounded-lg border-l-4 border-green-500">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div>
            <p className="body-small font-medium">Currently Available</p>
            <p className="body-xs text-muted-foreground">
              Open to new opportunities and collaborations
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}