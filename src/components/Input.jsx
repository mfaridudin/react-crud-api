export const Input = ({
    value,
    onChange,
    className = "",
    ...props
}) => {
    return (
        <input
            value={value}
            onChange={onChange}
            className={`border px-3 py-2 rounded ${className}`}
            {...props}
        />
    )
}
