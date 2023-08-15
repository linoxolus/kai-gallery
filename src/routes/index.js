const siteRouter = require('./site.route');
const adminRouter = require('./admin.route');

function route(app) {
    app.use('/', adminRouter);
    app.use('/', siteRouter);
}

module.exports = route;