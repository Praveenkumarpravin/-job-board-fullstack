const db = require('../db/knex');

exports.getJobs = async (req, res) => {
  try {
    const jobs = await db('jobs').select('*').orderBy("created_at", "desc");
    res.status(200).json({ message: "Job Details Fetched Successfully", jobs })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

exports.createJob = async (req, res) => {
  try {
    const jobData = { ...req.body };

    const [id] = await db('jobs').insert(jobData);
    const job = await db('jobs').where({ id }).first();

    res.status(200).json({ message: "Job Created Successfully", job });
  } catch (err) {
    console.error("Create Job Error:", err);
    res.status(500).json({ error: "Failed to create job" });
  }

};

exports.deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db('jobs').where({ id }).del();

    if (deleted) {
      res.status(200).json({ message: "Job deleted successfully" });
    } else {
      res.status(404).json({ error: "Job Id not found" });
    }
  } catch (err) {
    console.error("Delete Job Error:", err);
    res.status(500).json({ error: "Failed to delete job" });
  }
};

