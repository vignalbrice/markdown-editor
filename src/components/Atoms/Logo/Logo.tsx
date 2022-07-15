import React from "react";
import styled from "styled-components";
import { ReactComponent as LogoSVG } from "../../../assets/icons/logo.svg";

const Logo: React.FC = () => <LogoSVGToReact />;

const LogoSVGToReact = styled(LogoSVG)`
  margin: 0 1.3em;
`;

export default Logo;
