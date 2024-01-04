export default (req, res, next) => {
    req.parse = (emitter, eventName) => {
        let body = ""
    
        req.on("data", chunk => {
            body += chunk;
        });
    
        req.on("end", () => {
            if (body) req.body = JSON.parse(body);

            const emitted = emitter.emit(eventName, req, res);

            if (!emitted) res.end();
        });
    }
}