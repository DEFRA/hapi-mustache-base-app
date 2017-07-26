const Hapi = require('hapi')
const vision = require('vision')
const Mustache = require('mustache')

const Path = require('path')
const server = new Hapi.Server()
server.connection({ port: 8000 })





server.register([require('inert'), require('vision')], (err) => {
  if (err) {
    console.log('oops!')
    throw err
  }

  server.views({
    engines: {
      html: {
        compile: function (template) {
          console.log('did this')
          Mustache.parse(template)
          //optionally override/set context variables here
          return function (context) {
            return Mustache.render(template, context)
          }
        }
      }
    },
    relativeTo: __dirname,
    path: Path.join(__dirname, 'views'),
    layoutPath: Path.join(__dirname, 'views/govuk_template_mustache/views/layouts'),
    layout: 'govuk_template',
    partialsPath: Path.join(__dirname, 'views/partials')
  })

  server.route({ method: 'GET', path: '/login', handler: function (request, reply) {
    console.log('requested login page')
    var viewContext = {}

    viewContext.assetPath = '/public/govuk_template/'
    viewContext.topOfPage = 'Login Handler'
    viewContext.head = 'Head'
    viewContext.pageTitle = ' Example Login Page'
    viewContext.htmlLang = 'en'
    viewContext.bodyClasses = 'some classes here'
    viewContext.bodyStart = 'Body Start'
    viewContext.skipLinkMessage = 'Skip Link Message'
    viewContext.cookieMessage = 'Cookie Message'
    viewContext.headerClass = 'some classes here'
    viewContext.homepageUrl = 'http://page/url'
    viewContext.logoLinkTitle = 'Logo Link Title'
    viewContext.globalHeaderText = 'Global Header Text'
    viewContext.insideHeader = 'Inside Header'
    viewContext.propositionHeader = 'Proposition Header'
    viewContext.afterHeader = 'After Header'
      // removed the .content attribute as it was overriding default content...
      // context.content = '**this is Content**'
    viewContext.footerTop = 'Footer Top'
    viewContext.footerSupportLinks = 'Support links'
    viewContext.licenceMessage = 'Licence Message'
    viewContext.bodyEnd = 'Body End'

    reply.view('water/login', viewContext)
  } })
  server.route({ method: 'GET', path: '/', handler: function (request, reply) {
    console.log('requested index page')

    var viewContext = {}

    viewContext.assetPath = '/public/govuk_template/'
    viewContext.topOfPage = 'Top Of Page via rootHandler'
    viewContext.head = 'Head'
    viewContext.pageTitle = ' Example Page'
    viewContext.htmlLang = 'en'
    viewContext.bodyClasses = 'some classes here'
    viewContext.bodyStart = 'Body Start'
    viewContext.skipLinkMessage = 'Skip Link Message'
    viewContext.cookieMessage = 'Cookie Message'
    viewContext.headerClass = 'some classes here'
    viewContext.homepageUrl = 'http://page/url'
    viewContext.logoLinkTitle = 'Logo Link Title'
    viewContext.globalHeaderText = 'Global Header Text'
    viewContext.insideHeader = 'Inside Header'
    viewContext.propositionHeader = 'Proposition Header'
    viewContext.afterHeader = 'After Header'
      // removed the .content attribute as it was overriding default content...
      // context.content = '**this is Content**'
    viewContext.footerTop = 'Footer Top'
    viewContext.footerSupportLinks = 'Support links'
    viewContext.licenceMessage = 'Licence Message'
    viewContext.bodyEnd = 'Body End'

    reply.view('water/index', viewContext)
  } })

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public/',
        listing: true

      }
    }
  })
})
// Start the server
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
