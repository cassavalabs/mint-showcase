import styled, { css } from "styled-components";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { animated, useSpring, useTransition } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { UAParser } from "ua-parser-js";
import { transparentize } from "polished";
import { ReactNode, RefObject } from "react";
import media from "../theme/media";

let type: string | undefined;

if (typeof window !== "undefined") {
  const uaParser = new UAParser(window.navigator.userAgent);
  const device = uaParser.getDevice();
  type = device.type;
}

export const isMobile = type === "mobile" || type === "tablet";

const AnimatedDialogOverlay = animated(DialogOverlay);

const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
  &[data-reach-dialog-overlay] {
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 0rem;
    background-color: rgba(18, 18, 18, 0.8);
  }
`;

const AnimatedDialogContent = animated(DialogContent);

const StyledDialogContent = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ minHeight, maxHeight, width, mobile, isOpen, ...rest }) => (
    <AnimatedDialogContent {...rest} />
  )
).attrs({ "aria-label": "dialog" })`
  overflow-y: auto;
  &[data-reach-dialog-content] {
    margin: 0 0 2rem 0;
    background-color: ${({ theme }) => theme.bg200};
    border: 1px solid ${({ theme }) => theme.bg300};
    box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.95, theme.black)};
    padding: 0px;
    width: ${({ width }) => (width ? width : "50vw")};
    overflow-y: auto;
    overflow-x: hidden;
    align-self: ${({ mobile }: { mobile?: boolean }) =>
      mobile ? "flex-end" : "center"};
    max-width: 420px;
    ${({ maxHeight }: { maxHeight?: number }) =>
      maxHeight &&
      css`
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }: { minHeight?: number }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
    display: flex;
    border-radius: 20px;
    ${media.tabletL`
      width: 65vw;
      margin: 0;
    `}
    ${media.tablet`
      width:  85vw;
      ${({ mobile }: { mobile?: boolean }) =>
        mobile &&
        css`
          width: 100vw;
          border-radius: 20px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        `}
    `}
  }
`;

interface ModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  minHeight?: number;
  maxHeight?: number;
  width?: string;
  initialFocusRef?: RefObject<any>;
  children?: ReactNode;
}

export const Modal = ({
  isOpen,
  onDismiss,
  minHeight,
  maxHeight = 60,
  width,
  initialFocusRef,
  children,
}: ModalProps) => {
  const fadeTransition = useTransition(isOpen, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const [{ y }, set] = useSpring(() => ({
    y: 0,
    config: { mass: 1, tension: 210, friction: 20 },
  }));

  const bind = useGesture({
    onDrag: (state) => {
      set({
        y: state.down ? state.movement[1] : 0,
      });
      if (
        state.movement[1] > 300 ||
        (state.velocity[1] > 3 && state.direction[1] > 0)
      ) {
        onDismiss();
      }
    },
  });

  return (
    <>
      {fadeTransition(
        (styles, item) =>
          item && (
            <StyledDialogOverlay
              style={styles}
              onDismiss={onDismiss}
              initialFocusRef={initialFocusRef}
              unstable_lockFocusAcrossFrames={false}
            >
              <StyledDialogContent
                {...(isMobile
                  ? {
                      ...() => bind,
                      style: {
                        transform: y.to(
                          (y) => `translateY(${(y as number) > 0 ? y : 0}px)`
                        ),
                      },
                    }
                  : {})}
                aria-label="dialog content"
                minHeight={minHeight}
                maxHeight={maxHeight}
                width={width}
                mobile={isMobile}
              >
                {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
                {children}
              </StyledDialogContent>
            </StyledDialogOverlay>
          )
      )}
    </>
  );
};
