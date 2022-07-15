import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectApp } from "../../../store/app/selectors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import colors from "../../../themes/colors";
import { addMarkdown, selectMarkDown } from "../../../store/markdown/slice";
import { markdownSelector } from "../../../store/markdown/selectors";
import { ReactComponent as IconFile } from "../../../assets/icons/icon-document.svg";
import { ReactComponent as DarkMode } from "../../../assets/icons/icon-dark-mode.svg";
import { ReactComponent as LightMode } from "../../../assets/icons/icon-light-mode.svg";
import getCurrentDate from "../../../helpers/getCurrentDate";
import { v4 as uuidv4 } from "uuid";
import Button from "../../Atoms/Button/Button";
import ToggleSwitch from "../../Atoms/ToggleSwitch/ToggleSwitch";
import { dark, light, Theme } from "../../../themes/styles";
import Logo from "../../Atoms/Logo/Logo";
import useMediaQuery from "../../../hooks/useMediaQuery";

type SideBarProps = {
  setSelectedTheme: (selectedTheme: Theme) => void;
};

const SideBar: React.FC<SideBarProps> = ({ setSelectedTheme }) => {
  const { isSideBarOpen } = useAppSelector(selectApp);
  const { markdowns, currentMd } = useSelector(markdownSelector);
  const [themeMode, setThemeMode] = useState(false);
  const isMobile = useMediaQuery("(min-width: 320px) and (max-width: 768px)");
  const length = markdowns.length;
  const dispatch = useAppDispatch();
  const name = `untitled-document${length > 0 ? `(${length})` : ""}.md`;

  const setCurrentMarkDown = useCallback(
    (id: string) => dispatch(selectMarkDown(id)),
    [dispatch]
  );

  useEffect(() => {
    if (currentMd.text === undefined) {
      setCurrentMarkDown(currentMd.id);
    }
  }, [currentMd.id, currentMd.text, setCurrentMarkDown]);

  useEffect(() => {
    if (themeMode) setSelectedTheme(light);
    else setSelectedTheme(dark);
  }, [setSelectedTheme, themeMode]);

  return (
    <SideBarContainer isSideBarOpen={isSideBarOpen}>
      {isMobile && (
        <LogoContainer>
          <Logo />
        </LogoContainer>
      )}
      <SideBarTitle isSideBarOpen={isSideBarOpen}>My Documents</SideBarTitle>
      <AddButton
        onClick={() =>
          dispatch(
            addMarkdown({
              id: uuidv4(),
              createdAt: getCurrentDate(),
              name,
              text: "",
            })
          )
        }
      >
        + New Document
      </AddButton>
      {markdowns.map((el) => (
        <FilesContainer key={el.id} onClick={() => setCurrentMarkDown(el.id)}>
          <IconFile />
          <FileInfo>
            <span className="date">{el.createdAt}</span>
            <span
              className="name"
              style={{
                color: currentMd?.id === el.id ? colors.$orange : colors.$100,
              }}
            >
              {el.name}
            </span>
          </FileInfo>
        </FilesContainer>
      ))}
      <ThemeMode>
        <DarkMode
          className="dark-mode-icon"
          fill={!themeMode ? "#FFF" : "#5A6069"}
        />
        <ToggleSwitch
          checked={themeMode}
          setChecked={setThemeMode}
          label="toggle-switch"
        />
        <LightMode
          className="light-mode-icon"
          fill={themeMode ? "#FFF" : "#5A6069"}
        />
      </ThemeMode>
    </SideBarContainer>
  );
};

const SideBarContainer = styled.nav<{ isSideBarOpen: boolean }>`
  background-color: ${colors.$900};
  width: ${(p) => (p.isSideBarOpen ? "250px" : "0")};
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.5s;
  height: 100%;
`;

const SideBarTitle = styled.h3<{ isSideBarOpen: boolean }>`
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  color: ${colors.$500};
  padding: 12px 16px;
  transition: block 0.3s;
  margin-bottom: 1rem;
  margin-left: -3rem;
  white-space: nowrap;
  overflow: hidden;
`;

const FilesContainer = styled.button`
  all: unset;
  cursor: pointer;
  width: 178px;
  height: 40px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
`;

const AddButton = styled(Button)`
  width: 200px;
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem;
  span.date {
    color: ${colors.$500};
    font-family: "Roboto", sans-serif;
    font-weight: 100;
    font-size: 13px;
  }
  span.name {
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    font-weight: 400;
    &:hover {
      color: ${colors.$orange};
    }
  }
`;

const ThemeMode = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 1.5rem;
  left: 2rem;
  .dark-mode-icon {
    margin-right: 0.6rem;
  }
  .light-mode-icon {
    margin-left: 0.6rem;
  }
`;

const LogoContainer = styled.div`
  margin-top: 1.5rem;
  margin-left: -4rem;
`;

export default SideBar;
