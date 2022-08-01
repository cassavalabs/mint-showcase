import { useState } from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import {
  ChevronDownIcon,
  FormGroup,
  FormLabel,
  FullWidth,
  ToggleBtn,
  RightIcon,
  LeftIcon,
  AddCircleIcon,
  GradientAvatar,
} from "@cassavaland/uikits";
import { SelectButton } from "../Styles";
import { useModal } from "../../../contexts/application";
import { useStore } from "../../../state/mintForm";

export const Container = styled(FullWidth)`
  background-color: ${({ theme }) => theme.bg600};
  border-radius: 0rem 0rem 0.5rem 0.5rem;
`;

export const CollectionDropdownItem = styled(ToggleBtn)`
  justify-content: flex-start;
  :not(:last-child) {
    border-bottom: 0.0625rem solid ${({ theme }) => theme.bg100};
  }
`;

const TippyContainer = styled(FullWidth)`
  position: relative;
  & > [data-tippy-root] {
    width: 100%;
  }
`;

export const CollectionDropdown = () => {
  const [instance, setInstance] = useState<any>(null);
  const { toggleCollectionModal } = useModal();
  const [activeCollection, setActiveCollection, collections] = useStore(
    (state) => [
      state.activeCollection,
      state.setActiveCollection,
      state.collections,
    ]
  );

  return (
    <FormGroup>
      <FormLabel>Collection</FormLabel>
      <TippyContainer>
        <Tippy
          content={
            instance ? (
              <Container>
                <CollectionDropdownItem
                  disabled
                  onClick={() => {
                    toggleCollectionModal();
                    instance.hide();
                  }}
                >
                  <LeftIcon>
                    <AddCircleIcon />
                  </LeftIcon>{" "}
                  Create New Collection
                </CollectionDropdownItem>
                {collections.map((collection, key) => {
                  return (
                    <CollectionDropdownItem
                      key={key}
                      onClick={() => {
                        setActiveCollection(collection);
                        instance.hide();
                      }}
                    >
                      <LeftIcon>
                        <GradientAvatar seed={collection.name} size={32} />
                      </LeftIcon>
                      {collection.name}
                    </CollectionDropdownItem>
                  );
                })}
              </Container>
            ) : (
              ""
            )
          }
          interactive
          placement="bottom-start"
          allowHTML
          arrow={false}
          trigger="click"
          maxWidth="100%"
          onCreate={setInstance}
          offset={[0, 0]}
        >
          <SelectButton>
            <LeftIcon>
              <GradientAvatar seed={activeCollection.name} size={32} />
            </LeftIcon>
            {activeCollection.name}
            <RightIcon size={1}>
              <ChevronDownIcon />
            </RightIcon>
          </SelectButton>
        </Tippy>
      </TippyContainer>
    </FormGroup>
  );
};
