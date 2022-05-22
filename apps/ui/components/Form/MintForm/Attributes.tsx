import { ChangeEvent } from "react";
import shallow from "zustand/shallow";
import {
  StyledTextbox,
  Text,
  FormGroup,
  FlexBetween,
  FlexColumn,
  StyledCheckbox,
} from "@cassavaland/uikits";
import { FormColumnGap } from "../Styles";
import { useStore } from "../../../state/mintForm";

export const Attributes = () => {
  const [attributes, setAttributes, showAttributes, handleShowAttributes] =
    useStore(
      (state) => [
        state.attributes,
        state.setAttributes,
        state.showProperties,
        state.setShowProperties,
      ],
      shallow
    );

  const handleAttributeChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    type: "key" | "value"
  ) => {
    if (!attributes) return;

    const attribute = attributes[index];

    if (type === "value") {
      attribute.value = e.target.value;
      setAttributes([...attributes]);
    }

    if (type === "key") {
      attribute.trait_type = e.target.value;
      setAttributes([...attributes]);
    }

    const last = attributes[attributes.length - 1];

    if (attribute.trait_type === "" || attribute.value === "") {
      if (last.trait_type === "" && last.value === "") {
        attributes.pop();
        setAttributes([...attributes]);
      }
    }

    if (attribute.value !== "" && attribute.trait_type !== "") {
      if (last.trait_type !== "" || last.trait_type !== "") {
        attributes.push({
          trait_type: "",
          value: "",
        });
        setAttributes([...attributes]);
      }
    }
  };

  return (
    <>
      <FormGroup>
        <FlexBetween>
          <FlexColumn>
            <Text color="text300" weight={600} textAlign="left">
              Properties
            </Text>
            <Text textAlign="left">
              Add properties that will show up for this item.
            </Text>
          </FlexColumn>
          <StyledCheckbox
            checked={showAttributes}
            onChange={handleShowAttributes}
          />
        </FlexBetween>
      </FormGroup>
      {showAttributes &&
        attributes.map((trait, index) => (
          <FormGroup key={index}>
            <FlexBetween>
              <FormColumnGap>
                <StyledTextbox
                  placeholder="E.g. size"
                  value={trait.trait_type}
                  onChange={(e) => handleAttributeChange(e, index, "key")}
                />
              </FormColumnGap>
              <FormColumnGap>
                <StyledTextbox
                  placeholder="E.g. XL"
                  value={trait.value}
                  onChange={(e) => handleAttributeChange(e, index, "value")}
                />
              </FormColumnGap>
            </FlexBetween>
          </FormGroup>
        ))}
    </>
  );
};
