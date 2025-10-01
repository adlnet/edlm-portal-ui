'use strict';

import Image from 'next/image';
import { Tooltip } from 'flowbite-react';
import InfoIcon from '@/public/icons/infoIcon.svg';

export function InfoTooltip({ title, content, iconClassName = 'w-3 h-3' }) {
    const tooltipContent = (
        <div className="w-60 bg-gray-900 rounded-lg shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] outline outline-1 outline-gray-600 inline-flex justify-start items-start">
            <div className="w-0 self-stretch inline-flex flex-col justify-center items-end">
                <div className="w-0 h-3 relative">
                    <div className="w-2 h-5 left-[-9px] top-[-4px] absolute">
                        <div className="w-2 h-4 left-[1px] top-[2px] absolute bg-gray-900 rounded-[1px]" />
                        <div className="w-2 h-5 left-0 top-0 absolute bg-gray-700" />
                    </div>
                </div>
            </div>
            <div className="flex-1 px-4 py-3 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-white text-base font-medium leading-snug">
                    {title}
                </div>
                <div className="self-stretch justify-start text-white text-sm font-normal leading-tight">
                    {content}
                </div>
            </div>
        </div>
    );

    return (
        <Tooltip 
            content={tooltipContent}
            style="light"
            placement="top"
            className="p-0 border-0 bg-transparent shadow-none"
        >
            <Image 
                src={InfoIcon} 
                alt="Info" 
                className={`cursor-pointer text-gray-500 hover:text-gray-700 ${iconClassName}`}
            />
        </Tooltip>
    );
}
