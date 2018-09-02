const blogApiRoutes = require('./blog-api-routes')

module.exports = function(app, db) {
  blogApiRoutes(app, db)
  // Other route groups could go here, in the future
}
