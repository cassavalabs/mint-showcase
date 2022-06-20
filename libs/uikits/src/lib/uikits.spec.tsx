import { render } from "@testing-library/react";

import Uikits from "./uikits";

describe("Uikits", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Uikits />);
    expect(baseElement).toBeTruthy();
  });
});
