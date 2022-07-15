import React from "react";
import styled from "styled-components";
import colors from "../../../themes/colors";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />;
};

const StyledButton = styled.button`
  all: unset;
  background: ${colors.$orange};
  color: ${colors.$100};
  width: 100%;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  font-family: "Robot", sans-serif;
  &:hover {
    background: ${colors.$paleorange};
  }
`;

export default Button;
