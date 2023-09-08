import { CloseIcon } from "@/icons/CloseIcon";

interface AlertProps {
    message: string | null;
    type: 'error' | 'success';
    close: () => void;
}

export const Alert = ({message, type, close}: AlertProps) => {
    const textColor = type === 'error' ? 'text-red-700' : 'text-green-500';
    const borderColor = type === 'error' ? 'border-red-400' : 'border-green-400';
    const bgColor = type === 'error' ? 'bg-red-100' : 'bg-green-100';
    
    return message ? (
        <div className={`flex flex-row items-center justify-center w-full mb-5 ${bgColor} border ${borderColor} ${textColor} px-4 py-3 rounded relative`} role={type}>
            <p className={`${textColor} flex flex-grow content-center align-middle justify-center`}>
                {message}
            </p>
            <button type="button" onClick={close} className={`cursor-pointer ml-2 ${textColor} w-5 h-5`}>
                <CloseIcon className="w-5 h-5 " />
            </button>
        </div>
    ) : null
}