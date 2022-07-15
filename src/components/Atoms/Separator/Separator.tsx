import React from "react";
import styled from "styled-components";
import colors from "../../../themes/colors";
import { ReactComponent as IconShowPreview } from "../../../assets/icons/icon-show-preview.svg";
import { ReactComponent as IconHidePreview } from "../../../assets/icons/icon-hide-preview.svg";
import { useSelector } from "react-redux";
import { markdownSelector } from "../../../store/markdown/selectors";
import { useAppDispatch } from "../../../store/hooks";
import { setIsMarkDownFullScreen } from "../../../store/markdown/slice";
import { Theme } from "../../../themes/styles";

type SeparatorProps = {
  name: string;
  isEyeIcon?: boolean;
  selectedTheme: Theme;
};

const Separator: React.FC<SeparatorProps> = ({
  name,
  isEyeIcon,
  selectedTheme,
}) => {
  const { isMarkDownFullScreen } = useSelector(markdownSelector);
  const dispatch = useAppDispatch();
  return (
    <StyledSeparator selectedTheme={selectedTheme}>
      <StyledParagraph>{name}</StyledParagraph>
      {isEyeIcon && (
        <StyledIconContainer>
          {isMarkDownFullScreen ? (
            <IconHidePreview
              style={{ cursor: "pointer" }}
              onClick={() =>
                dispatch(setIsMarkDownFullScreen(isMarkDownFullScreen))
              }
            />
          ) : (
            <IconShowPreview
              style={{ cursor: "pointer" }}
              onClick={() =>
                dispatch(setIsMarkDownFullScreen(isMarkDownFullScreen))
              }
            />
          )}
        </StyledIconContainer>
      )}
    </StyledSeparator>
  );
};

const StyledSeparator = styled.div<{ selectedTheme: Theme }>`
  height: 42px;
  display: flex;
  align-items: center;
  background-color: ${(p) => p.selectedTheme.colors.separator};
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`;

const StyledParagraph = styled.h3`
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${colors.$500};
`;

const StyledIconContainer = styled.div``;

export default Separator;
