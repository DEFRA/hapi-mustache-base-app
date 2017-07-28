module.exports = [{
  method: 'GET',
  path: '/login',
  handler: function (request, reply) {
    console.log('requested login page')
    const viewContext = {}

    viewContext.pageTitle = ' Example Login Page'

    reply.view('water/login', viewContext)
  }
}, {
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    console.log('requested index page')
    const viewContext = {}

    viewContext.pageTitle = ' Example Page'

    reply.view('water/index', viewContext)
  }
}]
