import "./assets/styles/main.scss";
import styled, { ThemeProvider } from "styled-components";
import Preview from "./components/Atoms/Preview/Preview";
import NavBar from "./components/Organisms/NavBar/NavBar";
import SideBar from "./components/Organisms/SideBar/SideBar";
import { selectApp } from "./store/app/selectors";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import MarkDown from "./components/Atoms/MarkDown/MarkDown";
import { useSelector } from "react-redux";
import { markdownSelector } from "./store/markdown/selectors";
import { addMarkdown, deleteMarkdown } from "./store/markdown/slice";
import Modal from "./components/Atoms/Modal/Modal";
import { useEffect, useState } from "react";
import getCurrentDate from "./helpers/getCurrentDate";
import { v4 as uuidv4 } from "uuid";
import DOCUMENT from "./constants/document";
import Button from "./components/Atoms/Button/Button";
import { light, Theme } from "./themes/styles";

export default function App() {
  const dispatch = useAppDispatch();
  const { isSideBarOpen } = useAppSelector(selectApp);
  const { markdowns, currentMd } = useSelector(markdownSelector);
  const length = markdowns.length;
  const [isShow, setIsShow] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(light);

  useEffect(() => {
    if (markdowns.length > 0) return;
    else {
      setIsShow(true);
    }
  }, [markdowns.length]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <Container>
        <NavBar isOpenDelete={isOpenDelete} setIsOpenDelete={setIsOpenDelete} />
        <SideBar setSelectedTheme={setSelectedTheme} />
        <Modal
          header="Add a new document"
          hide={() => setIsShow(false)}
          isShowing={isShow}
        >
          <ModalText colors={selectedTheme.colors.paragraph}>
            Would you want to create a new document ?
          </ModalText>
          <Button
            onClick={() => {
              dispatch(
                addMarkdown({
                  id: uuidv4(),
                  createdAt: getCurrentDate(),
                  name: DOCUMENT(length).NAME,
                  text: "",
                })
              );
              setIsShow(false);
            }}
          >
            Add a new document
          </Button>
        </Modal>
        <Modal
          header="Delete this document?"
          hide={() => setIsOpenDelete(false)}
          isShowing={isOpenDelete}
        >
          <ModalText colors={selectedTheme.colors.paragraph}>
            Are you sure you want to delete the "{currentMd.name}" document and
            its contents? This action cannot be reversed.
          </ModalText>
          <Button
            onClick={() => {
              dispatch(deleteMarkdown(currentMd.id));
              setIsOpenDelete(false);
            }}
          >
            Confirm & Delete
          </Button>
        </Modal>
        <Main selectedTheme={selectedTheme} isSideBarOpen={isSideBarOpen}>
          <FlexContainer>
            <MarkDown selectedTheme={selectedTheme} />
            <Preview selectedTheme={selectedTheme} />
          </FlexContainer>
        </Main>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div``;
const Main = styled.main<{ isSideBarOpen: boolean; selectedTheme: Theme }>`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-left: ${(p) => (p.isSideBarOpen ? "250px" : "0")};
  transition: all ease 0.5s !important;
  background-color: ${(p) => p.selectedTheme.colors.editor};
`;
const FlexContainer = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1;
`;

const ModalText = styled.p<{ colors: string }>`
  font-family: "Roboto Slab", sans-serif;
  font-size: 14px;
  line-height: 24px;
  color: ${(p) => p.colors};
`;
