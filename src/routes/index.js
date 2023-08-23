const siteRouter = require('./site.route');
const adminRouter = require('./admin.route');
const mediaRouter = require('./media.route');

function route(app) {
    app.use('/', adminRouter);
    app.use('/', siteRouter);
    app.use('/media', mediaRouter);
}

module.exports = route;