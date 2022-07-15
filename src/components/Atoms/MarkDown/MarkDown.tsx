import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { useAppDispatch } from "../../../store/hooks";
import { markdownSelector } from "../../../store/markdown/selectors";
import { selectMarkDown, setMarkDown } from "../../../store/markdown/slice";
import colors from "../../../themes/colors";
import { Theme } from "../../../themes/styles";
import Separator from "../Separator/Separator";

type MarkDownProps = {
  selectedTheme: Theme;
};

const MarkDown: React.FC<MarkDownProps> = ({ selectedTheme }) => {
  const { isMarkDownFullScreen, currentMd, markdowns } =
    useSelector(markdownSelector);

  const dispatch = useAppDispatch();

  const [text, setText] = useState("");

  const isMobile = useMediaQuery(
    " (min-device-width: 320px) and (max-device-width: 767px)"
  );

  useEffect(() => {
    setText(currentMd.text);
  }, [currentMd.id, currentMd.text]);

  useEffect(() => {
    if (markdowns.length === 1) {
      dispatch(selectMarkDown(markdowns[0].id));
    }
  }, [dispatch, markdowns]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    dispatch(
      setMarkDown({
        id: currentMd.id,
        text: e.target.value,
      })
    );
  };

  return (
    <MarkDownContainer
      selectedTheme={selectedTheme}
      isMarkDownFullScreen={isMarkDownFullScreen}
    >
      <Separator
        name="markdown"
        isEyeIcon={isMobile ? true : false}
        selectedTheme={selectedTheme}
      />
      <StyledTextArea
        selectedTheme={selectedTheme}
        name="md"
        id="md"
        value={text}
        onChange={onChange}
      ></StyledTextArea>
    </MarkDownContainer>
  );
};

const MarkDownContainer = styled.div<{
  isMarkDownFullScreen: boolean;
  selectedTheme: Theme;
}>`
  display: ${(p) => (p.isMarkDownFullScreen ? "none" : " block")};
  background-color: ${(p) => p.selectedTheme.colors.editor};
  flex: 0.5;
  @media only screen and (min-device-width: 320px) and (max-device-width: 768px) {
    flex: auto;
    border-right: none;
  }
  border-right: 1px solid ${colors.$300};
`;

const StyledTextArea = styled.textarea<{ selectedTheme: Theme }>`
  width: 95.5%;
  height: 92%;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  font-family: "Roboto Mono", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: ${(p) => p.selectedTheme.colors.paragraph};
  background-color: ${(p) => p.selectedTheme.colors.editor};
  @media only screen and (min-device-width: 320px) and (max-device-width: 767px) {
    width: -webkit-fill-available;
  }
`;

export default MarkDown;
