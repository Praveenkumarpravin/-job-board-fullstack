import React from "react";
import styled from "styled-components";
import logo from "../assets/Group.svg";

const Nav = styled.nav`
  width: 890px;
  height: 5rem;
  border-radius: 7.625rem;
  box-shadow: 0 0 20px #7f7f7f26;
  border: 1px solid #fcfcfc;
  padding: 16px 25px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
  align-items: center;
`;

const Logo = styled.img`
  height: 44px;
  width: 44px;
  object-fit: contain;
`;

const Navigation = styled.div`
  ul {
    width: 618px;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px;
    margin: 0;
  }

  li {
    list-style-type: none;
    font-weight: 500;
    padding: 8px 24px;
    color: #303030;
    border-radius: 10px;
    transition: all 0.2s linear;
    white-space: nowrap;

    &:nth-of-type(2),
    &:nth-of-type(3),
    &:nth-of-type(4) {
      padding: 8px 25px;
    }
    &:hover {
      cursor: pointer;
    }
  }
`;

const CreateButton = styled.button`
  font-family: inherit;
  background: linear-gradient(#a128ff, #6100ad);
  width: 123px;
  height: 38px;
  border: none;
  border-radius: 30px;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
`;

function Navbar({ toggle }) {
  return (
    <Nav>
      <Logo src={logo} alt="logo" />
      <Navigation>
        <ul>
          <li>Home</li>
          <li>Find Jobs</li>
          <li>Find Talents</li>
          <li>About us</li>
          <li>Testimonials</li>
        </ul>
      </Navigation>
      <CreateButton onClick={toggle}>Create Jobs</CreateButton>
    </Nav>
  );
}

export default Navbar;
