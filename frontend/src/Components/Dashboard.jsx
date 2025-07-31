import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Card from "./Card";
import { axiosInstance } from "../api/api";
import ModalForm from "./ModalForm";

// Styled Components
const CardsContainer = styled.main`
  padding: 50px 0;
  height: fit-content;
  background-color: #fafafa;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 316px);
  gap: 16px;
`;

const BackgroundOverlay = styled.div`
  background-color: #00000085;
  width: 100%;
  height: 100%;
  z-index: 4;
  position: fixed;
  top: 0;
`;

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [show, setShow] = useState(false);
  const [change, setChange] = useState(false);

  const toggleShow = () => setShow(!show);
  const toggleChange = () => setChange(!change);

  const fetchJobs = async () => {
    try {
      const response = await axiosInstance.get("/jobs");
      console.log("API response:", response.data);

      const jobsArray = Array.isArray(response.data)
        ? response.data
        : response.data.jobs;

      setJobs(jobsArray);
      setFilteredJobs(jobsArray);
    } catch (err) {
      console.log("Fetch jobs error:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [change]);

  const handleFilterChange = (filters) => {
    const { title, location, jobType, salary } = filters;
    const isDefaultSalary = salary[0] === 50000 && salary[1] === 80000;

    const isEmpty =
      title.trim() === "" &&
      location.trim() === "" &&
      (jobType === "all" || jobType === "") &&
      isDefaultSalary;

    if (isEmpty) {
      setFilteredJobs(jobs);
      return;
    }

    const filtered = jobs.filter((job) => {
      const titleMatch = job.position
        .toLowerCase()
        .includes(title.toLowerCase());

      const locationMatch = job.jobLocation
        .toLowerCase()
        .includes(location.toLowerCase());

      const typeMatch =
        jobType === "all"
          ? true
          : job.jobType.toLowerCase() === jobType.toLowerCase();

      const salaryFrom = parseInt(job.salaryRangeFrom, 10) || 0;
      const salaryTo = parseInt(job.salaryRangeTo, 10) || 0;
      const salaryMatch = isDefaultSalary
        ? true
        : salaryTo >= salary[0] && salaryFrom <= salary[1];

      return titleMatch && locationMatch && typeMatch && salaryMatch;
    });

    setFilteredJobs(filtered);
  };

  return (
    <>
      <Header toggle={toggleShow} onFilterChange={handleFilterChange} />
      <CardsContainer>
        {filteredJobs.map((job, index) => (
          <Card key={index} job={job} />
        ))}
      </CardsContainer>
      {show && <BackgroundOverlay />}
      {show && <ModalForm toggle={toggleShow} toggleChange={toggleChange} />}
    </>
  );
}

export default Dashboard;
