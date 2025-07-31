/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const commonFields = {
    workMode: 'Onsite',
    description:
      "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized"
  };

  const jobs = [
    {
      status: 'Pending',
      jobType: 'Contract',
      salaryFrom: "50000",
      salaryTo: "60000",
      company: 'Amazon',
      jobLocation: "Chennai",
      position: 'Full Stack Developer',
      image_url: 'https://i.postimg.cc/9f1JQvJR/a96acfcadfa915e57e5d15e9fa0669560844f362-1.png'
    },
    {
      status: 'Pending',
      jobType: 'Internship',
      salaryFrom: "70000",
      salaryTo: "90000",
      company: 'Microsoft',
      jobLocation: "Coimbatore",
      position: 'Node Js Developer',
      image_url: 'https://i.postimg.cc/L4rKS1qd/3c2e280a3eff5d7381303c181d3f7a5a7778aa27.png'
    },
    {
      status: 'Pending',
      jobType: 'Contract',
      salaryFrom: "90000",
      salaryTo: "100000",
      company: 'Swiggy',
      jobLocation: "Chennai",
      position: 'UI/UX Designer',
      image_url: 'https://i.postimg.cc/QCF6P0gB/7e07718c0675defaeb592dd304b61e51d286bcfc.png'
    },
    {
      status: 'Pending',
      jobType: 'Internship',
      salaryFrom: "50000",
      salaryTo: "100000",
      company: 'Amazon',
      jobLocation: "Chennai",
      position: 'Full Stack Developer',
      image_url: 'https://i.postimg.cc/9f1JQvJR/a96acfcadfa915e57e5d15e9fa0669560844f362-1.png'
    },
    {
      status: 'Pending',
      jobType: 'FullTime',
      salaryFrom: "70000",
      salaryTo: "90000",
      company: 'Microsoft',
      jobLocation: "Coimbatore",
      position: 'Node Js Developer',
      image_url: 'https://i.postimg.cc/L4rKS1qd/3c2e280a3eff5d7381303c181d3f7a5a7778aa27.png'
    },
    {
      status: 'Pending',
      jobType: 'FullTime',
      salaryFrom: "50000",
      salaryTo: "60000",
      company: 'Swiggy',
      jobLocation: "Indore",
      position: 'UI/UX Designer',
      image_url: 'https://i.postimg.cc/QCF6P0gB/7e07718c0675defaeb592dd304b61e51d286bcfc.png'
    },
    {
      status: 'Pending',
      jobType: 'Contract',
      salaryFrom: "60000",
      salaryTo: "80000",
      company: 'Amazon',
      jobLocation: "Indore",
      position: 'Full Stack Developer',
      image_url: 'https://i.postimg.cc/9f1JQvJR/a96acfcadfa915e57e5d15e9fa0669560844f362-1.png'
    },
    {
      status: 'Pending',
      jobType: 'Internship',
      salaryFrom: "55000",
      salaryTo: "75000",
      company: 'Microsoft',
      jobLocation: "Chennai",
      position: 'Node Js Developer',
      image_url: 'https://i.postimg.cc/L4rKS1qd/3c2e280a3eff5d7381303c181d3f7a5a7778aa27.png'
    },
  ];


  const finalData = jobs.map(job => ({
    ...commonFields,
    ...job
  }));

  await knex('jobs').del();
  await knex.raw('ALTER TABLE jobs AUTO_INCREMENT = 1');
  await knex('jobs').insert(finalData);
};
