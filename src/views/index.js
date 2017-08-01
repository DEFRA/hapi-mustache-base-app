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
  homepageUrl: 'https://www.gov.uk',
  logoLinkTitle: 'Go to the GOV.UK homepage',
  globalHeaderText: 'GOV.UK',
  insideHeader: '',
  propositionHeader: '<div class="header-proposition">' +
                    '<div class="content">' +
                      '<a href="#proposition-links" class="js-header-toggle menu">Menu</a>' +
                      '<nav id="proposition-menu">' +
                        '<a href="/" id="proposition-name">' +
                             'Apply for a __X__ permit' +
                        '</a>' +
                      '</nav>' +
                    '</div>' +
                  '</div>',
  afterHeader: '',
  footerTop: '<div class="ea-footer">' +
             '<p>Environment Agency helpline: <a href="tel:+443708506506">03708 506 506</a></p>' +
             '<ul>' +
             '<li class="inline"><a title="Privacy - opens in new tab" target="_blank" href="/v7/pages/privacy">Privacy</a></li>' +
             '<li class="inline"><a title="Cookies - opens in new tab" target="_blank" href="/v7/pages/cookies">Cookies</a></li>' +
             '</ul>' +
             '</div>',
  footerSupportLinks: '',
  licenceMessage: '<p>All content is available under the <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence v3.0</a>, except where otherwise stated</p>',
  crownCopyrightMessage: '© Crown copyright',
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
