'use strict'

import AsteriskIcon from '@/public/icons/asteriskIcon.svg';
import Image from 'next/image';

export default function NumberInputCustom({ 
    label,
    required = false,
    value,
    onChange,
    placeholder = "",
    disabled = false,
}){

    const handleKeyDown = (e) => {
        // Allow: Backspace, Tab, Delete, arrows, Home, End, etc.
        if (
            ["Backspace", "Tab", "Delete", "ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
        ) {
            return;
        }
        
        // Block if not a digit
        if (!/^\d$/.test(e.key)) {
        e.preventDefault();
        }
    };

    return (
        <>
            <div className="flex flex-row gap-2 items-center">
                <p>{label}</p>
                {required && <Image src={AsteriskIcon} alt="Asterisk" className="w-3 h-3" />}
            </div>
            <input
                type="number"
                className={`text-sm border bg-gray-50 border-gray-300 rounded-lg px-3 py-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-navy-700 ${disabled ? 'opacity-50' : ''} ${value ? 'text-gray-900': ''}`}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
            />
        </>
    );
}