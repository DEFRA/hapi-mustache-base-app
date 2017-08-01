module.exports = [{
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    console.log('Requested index page')
    const viewContext = {}

    viewContext.pageTitle = 'Example Page'

    reply.view('water/index', viewContext)
  }
},
{
  method: 'GET',
  path: '/site',
  handler: function (request, reply) {
    console.log('Requested site page')
    const viewContext = {}

    viewContext.pageTitle = 'Example Site Page'

    reply.view('water/site', viewContext)
  }
}
]
