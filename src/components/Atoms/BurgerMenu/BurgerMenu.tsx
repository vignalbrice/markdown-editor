import React from "react";
import styled from "styled-components";
import { ReactComponent as BurgerIcon } from "../../../assets/icons/icon-menu.svg";
import { ReactComponent as BurgerClose } from "../../../assets/icons/icon-close.svg";
import { selectApp } from "../../../store/app/selectors";
import { setIsSidebarOpen } from "../../../store/app/slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import colors from "../../../themes/colors";

const BurgerMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isSideBarOpen } = useAppSelector(selectApp);
  const onClickBurgerMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setIsSidebarOpen(!isSideBarOpen));
  };

  return (
    <BurgerMenuContainer id="nav-expand" onClick={onClickBurgerMenu}>
      {isSideBarOpen ? <BurgerClose /> : <BurgerMenuIcon />}
    </BurgerMenuContainer>
  );
};
const BurgerMenuIcon = styled(BurgerIcon)``;
const BurgerMenuContainer = styled.a`
  width: 72px;
  height: 72px;
  background-color: ${colors.$700};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  border: none;
`;

export default BurgerMenu;
