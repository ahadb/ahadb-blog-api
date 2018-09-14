const blogApiRoutes = require('./blog-api-routes')
const linkApiRoutes = require('./links-api-routes')
const codeApiRoutes = require('./code-api-routes')

module.exports = function(app, db) {
  blogApiRoutes(app, db)
  linkApiRoutes(app, db)
  codeApiRoutes(app, db)
}
