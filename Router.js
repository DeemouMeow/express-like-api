export default class Router {
    constructor() {
        this.endpoints = {};
    }

    _request(method = "GET", path, handler) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {};
        }

        const endpoint = this.endpoints[path];

        if (endpoint[method]) {
            throw new Error (`[${method} method for path ${path} is already exist]`);
        }

        endpoint[method] = handler;
    }

    get(path, handler, options = {}) {
        this._request("GET", path, handler);
    }

    post(path, handler, options = {}) {
        this._request("POST", path, handler);
    }

    put(path, handler, options = {}) {
        this._request("PUT", path, handler);
    }

    delete(path, handler, options = {}) {
        this._request("DELETE", path, handler);
    }
}