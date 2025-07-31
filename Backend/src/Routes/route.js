const express = require('express');
const router = express.Router();
const { getJobs, createJob, deleteJob } = require('../Controllers/controller');

router.get('/jobs', getJobs);
router.post('/jobs', createJob);
router.delete('/jobs/:id', deleteJob);

module.exports = router;
