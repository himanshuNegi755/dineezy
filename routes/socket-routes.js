const router = require('express').Router();

router.get("/socket", (req, res) => {
    res.send('server is up and running');
});

module.exports = router;