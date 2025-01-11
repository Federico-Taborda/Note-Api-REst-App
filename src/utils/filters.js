const filterParamsData = (req, res) => {
    const data = {
        title: req.body.title || null,
        content: req.body.content || null,
        tag: req.body.tag || null,
        state: req.query.state || null,
        priority: req.query.priority || null,
        visibility: req.query.visibility || null,
        userId: req.query.userId
    };

    return Object.entries(data).reduce((acumulator, [key, value]) => {
        if (value != null) {
            acumulator[key] = value;
        }
        return acumulator;
    }, {});
}

export default filterParamsData;