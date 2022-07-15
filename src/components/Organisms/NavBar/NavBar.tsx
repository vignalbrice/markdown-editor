import React from "react";
import styled from "styled-components";
import colors from "../../../themes/colors";
import BurgerMenu from "../../Atoms/BurgerMenu/BurgerMenu";
import { ReactComponent as FileIcon } from "../../../assets/icons/icon-document.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/icon-delete.svg";
import { ReactComponent as Save } from "../../../assets/icons/icon-save.svg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectApp } from "../../../store/app/selectors";
import Button from "../../Atoms/Button/Button";
import { markdownSelector } from "../../../store/selectors";
import { changeMarkdownName } from "../../../store/markdown/slice";
import useMediaQuery from "../../../hooks/useMediaQuery";
import Logo from "../../Atoms/Logo/Logo";

type NavBarProps = {
  isOpenDelete: boolean;
  setIsOpenDelete: (isOpenDelete: boolean) => void;
};

const NavBar: React.FC<NavBarProps> = ({ isOpenDelete, setIsOpenDelete }) => {
  const { isSideBarOpen } = useAppSelector(selectApp);
  const { currentMd } = useAppSelector(markdownSelector);
  const dispatch = useAppDispatch();
  const isTablet = useMediaQuery("(min-width: 320px) and (max-width: 768px)");
  const isMobile = useMediaQuery("(min-width: 320px) and (max-width: 425px)");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(changeMarkdownName({ id: currentMd.id, name: value }));
  };

  return (
    <NavBarContainer isSideBarOpen={isSideBarOpen}>
      <BurgerMenu />
      {!isTablet && (
        <>
          <Logo />
          <Separator />
        </>
      )}
      <DocumentFile>
        <FileIcon />
        <File>
          <FileName>Document Name</FileName>
          <InputFileName
            value={currentMd.name}
            placeholder="welcome.md"
            type="text"
            onChange={onChange}
          />
        </File>
      </DocumentFile>
      <Actions>
        <DeleteButtonIcon onClick={() => setIsOpenDelete(!isOpenDelete)}>
          <DeleteIcon />
        </DeleteButtonIcon>
        <SaveButton>
          <SaveIcon />
          {!isMobile && "Save Changes"}
        </SaveButton>
      </Actions>
    </NavBarContainer>
  );
};

const NavBarContainer = styled.nav<{ isSideBarOpen: boolean }>`
  top: 0;
  background-color: ${colors.$800};
  margin-left: ${(p) => (p.isSideBarOpen ? "250px" : "0")};
  width: 100%;
  height: 72px;
  align-items: center;
  display: flex;
  transition: margin-left 0.5s;
`;

const Separator = styled.div`
  border: thin solid ${colors.$600};
  height: 50px;
  margin-right: 0.6em;
`;

const DocumentFile = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1em;
  flex-grow: 0.95;
`;

const File = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.6em;
`;

const FileName = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 13px;
  color: ${colors.$500};
`;
const InputFileName = styled.input`
  all: unset;
  transition: all ease 0.3s;
  &:focus {
    border-bottom: thin solid ${colors.$100};
  }
  &::placeholder {
    color: ${colors.$100};
  }
  background: transparent;
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  font-weight: 100;
  color: ${colors.$100};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
`;

const DeleteButtonIcon = styled.button`
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  margin: 0 0.8em;
`;

const SaveIcon = styled(Save)`
  margin-right: 0.4em;
  @media only screen and (min-device-width: 320px) and (max-device-width: 425px) {
    margin-right: 0;
  }
`;

const SaveButton = styled(Button)`
  width: 152px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (min-device-width: 320px) and (max-device-width: 425px) {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default NavBar;
