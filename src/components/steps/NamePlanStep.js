'use strict';

import { Dropdown, Select, TextInput } from 'flowbite-react';
import { timeframeOptions } from '@/utils/dropdownMenuConstants';
import AsteriskIcon from '@/public/icons/asteriskIcon.svg';
import CustomDropdown from '@/components/menus/CustomDropdown';
import Image from 'next/image';

export function NamePlanStep({ planName, setPlanName, timeframe, setTimeframe }) {

    return (
        <>
            <div>
                <h2 className="text-2xl font-semibold pb-6">Name Your Plan</h2>
                <p className="text-sm text-[#2C2F35] pb-6">
                    What would you like to call your learning plan? And when do you want to finish it?
                </p>
                <span className="flex items-center gap-1 text-[#993033]">
                    <Image src={AsteriskIcon} alt="Asterisk" className="w-4 h-4" /> = Required
                </span>
            </div>
            <div className="mt-2 grid gap-6 md:grid-cols-2 pt-2">
                <div className="flex flex-col gap-2">
                    <span className="flex items-center gap-2 text-sm">
                        Plan Name <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
                    </span>
                    <TextInput
                        id="planName"
                        placeholder="Create a name for your learning plan"
                        value={planName}
                        onChange={e => setPlanName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="flex items-center gap-2 text-sm">
                        Completion Timeframe <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />
                    </span>
                    <CustomDropdown
                        value={timeframe}
                        onChange={e => setTimeframe(e.target.value)}
                        options={timeframeOptions}
                        placeholder="When do you aim to complete this plan?"
                    />
                </div>
            </div>
        </>
    )
}
