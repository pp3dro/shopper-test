import { on } from "events";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
}

export const Button = ({ children, className, disabled, onClick, ...props }: ButtonProps) => {
    return (
        <button
                className={`mt-4 text-white font-bold py-2 px-4 rounded ${disabled ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} ${className}`}
                type="button"
                onClick={onClick}
                >
                {children}
        </button>
    );
};
