import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Separator from "../Separator/Separator";
import ReactMarkdown from "react-markdown";
import { useAppSelector } from "../../../store/hooks";
import { markdownSelector } from "../../../store/selectors";
import { Theme } from "../../../themes/styles";
import device from "../../../themes/breakpoints";

type PreviewProps = {
  selectedTheme: Theme;
};

const Preview: React.FC<PreviewProps> = ({ selectedTheme }) => {
  const { isMarkDownFullScreen, currentMd } = useAppSelector(markdownSelector);
  const [data, setData] = useState("");
  console.log(`@media screen and ${device.mobileL} and ${device.laptop}`);

  useEffect(() => {
    setData(currentMd.text);
  }, [currentMd.id, currentMd.text]);

  return (
    <PreviewContainer
      selectedTheme={selectedTheme}
      isMarkDownFullScreen={isMarkDownFullScreen}
    >
      <Separator
        name="preview"
        isEyeIcon={true}
        selectedTheme={selectedTheme}
      />
      <StyledReactMarkdown
        isMarkDownFullScreen={isMarkDownFullScreen}
        selectedTheme={selectedTheme}
      >
        {data}
      </StyledReactMarkdown>
    </PreviewContainer>
  );
};

const PreviewContainer = styled.div<{
  isMarkDownFullScreen: boolean;
  selectedTheme: Theme;
}>`
  flex: ${(p) => (p.isMarkDownFullScreen ? "1" : "0.5")};
  @media only screen and (min-device-width: 320px) and (max-device-width: 767px) {
    display: ${(p) => (p.isMarkDownFullScreen ? "block" : "none")};
  }
  background-color: ${(p) => p.selectedTheme.colors.editor};
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    width: 50%;
  }
`;

const StyledReactMarkdown = styled(ReactMarkdown)<{
  isMarkDownFullScreen: boolean;
  selectedTheme: Theme;
}>`
  @media only screen and (min-device-width: 320px) and (max-device-width: 767px) {
    width: fit-content;
  }
  padding: 0.5rem 1rem;
  font-family: "Roboto Slab", sans-serif;
  margin: auto;
  width: ${(p) => (p.isMarkDownFullScreen ? "672px" : "auto")};
  transition: all ease 0.2s;
  h1,
  h2,
  h3,
  h4,
  h5 {
    color: ${(p) => p.selectedTheme.colors.title};
  }
  blockquote {
    background-color: ${(p) => p.selectedTheme.colors.block};
    p {
      color: ${(p) => p.selectedTheme.colors.blockText}!important;
      a {
        color: ${(p) => p.selectedTheme.colors.blockText}!important;
      }
    }
  }
  pre {
    background-color: ${(p) => p.selectedTheme.colors.block};
    color: ${(p) => p.selectedTheme.colors.blockText};
  }
`;

export default Preview;
