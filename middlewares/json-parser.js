export default (req, res) => {
    res.send = (status, data) => {
        res.statusCode = status;
        res.writeHead(status, {
            "Content-type": "application/json"
        });
        res.end(JSON.stringify(data));
    }
}