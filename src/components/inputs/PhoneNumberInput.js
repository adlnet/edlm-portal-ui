'use strict'

export default function PhoneNumberInput({ 
    value,
    onChange,
    placeholder = "",
    disabled = false,
    showError = false,
    errorMessage = "",
}){

    const inputStyle = () => {
        if (showError) {
            return `text-sm border rounded-lg px-3 py-2.5 mt-1 bg-red-50 border-dark-red focus:outline-none focus:ring-2 focus:ring-dark-red ${value ? 'text-dark-red' : 'placeholder-dark-red'} `;
        }
        return `text-sm border rounded-lg px-3 py-2.5 mt-1 bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-700 ${value ? 'text-gray-900' : ''}`;
    }

    const handlePhoneInput = (e) => {
        const formatted = formatPhoneNumber(e.target.value);
        onChange(formatted);
    };

    const formatPhoneNumber = (value) => {
        // Remove all non-digit characters
        const digits = value.replace(/\D/g, "").slice(0, 10);

        // Add dashes after 3 and 6 digits
        let formatted = "";
        if (digits.length > 0) formatted = digits.slice(0, 3);
        if (digits.length >= 4) formatted += "-" + digits.slice(3, 6);
        if (digits.length >= 7) formatted += "-" + digits.slice(6, 10);

        return formatted;
    }

    return (
        <>
            <input
                className={`${inputStyle()} ${disabled ? 'opacity-50' : ''}`}
                value={value}
                onChange={handlePhoneInput}
                placeholder={placeholder}
                disabled={disabled}
                maxLength={12}
            />
        </>
    );
}