'use strict'

import { useFormContext } from 'react-hook-form';

export default function ApplicationTrackingBar() {

    const { watch } = useFormContext();

    const policy = watch('policy');

    return (
        <div className="flex flex-row gap-3 text-gray-cool-700 text-sm mt-4">
            <div className="bg-gray-50 px-3 py-1 rounded-md">DD Form 2950-1</div>
            <div className="bg-gray-50 px-3 py-1 rounded-md">FEB 2025</div>
            <div className="bg-gray-50 px-3 py-1 rounded-md">Updated 02/05/2025</div>
            <div className="bg-gray-50 px-3 py-1 rounded-md">Prescribed by {policy}</div>
        </div>
    )
}