module.exports = func => {
    return (err, res, req) => {
        func(err, res, req).catch(next);
    }
}