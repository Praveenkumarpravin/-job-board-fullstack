import React from "react";
import styled from "styled-components";
import year from "../assets/year.svg";
import build from "../assets/build.svg";
import salary from "../assets/salary.svg";

const CardContainer = styled.div`
  width: 316px;
  height: 360px;
  border-radius: 12px;
  box-shadow: 0 0 14px #a38c8c26;
  padding: 1rem;
  display: flex;
  gap: 19px;
  flex-direction: column;
  background-color: #fff;
`;

const ImageContent = styled.div`
  display: flex;
  gap: 122.54px;
  align-items: start;
`;

const ImgContainer = styled.div`
  width: 83.46px;
  height: 82px;
  border-radius: 13.18px;
  border: 1px solid #ffffff;
  background: linear-gradient(180deg, #fefefd 0%, #f1f1f1 100%);
  box-shadow: 0px 0px 10.25px 0px #94949440;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const Time = styled.div`
  width: 75px;
  height: 33px;
  border-radius: 10px;
  padding: 7px 10px;
  background-color: #b0d9ff;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 20px;
`;

const Details = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  position: relative;
  top: -1px;
`;

const Detail = styled.div`
  display: flex;
  gap: 4px;
  font-weight: 500;
  color: #5a5a5a;
`;

const Description = styled.ul`
  font-size: 14px;
  padding: 0 16px;
  width: 300px;
  color: #555555;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  letter-spacing: 0%;
  position: relative;
  left: -2px;

  li:nth-of-type(2) {
    position: relative;
    top: 2px;
  }
`;

const ApplyButton = styled.button`
  font-size: 16px;
  background-color: #00aaff;
  border-radius: 10px;
  padding: 12px 10px;
  border: 1px solid #00aaff;
  box-shadow: 0px 0px 14px 0px #5d5d5d26;
  font-family: inherit;
  color: white;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  top: 3px;
`;

function Card({ job }) {
  const getDescriptionArray = () => {
    if (!job?.description) return [];
    try {
      const parsed = JSON.parse(job.description);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return typeof job.description === "string"
        ? job.description.split(". ")
        : [];
    }
  };

  const logoBg =
    job.company?.toLowerCase() === "swiggy" ? "#F7881F" : "white";

  return (
    <CardContainer>
      <ImageContent>
        <ImgContainer>
          <Logo image={job.image_url} bgColor={logoBg} />
        </ImgContainer>
        <Time>24h Ago</Time>
      </ImageContent>
      <Heading>{job.position}</Heading>
      <Details>
        <Detail>
          <img src={year} alt="experience" />
          <p>1-3 yr Exp</p>
        </Detail>
        <Detail>
          <img src={build} alt="location" />
          <p>Onsite</p>
        </Detail>
        <Detail>
          <img src={salary} alt="salary" />
          <p>12LPA</p>
        </Detail>
      </Details>
      <Description>
        {getDescriptionArray().map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </Description>
      <ApplyButton>Apply Now</ApplyButton>
    </CardContainer>
  );
}

export default Card;
