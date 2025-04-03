import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | SIGNALS',
  description: 'SIGNALS is a communication design studio dedicated to book design and development, experiential graphics, signage and wayfinding.'
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Main Introduction */}
      <div className="max-w-4xl mx-auto mb-16">
        <h1 className="text-3xl md:text-4xl font-light mb-8">
          Signals is a communication design studio dedicated to book design and development, experiential graphics, signage and wayfinding. Our expertise is based in many decades of crafting successful design solutions for cultural, institutional, and civic clients.
        </h1>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div>
          <h2 className="text-xl font-medium mb-4">Graphic Design</h2>
          <p className="text-gray-600">
            We develop identities, brand strategies, custom graphic and illustrations, and design direction for educational and cultural institutions.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-medium mb-4">Experiences</h2>
          <p className="text-gray-600">
            We develop action and implementation plans through extensive research, user testing and scenario preparation, visualization and material strategies, prototypes, messaging and naming hierarchies.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-medium mb-4">Books</h2>
          <p className="text-gray-600">
            We are involved in every aspect of book design, from the development of narrative and editorial direction, format and design direction, and asset management and section.
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <p className="text-gray-600 mb-6">
          Chris Grimley is the founder and creative director of SIGNALS. As an author and graphic designer, he has developed books on the legacy of urban renewal, architecture and photography monographs, archival surveys, and exhibition catalogues.
        </p>
        <p className="text-gray-600 mb-6">
          The studio has implemented wayfinding and signage for Exhibit Columbus, MASS MoCA, Vassar College, Harvard University, the Massachusetts Institute of Technology, the deCordova Sculpture Park and Museum, and the iconic Boston City Hall.
        </p>
        <p className="text-gray-600">
          He has a Master of Architecture degree from the University of British Columbia, and an undergraduate degree in Interior Design. He was a principal at OverUnder, an award-winning architecture and design office founded in 2006.
        </p>
      </div>

      {/* Clients Section */}
      <div>
        <h2 className="text-2xl font-medium mb-8">Select Clients</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-lg font-medium mb-4">Civic</h3>
            <p className="text-gray-600">
              The Cities of Boston, Cambridge, Chicopee, San Antonio, and Somerville, MassDevelopment, the Metropolitan Area Planning Council, Somerville Arts Council
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Cultural and Institutional</h3>
            <p className="text-gray-600">
              Boston Center for the Arts, Boston Preservation Alliance, Boston Society for Architecture, The Carnegie Museum of Art's Heinz Architecture Center, deCordova Sculpture Park and Museum, Harvard Graduate School of Design, Harvard Innovation Labs, Harvard University Information Technology, Harvard University Office of Planning, Massachusetts Institute of Technology, MASSART, MASS MoCA, Northeastern University, Wentworth Institute of Technology
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Development and Professional</h3>
            <p className="text-gray-600">
              W/S Development, Gerding Edlen, Leggat McCall, Lawyers for Civil Rights, Reed Hilderbrand LLC, Scape, Simpson Gumpertz & Heger, Utile Architecture & Planning, Merge Architects, Rizzoli Publications, ORO Publications, Images Publishing, Rockport Publishers, Phaidon, The Monacelli Press, MIT Press
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 