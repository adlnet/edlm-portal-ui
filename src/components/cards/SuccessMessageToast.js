import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

export default function SuccessMessageToast({ title = "Your plan has been created", description = ""}) {
    return (
        <div className="w-full mb-4">
            <Toast className="w-full flex items-start" style={{ width: '100%', maxWidth: 'none', backgroundColor: '#E5F2F1' }}>
                <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white mt-1" style={{ backgroundColor: '#146E66' }}>
                    <HiCheck className="h-3 w-3" />
                </div>
                <div className="ml-3 flex-1">
                    <div className="text-[#146E66] text-lg font-semibold leading-relaxed mb-1">
                        {title}
                    </div>
                    {description && (
                        <div className="text-[#146E66] text-base font-normal leading-snug">
                            {description}
                        </div>
                    )}
                </div>
                <Toast.Toggle 
                    style={{ 
                        color: '#17988E', 
                        backgroundColor: '#E5F2F1'
                    }}
                />
            </Toast>
        </div>
    );
}
