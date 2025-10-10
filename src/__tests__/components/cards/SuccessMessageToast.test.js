import { render, screen } from "@testing-library/react";
import React from "react";
import SuccessMessageToast from '@/components/cards/SuccessMessageToast';

describe("SuccessMessageToastTests", () => {

  it("renders with default title and no description", () => {
    render(<SuccessMessageToast />);
    expect(screen.getByText("Your plan has been created")).toBeInTheDocument();

    // Description is absent for default props
    expect(screen.queryByText(/text-[#146E66] text-base/)).not.toBeInTheDocument();
  });

  it("renders with custom title and description", () => {
    render(<SuccessMessageToast title="Success!" description="Plan was created successfully." />);
    expect(screen.getByText("Success!")).toBeInTheDocument();
    expect(screen.getByText("Plan was created successfully.")).toBeInTheDocument();
  });

  it("renders description only when provided", () => {
    render(<SuccessMessageToast title="Done" description="" />);
    expect(screen.getByText("Done")).toBeInTheDocument();

    // Should not render the description <div>
    expect(screen.queryByText("", { selector: "div.text-base" })).not.toBeInTheDocument();
  });

});