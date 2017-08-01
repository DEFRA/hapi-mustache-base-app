const handlebars = require('handlebars')
const Path = require('path')

const defaultContext = {
  assetPath: '/public/',
  topOfPage: '',
  head: '<link href="public/stylesheets/application.css" media="screen" rel="stylesheet" />',
  pageTitle: 'Generic Page',
  htmlLang: 'en',
  bodyClasses: '',
  bodyStart: '',
  skipLinkMessage: '',
  cookieMessage: '',
  headerClass: '',
  homepageUrl: '',
  logoLinkTitle: '',
  globalHeaderText: '',
  insideHeader: '',
  propositionHeader: '',
  afterHeader: '',
  footerTop: '',
  footerSupportLinks: '',
  licenceMessage: '',
  bodyEnd: ''
}

module.exports = {
  engines: {
    html: handlebars
  },
  relativeTo: __dirname,
  path: Path.join(__dirname, ''),
  layoutPath: Path.join(__dirname, 'govuk_template_mustache/layouts'),
  layout: 'govuk_template',
  partialsPath: Path.join(__dirname, 'partials/'),
  context: defaultContext
}
