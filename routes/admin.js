const express = require('express');
const config = require('../config/config');
const jwt = require('jwt-simple');
const passport = require('passport');
require('../util/passport')(passport);
const User = require('../models/user');
const Access = require('../models/access');

function AdminRouter(app) {
    const responseFactory = require("../util/ResponseFactory")(app, "/admin");

    let router = express.Router()

    router.get('/', app.modMiddleware, function(req, res) {
        return responseFactory.sendRenderedResponse("admin/dashboard", req, res);
    });

    router.get('/actions', app.modMiddleware, function(req, res) {
        return responseFactory.sendRenderedResponse("admin/coming_soon", req, res);
    });

    router.get('/stats', app.modMiddleware, function(req, res) {
        return responseFactory.sendRenderedResponse("admin/coming_soon", req, res);
    });

    router.get('/log', app.adminMiddleware, function(req, res) {
        return responseFactory.sendRenderedResponse("admin/coming_soon", req, res);
    });

    router.get('/pending', app.adminMiddleware, function(req, res) {
        return responseFactory.sendRenderedResponse("admin/coming_soon", req, res);
    });

    router.get('/users', app.modMiddleware, function(req, res) {
        return responseFactory.sendRenderedResponse("admin/users", req, res);
    });

    router.get('/users/similar/:userID', app.modMiddleware, function(req, res) {
        function renderError(msg = "An unknown error occurred.") {
            return responseFactory.sendRenderedResponse("admin/similar_users_error", req, res, { errorMsg: msg });
        }
        if(!req.params.userID || req.params.userID == "") return renderError("You did not specify a user ID to look up.");
        User.findById(req.params.userID).then(user => {
            if(!req.user.canPerformActionsOnUser(user)) return renderError("You may not perform actions on this user.");
            return responseFactory.sendRenderedResponse("admin/similar_users", req, res, { target: user });
        }).catch(err => renderError("Could not find a user by that ID."));
    });

    router.get('/pixels', app.modMiddleware, function(req, res) {
        return responseFactory.sendRenderedResponse("admin/coming_soon", req, res);
    });

    router.get('/reports', app.modMiddleware, function(req, res) {
        return responseFactory.sendRenderedResponse("admin/coming_soon", req, res);
    });

    return router;
}

AdminRouter.prototype = Object.create(AdminRouter.prototype);

module.exports = AdminRouter;
