import { ReactNode, useState } from "react";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";

const CollapsibleWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.secondary100};
  overflow: hidden;
`;

const CollapsibleHeader = styled.div`
  position: relative;
  cursor: pointer;
  transition: all 0.3s linear;
  color: ${({ theme }) => theme.text300};
  font-size: 1rem;
  line-height: 1.25;
  font-weight: 600;
  padding: 1.25rem;
`;

const CollapsibleChevron = styled.div<{ isOpen?: boolean }>`
  position: absolute;
  right: 1.25rem;
  top: 1.5rem;
  color: ${({ theme }) => theme.text200};
  svg {
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : null)};
    transition: transform 0.4s linear;
  }
`;

const CollapsibleBody = styled.div<{ isOpen?: boolean }>`
  background-color: ${({ theme }) => theme.bg100};
  max-height: ${({ isOpen }) => (isOpen ? "20rem" : "0rem")};
  transition: max-height 0.4s linear;
`;

const CollapsibleContent = styled.div`
  padding: 1.25rem;
`;

interface CollapsibleProps {
  children: ReactNode;
  header: ReactNode;
  isOpen?: boolean;
}

export const Collapsible = (props: CollapsibleProps) => {
  const { children, header, isOpen } = props;
  const [open, setOpen] = useState<boolean>(isOpen ?? false);

  return (
    <CollapsibleWrapper>
      <CollapsibleHeader onClick={() => setOpen(!open)}>
        <CollapsibleChevron isOpen={open}>
          <FaChevronDown />
        </CollapsibleChevron>
        {header}
      </CollapsibleHeader>
      <CollapsibleBody isOpen={open}>
        <CollapsibleContent>{children}</CollapsibleContent>
      </CollapsibleBody>
    </CollapsibleWrapper>
  );
};
