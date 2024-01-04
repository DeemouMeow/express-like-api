export default (req, res, next) => {
    req.cookies = getCookies();
    res.cookie = appendCookie;
    res.clearCookie = clearCookie;

    next();

    function getCookies() {
        const cookies = {};
        const header = req.headers.cookie;

        if (!header) return cookies;

        header.split(";").forEach(cookie => {
            let [name, rest] = cookie.split("=");

            if (!name) return;

            const key = name.trim();

            if (!rest) return;

            const value = rest.trim(); // rest.join(`=`).trim();
            
            cookies[key] = decodeURIComponent(value);
        });

        return cookies;
    }

    function appendCookie(key, value, options = {}) {
        options = {
            "path": "/",
            "httpOnly": true,
            ...options
        };

        let cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            cookie += "; " + optionKey;
            const option = options[optionKey];

            if (option !== true) 
                cookie += "=" + option;
        }

        res.setHeader("Set-Cookie", cookie);
        next();
    };

    function clearCookie(name) {
        res.cookie(name, "", {"max-age": 0});
    }
}