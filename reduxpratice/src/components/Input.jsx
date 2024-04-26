export default function Input({ className, ...props }) {
    return (
        <input
            className={`block w-full px-4 py-2 ${className}`}
            {...props}
        />
    );
}