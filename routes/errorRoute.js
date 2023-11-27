const express = require('express');
const router = express.Router();

router.use('/error-trigger', (req, res, next) => {
    console.log("PASé por aca")
    throw new Error('Houston, we have a problem. The server is feeling a bit spacey.');
});

module.exports = router;
