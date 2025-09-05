// components/ContactSection.tsx
import ContactForm from '@/components/ContactForm'
import ContactInfo from '@/components/ContactInfo'

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Get In <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto">
            Ready to start your next project? Let's discuss how we can bring your ideas to life.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 max-w-6xl mx-auto">
          <div className="space-y-8">
            <ContactInfo />
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}