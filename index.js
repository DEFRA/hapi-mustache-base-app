const Hapi = require('hapi')
const vision = require('vision')
const Mustache = require('mustache')

const Path = require('path')
const server = new Hapi.Server();
server.connection({ port: 8000 });

const rootHandler = function (request, reply) {
    console.log('requested view')
    reply.view('govuk_template_mustache/views/layouts/govuk_template', {
        title: 'Mustache | Hapi ' + request.server.version,
        message: 'Index - Hello World!'
    });
};

server.register([require('inert'),require('vision')], (err) => {

    if (err) {
        console.log('oops!')
        throw err;
    }

    server.views({
        engines: {
            html: {
                compile: function (template) {
                    console.log('did this')
                    Mustache.parse(template);

                    return function (context) {
                        console.log('did this too')
                        context.assetPath = '/public/govuk_template/'
                        context.topOfPage = 'Top Of Page'
                        context.head = 'Head'
                        context.pageTitle = ' Example Page'
                        context.htmlLang = 'en'
                        context.bodyClasses = 'some classes here'
                        context.bodyStart = 'Body Start'
                        context.skipLinkMessage = 'Skip Link Message'
                        context.cookieMessage = 'Cookie Message'
                        context.headerClass = 'some classes here'
                        context.homepageUrl = 'http://page/url'
                        context.logoLinkTitle = 'Logo Link Title'
                        context.globalHeaderText = 'Global Header Text'
                        context.insideHeader = 'Inside Header'
                        context.propositionHeader = 'Proposition Header'
                        context.afterHeader = 'After Header'
                        context.content = 'Content'
                        context.footerTop = 'Footer Top'
                        context.footerSupportLinks = 'Support links'
                        context.licenceMessage = 'Licence Message'
                        context.bodyEnd = 'Body End'

                        return Mustache.render(template, context);
                    };
                }
            }
        },
        relativeTo: __dirname,
        path: 'views'
    });

    server.route({ method: 'GET', path: '/', handler: rootHandler });

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

});
// Start the server
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
