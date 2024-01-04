export default (origin) => {
    return (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.setHeader("Access-Control-Allow-Headers", "Authorization");
    }
}