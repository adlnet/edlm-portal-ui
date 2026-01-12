'use strict'

import AsteriskIcon from '@/public/icons/asteriskIcon.svg';
import Image from 'next/image';

export default function TextInputCustom({ 
    label,
    required = false,
    value,
    onChange,
    placeholder = "",
    disabled = false,
}){
    return (
        <>
            <div className="flex flex-row gap-2 items-center">
                <p>{label}</p>
                {required && <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />}
            </div>
            <input
                type="text"
                className={`text-sm border bg-gray-50 border-gray-300 rounded-lg px-3 py-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-navy-700 ${disabled ? 'opacity-50' : ''} ${value ? 'text-gray-900': ''}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
            />
        </>
    );
}