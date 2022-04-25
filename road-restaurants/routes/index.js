module.exports = app => {

    // Base routes
    const indexRouter = require("./index.routes")
    app.use("/", indexRouter)

    // Auth routes
    const authRouter = require("./auth.routes")
    app.use("/", authRouter)

    // User routes
    const usersRouter = require("./users.routes")
    app.use("/", usersRouter)

    // Restaurant routes
    const restsRouter = require("./restaurants.routes")
    app.use("/", restsRouter)

    // Comments routes
    const commentsRouter = require("./comments.routes")
    app.use("/", commentsRouter)

    // Api routes
    const apiRouter = require("./api.routes")
    app.use("/", apiRouter)


}