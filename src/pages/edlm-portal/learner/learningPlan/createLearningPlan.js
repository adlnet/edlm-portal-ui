'use strict';

import {  Badge, Button, Card, Label, Select, TextInput, Textarea } from 'flowbite-react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DefaultLayout from '@/components/layouts/DefaultLayout';

// Mock Recs data per competency
const MOCK_RECS = {
    'Leadership': [
        { id: 1, title: 'Advanced Leadership Strategies', duration: '40 hours', provider: 'DOT&E Academy' },
        { id: 2, title: 'Strategic Leadership Development', duration: '32 hours', provider: 'Defense University' },
        { id: 3, title: 'Team Building and Management', duration: '24 hours', provider: 'DOT&E Academy' },
    ],
    'Software': [
        { id: 11, title: 'Machine Learning Fundamentals', duration: '60 hours', provider: 'Defense University' },
        { id: 12, title: 'Software Development Lifecycle', duration: '20 hours', provider: 'Tech Institute' },
    ],
    'AI': [
        { id: 21, title: 'Intro to ML', duration: '60 hours', provider: 'Tech Institute' },
        { id: 22, title: 'Knowledge-Based Artificial Intelligence', duration: '60 hours', provider: 'Tech Institute' },
    ],
    'Operating Environment and System Design': [
        { id: 31, title: 'OS system design', duration: '40 hours', provider: 'Defense University' },
    ],
    'Acquisition and Requirements Process': [
        { id: 41, title: 'Acquisition Process Fundamentals', duration: '12 hours', provider: 'DOT&E Academy' },
    ],
    'Policy Development and Implementation': [
        { id: 51, title: 'Policy Analysis and Development', duration: '36 hours', provider: 'Defense University' },
    ],
};

// Dropdown options
const competencyOptions = Object.keys(MOCK_RECS);
const timeframeOptions = ['Short-term (1–2 years)', 'Long-term (3–4 years)'];
const proficiencyLevels = ['Basic', 'Intermediate', 'Advanced', 'Mastery'];
const priorityOptions = ['Highest', 'High', 'Medium', 'Low', 'Lowest'];

export default function CreateLearningPlanPage() {
    const router = useRouter();
    const previousPage = router.query.previousPage;

    const [planName, setPlanName] = useState('');
    const [timeframe, setTimeframe] = useState('');
    const [goals, setGoals] = useState([
        {
            id: crypto.randomUUID(),
            competency: '',
            current: 'Basic',
            target: 'Intermediate',
            priority: '',
            description: '',
            selectedCourses: [],
            recs: [],
        },
    ]);

    const isSaveDisabled = !planName || !timeframe;

    const addGoal = () =>
        setGoals((goals) => [
            ...goals,
            {
                id: crypto.randomUUID(),
                competency: '',
                current: 'Basic',
                target: 'Intermediate',
                priority: '',
                description: '',
                selectedCourses: [],
                recs: [],
            },
        ]);

    const removeGoal = id => {
        setGoals(goals => goals.filter((goal) => goal.id !== id));
    };

    // If this is the goal we want to update, merge the updates with existing goal data
    // If not the goal, return it unchanged
    const setGoalState = (id, updates) => {
        setGoals((goals) => goals.map((goal) => (goal.id === id ? { ...goal, ...updates } : goal)));
    };

    const updateGoal = (id, key, value) => {
        const objectUpdate = { [key]: value };
        setGoalState(id, objectUpdate);
    };

    // Load recommendations based on new competency selected
    const onCompetencyChange = (goalId, newCompetency) => {
        const recs = newCompetency ? (MOCK_RECS[newCompetency] || []) : [];

        // reset previous selections when changing competency
        setGoalState(goalId, {
            competency: newCompetency,
            recs,
            selectedCourses: [],
        });
    };


    const addCourseToGoal = (goalId, course) => {
        setGoals((goals) =>
            goals.map((goal) => {
                if (goal.id !== goalId) return goal;
                const exists = goal.selectedCourses.some(selectedCourse => selectedCourse.id === course.id);

                // If course already exist dont add again
                if (exists) return goal;
                return {
                    ...goal,
                    selectedCourses: [...goal.selectedCourses, course]
                };
            }),
        );
    };

    const removeCourseFromGoal = (goalId, courseId) => {
        setGoals((goals) =>
            goals.map((goal) => {
                // If goal is not the one to update, return it unchanged
                if (goal.id !== goalId) return goal;
                return { ...goal, selectedCourses: goal.selectedCourses.filter(selectedCourse => selectedCourse.id !== courseId) };
            }),
        );
    };

    // Aggregate all selected courses across all goals for Learning Plan Summary table
    const selectedPlanCourses = [];
    for (const goal of goals) {
        for (const course of goal.selectedCourses) {
            selectedPlanCourses.push({
                ...course,
                competency: goal.competency || '—',
                priority: goal.priority || '—',
            });
        }
    }

    const handleSave = () => {
        const payload = { planName, timeframe, goals };
        console.log('Learning Plan payload:', payload);
    };

    return (
        <DefaultLayout>
            <div className="bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip">
                <div className="mt-10 pb-4 py-4">
                    <h1 className="text-2xl font-bold mt-4">Create Your Learning Plan</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Build your personalized learning plan based on identified skill gaps and career goals.
                    </p>
                    {/* Plan Details Section */}
                    <Card className="mt-4 border">
                        <div>
                            <h2 className="text-lg font-semibold">Plan Details</h2>
                            <p className="text-sm text-gray-500">
                                Set up the basic information for your Individual Development Plan
                            </p>
                        </div>
                        <div className="mt-2 grid gap-6 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="planName" value="Plan Name" />
                                <TextInput
                                    id="planName"
                                    placeholder="e.g., My 2025 Development Plan"
                                    value={planName}
                                    onChange={e => setPlanName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="timeframe" value="Completion Timeframe" />
                                <Select
                                    id="timeframe"
                                    value={timeframe}
                                    onChange={e => setTimeframe(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select timeframe
                                    </option>
                                    {timeframeOptions.map(t => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </Card>
                    {/* Learning Goals Section */}
                    <Card className="mt-6 border">
                        <h2 className="text-lg font-semibold -mb-4">Learning Goals</h2>
                        <p className="text-sm text-gray-500">
                            Configure your development goals based on identified competency gaps or add your own
                        </p>
                        {goals.map(goal => {
                            // Check if a course is already added to this goal
                            const isAdded = (courseId) => goal.selectedCourses.some(c => c.id === courseId);

                            return (
                                <div key={goal.id} className="rounded-lg border p-4 bg-green-50/40 mb-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="flex flex-col gap-2">
                                            <Label value="Competency" />
                                            <Select
                                                value={goal.competency}
                                                onChange={(e) => onCompetencyChange(goal.id, e.target.value)}
                                            >
                                                <option value="" disabled>
                                                    Select competency
                                                </option>
                                                {competencyOptions.map((c) => (
                                                    <option
                                                        key={c}
                                                        value={c}
                                                    >
                                                        {c}
                                                    </option>
                                                ))}
                                            </Select>
                                        </div>
                                        {/* Remove Goal Button */}
                                        <div className="flex flex-col gap-2 justify-end">
                                            <div className="flex">
                                                <Button
                                                    color="light"
                                                    size="sm"
                                                    onClick={() => removeGoal(goal.id)}
                                                    className="text-red-600"
                                                >
                                                    Remove Goal
                                                </Button>
                                            </div>
                                        </div>
                                        {/* Current Proficiency */}
                                        <div className="flex flex-col gap-2">
                                            <Label value="Current Proficiency Level" />
                                            <Select value={goal.current} onChange={(e) => updateGoal(goal.id, 'current', e.target.value)}>
                                                {proficiencyLevels.map((p) => (
                                                    <option key={p} value={p}>
                                                        {p}
                                                    </option>
                                                ))}
                                            </Select>
                                        </div>
                                        {/* Target Proficiency */}
                                        <div className="flex flex-col gap-2">
                                            <Label value="Target Proficiency Level" />
                                            <Select value={goal.target} onChange={(e) => updateGoal(goal.id, 'target', e.target.value)}>
                                                {proficiencyLevels.map((p) => (
                                                    <option key={p} value={p}>
                                                        {p}
                                                    </option>
                                                ))}
                                            </Select>
                                        </div>
                                        {/* Priority */}
                                        <div className="flex flex-col gap-2">
                                            <Label value="Priority Level" />
                                            <Select value={goal.priority} onChange={(e) => updateGoal(goal.id, 'priority', e.target.value)}>
                                                <option value="" disabled>
                                                    Select priority
                                                </option>
                                                {priorityOptions.map((p) => (
                                                    <option key={p} value={p}>
                                                        {p}
                                                    </option>
                                                ))}
                                            </Select>
                                        </div>
                                        {/* Description section */}
                                        <div className="flex flex-col gap-2">
                                            <Label value="Goal Description" />
                                            <Textarea
                                                rows={3}
                                                placeholder="Describe your specific goals for this competency..."
                                                value={goal.description}
                                                onChange={(e) => updateGoal(goal.id, 'description', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* Recommended Learning Activities for the goal (only when competency picked) */}
                                    {goal.competency && (
                                        <div className="mt-4">
                                            <h3 className="font-medium mb-2">Recommended Learning Activities</h3>
                                            {goal.recs.length === 0 ? (
                                                <div className="text-sm text-gray-500 py-3">
                                                    No recommendations for “{goal.competency}”.
                                                </div>
                                            ) : (
                                                <div className="divide-y">
                                                    {goal.recs.map((course) => (
                                                        <div key={course.id} className="flex justify-between items-start py-3 text-sm hover:bg-gray-100">
                                                            <div>
                                                                <p className="text-blue-600 font-medium cursor-pointer">
                                                                    {course.title}{' '}
                                                                    <span className="text-gray-500 font-normal"> {course.duration}</span>
                                                                </p>
                                                                <p className="text-gray-500">{course.provider}</p>
                                                            </div>

                                                            {/* Add to Plan OR Added based on if it's already added */}
                                                            {!isAdded(course.id) ? (
                                                                <div className="pt-1">
                                                                    <Button
                                                                        size="xs"
                                                                        onClick={() => addCourseToGoal(goal.id, course)}
                                                                        className="border border-grey-600 text-grey-500 bg-white hover:bg-gray-100"
                                                                        >
                                                                        Add to Plan
                                                                    </Button>
                                                                </div>
                                                            ) : (
                                                                <div className="pt-1">
                                                                    <Button size="xs" disabled className="text-gray-500 bg-gray-100">
                                                                        Added
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {/* Selected for this goal section */}
                                    {goal.selectedCourses.length > 0 && (
                                        <div className="mt-4 rounded-lg bg-green-100 text-green-900 p-3 text-sm">
                                            <div className="font-medium mb-2">
                                                Selected for this goal ({goal.selectedCourses.length}{' '}
                                                {goal.selectedCourses.length === 1 ? 'course' : 'courses'})
                                            </div>
                                            <ul className="space-y-2">
                                                {goal.selectedCourses.map((c) => (
                                                    <li
                                                        key={c.id}
                                                        className="flex items-center justify-between bg-white rounded-md px-3 py-2"
                                                    >
                                                        <span>{c.title}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeCourseFromGoal(goal.id, c.id)}
                                                            className="text-red-600 hover:underline text-sm"
                                                        >
                                                            Remove
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        <div className="flex justify-center">
                            <Button
                                color="light"
                                onClick={addGoal}
                                size="xs"
                                className="hover:bg-gray-100"
                            >
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Add Another Goal
                            </Button>
                        </div>
                    </Card>
                    {/* Learning Plan Summary Section */}
                    <Card className="mt-6 border">
                        <h2 className="text-lg font-semibold -mb-2">Learning Plan Summary</h2>
                        <p className="text-sm text-gray-500 mb-2">
                            Review all courses and activities included in your development plan.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm bg-gray-100 p-4 rounded-lg">
                            <div>
                                <span className="text-gray-500">Plan Name</span>
                                <div>{planName || 'Untitled Plan'}</div>
                            </div>
                            <div>
                                <span className="text-gray-500">Timeframe</span>
                                <div>
                                    {timeframe
                                        ? timeframe
                                        : 'Not selected'}
                                </div>
                            </div>
                            <div>
                                <span className="text-gray-500">Total Courses</span>
                                <div>{selectedPlanCourses.length}</div>
                            </div>
                        </div>
                        {/* Selected Courses Table (Only show if there are courses selected) */}
                        {selectedPlanCourses.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-2 py-2 text-left">Course Title</th>
                                            <th className="px-2 py-2">Duration</th>
                                            <th className="px-2 py-2">Provider</th>
                                            <th className="px-2 py-2">Supports Goal</th>
                                            <th className="px-2 py-2">Priority</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedPlanCourses.map((row, idx) => (
                                            <tr key={`${row.id}-${idx}`} className="border-t">
                                                <td className="px-2 py-2">{row.title}</td>
                                                <td className="px-2 py-2 text-center">{row.duration}</td>
                                                <td className="px-2 py-2 text-center">{row.provider}</td>
                                                <td className="px-2 py-2 text-center">{row.competency}</td>
                                                <td className="px-2 py-2 text-center">
                                                    {row.priority && row.priority !== '—' ? (
                                                        <Badge color={row.priority} className="capitalize">
                                                            {row.priority}
                                                        </Badge>
                                                    ) : (
                                                        '—'
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No courses added yet.</p>
                        )}
                    </Card>
                    <div className="flex justify-between items-center mt-6">
                        <Button color="light" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={isSaveDisabled}>
                            Save Learning Plan
                        </Button>
                    </div>

                    {isSaveDisabled && (
                        <div className="text-red-500 text-xs mt-2">
                            • Plan name required <br />• Timeframe required
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}
