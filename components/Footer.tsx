// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-lg mb-4">
          © {new Date().getFullYear()} [Your Name]. All rights reserved.
        </p>
        <p className="text-gray-400">
          Built with Next.js, shadcn/ui and ❤️
        </p>
      </div>
    </footer>
  )
}