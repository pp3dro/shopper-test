import { CloseIcon } from "@/icons/CloseIcon";

interface AlertProps {
    message: string | null;
    type: 'error' | 'success';
    close: () => void;
}

export const Alert = ({message, type, close}: AlertProps) => {
    const color = type === 'error' ? 'red' : 'green';
    return message ? (
        <div className={`flex flex-row items-center justify-center w-full mb-5 bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 rounded relative`} role={type}>
            <p className={`text-${color}-500 flex flex-grow content-center align-middle justify-center`}>
                <span>{message}</span>
            </p>
            <button type="button" onClick={close} className={`cursor-pointer ml-2 text-${color}-500 w-5 h-5`}>
                <CloseIcon className="w-5 h-5 " />
            </button>
        </div>
    ) : null
}