import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import colors from "../../../themes/colors";

type ModalProps = {
  isShowing: boolean;
  header: string;
  hide: () => void;
};

const Modal: React.FC<ModalProps> = ({ isShowing, header, hide, children }) => {
  const useOnClickOutside = (
    ref: React.MutableRefObject<HTMLDivElement | undefined>,
    handler: any
  ) => {
    useEffect(
      () => {
        const listener = (event: any) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because the passed-in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  };
  const ref = useRef<HTMLDivElement>();

  useOnClickOutside(ref, () => hide());

  return isShowing
    ? ReactDOM.createPortal(
        <>
          <ModalOverlay>
            <ModalWrapper>
              <ModalContainer>
                <ModalHeader>
                  <h4>{header}</h4>
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
              </ModalContainer>
            </ModalWrapper>
          </ModalOverlay>
        </>,
        document.body
      )
    : null;
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1040;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  display: flex;
  align-items: center;
`;

const ModalContainer = styled.div`
  z-index: 100;
  background: #fff;
  position: relative;
  margin: auto;
  border-radius: 4px;
  height: 218px;
  max-width: 343px;
  width: 100%;
  padding: 1rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    font-family: "Roboto Slab", sans-serif;
    font-size: 20px;
    line-height: 1px;
    font-weight: bold;
    color: ${colors.$700};
  }
`;

const ModalBody = styled.div``;

export default Modal;
