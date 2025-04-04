const contentful = require('contentful-management')

// You'll need to get this token from Contentful
const MANAGEMENT_TOKEN = 'YOUR_MANAGEMENT_TOKEN'
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID

const client = contentful.createClient({
  accessToken: MANAGEMENT_TOKEN
})

async function createContentTypes() {
  try {
    const space = await client.getSpace(SPACE_ID)
    const environment = await space.getEnvironment('master')

    // Create Service Content Type
    const serviceContentType = await environment.createContentTypeWithId('service', {
      name: 'Service',
      displayField: 'title',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: true
        }
      ]
    })
    await serviceContentType.publish()
    console.log('Created Service content type')

    // Create Client Category Content Type
    const clientCategoryContentType = await environment.createContentTypeWithId('clientCategory', {
      name: 'Client Category',
      displayField: 'title',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true
        },
        {
          id: 'clients',
          name: 'Clients',
          type: 'Text',
          required: true
        }
      ]
    })
    await clientCategoryContentType.publish()
    console.log('Created Client Category content type')

    // Create About Page Content Type
    const aboutPageContentType = await environment.createContentTypeWithId('aboutPage', {
      name: 'About Page',
      displayField: 'introduction',
      fields: [
        {
          id: 'introduction',
          name: 'Introduction',
          type: 'Text',
          required: true
        },
        {
          id: 'services',
          name: 'Services',
          type: 'Array',
          items: {
            type: 'Link',
            linkType: 'Entry',
            validations: [
              {
                linkContentType: ['service']
              }
            ]
          },
          required: true
        },
        {
          id: 'bioText',
          name: 'Bio Text',
          type: 'Array',
          items: {
            type: 'Text'
          },
          required: true
        },
        {
          id: 'clientCategories',
          name: 'Client Categories',
          type: 'Array',
          items: {
            type: 'Link',
            linkType: 'Entry',
            validations: [
              {
                linkContentType: ['clientCategory']
              }
            ]
          },
          required: true
        }
      ]
    })
    await aboutPageContentType.publish()
    console.log('Created About Page content type')

  } catch (error) {
    console.error('Error:', error)
  }
}

createContentTypes() 