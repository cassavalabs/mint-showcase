import { render } from "@testing-library/react";

import { SpinLoader } from ".";

describe("SpinLoader", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<SpinLoader />);
    expect(baseElement).toBeTruthy();
  });
});
