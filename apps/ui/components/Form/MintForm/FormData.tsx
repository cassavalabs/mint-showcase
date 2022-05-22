import shallow from "zustand/shallow";
import { Textbox, TextAreaBox } from "@cassavaland/uikits";
import { CollectionDropdown } from "./CollectionsDropdown";
import { Attributes } from "./Attributes";
import { FormRow, FormColumnGap } from "../Styles";
import { useStore } from "../../../state/mintForm";

export const FormData = () => {
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
      <FormRow>
        <FormColumnGap>
          <Textbox
            label="Royalties"
            placeholder="E.g. 10 for 10% of sale price"
            type="number"
            onChange={(e) => setRoyalty(e.target.value)}
            value={royalty}
          />
        </FormColumnGap>
        <FormColumnGap>
          <Textbox
            label="Number of copies"
            placeholder="E.g. 10"
            value="1"
            type="number"
            disabled
          />
        </FormColumnGap>
      </FormRow>
      <Attributes />
    </>
  );
};
