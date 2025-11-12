import { ChooseSkillsStep } from "@/components/steps/ChooseSkillsStep";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

jest.mock('@heroicons/react/24/solid', () => ({
  ChevronRightIcon: (p) => <svg data-testid="chevron-right" {...p} />,
  PlusIcon: (p) => <svg data-testid="plus" {...p} />,
  XMarkIcon: (p) => <svg data-testid="xmark" {...p} />,
}));
jest.mock('@/components/InfoTooltip', () => ({
  InfoTooltip: (props) => <span data-testid="infotooltip">{props.title}</span>,
}));
jest.mock('flowbite-react', () => ({
  Label: (props) => <label>{props.value}</label>,
}));
jest.mock('@/utils/extractEccrReference', () => ({
  extractEccrReference: (id) => `eccr-${id}`,
}));
jest.mock("@/components/menus/CustomDropdown", () => {
  const CustomDropdown = (props) => (
    <select
      data-testid={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    >
      <option value="">Select</option>
      {props.options.map((opt) => (
        <option
          value={opt.value}
          key={opt.value}
          disabled={opt.disabled}
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
  CustomDropdown.displayName = 'CustomDropdown';
  return CustomDropdown;
});
jest.mock("@/components/menus/PriorityDropdown", () => {
  const PriorityDropdown = (props) => (
    <select
      data-testid="priority-dropdown"
      value={props.value}
      onChange={props.onChange}
    >
      {props.options.map((opt) => (
        <option value={opt.value} key={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
  PriorityDropdown.displayName = 'PriorityDropdown';
  return PriorityDropdown;
});
jest.mock('@/components/cards/SuccessMessageToast', () => {
  const SuccessMessageToast = (props) =>
    <div data-testid="toast">{props.title} {props.description}</div>;
  SuccessMessageToast.displayName = 'SuccessMessageToast';
  return SuccessMessageToast;
});
jest.mock('next/image', () => {
  // eslint-disable-next-line @next/next/no-img-element
  const Image = (props) => <img alt={props.alt} {...props} />;
  Image.displayName = 'Image';
  return Image;
});
jest.mock('@/public/icons/asteriskIcon.svg', () => "asterisk-icon-path");

// Context
const mockParentCompetencies = [
  { id: 'c1', name: 'Communication', description: 'Desc Communication' },
  { id: 'c2', name: 'Teamwork', description: 'Desc Teamwork' },
];

jest.mock('@/contexts/CompetencyContext', () => ({
  useCompetencies: () => ({
    parentCompetencies: mockParentCompetencies,
  }),
}));

// Test data
const baseGoal = {
  id: 'g1',
  competency: 'Communication',
  priority: 2,
};

const updateGoal = jest.fn();
const addGoal = jest.fn();
const removeGoal = jest.fn();
const onCompetencyChange = jest.fn();

const setup = (props = {}) =>
  render(
    <ChooseSkillsStep
      goals={props.goals || [baseGoal]}
      addGoal={addGoal}
      removeGoal={removeGoal}
      updateGoal={updateGoal}
      onCompetencyChange={onCompetencyChange}
      {...props}
    />
  );

describe("ChooseSkillsStep", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders heading and information", () => {
    setup();
    expect(screen.getByText("Choose a Skill Area")).toBeInTheDocument();
    expect(
      screen.getByText(/Select one or more DOT&E competencies/i)
    ).toBeInTheDocument();
    expect(screen.getAllByAltText("Asterisk")).toHaveLength(2);
    expect(screen.getByText("= Required")).toBeInTheDocument();
  });

  it("renders success toast when showSuccessMessage is true", () => {
    setup({ showSuccessMessage: true, planName: "Plan X" });
    expect(screen.getByTestId("toast")).toHaveTextContent(
      "Your plan has been created"
    );
    expect(screen.getByTestId("toast")).toHaveTextContent(
      "successfully created your learning plan: Plan X"
    );
  });

  it("shows custom dropdowns with correct options and disables already selected", () => {
    setup({
      goals: [
        { ...baseGoal },
        { id: 'g2', competency: 'Teamwork', priority: 1 },
      ],
    });
    const selects = screen.getAllByTestId("Select a competency");
    expect(selects).toHaveLength(2);
    selects.forEach((sel) => {
      // Should show two options plus the 'Select' blank one
      expect(sel.querySelectorAll("option")).toHaveLength(3);
    });

    // In first dropdown, 'Communication' should not be disabled
    expect(selects[0].querySelector('option[value="Communication"]').disabled).toBe(false);

    // In second dropdown, 'Communication' should be disabled (already selected in another goal)
    expect(selects[1].querySelector('option[value="Communication"]').disabled).toBe(true);
  });

  it("updates competency and calls onCompetencyChange and updateGoal", () => {
    setup();
    const competencyDropdown = screen.getByTestId("Select a competency");
    fireEvent.change(competencyDropdown, { target: { value: "Teamwork" } });

    // Called with id, 'competency', new name
    expect(updateGoal).toHaveBeenCalledWith("g1", "competency", "Teamwork");

    // Should call for competencyId extraction as well
    expect(updateGoal).toHaveBeenCalledWith("g1", "competencyId", "eccr-c2");
    expect(onCompetencyChange).toHaveBeenCalledWith("g1", "Teamwork");
  });

  it("calls removeGoal only for goals after index 0", () => {
    setup({
      goals: [
        { ...baseGoal },
        { id: "g2", competency: "Teamwork", priority: 1 },
      ],
    });

    // Only second goal has Remove button (index>0)
    const removeButtons = screen.getAllByTitle("Remove Competency");
    expect(removeButtons).toHaveLength(1);
    fireEvent.click(removeButtons[0]);
    expect(removeGoal).toHaveBeenCalledWith("g2");
  });

  it("calls addGoal when clicking 'Add Another Competency'", () => {
    setup();
    const addBtn = screen.getByText("Add Another Competency");
    fireEvent.click(addBtn);
    expect(addGoal).toHaveBeenCalled();
  });

  it("shows and triggers 'View more' button for selected competency", () => {
    setup();
    expect(screen.getByText("View more")).toBeInTheDocument();
    
    // Just clicking for coverage; in real code, would spy on console.log
    fireEvent.click(screen.getByText("View more"));
  });

  it("shows fallback description when no competency is selected", () => {
    setup({
      goals: [
        { ...baseGoal, competency: "DoesNotExist" },
      ]
    });
    expect(
      screen.getByText("Choose a competency to view its description here")
    ).toBeInTheDocument();
  });

  it("shows 'No description available' when no description in selected competency", () => {
    // Hide description
    mockParentCompetencies[1].description = "";
    setup({
      goals: [
        { ...baseGoal, competency: "Teamwork" },
      ]
    });
    expect(
      screen.getByText("No description available")
    ).toBeInTheDocument();
    mockParentCompetencies[1].description = "Desc Teamwork"; // restore original for other tests
  });
});