import { ReviewStep } from "@/components/steps/ReviewStep";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock dependencies
jest.mock('@/components/cards/DevelopmentGoal', () => ({
  __esModule: true,
  default: ({ goal }) => (
    <div data-testid="development-goal">
      <span>{goal.name}</span>
      <span>{goal.desc}</span>
      <span>{goal.priority}</span>
      <span>{goal.timeline}</span>
      {goal.ksaList && goal.ksaList.length > 0 &&
        <div data-testid="ksa-list">{goal.ksaList.map((ksa, i) =>
          <div key={i}>{ksa.title}-{ksa.currLvl}-{ksa.targetLvl}</div>
        )}</div>
      }
    </div>
  ),
}));

jest.mock('@/components/cards/SuccessMessageToast', () => ({
  __esModule: true,
  default: ({ title, description }) => (
    <div data-testid="success-toast">
      <strong>{title}</strong>
      <span>{description}</span>
    </div>
  ),
}));

jest.mock('@/utils/dropdownMenuConstants', () => ({
  ksaOptions: [
    { name: 'Critical Thinking', description: 'Analyze, synthesize, and evaluate information' },
    { name: 'Leadership', description: 'Guide individuals and teams to success' },

    // Add more options for robust tests
  ]
}), { virtual: true });

describe('ReviewStep', () => {
  const goals = [
    { id: 1, competency: 'Critical Thinking', priority: 'High' },
    { id: 2, competency: '', priority: 'Low' }, // Will be ignored
    { id: 3, competency: 'Leadership', priority: 'Medium' },
  ];
  const competencyGoals = {
    'Critical Thinking': [
      {
        goal: 'Improve analysis',
        timeline: '3 months',
        resources: ['Book', 'Mentor'],
        obstacles: ['Time'],
        ksas: [
          { type: 'Critical Thinking', currentLevel: 'Basic', targetLevel: 'Advanced' },
        ]
      }
    ],
    'Leadership': [
      {
        goal: '',
        timeline: '',
        resources: [],
        obstacles: [],
        ksas: [
          { type: 'Leadership', currentLevel: 'Intermediate', targetLevel: 'Advanced' },
          { type: '', currentLevel: '', targetLevel: '' } // Should be skipped
        ]
      }
    ],
  };

  it('renders plan summary with name and timeframe', () => {
    render(
      <ReviewStep
        planName="My Plan"
        timeframe="6 months"
        goals={goals}
        competencyGoals={competencyGoals}
      />
    );
    expect(screen.getByText('My Plan')).toBeInTheDocument();
    expect(screen.getByText('6 months')).toBeInTheDocument();
  });

  it('shows default values for missing planName and timeframe', () => {
    render(
      <ReviewStep
        planName=""
        timeframe=""
        goals={goals}
        competencyGoals={competencyGoals}
      />
    );
    expect(screen.getByText('Learning Plan')).toBeInTheDocument();
    expect(screen.getByText('No timeframe set')).toBeInTheDocument();
  });

  it('renders all formatted goals for selected competencies only', () => {
    render(
      <ReviewStep
        planName="My Plan"
        timeframe="6 months"
        goals={goals}
        competencyGoals={competencyGoals}
      />
    );
    const goalNodes = screen.getAllByTestId('development-goal');

    // Only goals for 'Critical Thinking' and 'Leadership' should be rendered
    expect(goalNodes.length).toBe(2);
    expect(goalNodes[0]).toHaveTextContent('Critical Thinking');
    expect(goalNodes[0]).toHaveTextContent('Improve analysis');
    expect(goalNodes[0]).toHaveTextContent('High');
    expect(goalNodes[0]).toHaveTextContent('3 months');
    
    // Leadership goal should show fallback defaults
    expect(goalNodes[1]).toHaveTextContent('Leadership');
    expect(goalNodes[1]).toHaveTextContent('No goal defined');
    expect(goalNodes[1]).toHaveTextContent('Medium');
    expect(goalNodes[1]).toHaveTextContent('No timeline');
  });

  it('renders KSA details when available', () => {
    render(
      <ReviewStep
        planName="My Plan"
        timeframe="6 months"
        goals={goals}
        competencyGoals={competencyGoals}
      />
    );

    // For the first goal, should have KSA details with correct matcher
    expect(screen.getAllByTestId('ksa-list')[0]).toHaveTextContent('Critical Thinking-Basic-Advanced');
    expect(screen.getAllByTestId('ksa-list')[0].textContent).toContain('Critical Thinking');
  });

  it('shows success toast if showSuccessMessage is true', () => {
    render(
      <ReviewStep
        planName="Plan"
        timeframe="Schedule"
        goals={goals}
        competencyGoals={competencyGoals}
        showSuccessMessage={true}
      />
    );
    expect(screen.getByTestId('success-toast')).toBeInTheDocument();
    expect(screen.getByText('Learning Plan Created Successfully!')).toBeInTheDocument();
  });

  it('renders empty if no competencies/goals are present', () => {
    render(
      <ReviewStep
        planName=""
        timeframe=""
        goals={[]}
        competencyGoals={{}}
      />
    );
    expect(screen.getByText('Learning Plan')).toBeInTheDocument();
    expect(screen.getByText('No timeframe set')).toBeInTheDocument();

    // No goal cards should appear
    expect(screen.queryByTestId('development-goal')).toBeNull();
  });

  it('handles competencyGoals not present for a selected competency', () => {
    // Remove 'Leadership' from competencyGoals to test fallback
    const partialCompetencyGoals = {
      'Critical Thinking': competencyGoals['Critical Thinking']
    };
    render(
      <ReviewStep
        planName="Test Plan"
        timeframe="1 month"
        goals={goals}
        competencyGoals={partialCompetencyGoals}
      />
    );

    // Only one goal should be present
    expect(screen.getAllByTestId('development-goal').length).toBe(1);
  });

  it('ignores goals with no competency property', () => {
    const goals = [{ id: 1, priority: 'High' }];
    const competencyGoals = {};
    render(
      <ReviewStep
        planName="No Competency"
        timeframe="Never"
        goals={goals}
        competencyGoals={competencyGoals}
      />
    );

    // Should NOT render a DevelopmentGoal
    expect(screen.queryByTestId('development-goal')).toBeNull();
  });

  it('handles undefined ksa, goal or timeline fields gracefully', () => {
    const goals = [{ id: 1, competency: 'Critical Thinking', priority: 'High' }];
    const competencyGoals = {
      'Critical Thinking': [{
        // all optional fields missing
      }]
    };
    render(
      <ReviewStep
        planName="Undefined Fields"
        timeframe="Later"
        goals={goals}
        competencyGoals={competencyGoals}
      />
    );

    // Should render fallback text for missing goal and timeline
    expect(screen.getByText('Critical Thinking')).toBeInTheDocument();
    expect(screen.getByText('No goal defined')).toBeInTheDocument();
    expect(screen.getByText('No timeline')).toBeInTheDocument();
  });

  it('handles a goal where competencyGoals is missing for that competency', () => {
    const goals = [{ id: 1, competency: 'Brand New', priority: 'Mid' }];
    const competencyGoals = {}; // No entry for "Brand New"
    render(
      <ReviewStep
        planName="Empty Plan"
        timeframe="Anytime"
        goals={goals}
        competencyGoals={competencyGoals}
      />
    );

    // Should not blow up nor render a goal card for missing data
    expect(screen.queryByTestId('development-goal')).toBeNull();
  });

  it('handles resources and obstacles missing or empty gracefully', () => {
    const goals = [{ id: 1, competency: 'Leadership', priority: 'Low' }];
    const competencyGoals = {
      'Leadership': [{
        goal: '',
        timeline: '',

        // no resources, no obstacles
      }]
    };
    render(
      <ReviewStep
        planName="Resource Plan"
        timeframe="Never"
        goals={goals}
        competencyGoals={competencyGoals}
      />
    );
    expect(screen.getByText('Leadership')).toBeInTheDocument();
  });

  it('filters out KSAs with a falsy type', () => {
    const goals = [{ id: 2, competency: 'Critical Thinking', priority: 'High' }];
    const competencyGoals = {
      'Critical Thinking': [{
        goal: '',
        timeline: '',
        resources: [],
        obstacles: [],
        ksas: [
          { type: '', currentLevel: 'Whatever', targetLevel: 'Whatever' },
          { type: null, currentLevel: 'X', targetLevel: 'Y' }
        ] // should all be filtered
      }]
    };
    render(
      <ReviewStep
        planName="Plan"
        timeframe="Eventual"
        goals={goals}
        competencyGoals={competencyGoals}
      />
    );
    
    // There will be a goal card, but no KSA list rendered
    expect(screen.getByTestId('development-goal')).not.toHaveTextContent('Whatever');
    expect(screen.getByTestId('development-goal')).not.toHaveTextContent('X');
  });

  it('uses default KSA current/target levels when missing', () => {
    const goals = [{ id: 1, competency: 'Critical Thinking', priority: 'High' }];
    const competencyGoals = {
      'Critical Thinking': [{
        goal: '',
        timeline: '',
        resources: [],
        obstacles: [],
        ksas: [{ type: 'Critical Thinking' }] // missing currentLevel/targetLevel
      }]
    };
    render(
      <ReviewStep
        planName="Plan"
        timeframe="Soon"
        goals={goals}
        competencyGoals={competencyGoals}
      />
    );

    // Should show fallback values
    expect(screen.getByTestId('development-goal')).toHaveTextContent('Basic');
    expect(screen.getByTestId('development-goal')).toHaveTextContent('Intermediate');
  });

  it('falls back to empty KSA description when type is unknown', () => {
    const goals = [{ id: 4, competency: 'UndefinedSkill', priority: 'High' }];
    const competencyGoals = {
      'UndefinedSkill': [{
        goal: 'Become expert in mystery',
        timeline: 'Forever',
        resources: [],
        obstacles: [],
        ksas: [{ type: 'Nonexistent', currentLevel: '', targetLevel: '' }]
      }]
    };
    render(
      <ReviewStep
        planName="Mystery Plan"
        timeframe="Long"
        goals={goals}
        competencyGoals={competencyGoals}
      />
    );
    
    // The KSA description should be the empty string
    expect(screen.getByTestId('development-goal')).toHaveTextContent('Nonexistent');
  });
});