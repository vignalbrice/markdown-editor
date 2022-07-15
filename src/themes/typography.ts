import styled from "styled-components";
import colors from "./colors";

const H1 = styled.h1`
  font-size: 32px;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
`;
const H2 = styled.h2`
  font-size: 28px;
  font-family: "Roboto Slab", serif;
  font-weight: lighter;
`;
const H3 = styled.h3`
  font-size: 24px;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
`;
const H4 = styled.h4`
  font-size: 20px;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
`;
const H5 = styled.h5`
  font-size: 16px;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
`;
const H6 = styled.h6`
  font-size: 14px;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
  color: ${colors.$orange};
`;

const ParagraphRegular = styled.p`
  font-size: 14px;
  font-family: "Roboto Slab", serif;
  font-weight: 400;
  line-height: 24px;
`;

const ParagraphBold = styled.p`
  font-size: 14px;
  font-family: "Roboto Slab", serif;
  line-height: 24px;
  font-weight: bold;
`;
const ParagraphMonoRegular = styled.p`
  font-size: 14px;
  font-family: "Roboto Mono", monospace;
  line-height: 24px;
  font-weight: bold;
`;

export const Heading = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
};

export const Paragraph = {
  ParagraphRegular,
  ParagraphMonoRegular,
  ParagraphBold,
};
