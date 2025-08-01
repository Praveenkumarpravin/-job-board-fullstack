import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import searchIcon from "../assets/search.svg";
import locationIcon from "../assets/location.svg";
import jobtypeIcon from "../assets/jobtype.svg";
import Slider from "@mui/material/Slider";

// Styled Components
const HeaderContainer = styled.header`
  width: 100%;
  height: 214px;
  box-shadow: 0 0 14px rgba(198, 191, 191, 0.25);
  padding: 21px 0;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const FilterContainer = styled.div`
  padding: 0 63px;
  display: flex;
  align-items: center;
  gap: 21px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 21px;

  &.third {
    margin-left: 7px;
  }
`;

const Input = styled.input`
  padding: 2px 96px 2px 5px;
  height: 48px;
  border: none;
  font-family: inherit;
  font-size: 16px;
  font-weight: 500;
  border-right: 2px solid #eaeaea;

  &:focus {
    border: none;
    outline: none;
  }

  &#secondInput {
    padding: 2px 84px 2px 5px;
  }
`;

const Select = styled.select`
  color: #666;
  align-self: center;
  padding: 2px 189px 2px 5px;
  background-color: white;
  appearance: none;
  background-image: url("../assets/down.svg");
  background-repeat: no-repeat;
  background-position: right 30px center;
  background-size: 1.5rem;
  font-size: 16px;
  font-weight: 500;
  border: none;

  &:focus {
    border: none;
    outline: none;
  }
`;

const SalaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  position: relative;
  top: -8px;
  left: 20px;
`;

const SalaryHead = styled.div`
  display: flex;
  color: #222;
  font-size: 16px;
  font-weight: 550;
  gap: 50px;
`;

const JobTypeIcon = styled.img`
  position: relative;
  top: -2px;
  left: 2px;
`;

function Header({ toggle, onFilterChange }) {
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    jobType: "all",
    salary: [50000, 80000],
  });

  const handleSliderChange = (event, newValue) => {
    const updatedFilters = {
      title: filters.title,
      location: filters.location,
      jobType: filters.jobType,
      salary: newValue,
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <HeaderContainer>
      <Navbar toggle={toggle} />
      <FilterContainer>
        <InputWrapper>
          <img src={searchIcon} alt="search icon" />
          <Input
            type="text"
            name="title"
            placeholder="Search By Job Title, Role"
            value={filters.title}
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <img src={locationIcon} alt="location icon" />
          <Input
            type="text"
            name="location"
            placeholder="Preferred Location"
            value={filters.location}
            onChange={handleChange}
            id="secondInput"
          />
        </InputWrapper>
        <InputWrapper className="third">
          <JobTypeIcon src={jobtypeIcon} alt="job type icon" />
          <Select
            name="jobType"
            value={filters.jobType}
            onChange={handleChange}
          >
            <option value="all">Job type</option>
            <option value="Fulltime">Full Time</option>
            <option value="Parttime">Part Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </Select>
        </InputWrapper>
        <SalaryContainer>
          <SalaryHead>
            <p>Salary Per Month</p>
            <p>
              ₹{Math.round(filters.salary[0] / 1000)}k - ₹
              {Math.round(filters.salary[1] / 1000)}k
            </p>
          </SalaryHead>
          <Slider
            value={filters.salary}
            onChange={handleSliderChange}
            min={50000}
            max={100000}
            step={5000}
            sx={{
              color: "#000",
              height: 2,
              paddingLeft: "10px",
              position: "relative",
              left: "15px",
              "& .MuiSlider-track": { backgroundColor: "#000" },
              "& .MuiSlider-rail": { backgroundColor: "#ddd" },
              "& .MuiSlider-thumb": {
                boxShadow: "none",
                backgroundColor: "#fff",
                border: "5px solid black",
                width: "15px",
                height: "15px",
              },
            }}
          />
        </SalaryContainer>
      </FilterContainer>
    </HeaderContainer>
  );
}

export default Header;
