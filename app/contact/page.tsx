import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | SIGNALS',
  description: 'Get in touch with SIGNALS design studio.'
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-light mb-12">Contact</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-medium mb-4">Studio</h2>
            <p className="text-gray-600">
              SIGNALS<br />
              Boston, Massachusetts
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-4">Email</h2>
            <a 
              href="mailto:chris@sendoutsignals.com" 
              className="text-gray-600 hover:text-black transition-colors"
            >
              chris@sendoutsignals.com
            </a>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-4">Social</h2>
            <div className="space-y-2">
              <a 
                href="https://www.instagram.com/sendoutsignals" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-600 hover:text-black transition-colors"
              >
                Instagram
              </a>
              <a 
                href="https://www.linkedin.com/in/chrisgrimley" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-600 hover:text-black transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 