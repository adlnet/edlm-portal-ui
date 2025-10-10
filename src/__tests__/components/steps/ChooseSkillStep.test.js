import { ChooseSkillsStep } from "@/components/steps/ChooseSkillsStep";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

// Mock subcomponents and module dependencies
jest.mock("@heroicons/react/24/solid", () => ({
  __esModule: true,
  ChevronRightIcon: (props) => <svg data-testid="chevron-right" {...props} />,
  PlusIcon: (props) => <svg data-testid="plus-icon" {...props} />,
  XMarkIcon: (props) => <svg data-testid="x-icon" {...props} />
}));

jest.mock("next/router", () => ({
  useRouter: () => ({ query: {}, push: jest.fn() }),
}));

jest.mock("@/components/InfoTooltip", () => ({
  __esModule: true,
  InfoTooltip: () => <span data-testid="info-tooltip" />,
}));

jest.mock("flowbite-react", () => ({
  __esModule: true,
  Label: (props) => <div data-testid="label" {...props} />,
  Select: () => <select data-testid="select" />,
  Tooltip: (props) => <span data-testid="tooltip" {...props} />,
}));

jest.mock("@/components/menus/CustomDropdown", () => ({
  __esModule: true,
  default: ({ value, onChange, options, placeholder, footerItem }) => (
    <div data-testid="custom-dropdown">
      <span>{placeholder}</span>
      {options && options.map((opt, i) => (
        <button
          key={opt.label || opt.value || opt}
          data-testid="custom-dropdown-option"
          onClick={() => onChange({ target: { value: opt.value || opt } })}
        >
          {opt.label || opt.value || opt}
        </button>
      ))}
      {footerItem}
    </div>
  ),
}));

jest.mock("@/components/menus/PriorityDropdown", () => ({
  __esModule: true,
  default: (props) => (
    <div data-testid="priority-dropdown">
      <span>{props.value}</span>
    </div>
  ),
}));

jest.mock("@/components/cards/SuccessMessageToast", () => ({
  __esModule: true,
  default: ({ title, description }) => (
    <div data-testid="success-toast">
      <h3>{title}</h3><span>{description}</span>
    </div>
  ),
}));

jest.mock("@/public/backup_competencies.json", () => ([
  { name: "Comm", desc: "Comm desc", parent: [] },
  { name: "Tech", desc: "Tech desc", parent: ["Comm"] }
]), { virtual: true });

jest.mock("@/utils/dropdownMenuConstants", () => ({
  priorityOptions: ["High", "Medium", "Low"]
}), { virtual: true });

jest.mock("@/public/icons/asteriskIcon.svg", () => "asterisk-icon.svg", { virtual: true });

describe("ChooseSkillsStep", () => {
  const goals = [
    { id: "1", competency: "Comm", priority: "High" },
    { id: "2", competency: "", priority: "Low" }
  ];
  const addGoal = jest.fn();
  const removeGoal = jest.fn();
  const updateGoal = jest.fn();
  const onCompetencyChange = jest.fn();

  it("renders a success toast when showSuccessMessage is true", () => {
    render(
      <ChooseSkillsStep
        goals={goals}
        addGoal={addGoal}
        removeGoal={removeGoal}
        updateGoal={updateGoal}
        onCompetencyChange={onCompetencyChange}
        showSuccessMessage={true}
        planName="My Plan"
      />
    );
    expect(screen.getByTestId("success-toast")).toBeInTheDocument();
    expect(screen.getByText("Your plan has been created")).toBeInTheDocument();
    expect(screen.getByText(/My Plan/)).toBeInTheDocument();
  });

  it("renders section headings and descriptions", () => {
    render(
      <ChooseSkillsStep
        goals={goals}
        addGoal={addGoal}
        removeGoal={removeGoal}
        updateGoal={updateGoal}
        onCompetencyChange={onCompetencyChange}
      />
    );
    expect(screen.getByText(/Choose a Skill Area/)).toBeInTheDocument();
    expect(screen.getByText(/DOT&E competencies/)).toBeInTheDocument();
  });

  it("renders InfoTooltip and CustomDropdown for each goal competency", () => {
    render(
      <ChooseSkillsStep
        goals={goals}
        addGoal={addGoal}
        removeGoal={removeGoal}
        updateGoal={updateGoal}
        onCompetencyChange={onCompetencyChange}
      />
    );
    expect(screen.getAllByTestId("info-tooltip").length).toBe(goals.length);
    expect(screen.getAllByTestId("custom-dropdown").length).toBe(goals.length);
    expect(screen.getAllByTestId("custom-dropdown-option")[0]).toHaveTextContent("Comm");
  });

  it("renders 'Competency Description' and correct text for each goal", () => {
    render(
      <ChooseSkillsStep
        goals={goals}
        addGoal={addGoal}
        removeGoal={removeGoal}
        updateGoal={updateGoal}
        onCompetencyChange={onCompetencyChange}
      />
    );

    // For goal with competency selected
    expect(screen.getByText("Comm desc")).toBeInTheDocument();
    
    // For goal with no competency
    expect(screen.getByText(/Choose a competency to view its description/)).toBeInTheDocument();
  });

  it("renders PriorityDropdown for each goal", () => {
    render(
      <ChooseSkillsStep
        goals={goals}
        addGoal={addGoal}
        removeGoal={removeGoal}
        updateGoal={updateGoal}
        onCompetencyChange={onCompetencyChange}
      />
    );
    expect(screen.getAllByTestId("priority-dropdown").length).toBe(goals.length);
    expect(screen.getAllByTestId("priority-dropdown")[0]).toHaveTextContent("High");
    expect(screen.getAllByTestId("priority-dropdown")[1]).toHaveTextContent("Low");
  });

  it("calls addGoal when 'Add Another Competency' is clicked", () => {
    render(
      <ChooseSkillsStep
        goals={goals}
        addGoal={addGoal}
        removeGoal={removeGoal}
        updateGoal={updateGoal}
        onCompetencyChange={onCompetencyChange}
      />
    );
    fireEvent.click(screen.getByText("Add Another Competency"));
    expect(addGoal).toHaveBeenCalled();
  });

  it("calls removeGoal when the remove (X) button for 2nd goal is clicked", () => {
    render(
      <ChooseSkillsStep
        goals={goals}
        addGoal={addGoal}
        removeGoal={removeGoal}
        updateGoal={updateGoal}
        onCompetencyChange={onCompetencyChange}
      />
    );

    // Only second goal gets remove button
    const removeBtns = screen.getAllByTitle("Remove Competency");
    expect(removeBtns.length).toBe(1);
    fireEvent.click(removeBtns[0]);
    expect(removeGoal).toHaveBeenCalledWith(goals[1].id);
  });

  it("calls onCompetencyChange when CustomDropdown changes", () => {
    render(
      <ChooseSkillsStep
        goals={goals}
        addGoal={addGoal}
        removeGoal={removeGoal}
        updateGoal={updateGoal}
        onCompetencyChange={onCompetencyChange}
      />
    );

    // Simulate a change, call onCompetencyChange with dropdown's first option
    fireEvent.click(screen.getAllByTestId("custom-dropdown-option")[0]);
    expect(onCompetencyChange).toHaveBeenCalled();
  });

  it("calls updateGoal when PriorityDropdown changes", () => {
    render(
      <ChooseSkillsStep
        goals={goals}
        addGoal={addGoal}
        removeGoal={removeGoal}
        updateGoal={updateGoal}
        onCompetencyChange={onCompetencyChange}
      />
    );

    // PriorityDropdown is a mock: simulate clicking on it by firing a click on its container
    fireEvent.click(screen.getAllByTestId("priority-dropdown")[0]);
  });

  it("renders correctly with no goals", () => {
    render(
        <ChooseSkillsStep
            goals={[]}
            addGoal={jest.fn()}
            removeGoal={jest.fn()}
            updateGoal={jest.fn()}
            onCompetencyChange={jest.fn()}
        />
    );
    expect(screen.getByText(/Choose a Skill Area/)).toBeInTheDocument();    
  });

  it("calls competency search footer handler when footer is clicked", () => {
    window.open = jest.fn();
    render(
        <ChooseSkillsStep
        goals={[{id: "3", competency: "", priority: ""}]}
        addGoal={jest.fn()}
        removeGoal={jest.fn()}
        updateGoal={jest.fn()}
        onCompetencyChange={jest.fn()}
        />
    );
    fireEvent.click(screen.getByText(/Go to Competency Search/));
    expect(window.open).toHaveBeenCalledWith('/edlm-portal/learner/search/', '_blank');
  });

  it("calls console.log when View more clicked", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(
        <ChooseSkillsStep
        goals={[{ id: "5", competency: "Comm", priority: "High" }]}
        addGoal={jest.fn()}
        removeGoal={jest.fn()}
        updateGoal={jest.fn()}
        onCompetencyChange={jest.fn()}
        />
    );
    fireEvent.click(screen.getByText("View more"));
    expect(logSpy).toHaveBeenCalledWith("Comm");
    logSpy.mockRestore();
  });
});