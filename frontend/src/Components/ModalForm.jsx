import React, { useState, useEffect } from "react";
import styled from "styled-components";
import vector from "../assets/Vector.svg";
import right from "../assets/right.svg";
import { axiosInstance } from "../api/api";

const FullPage = styled.div`
  position: absolute;
  top: 0;
  z-index: 5;
  width: 1440px;
  display: flex;
  justify-content: center;
`;

const FormWrapper = styled.div`
  position: relative;
  top: -2px;
  width: 848px;
  border-radius: 16px;
  background-color: #fff;
  padding: 30px 40px 75px;
  margin: 120px 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: auto;
  gap: 15px;
  position: relative;
  top: 9px;
  left: 1px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 50px;
`;

const FormInput = styled.div`
  width: 49%;
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 20px;
    font-weight: 500;
  }

  input,
  select {
    height: 58px;
    border: 1px solid black;
    border-radius: 10px;
    font-family: inherit;
    padding: 12px;
    font-size: 18px;
  }

  input::placeholder {
    font-size: 16px;
  }

  select {
    appearance: none;
    background-image: url("../assets/down.svg");
    background-repeat: no-repeat;
    background-position: right 5px center;
    background-size: 2em;
    padding-right: 3em;
  }

  input[type="date"] {
    background-color: #fff;
    width: 100%;
  }
`;

const SalaryGroup = styled.div`
  display: flex;
  gap: 8px;

  input {
    width: 48%;
  }
`;

const FormTextarea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 20px;
    font-weight: 500;
  }

  textarea {
    height: 170px;
    padding: 15px 16px;
    font-size: 16px;
    font-family: inherit;
    resize: vertical;
    border: 1px solid black;
    border-radius: 10px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  button {
    font-size: 20px;
    padding: 16px 60px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
    position: relative;
    top: 25px;
    cursor: pointer;
  }

  .save {
    background: #ffffff;
    border: 1.5px solid #222222;
    box-shadow: 0px 0px 4px 0px #00000040;
  }

  .publish {
    background: #00aaff;
    color: white;
    border: none;
  }
`;

const ErrorText = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 4px;
  display: block;
`;

function ModalForm({ toggle, toggleChange }) {
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    jobLocation: "",
    jobType: "",
    salaryFrom: "",
    salaryTo: "",
    deadline: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.position) newErrors.position = "Job title is required.";
    if (!formData.company) newErrors.company = "Company name is required.";
    if (!formData.jobLocation) newErrors.jobLocation = "Location is required.";
    if (!formData.type) newErrors.type = "Job type is required.";
    if (!formData.salaryFrom) newErrors.salaryFrom = "Salary From is required.";
    if (!formData.salaryTo) newErrors.salaryTo = "Salary To is required.";
    if (!formData.deadline) newErrors.deadline = "Deadline is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const companyImages = {
      swiggy: 'https://i.postimg.cc/QCF6P0gB/7e07718c0675defaeb592dd304b61e51d286bcfc.png',
      microsoft: 'https://i.postimg.cc/L4rKS1qd/3c2e280a3eff5d7381303c181d3f7a5a7778aa27.png',
      amazon: "https://i.postimg.cc/9f1JQvJR/a96acfcadfa915e57e5d15e9fa0669560844f362-1.png",
    };

    const defaultImage =
      "https://i.postimg.cc/9f1JQvJR/a96acfcadfa915e57e5d15e9fa0669560844f362-1.png";

    function getCompanyImage(companyName) {
      const lowerName = companyName.toLowerCase();

      // Fuzzy match: check if any known key exists in the input
      for (const key in companyImages) {
        if (lowerName.includes(key)) {
          return companyImages[key];
        }
      }

      return defaultImage;
    }

    const jobData = {
      image_url: getCompanyImage(formData.company),
      position: formData.position,
      company: formData.company,
      jobLocation: formData.jobLocation,
      jobType: formData.type,
      salaryFrom: formData.salaryFrom,
      salaryTo: formData.salaryTo,
      description: formData.description,
      workMode: "Onsite",
    };

    try {
      await axiosInstance.post("/jobs", jobData);
      toggle();
      alert("Job posted successfully!");
      toggleChange();
      setFormData({
        position: "",
        company: "",
        jobLocation: "",
        type: "",
        salaryFrom: "",
        salaryTo: "",
        deadline: "",
        description: "",
      });
      localStorage.removeItem("jobDraft");
    } catch (error) {
      console.error("Error posting job:", error.message);
      alert("Failed to post job.");
    }
  };

  const handleSaveDraft = () => {
    const draft = {
      ...formData,
    };
    localStorage.setItem("jobDraft", JSON.stringify(draft));
    toggle();
    alert("Draft saved successfully!");
  };

  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem("jobDraft"));
    if (draft) {
      setFormData(draft);
    }
  }, []);

  return (
    <FullPage>
      <FormWrapper>
        <Title>Create Job Opening</Title>
        <StyledForm onSubmit={handleSubmit}>
          <FormInput>
            <label htmlFor="position">Job Title</label>
            <input
              type="text"
              id="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Job Title"
            />
            {errors.position && <ErrorText>{errors.position}</ErrorText>}
          </FormInput>

          <FormInput>
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Amazon, Microsoft, Swiggy"
            />
            {errors.company && <ErrorText>{errors.company}</ErrorText>}
          </FormInput>

          <FormInput>
            <label htmlFor="jobLocation">Location</label>
            <input
              type="text"
              id="jobLocation"
              value={formData.jobLocation}
              onChange={handleChange}
              placeholder="Choose Preferred Location"
            />
            {errors.jobLocation && <ErrorText>{errors.jobLocation}</ErrorText>}
          </FormInput>

          <FormInput>
            <label htmlFor="type">Job Type</label>
            <select id="type" value={formData.type} onChange={handleChange}>
              <option value="" disabled hidden>
                Select type
              </option>
              <option value="Internship">Internship</option>
              <option value="Fulltime">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.type && <ErrorText>{errors.type}</ErrorText>}
          </FormInput>

          <FormInput>
            <label htmlFor="salaryFrom">Salary Range</label>
            <SalaryGroup>
              <input
                type="text"
                id="salaryFrom"
                value={formData.salaryFrom}
                onChange={handleChange}
                placeholder="₹0"
              />
              <input
                type="text"
                id="salaryTo"
                value={formData.salaryTo}
                onChange={handleChange}
                placeholder="₹12,00,000"
              />
            </SalaryGroup>
            {(errors.salaryFrom || errors.salaryTo) && (
              <ErrorText>{errors.salaryFrom || errors.salaryTo}</ErrorText>
            )}
          </FormInput>

          <FormInput>
            <label htmlFor="deadline">Application Deadline</label>
            <input
              type="date"
              id="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
            {errors.deadline && <ErrorText>{errors.deadline}</ErrorText>}
          </FormInput>

          <FormTextarea>
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Please share a description to let the candidate know more about the job role"
            ></textarea>
            {errors.description && <ErrorText>{errors.description}</ErrorText>}
          </FormTextarea>

          <ButtonGroup>
            <button type="button" className="save" onClick={handleSaveDraft}>
              Save Draft <img src={vector} alt="draft" />
            </button>
            <button type="submit" className="publish">
              Publish <img src={right} alt="publish" />
            </button>
          </ButtonGroup>
        </StyledForm>
      </FormWrapper>
    </FullPage>
  );
}

export default ModalForm;
