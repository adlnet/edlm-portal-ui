'use strict';

import { Label, Select, TextInput } from 'flowbite-react';
import { timeframeOptions } from '@/utils/dropdownMenuConstants';

export function NamePlanStep({ planName, setPlanName, timeframe, setTimeframe }) {

    return (
        <>
            <div>
                <h2 className="text-lg font-semibold pb-8">Name Your Plan</h2>
                <p className="text-sm text-gray-500 pb-8">
                    What would you like to call your learning plan? And when do you want to finish it?
                </p>
                <p>
                    * = required
                </p>
            </div>
            <div className="mt-2 grid gap-6 md:grid-cols-2 pt-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="planName" value="Plan Name *" />
                    <TextInput
                        id="planName"
                        placeholder="e.g., My 2025 Development Plan"
                        value={planName}
                        onChange={e => setPlanName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="timeframe" value="Completion Timeframe *" />
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
        </>
    )
}
