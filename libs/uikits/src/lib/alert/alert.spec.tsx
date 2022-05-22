import { render } from "@testing-library/react";

import { AlertModel } from ".";

describe("Alert", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<AlertModel />);
    expect(baseElement).toBeTruthy();
  });
});
