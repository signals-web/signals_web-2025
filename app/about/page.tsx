import { Metadata } from 'next'
import PageLayout from '../components/PageLayout'
import { Icon } from '@iconify/react'

// Footnote component
const Footnote = ({ number, text }: { number: number, text: string }) => {
  return (
    <span className="relative group">
      <sup className="font-bold text-signals-red ml-1 cursor-help text-s relative -top-2 font-mono">{number}</sup>
      <span 
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-signals-navy text-white text-sm p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </span>
  )
}

export const metadata: Metadata = {
  title: 'About | SIGNALS',
  description: 'SIGNALS is a communication design studio dedicated to book design and development, experiential graphics, signage and wayfinding.'
}

export default function AboutPage() {
  return (
    <PageLayout bgColor="bg-signals-gray" textColor="text-signals-navy" hoverClass="hover:text-signals-red">
      {/* Main Introduction - Full Width */}
      <div className="mb-16 space-y-8">
        <p className="text-lg md:text-[1.8rem] font-light leading-relaxed tracking-wide">
          At SIGNALS, we transform spaces through the deliberate orchestration<Icon icon="octicon:diff-added-24" className="inline-block w-8 h-8 ml-2 -mt-1 text-signals-red" /> of sensory experiences. Every project benefits from our unique fusion of technical expertise, creative vision, and meticulous attention to detail.
        </p>
        
        <p className="text-lg md:text-[1.8rem] font-light leading-relaxed tracking-wide">
          We believe in the power of meaningful connection—between<Icon icon="octicon:accessibility-24" className="inline-block w-8 h-8 ml-2 -mt-1 text-signals-red" /> people, objects, environments, and ideas. These connections are formed through carefully crafted signals: visual<Icon icon="octicon:eye-24" className="inline-block w-8 h-8 ml-2 -mt-1 text-signals-red" /> cues that guide, verbal elements that inform, aural components that enhance, and tactile features that engage.
        </p>

        <p className="text-lg md:text-[1.8rem] font-light leading-relaxed tracking-wide">
          In today's information-saturated world, clarity is rare and valuable. We cut through the noise<Icon icon="octicon:mute-24" className="inline-block w-8 h-8 ml-2 -mt-1 text-signals-red" /> by designing experiences where every element serves a purpose. Each signal we create invites interaction, prompts<Icon icon="octicon:ellipsis-24" className="inline-block w-8 h-8 ml-2 -mt-1 text-signals-red" /> discovery, or evokes understanding, resulting in environments that communicate with intention and resonate with authenticity.
        </p>

        <p className="text-lg md:text-[1.8rem] font-light leading-relaxed tracking-wide">
          Our expertise is focused not just on creating signals, but on ensuring they connect<Icon icon="octicon:link-24" className="inline-block w-8 h-8 ml-2 -mt-1 text-signals-red" /> with their intended audience —fostering understanding, engagement, and meaningful experiences.
        </p>
      </div>

      {/* Two Column Layout with Background */}
      <div className="mb-16 bg-[#dfe3e6] p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* Services - Left Column */}
          <div className="space-y-12">
            <div>
              <h2 className="text-lg md:text-[2rem] font-medium mb-4 text-signals-red tracking-wide">Books</h2>
              <p className="text-signals-navy text-lg md:text-[1.75rem] font-light leading-relaxed">
                We bring extensive expertise in book design and development, working closely with publishers to craft impactful narratives. By combining strong design with thoughtful storytelling, we create books that inform, inspire, and endure.
              </p>
            </div>
            <div>
              <h2 className="text-lg md:text-[2rem] font-medium mb-4 text-signals-red tracking-wide">Signs</h2>
              <p className="text-signals-navy text-lg md:text-[1.75rem] font-light leading-relaxed">
                We design user-friendly systems that guide visitors seamlessly through complex spaces, offering clarity, ease, and a memorable experience.
              </p>
            </div>
          </div>

          {/* Process - Right Column */}
          <div className="space-y-12">
            <div>
              <h2 className="text-lg md:text-[2rem] font-medium mb-4 text-signals-red tracking-wide">Process</h2>
              <p className="text-signals-navy text-lg md:text-[1.75rem] font-light leading-relaxed">
                From captivating signage to immersive storytelling, our designs combine concept and execution to leave a lasting impression.
              </p>
            </div>
            <div>
              <p className="text-signals-navy text-lg md:text-[1.75rem] font-light leading-relaxed">
                Using tools like color, light, sound, text, and touch, we establish meaningful connections that resonate with users. Whether creating graphic illustrations, 3D models, or animations, we design signals that unfold over time and space. Our work serves architects, landscape designers, and cultural institutions, ensuring that our solutions align with their unique needs and environments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section - Full Width Below */}
      <div className="space-y-8">
        <p className="text-signals-navy text-lg md:text-[1.75rem] font-light leading-relaxed">
          Chris Grimley is a graphic designer and the founding principal at SIGNALS<Footnote number={1} text="not to be confused with the private chat app" />, where he creates visual systems that communicate with clarity and purpose. As an author and graphic designer<Footnote number={2} text="trained as an architect, self appointed 2023" />, he has developed books on  architecture and photography monographs, archival surveys, the complex legacy of urban renewal,<Footnote number={3} text="See 'Heroic: Concrete Architecture and the New Boston' (2015)" /> and exhibition catalogues<Footnote number={4} text="See 'Imagining the Modern: Architecture and Urbanism of the Pittsburgh Renaissance' (2019)" />.
        </p>

        <p className="text-signals-navy text-lg md:text-[1.75rem] font-light leading-relaxed">
          Known for their sophisticated typographic sensibility<Footnote number={5} text={`We're avid readers of '<a href="http://neverusefutura.com" target="_blank" rel="noopener noreferrer" class="text-signals-red hover:underline">Never Use Futura</a>', even though most of our projects do`} /> and ability to transform complex information into compelling visual narratives, the studio has implemented wayfinding and signage for Exhibit Columbus<Footnote number={6} text="Futura" />, MASS MoCA<Footnote number={7} text="also Futura" />, Vassar College, Harvard University, the Massachusetts Institute of Technology, the deCordova Sculpture Park and Museum, and the iconic Boston City Hall<Footnote number={8} text={`Once called the ugliest building in the world, as <a href="https://www.instagram.com/heroicproject" target="_blank" rel="noopener noreferrer" class="text-signals-red hover:underline">@heroicproject</a> we have been essential in transforming opions about this beloved brute.`} />.
        </p>

        <p className="text-signals-navy text-lg md:text-[1.75rem] font-light leading-relaxed">
          Chris has a Master of Architecture degree from the University of British Columbia, and an undergraduate degree in Interior Design. He was a principal at OverUnder, an award-winning architecture and design office founded in 2006.
        </p>
      </div>

      {/* Clients Section - Full Width */}
      <div className="mt-16 space-y-12">
        <h2 className="text-lg md:text-[2rem] font-medium text-signals-red tracking-wide">Clients</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-12">
          <div>
            <h3 className="text-lg md:text-[1.5rem] font-medium mb-4 text-signals-red tracking-wide">Civic</h3>
            <p className="text-signals-navy text-base md:text-[1.25rem] font-light leading-relaxed">
              The Cities of Boston, Cambridge, Chicopee, San Antonio, and Somerville, MassDevelopment, the Metropolitan Area Planning Council, Somerville Arts Council
            </p>
          </div>
          
          <div>
            <h3 className="text-lg md:text-[1.5rem] font-medium mb-4 text-signals-red tracking-wide">Cultural and Institutional</h3>
            <p className="text-signals-navy text-base md:text-[1.25rem] font-light leading-relaxed">
              Boston Center for the Arts, Boston Preservation Alliance, Boston Society for Architecture, The Carnegie Museum of Art's Heinz Architecture Center, deCordova Sculpture Park and Museum, Harvard Graduate School of Design, Harvard Innovation Labs, Harvard University Information Technology, Harvard University Office of Planning, Massachusetts Institute of Technology, MASSART, MASS MoCA, Northeastern University, Wentworth Institute of Technology
            </p>
          </div>
          
          <div>
            <h3 className="text-lg md:text-[1.5rem] font-medium mb-4 text-signals-red tracking-wide">Development and Professional</h3>
            <p className="text-signals-navy text-base md:text-[1.25rem] font-light leading-relaxed">
              W/S Development, Gerding Edlen, Leggat McCall, Lawyers for Civil Rights, Reed Hilderbrand LLC, Scape, Simpson Gumpertz & Heger, Utile Architecture & Planning, Merge Architects, Rizzoli Publications, ORO Publications, Images Publishing, Rockport Publishers, Phaidon, The Monacelli Press, MIT Press
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
} 