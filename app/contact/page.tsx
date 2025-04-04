import { Metadata } from 'next'
import PageLayout from '../components/PageLayout'
import ContactForm from '../components/ContactForm'
import { Icon } from '@iconify/react'

export const metadata: Metadata = {
  title: 'Contact | SIGNALS',
  description: 'Get in touch with SIGNALS design studio.'
}

export default function ContactPage() {
  return (
    <PageLayout bgColor="bg-[#8e9aae]" textColor="text-signals-navy" hoverClass="hover:text-signals-red">
      
      <p className="text-lg md:text-[1.8rem] font-light leading-relaxed tracking-wide mb-16">
      Send us a signal. We're always scanning for new conversations, collaborations, and challenges. No need for complex codes or elaborate transmissions—just reach out through any channel below and we'll tune in. Whether you're planning a project, curious about our process, or exploring new possibilities, your message won't get lost in the noise.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-12">
        <div className="md:col-span-2">
          <ContactForm />
        </div>

        <div className="space-y-12">
          <div>
            <h2 className="text-lg md:text-[1.5rem] font-medium mb-4 text-signals-navy tracking-wide">Studio</h2>
            <p className="text-signals-navy text-base md:text-[1.25rem] font-light leading-relaxed">
              SIGNALS<br />
              46 Waltham Street 215<br />
              Boston, Massachusetts
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-[1.5rem] font-medium mb-4 text-signals-navy tracking-wide">Social</h2>
            <div className="space-y-4">
              <a 
                href="https://www.instagram.com/sendoutsignals" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center text-signals-navy text-base md:text-[1.25rem] font-light leading-relaxed hover:text-signals-red transition-colors"
              >
                <Icon icon="mdi:instagram" className="w-6 h-6 mr-3" />
                <span>@sendoutsignals</span>
              </a>
              <a 
                href="https://www.instagram.com/heroicproject" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center text-signals-navy text-base md:text-[1.25rem] font-light leading-relaxed hover:text-signals-red transition-colors"
              >
                <Icon icon="mdi:instagram" className="w-6 h-6 mr-3" />
                <span>@heroicproject</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/chrisgrimley" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center text-signals-navy text-base md:text-[1.25rem] font-light leading-relaxed hover:text-signals-red transition-colors"
              >
                <Icon icon="mdi:linkedin" className="w-6 h-6 mr-3" />
                <span>Chris Grimley</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
} 