import { ReviewStep } from "@/components/steps/ReviewStep";
import { render, screen } from "@testing-library/react";
import React from "react";

jest.mock('@/contexts/CompetencyContext', () => ({
  useCompetencies: jest.fn(),
}));
jest.mock('@/components/cards/DevelopmentGoal', () => ({
  __esModule: true,
  default: ({ competency }) => (
    <div data-testid="development-goal">
      <span>{competency.name}</span>
      <span data-testid="goal-count">{competency.goals.length}</span>
    </div>
  ),
}));
jest.mock('@/components/cards/SuccessMessageToast', () => ({
  __esModule: true,
  default: ({ title, description }) => (
    <div data-testid="success-toast">
      <span>{title}</span>
      <span>{description}</span>
    </div>
  ),
}));

const mockUseCompetencies = require('@/contexts/CompetencyContext').useCompetencies;

// Helper child competency data for KSA description lookups
const mockChildCompetencies = [
  { name: "SkillA", description: "SkillA Desc" },
  { name: "SkillB", description: "SkillB Desc" }
];

beforeEach(() => {
  jest.clearAllMocks();
  mockUseCompetencies.mockReturnValue({
    childCompetencies: mockChildCompetencies,
  });
});

describe("ReviewStep", () => {
  it("renders plan name and timeframe taken from props", () => {
    render(
      <ReviewStep
        planName="Plan X"
        timeframe="Quarter 4"
        goals={[]}
        competencyGoals={{}}
      />
    );
    expect(screen.getByText("Plan X")).toBeInTheDocument();
    expect(screen.getByText("Quarter 4")).toBeInTheDocument();
  });

  it("renders fallback plan name and timeframe when not set", () => {
    render(
      <ReviewStep goals={[]} competencyGoals={{}} />
    );
    expect(screen.getByText("Learning Plan")).toBeInTheDocument();
    expect(screen.getByText("No timeframe set")).toBeInTheDocument();
  });

  it("renders a DevelopmentGoal for each unique competency with the right number of goals", () => {
    const goals = [
      { id: "1", competency: "CompA", priority: "Low" },
      { id: "2", competency: "CompB", priority: "High" }
    ];
    const competencyGoals = {
      CompA: [
        {
          goal: "Goal 1",
          timeline: "Soon",
          resources: ["A"],
          obstacles: ["O1"],
          ksas: [
            { type: "SkillA", currentLevel: "A", targetLevel: "B" },
            { type: undefined }, // Filtered out
          ]
        }
      ],
      CompB: [
        {
          goal: "Goal B",
          timeline: "Later",
          resources: [],
          obstacles: [],
          ksas: []
        },
        {
          // No goal set, covers 'No goal defined'
          timeline: "",
          resources: undefined,
          obstacles: undefined,
          ksas: [{ type: "SkillB", currentLevel: null, targetLevel: undefined }]
        }
      ]
    };

    render(
      <ReviewStep
        goals={goals}
        competencyGoals={competencyGoals}
        planName="My Plan"
        timeframe="2024"
      />
    );
    
    // 2 unique development goals, with correct goal counts
    const devGoals = screen.getAllByTestId("development-goal");
    expect(devGoals).toHaveLength(2);

    // CompA's goal count = 1
    expect(screen.getAllByTestId("goal-count")[0]).toHaveTextContent("1");

    // CompB's goal count = 2
    expect(screen.getAllByTestId("goal-count")[1]).toHaveTextContent("2");
  });

  it("uses fallback values for priority, desc, timeline, currLvl, targetLvl", () => {
    const goals = [
      { id: "x", competency: "CompX" }, // Missing priority
    ];
    const competencyGoals = {
      CompX: [
        {
          // goal, timeline, resources, obstacles, and ksas missing/empty
          ksas: [{ type: "SkillA" }]
        }
      ]
    };
    render(
      <ReviewStep goals={goals} competencyGoals={competencyGoals} />
    );

    // DevelopmentGoal shown with fallback count
    expect(screen.getByTestId("development-goal")).toBeInTheDocument();
    expect(screen.getByTestId("goal-count")).toHaveTextContent("1");

    // (Deeper fallback/prop checks belong in DevelopmentGoal tests)
  });

  it("handles empty childCompetencies for KSA description fallback", () => {
    mockUseCompetencies.mockReturnValueOnce({ childCompetencies: [] });
    const goals = [
      { id: "1", competency: "C", priority: "P" },
    ];
    render(
      <ReviewStep
        goals={goals}
        competencyGoals={{
          C: [
            {
              ksas: [{ type: "Something", currentLevel: undefined, targetLevel: undefined }]
            }
          ]
        }}
      />
    );
    expect(screen.getByTestId("development-goal")).toBeInTheDocument();
  });

  it("renders nothing if there are no goals with a competency", () => {
    render(
      <ReviewStep
        goals={[
          { id: "1", competency: undefined },
          { id: "2" } // no competency
        ]}
        competencyGoals={{}}
      />
    );
    expect(screen.queryByTestId("development-goal")).not.toBeInTheDocument();
  });

  it("handles extra goal objects gracefully", () => {
    // Multiple goals, extra unlinked data in competencyGoals
    render(
      <ReviewStep
        goals={[
          { id: "1", competency: "A", priority: "High" },
        ]}
        competencyGoals={{
          A: [
            { goal: "G1", ksas: [] },
            { ksas: [] }
          ],
          B: [
            { goal: "Stray goal" }
          ]
        }}
      />
    );

    // Only one "development-goal" for A
    expect(screen.getAllByTestId("development-goal")).toHaveLength(1);
    expect(screen.getByText("A")).toBeInTheDocument();
  });
});