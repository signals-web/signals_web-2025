require('dotenv').config({ path: '.env.local' })
const contentful = require('contentful-management')

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
})

// Book data
const books = [
  {
    title: 'Fusion',
    subtitle: 'The Performance of Architecture',
    author: 'Payette',
    date: '2020',
    kind: 'Monograph'
  },
  {
    title: 'Hudson Modern',
    subtitle: 'Residential Landscapes',
    author: 'David Sokol',
    date: '2018',
    kind: 'Editorial'
  },
  {
    title: 'Wayne Thom',
    subtitle: 'Photographing the Late Modern',
    author: 'Emily Bills',
    date: '2021',
    kind: 'Monograph'
  },
  {
    title: 'A Form of Practice',
    subtitle: 'Adèle Naudé',
    author: 'Adèle Naudé Santos',
    date: '2023',
    kind: 'Monograph'
  },
  {
    title: 'Heroic',
    subtitle: 'Concrete Architecture and the New Boston',
    author: 'Chris Grimley, Michael Kubo & Mark Pasnik',
    date: '2015',
    kind: 'History & Preservation'
  },
  {
    title: 'Megastructure',
    subtitle: 'Urban Futures of the Recent Past',
    author: 'Rayner Banham',
    date: '2020',
    kind: 'Facsimile and Reproduction'
  },
  {
    title: 'Universal Principles',
    subtitle: '100 Ways to Develop Innovative Ideas, Enhance Usability, and Design Effective Solutions',
    author: 'Kelly Harris Smith and Chris Grimley',
    date: '2021',
    kind: 'Interior Design'
  },
  {
    title: 'The Edith Farnsworth House',
    subtitle: 'Architecture, Preservation, Culture',
    author: 'Michelangelo Sabatino',
    date: '2024',
    kind: 'Architecture & Preservation'
  },
  {
    title: 'Hamptons Modern',
    subtitle: 'Contemporary Living on the East End',
    author: 'David Sokol',
    date: '2022',
    kind: 'Editorial'
  },
  {
    title: 'Louis Kahn',
    subtitle: 'Architecture as Philosophy',
    author: 'John Lobell',
    date: '2020',
    kind: 'Architecture & Philosophy'
  },
  {
    title: 'Justice Is Beauty',
    subtitle: 'MASS Design Group',
    author: 'MASS Design Group',
    date: '2019',
    kind: 'Monograph'
  },
  {
    title: 'Words & Works',
    subtitle: 'Scenes from a Life in Architecture',
    author: 'Henry N. Cobb',
    date: '2018',
    kind: 'Architectural History & Monograph'
  },
  {
    title: 'Imagining the Modern',
    subtitle: 'Architecture and Urbanism of the Pittsburgh Renaissance',
    author: 'Chris Grimley, Rami el Samahy & Michael Kubo',
    date: '2018',
    kind: 'Architectural History'
  },
  {
    title: "Breuer's Bohemia",
    subtitle: 'The Architect, His Circle, and Midcentury Houses in New England',
    author: 'James Crump',
    date: '2021',
    kind: 'Architectural History'
  },
  {
    title: 'The Structure of Design',
    subtitle: "An Engineer's Extraordinary Life in Architecture",
    author: 'Leslie Robertson',
    date: '2017',
    kind: 'Architectural History'
  }
]

// Sign/location data
const signs = [
  {
    title: 'Harvard University',
    client: 'Harvard University Planning and Design',
    type: 'Wayfinding',
    date: '2022',
    projectOverview: "The design and implementation of Harvard University's first comprehensive wayfinding program"
  },
  {
    title: 'Imagining the Modern',
    client: 'Carnegie Museum of Art',
    type: 'Exhibition Design',
    date: '2018',
    projectOverview: "HACLab Pittsburgh, an exhibition at The Carnegie museum of Art, demonstrated the city's national influence in the development of the modern American city"
  },
  {
    title: 'Our Artificial Nature',
    client: 'Harvard Graduate School of Design',
    type: 'Exhibition Design',
    date: '2023',
    projectOverview: "The graphic indentity, design support, and development of the exhibitions interpretive material for this exhibition at Harvard's Graduate School of Design."
  },
  {
    title: 'Exhibit Columbus',
    client: 'Landmark Columbus Foundation',
    type: 'Wayfinding',
    date: '2023',
    projectOverview: 'Exhibit Columbus is a program that interprets Columbus, Indiana\'s modernist design heritage and engages the community through events, publications, and educational activities. The cycle "Public by Design" focused on activating the downtown area through collaborations between the local community, architects, and landscape architects. This cycle celebrated creative methods of collaboration that communities and designers could use to grow a sense of belonging and connection in public spaces.'
  },
  {
    title: 'MIT DUSP',
    client: 'MIT Department of Urban Studies and Planning',
    type: 'Wayfinding',
    date: '2018',
    projectOverview: 'A wayfinding system that responds to the graphic and architectural legacy of the Massachusetts Institute of Technology.'
  },
  {
    title: 'Boston City Hall',
    client: 'City of Boston',
    type: 'Wayfinding',
    date: '2022',
    projectOverview: "Wayfinding on City Hall Plaza. Working closely with the Mayor's office, our team developed a series of elements that complement Sasaki's revamped design."
  },
  {
    title: 'Gund Hall',
    client: 'Harvard Graduate School of Design',
    type: 'Wayfinding & Donor Signage',
    date: '2020',
    projectOverview: "A sophisticated wayfinding system that enhances the strong, heroic architecture of Gund Hall, home to Harvard's Graduate School of Design."
  },
  {
    title: 'deCordova',
    client: 'deCordova Sculpture Park and Museum',
    type: 'Wayfinding',
    date: '2008',
    projectOverview: 'The rethinking of visitor experiences and brand identity for the deCordova Sculpture Park and Museum.'
  },
  {
    title: 'MASS MoCA',
    client: 'MASS MoCA',
    type: 'Wayfinding',
    date: '2017',
    projectOverview: 'Wayfinding for the largest contemporary art museum in the United States.'
  }
]

async function importContent() {
  try {
    // First, get the organization
    const organizations = await client.getOrganizations()
    console.log('Available organizations:', organizations.items.map(org => org.name))
    
    // Get all spaces
    const spaces = await client.getSpaces()
    console.log('Available spaces:', spaces.items.map(space => ({
      id: space.sys.id,
      name: space.name
    })))
    
    // Then get our specific space
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID)
    console.log('Successfully connected to space:', space.name)
    
    const environment = await space.getEnvironment('master')
    console.log('Successfully connected to environment: master')

    // Import books
    for (const book of books) {
      const entry = await environment.createEntry('project', {
        fields: {
          title: {
            'en-US': book.title
          },
          type: {
            'en-US': 'Book'
          },
          year: {
            'en-US': book.date
          },
          author: {
            'en-US': book.author
          },
          category: {
            'en-US': book.kind
          },
          description: {
            'en-US': book.subtitle
          }
        }
      })
      await entry.publish()
      console.log(`Imported book: ${book.title}`)
    }

    // Import signs
    for (const sign of signs) {
      const entry = await environment.createEntry('project', {
        fields: {
          title: {
            'en-US': sign.title
          },
          type: {
            'en-US': 'Sign'
          },
          year: {
            'en-US': sign.date
          },
          category: {
            'en-US': sign.type
          },
          description: {
            'en-US': sign.projectOverview
          }
        }
      })
      await entry.publish()
      console.log(`Imported sign project: ${sign.title}`)
    }

    console.log('Content import completed successfully!')
  } catch (error) {
    console.error('Error:', error.message)
    if (error.details) {
      console.error('Details:', error.details)
    }
  }
}

importContent() 