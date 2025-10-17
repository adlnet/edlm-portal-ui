if (!global.crypto) {
  global.crypto = {};
}
Object.defineProperty(global.crypto, 'randomUUID', {
  value: () => 'MOCK_UUID',
  writable: true,
});

import { SetGoalsStep } from "@/components/steps/SetGoalsStep";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

// Mock all external components, icons, and functions required for rendering
jest.mock('@heroicons/react/24/outline', () => ({
  ChevronDownIcon: (props) => <span data-testid="chevron-down" {...props} />,
  ChevronUpIcon: (props) => <span data-testid="chevron-up" {...props} />,
  PlusIcon: (props) => <span data-testid="plus-icon" {...props} />,
  XMarkIcon: (props) => <span data-testid="x-icon" {...props} />,
}));

jest.mock('@/components/InfoTooltip', () => ({
  InfoTooltip: ({ title }) => <span data-testid="info-tooltip">{title}</span>
}));


jest.mock('@/components/cards/SuccessMessageToast', () => ({
  __esModule: true,
  default: ({ title }) => <div data-testid="success-toast">{title}</div>
}));

jest.mock('@/components/menus/CustomDropdown', () => ({
  __esModule: true,
  default: ({ value, onChange, options, placeholder }) => (
    <select
      data-testid={`custom-dropdown-${placeholder}`}
      value={value}
      onChange={e => onChange({ target: { value: e.target.value } })}
    >
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}));

jest.mock('@/components/menus/MultiSelectDropdown', () => ({
  __esModule: true,
  MultiSelectDropdown: ({ options, selectedValues, onChange, placeholder }) => {
    const handleOptionClick = opt => {
      const isSelected = selectedValues.includes(opt);
      const updated = isSelected
        ? selectedValues.filter(v => v !== opt)
        : [...selectedValues, opt];
      onChange(updated);
    };
    return (
      <div data-testid={`multiselect-${placeholder}`}>
        {options.map((opt, i) => (
          <button 
            key={opt} 
            data-testid={`ms-opt-${opt}-${placeholder}`}
            onClick={() => handleOptionClick(opt)}>
            {opt}
          </button>
        ))}
      </div>
    );
  }
}));

jest.mock('flowbite-react', () => ({
  __esModule: true,
  Label: ({ value }) => <label>{value}</label>,
  Select: () => <select data-testid="dummy-select" />,
  TextInput: ({ value, placeholder, onChange, className }) => (
    <input
      data-testid={placeholder}
      value={value}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
    />
  ),
}));
jest.mock('@/utils/dropdownMenuConstants', () => ({
  ksaOptions: [
    { name: 'Critical Thinking', description: 'Analyze, synthesize, evaluate.' },
    { name: 'Collaboration', description: 'Work in teams.' }
  ],
  obstacleOptions: ['Time', 'Budget', 'Other'],
  proficiencyLevels: ['Basic', 'Intermediate', 'Advanced'],
  resourceSupportOptions: ['Mentor', 'Course', 'Other']
}));
jest.mock('@/utils/priorityIcon', () => ({
  __esModule: true,
  default: (priority) => <span data-testid="priority-icon">{priority}</span>
}));

const baseGoal = {
  id: "cgid1",
  goal: "Improve skills",
  timeline: "Q1",
  resources: ["Mentor"],
  resourcesOther: "",
  obstacles: ["Time"],
  obstaclesOther: "",
  ksas: [
    { id: "ksa1", type: "Critical Thinking", currentLevel: "Basic", targetLevel: "Intermediate" }
  ]
};

const props = {
  goals: [{ id: "g1", competency: "Critical Thinking", priority: "High" }],
  competencyGoals: { "Critical Thinking": [baseGoal] },
  setCompetencyGoals: jest.fn(),
  timeframe: "Q1",
  getTimelineOptions: () => ["Q1", "Q2"],
  addGoalToCompetency: jest.fn(),
  removeGoalFromCompetency: jest.fn(),
  updateCompetencyGoal: jest.fn(),
  addKSAToGoal: jest.fn(),
  removeKSAFromGoal: jest.fn(),
  updateKSAForGoal: jest.fn(),
  showSuccessMessage: false,
};

describe("SetGoalsStep component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders core headings, instructions, and required icons", () => {
    render(<SetGoalsStep {...props} />);
    expect(screen.getByText("Set Competency Goals")).toBeInTheDocument();
    expect(screen.getAllByText("Critical Thinking").length).toBeGreaterThan(0);
    expect(screen.getByTestId("priority-icon")).toHaveTextContent("High");
    expect(screen.getByTestId("custom-dropdown-When will you achieve this goal?")).toBeInTheDocument();
  });

  it("shows the success toast if showSuccessMessage is true", () => {
    render(<SetGoalsStep {...props} showSuccessMessage={true} />);
    expect(screen.getByTestId("success-toast")).toBeInTheDocument();
  });

  it("collapses and expands the competency accordion", () => {
    render(<SetGoalsStep {...props} />);
    expect(screen.getByTestId("chevron-up")).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(screen.getByTestId("chevron-down")).toBeInTheDocument();
  });

  it("invokes updateCompetencyGoal on text or timeline changes", () => {
    render(<SetGoalsStep {...props} />);
    fireEvent.change(screen.getByTestId("What does success look like for you?"), { target: { value: "New goal" } });
    expect(props.updateCompetencyGoal).toHaveBeenCalledWith(
      "Critical Thinking", "cgid1", "goal", "New goal"
    );
    fireEvent.change(screen.getByTestId("custom-dropdown-When will you achieve this goal?"), { target: { value: "Q2" } });
    expect(props.updateCompetencyGoal).toHaveBeenCalledWith(
      "Critical Thinking", "cgid1", "timeline", "Q2"
    );
  });

  it("renders KSA description and updates KSA fields", () => {
    render(<SetGoalsStep {...props} />);
    expect(screen.getByText("Analyze, synthesize, evaluate.")).toBeInTheDocument();

    // Change KSA type
    fireEvent.change(screen.getByTestId("custom-dropdown-Which KSA will help you achieve that goal?"), { target: { value: "Collaboration" } });
    expect(props.updateKSAForGoal).toHaveBeenCalledWith("Critical Thinking", "cgid1", "ksa1", "type", "Collaboration");

    // CurrentLevel
    fireEvent.change(screen.getByTestId("custom-dropdown-Estimate your current proficiency on this goal"), { target: { value: "Advanced" } });
    expect(props.updateKSAForGoal).toHaveBeenCalledWith("Critical Thinking", "cgid1", "ksa1", "currentLevel", "Advanced");

    // TargetLevel
    fireEvent.change(screen.getByTestId("custom-dropdown-Select your desired proficiency on this goal"), { target: { value: "Advanced" } });
    expect(props.updateKSAForGoal).toHaveBeenCalledWith("Critical Thinking", "cgid1", "ksa1", "targetLevel", "Advanced");
  });

  it("adds another KSA when Add Another KSA is clicked", () => {
    render(<SetGoalsStep {...props} />);
    fireEvent.click(screen.getByText(/Add Another KSA/));
    expect(props.addKSAToGoal).toHaveBeenCalledWith("Critical Thinking", "cgid1");
  });

  it("adds another goal when Add Another Goal is clicked", () => {
    render(<SetGoalsStep {...props} />);
    fireEvent.click(screen.getByText(/Add Another Goal/));
    expect(props.addGoalToCompetency).toHaveBeenCalledWith("Critical Thinking");
  });

  it("removes a goal when Remove Goal is clicked", () => {
    // Make 2 goals for this competency
    const goals = [{ id: "g1", competency: "Critical Thinking", priority: "High" }];
    const cg = {
      "Critical Thinking": [
        { ...baseGoal },
        {
          ...baseGoal,
          id: "cgid2",
          goal: "Second goal",
          timeline: "Q2"
        }
      ]
    };
    render(<SetGoalsStep {...{ ...props, goals, competencyGoals: cg }} />);
    const removeGoalBtns = screen.getAllByTitle("Remove Goal");
    expect(removeGoalBtns.length).toBe(1);
    fireEvent.click(removeGoalBtns[0]);
    expect(props.removeGoalFromCompetency).toHaveBeenCalledWith("Critical Thinking", "cgid2");
  });

  it("removes a KSA when Remove KSA is clicked", () => {
    const cgKSA = {
      "Critical Thinking": [
        {
          ...baseGoal,
          ksas: [
            { ...baseGoal.ksas[0] },
            { id: "ksa2", type: "Collaboration", currentLevel: "Intermediate", targetLevel: "Advanced" }
          ]
        }
      ]
    };
    render(<SetGoalsStep {...{ ...props, competencyGoals: cgKSA }} />);
    const removeKsaBtns = screen.getAllByTitle("Remove KSA");
    expect(removeKsaBtns.length).toBe(1);
    fireEvent.click(removeKsaBtns[0]);
    expect(props.removeKSAFromGoal).toHaveBeenCalledWith("Critical Thinking", "cgid1", "ksa2");
  });

  it("shows 'Other' resource/obstacle inputs and clears when unselected", () => {
    const cg = {
      "Critical Thinking": [
        {
          ...baseGoal,
          resources: ["Other"],
          obstacles: ["Other"],
          resourcesOther: "CustomRes",
          obstaclesOther: "CustomObs"
        }
      ]
    };
    render(<SetGoalsStep {...{ ...props, competencyGoals: cg }} />);

    // Resource/obstacle "Other" fields
    expect(screen.getByTestId("Please specify other resources...")).toBeInTheDocument();
    expect(screen.getByTestId("Please specify other obstacles...")).toBeInTheDocument();

    // Unselect "Other" clears field
    fireEvent.click(screen.getByTestId("ms-opt-Other-Add resources or support you need to accomplish your goal"));
    expect(props.updateCompetencyGoal).toHaveBeenCalledWith("Critical Thinking", "cgid1", "resources", []);
    expect(props.updateCompetencyGoal).toHaveBeenCalledWith("Critical Thinking", "cgid1", "resourcesOther", "");
    fireEvent.click(screen.getByTestId("ms-opt-Other-What might get in the way of your goal?"));
    expect(props.updateCompetencyGoal).toHaveBeenCalledWith("Critical Thinking", "cgid1", "obstacles", []);
    expect(props.updateCompetencyGoal).toHaveBeenCalledWith("Critical Thinking", "cgid1", "obstaclesOther", "");
  });

  it("renders nothing if no competencies are selected", () => {
    render(<SetGoalsStep {...{ ...props, goals: [] }} />);
    expect(screen.queryByText("Critical Thinking")).toBeNull();
  });

  it("renders with no goals and no selected competencies", () => {
    render(<SetGoalsStep
      goals={[]} // empty goals array
      competencyGoals={{}} // empty object
      setCompetencyGoals={jest.fn()}
      timeframe=""
      getTimelineOptions={() => []}
      addGoalToCompetency={jest.fn()}
      removeGoalFromCompetency={jest.fn()}
      updateCompetencyGoal={jest.fn()}
      addKSAToGoal={jest.fn()}
      removeKSAFromGoal={jest.fn()}
      updateKSAForGoal={jest.fn()}
    />);
    
    // Should render header but no competency cards/goals
    expect(screen.getByText('Set Competency Goals')).toBeInTheDocument();
    expect(screen.queryAllByText(/Add Another Goal/)).toHaveLength(0);
  });

  // Multiple goals per competency, check for Remove Goal button on all but index 0
  it("shows Remove Goal button for all but first goal", () => {
    const compGoals = {
      Communication: [
        { id: 'g1', goal: 'Lead workshop', timeline: '1 month', resources: [], obstacles: [], ksas: [{id:'k1', type:'', currentLevel:'Basic', targetLevel:'Intermediate'}]},
        { id: 'g2', goal: 'Present project', timeline: '2 months', resources: [], obstacles: [], ksas: [{id:'k2', type:'', currentLevel:'Basic', targetLevel:'Intermediate'}]}
      ]
    };
    render(<SetGoalsStep
      goals={[{competency:'Communication'}]}
      competencyGoals={compGoals}
      setCompetencyGoals={jest.fn()}
      timeframe=""
      getTimelineOptions={() => ['1 month', '2 months']}
      addGoalToCompetency={jest.fn()}
      removeGoalFromCompetency={jest.fn()}
      updateCompetencyGoal={jest.fn()}
      addKSAToGoal={jest.fn()}
      removeKSAFromGoal={jest.fn()}
      updateKSAForGoal={jest.fn()}
    />);

    // Should only show Remove Goal for second
    expect(screen.getAllByTitle('Remove Goal')).toHaveLength(1);
  });

  // Multiple KSAs per goal, Remove KSA button on all but index 0
  it("shows Remove KSA button for all but first KSA", () => {
    const compGoals = {
      Communication: [{
        id: 'g1',
        goal: 'Lead workshop',
        timeline: '1 month',
        resources: [],
        obstacles: [],
        ksas: [
          {id:'k1', type:'', currentLevel:'Basic', targetLevel:'Intermediate'},
          {id:'k2', type:'Leadership', currentLevel:'Basic', targetLevel:'Advanced'}
        ]
      }]
    };
    render(<SetGoalsStep
      goals={[{competency:'Communication'}]}
      competencyGoals={compGoals}
      setCompetencyGoals={jest.fn()}
      timeframe=""
      getTimelineOptions={() => ['1 month']}
      addGoalToCompetency={jest.fn()}
      removeGoalFromCompetency={jest.fn()}
      updateCompetencyGoal={jest.fn()}
      addKSAToGoal={jest.fn()}
      removeKSAFromGoal={jest.fn()}
      updateKSAForGoal={jest.fn()}
    />);
    expect(screen.getAllByTitle('Remove KSA')).toHaveLength(1);
  });

  it("calls addKSAToGoal when Add Another KSA is clicked", () => {
    const addKSAToGoal = jest.fn();
    const compGoals = {
      Communication: [{
        id: 'goal1',
        goal: '',
        timeline: '',
        resources: [],
        obstacles: [],
        ksas: [{id:'ksa1', type:'', currentLevel:'Basic', targetLevel:'Intermediate'}]
      }]
    };
    render(<SetGoalsStep
      goals={[{competency:'Communication'}]}
      competencyGoals={compGoals}
      setCompetencyGoals={jest.fn()}
      timeframe=""
      getTimelineOptions={() => ['Q1']}
      addGoalToCompetency={jest.fn()}
      removeGoalFromCompetency={jest.fn()}
      updateCompetencyGoal={jest.fn()}
      addKSAToGoal={addKSAToGoal}
      removeKSAFromGoal={jest.fn()}
      updateKSAForGoal={jest.fn()}
    />);
    fireEvent.click(screen.getByText(/Add Another KSA/));
    expect(addKSAToGoal).toHaveBeenCalledWith('Communication', 'goal1');
  });

  it("calls addGoalToCompetency when Add Another Goal is clicked", () => {
    const addGoalToCompetency = jest.fn();
    const compGoals = {
      Communication: [{
        id: 'goal1',
        goal: '',
        timeline: '',
        resources: [],
        obstacles: [],
        ksas: [{id:'ksa1', type:'', currentLevel:'Basic', targetLevel:'Intermediate'}]
      }]
    };
    render(<SetGoalsStep
      goals={[{competency:'Communication'}]}
      competencyGoals={compGoals}
      setCompetencyGoals={jest.fn()}
      timeframe=""
      getTimelineOptions={() => ['Q2']}
      addGoalToCompetency={addGoalToCompetency}
      removeGoalFromCompetency={jest.fn()}
      updateCompetencyGoal={jest.fn()}
      addKSAToGoal={jest.fn()}
      removeKSAFromGoal={jest.fn()}
      updateKSAForGoal={jest.fn()}
    />);
    fireEvent.click(screen.getByText(/Add Another Goal/));
    expect(addGoalToCompetency).toHaveBeenCalledWith('Communication');
  });


  it("shows resourcesOther input if 'Other' is selected in resources", () => {
    const compGoals = {
      Critical: [{
        id: 'goalX',
        goal: '',
        timeline: '',
        resources: ['Other'], // triggers input
        resourcesOther: 'CustomResource',
        obstacles: [],
        ksas: [{id:'kz', type:'', currentLevel:'Basic', targetLevel:'Intermediate'}]
      }]
    };
    render(<SetGoalsStep
      goals={[{competency:'Critical'}]}
      competencyGoals={compGoals}
      setCompetencyGoals={jest.fn()}
      timeframe=""
      getTimelineOptions={() => ['Now']}
      addGoalToCompetency={jest.fn()}
      removeGoalFromCompetency={jest.fn()}
      updateCompetencyGoal={jest.fn()}
      addKSAToGoal={jest.fn()}
      removeKSAFromGoal={jest.fn()}
      updateKSAForGoal={jest.fn()}
    />);
    expect(screen.getByPlaceholderText("Please specify other resources...")).toBeInTheDocument();
  });

  it("shows obstaclesOther input if 'Other' is selected in obstacles", () => {
    const compGoals = {
      Critical: [{
        id: 'goalY',
        goal: '',
        timeline: '',
        resources: [],
        obstacles: ['Other'], // triggers input
        obstaclesOther: 'BigObstacle',
        ksas: [{id:'km', type:'', currentLevel:'Basic', targetLevel:'Intermediate'}]
      }]
    };
    render(<SetGoalsStep
      goals={[{competency:'Critical'}]}
      competencyGoals={compGoals}
      setCompetencyGoals={jest.fn()}
      timeframe=""
      getTimelineOptions={() => []}
      addGoalToCompetency={jest.fn()}
      removeGoalFromCompetency={jest.fn()}
      updateCompetencyGoal={jest.fn()}
      addKSAToGoal={jest.fn()}
      removeKSAFromGoal={jest.fn()}
      updateKSAForGoal={jest.fn()}
    />);
    expect(screen.getByPlaceholderText("Please specify other obstacles...")).toBeInTheDocument();
  });

  // Fallback description text for unselected KSA
  it("shows fallback KSA description if not selected", () => {
    const compGoals = {
      Communication: [{
        id: 'go2',
        goal: '',
        timeline: '',
        resources: [],
        obstacles: [],
        ksas: [{id:'k2', type:'', currentLevel:'Basic', targetLevel:'Intermediate'}]
      }]
    };
    render(<SetGoalsStep
      goals={[{competency:'Communication'}]}
      competencyGoals={compGoals}
      setCompetencyGoals={jest.fn()}
      timeframe=""
      getTimelineOptions={() => ['Q3']}
      addGoalToCompetency={jest.fn()}
      removeGoalFromCompetency={jest.fn()}
      updateCompetencyGoal={jest.fn()}
      addKSAToGoal={jest.fn()}
      removeKSAFromGoal={jest.fn()}
      updateKSAForGoal={jest.fn()}
    />);
    expect(screen.getByText("Select a focus area to see what it’s all about")).toBeInTheDocument();
  });

  it("renders success message toast when showSuccessMessage is true", () => {
    render(<SetGoalsStep
      goals={[]}
      competencyGoals={{}}
      setCompetencyGoals={jest.fn()}
      timeframe=""
      getTimelineOptions={() => []}
      addGoalToCompetency={jest.fn()}
      removeGoalFromCompetency={jest.fn()}
      updateCompetencyGoal={jest.fn()}
      addKSAToGoal={jest.fn()}
      removeKSAFromGoal={jest.fn()}
      updateKSAForGoal={jest.fn()}
      showSuccessMessage={true}
    />);
    expect(screen.getByText("Your changes have been saved")).toBeInTheDocument();
  });

  it('calls setCompetencyGoals to initialize missing competencies', () => {
    const setCompetencyGoals = jest.fn();
    
    // "Critical Thinking" is selected, but not in competencyGoals
    render(<SetGoalsStep
      goals={[{ competency: 'Critical Thinking' }]}
      competencyGoals={{}} // No 'Critical Thinking' key
      setCompetencyGoals={setCompetencyGoals}
      timeframe=""
      getTimelineOptions={() => []}
      addGoalToCompetency={jest.fn()}
      removeGoalFromCompetency={jest.fn()}
      updateCompetencyGoal={jest.fn()}
      addKSAToGoal={jest.fn()}
      removeKSAFromGoal={jest.fn()}
      updateKSAForGoal={jest.fn()}
    />);
    
    // setCompetencyGoals should be called with a function (updater)
    expect(setCompetencyGoals).toHaveBeenCalled();
  });

  it("executes the setCompetencyGoals updater, covering newGoals initialization", () => {
    // Arrange: Set up test with a new competency
    let capturedUpdater;
    const setCompetencyGoals = jest.fn(updater => {
      capturedUpdater = updater; // Save for manual execution
    });

    render(<SetGoalsStep
      goals={[{ competency: 'Test Comp' }]}
      competencyGoals={{}}
      setCompetencyGoals={setCompetencyGoals}
      timeframe=""
      getTimelineOptions={() => []}
      addGoalToCompetency={jest.fn()}
      removeGoalFromCompetency={jest.fn()}
      updateCompetencyGoal={jest.fn()}
      addKSAToGoal={jest.fn()}
      removeKSAFromGoal={jest.fn()}
      updateKSAForGoal={jest.fn()}
    />);

    // At this point, setCompetencyGoals should have been called ONCE, with an updater function
    expect(setCompetencyGoals).toHaveBeenCalled();
    expect(typeof capturedUpdater).toBe("function");

    // Now, execute the updater function and check the result
    const original = {};
    const result = capturedUpdater(original);

    expect(result).toHaveProperty('Test Comp');
    expect(result['Test Comp'][0]).toMatchObject({
      goal: '',
      timeline: '',
      resources: [],
      resourcesOther: '',
      obstacles: [],
      obstaclesOther: '',
      ksas: [
        {
          id: "MOCK_UUID",
          type: '',
          currentLevel: 'Basic',
          targetLevel: 'Intermediate'
        }
      ]
    });
  });

});
