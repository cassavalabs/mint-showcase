import shallow from "zustand/shallow";
import { Textbox, TextAreaBox, FormRow, FormColumn } from "@cassavaland/uikits";
import { CollectionDropdown } from "./CollectionsDropdown";
import { Attributes } from "./Attributes";
import { useStore } from "../../../state/mintForm";

interface FormDataProps {
  isMultiple?: boolean;
}

export const FormData = (props: FormDataProps) => {
  const { isMultiple } = props;
  const [name, setName] = useStore(
    (state) => [state.name, state.setName],
    shallow
  );

  const [externalLink, setExternalLink] = useStore(
    (state) => [state.external_url, state.setExternalURL],
    shallow
  );

  const [description, setDescription] = useStore(
    (state) => [state.description, state.setDescription],
    shallow
  );

  const [royalty, setRoyalty] = useStore(
    (state) => [state.royalty, state.setRoyalty],
    shallow
  );

  const [quantity, setQuantity] = useStore(
    (state) => [state.quantity, state.setQuantities],
    shallow
  );

  return (
    <>
      <Textbox
        label="Name"
        placeholder="Item name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <Textbox
        label="External link"
        placeholder="https://example.com/bina-boy"
        onChange={(e) => setExternalLink(e.target.value)}
        value={externalLink}
      />
      <TextAreaBox
        label="Description"
        placeholder="Describe your item"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <CollectionDropdown />
      {isMultiple ? (
        <FormRow>
          <FormColumn>
            <Textbox
              label="Royalties"
              placeholder="E.g. 10 for 10% of sale price"
              type="number"
              onChange={(e) => setRoyalty(e.target.value)}
              value={royalty}
            />
          </FormColumn>
          <FormColumn>
            <Textbox
              label="Number of copies"
              placeholder="E.g. 10"
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            />
          </FormColumn>
        </FormRow>
      ) : (
        <Textbox
          label="Royalties"
          placeholder="E.g. 10 for 10% of sale price"
          type="number"
          onChange={(e) => setRoyalty(e.target.value)}
          value={royalty}
        />
      )}
      <Attributes />
    </>
  );
};
