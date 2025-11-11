// import { QueryClient, QueryClientProvider } from 'react-query';
// import { fireEvent, render as rtlRender, screen, waitFor } from '@testing-library/react';
// import { useRouter } from 'next/router';
// import EditPlan from '@/pages/edlm-portal/learner/learningPlan/edit/[planId]';
// import React from 'react';

// import * as useDeleteLearningPlanHook from '@/hooks/learningPlan/useDeleteLearningPlan';
// import * as useLearningPlanFormHook from '@/hooks/learningPlan/useLearningPlanForm';
// import * as useLearningPlanHook from '@/hooks/learningPlan/useLearningPlan';
// import * as useUpdateBulkLearningPlanHook from '@/hooks/learningPlan/useUpdateBulkLearningPlan';

// function render(ui) {
//   const queryClient = new QueryClient();
//   return rtlRender(
//     <QueryClientProvider client={queryClient}>
//       {ui}
//     </QueryClientProvider>
//   );
// }

// // Mocks (with displayName for each)
// const DefaultLayoutMock = ({ children }) => <div>{children}</div>;
// DefaultLayoutMock.displayName = 'DefaultLayout';

// const NextImageMock = (props) => <img alt='' {...props} />;
// NextImageMock.displayName = 'NextImage';

// const XMarkMessageToastMock = (props) => <div>{props.message}</div>;
// XMarkMessageToastMock.displayName = 'XMarkMessageToast';

// const ChooseSkillsStepMock = () => <div>ChooseSkillsStep</div>;
// ChooseSkillsStepMock.displayName = 'ChooseSkillsStep';

// const CustomDropdownMock = (props) => (
//   <select data-testid="custom-dropdown" value={props.value} onChange={props.onChange}>
//     {props.options.map((option, idx) => (
//       <option key={idx} value={option.value}>{option.label}</option>
//     ))}
//   </select>
// );
// CustomDropdownMock.displayName = 'CustomDropdown';

// const SetGoalsStepMock = () => <div>SetGoalsStep</div>;
// SetGoalsStepMock.displayName = 'SetGoalsStep';

// const DeletePlanModalMock = (props) => (
//   props.open ? (
//     <div>
//       <button onClick={props.onDelete} data-testid="confirm-delete">Confirm Delete</button>
//       <button onClick={props.onClose} data-testid="close-delete">Close</button>
//     </div>
//   ) : null
// );
// DeletePlanModalMock.displayName = 'DeletePlanModal';

// // Apply the named mocks
// jest.mock('@/components/layouts/DefaultLayout', () => DefaultLayoutMock);
// jest.mock('next/image', () => NextImageMock);
// jest.mock('@/components/cards/XMarkMessageToast', () => XMarkMessageToastMock);
// jest.mock('@/components/steps/ChooseSkillsStep', () => ChooseSkillsStepMock);
// jest.mock('@/components/menus/CustomDropdown', () => CustomDropdownMock);
// jest.mock('@/components/steps/SetGoalsStep', () => SetGoalsStepMock);
// jest.mock('@/components/modals/DeletePlanModal', () => DeletePlanModalMock);

// // Mock router
// jest.mock('next/router', () => ({
//   useRouter: jest.fn(),
// }));

// // Mock hooks
// jest.mock('@/hooks/learningPlan/useLearningPlan');
// jest.mock('@/hooks/learningPlan/useUpdateBulkLearningPlan');
// jest.mock('@/hooks/learningPlan/useDeleteLearningPlan');
// jest.mock('@/hooks/learningPlan/useLearningPlanForm');
// jest.mock('@/hooks/learningPlan/useLearningPlanValidation', () => ({
//   useLearningPlanValidation: () => ({ getTimelineOptions: jest.fn() }),
// }));

// describe('EditPlan Page', () => {
//   const planMock = {
//     id: 'plan-123',
//     name: 'Test Plan',
//     timeframe: '2024-Q4',
//     competencies: [
//       {
//         id: 'comp-1',
//         plan_competency_name: 'Competency 1',
//         eccr_competency: 'ec-1',
//         priority: 1,
//         goals: [
//           {
//             id: 'goal-1',
//             goal_name: 'Goal 1',
//             timeline: '1 Months',
//             resources_support: ['Resource 1'],
//             obstacles: ['Obstacle 1'],
//             resources_support_other: '',
//             obstacles_other: '',
//             ksas: [
//               {
//                 id: 'ksa-1',
//                 ksa_name: 'KSA 1',
//                 eccr_ksa: 'e-ksa-1',
//                 current_proficiency: 1,
//                 target_proficiency: 2
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   };

//   const pushMock = jest.fn();
//   const backMock = jest.fn();
//   beforeEach(() => {
//     useRouter.mockReturnValue({
//       query: { planId: 'plan-123' },
//       push: pushMock,
//       back: backMock,
//       isReady: true,
//     });

//     useLearningPlanHook.useLearningPlan.mockReturnValue({
//       data: planMock,
//       isLoading: false,
//       error: undefined,
//     });

//     useUpdateBulkLearningPlanHook.useUpdateBulkLearningPlan.mockReturnValue({
//       updateCompleteLearningPlan: jest.fn().mockResolvedValue(true),
//       isLoading: false,
//     });

//     useDeleteLearningPlanHook.useDeleteLearningPlan.mockReturnValue({
//       mutateAsync: jest.fn().mockResolvedValue(true),
//     });

//     useLearningPlanFormHook.useLearningPlanForm.mockReturnValue({
//       planName: 'Test Plan',
//       setPlanName: jest.fn(),
//       timeframe: '2024-Q4',
//       setTimeframe: jest.fn(),
//       goals: [
//         {
//           id: 'comp-1',
//           competency: 'Competency 1',
//           competencyId: 'ec-1',
//           priority: 1,
//           originalId: 'comp-1'
//         }
//       ],
//       setGoals: jest.fn(),
//       competencyGoals: {
//         'Competency 1': [
//           {
//             id: 'goal-1',
//             goal: 'Goal 1',
//             timeline: '1 Months',
//             resources: ['Resource 1'],
//             obstacles: ['Obstacle 1'],
//             resourcesOther: '',
//             obstaclesOther: '',
//             originalId: 'goal-1',
//             ksas: [
//               {
//                 id: 'ksa-1',
//                 type: 'KSA 1',
//                 ksaId: 'e-ksa-1',
//                 currentLevel: 1,
//                 targetLevel: 2,
//                 originalId: 'ksa-1'
//               }
//             ]
//           }
//         ]
//       },
//       setCompetencyGoals: jest.fn(),
//       addGoalToCompetency: jest.fn(),
//       removeGoalFromCompetency: jest.fn(),
//       updateCompetencyGoal: jest.fn(),
//       addKSAToGoal: jest.fn(),
//       removeKSAFromGoal: jest.fn(),
//       updateKSAForGoal: jest.fn(),
//       addGoal: jest.fn(),
//       removeGoal: jest.fn(),
//       updateGoal: jest.fn(),
//       onCompetencyChange: jest.fn(),
//     });
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders loading state when plan is still loading', () => {
//     useLearningPlanHook.useLearningPlan.mockReturnValue({
//       data: null, isLoading: true, error: undefined,
//     });

//     render(<EditPlan />);
//     expect(screen.getByText(/loading/i)).toBeInTheDocument();
//   });

//   it('shows "No Learning Plans" when plan is not found', () => {
//     useLearningPlanHook.useLearningPlan.mockReturnValue({
//       data: null, isLoading: false, error: undefined,
//     });

//     render(<EditPlan />);
//     expect(screen.getByText(/no learning plans/i)).toBeInTheDocument();
//   });

//   it('renders Edit Plan form with plan name and timeframe', () => {
//     render(<EditPlan />);
//     expect(screen.getByText(/Edit Plan/i)).toBeInTheDocument();
//     expect(screen.getByDisplayValue('Test Plan')).toBeVisible();
//     expect(screen.getByTestId('custom-dropdown')).toBeVisible();
//   });

//   it('can open and close DeletePlan modal', () => {
//     render(<EditPlan />);

//     // Open modal
//     fireEvent.click(screen.getByText(/delete/i));

//     // Modal should be open, confirm and close buttons should be visible
//     expect(screen.getByTestId('confirm-delete')).toBeInTheDocument();
//     fireEvent.click(screen.getByTestId('close-delete'));

//     // Close, so modal content should not be found
//     expect(screen.queryByTestId('confirm-delete')).not.toBeInTheDocument();
//   });

//   it('calls deletePlan and navigates after confirm', async () => {
//     render(<EditPlan />);
//     fireEvent.click(screen.getByText(/delete/i));
//     fireEvent.click(screen.getByTestId('confirm-delete'));
//     await waitFor(() => {
//       expect(pushMock).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/');
//     });
//   });

//   it('can change plan name', () => {
//     const setPlanName = jest.fn();
//     useLearningPlanFormHook.useLearningPlanForm.mockReturnValue({
//       ...useLearningPlanFormHook.useLearningPlanForm(),
//       setPlanName,
//     });

//     render(<EditPlan />);
//     const input = screen.getByPlaceholderText(/create a name/i);
//     fireEvent.change(input, { target: { value: 'My New Plan' } });
//     expect(setPlanName).toHaveBeenCalledWith('My New Plan');
//   });

//   it('can save and route to plan view', async () => {
//     render(<EditPlan />);
//     const saveBtn = screen.getByText(/save & continue/i);
//     fireEvent.click(saveBtn);

//     await waitFor(() =>
//       expect(pushMock).toHaveBeenCalledWith('/edlm-portal/learner/learningPlan/plan-123')
//     );
//   });

//   it('shows ChooseSkillsStep when Add Competency clicked', () => {
//     render(<EditPlan />);
//     const addBtn = screen.getByText(/add another competency/i);
//     fireEvent.click(addBtn);
//     expect(screen.getByText('ChooseSkillsStep')).toBeInTheDocument();
//   });

//   // More tests can be added for error state, goal manipulation, and competency management
// });