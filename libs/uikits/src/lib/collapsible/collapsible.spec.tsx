import { render } from "@testing-library/react";

import { Collapsible } from ".";

describe("Collapsible", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <Collapsible header="Hello Click Me">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa aspernatur
        veniam quisquam asperiores, repudiandae, impedit eligendi doloribus
        deleniti, nihil voluptate vel dolorem molestiae voluptatum ullam dolores
        nesciunt perferendis neque minus.
      </Collapsible>
    );
    expect(baseElement).toBeTruthy();
  });
});
