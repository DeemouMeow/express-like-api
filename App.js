import http from "http";
import EventEmitter from "events";

export default class Application {

    constructor() {
        this.emitter = new EventEmitter();
        this.middlewares = [];
        this.server = this._createServer();
    }

    _createServer() {
        return http.createServer((req, res) => {
            this.applyMiddlewares(req, res);
            const eventName = this.getEventName(req.pathname, req.method);
            req.parse(this.emitter, eventName);
        });
    }
    /*endpoints = {
        "/users": {"GET":handler1,
                   "POST":handler2,
                   "PUT":handler3
                },
        "/posts",
        "/refresh"
    }*/ 
    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach(method => {
                this.emitter.on(this.getEventName(path, method), (req, res) => {
                    const handler = endpoint[method];
                    handler(req, res);
                });
            });
        });
    }

    listen(port, callback) {
        this.server.listen(port, callback);
    }

    use(middleware) {
        const isRouter = middleware.endpoints;
        if (isRouter) this.addRouter(middleware);
        else this.middlewares.push(middleware);
    }

    getEventName(path, method) {
        return `${path}:${method}`;
    }

    applyMiddlewares(req, res) {
        this.middlewares.forEach(function (middleware, index, middlewares) {
            const length = middlewares.length;
            const nextMiddleware = index + 1 < length ? middlewares[index + 1] : undefined;
            
            const next = function() {
                if (nextMiddleware) {
                    nextMiddleware(req, res);
                }
            };

            middleware(req, res, next);
        });
    }
}
