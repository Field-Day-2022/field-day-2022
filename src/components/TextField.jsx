import { SearchIcon } from "../assets/icons";
import classNames from "classnames";

export default function TextField({
    label,
    value,
    onChange,
    placeholder,
    maxLength,
    type = "text",
}) {

    const containerClass = classNames(
        "relative min-w-max",
    );

    const iconClass = classNames(
        "absolute inset-y-0 left-0 pl-3 flex items-center",
        "pointer-events-none",
        "text-neutral-400 text-xl",
        {
            'pt-9': label,
            'pt-0': !label,
        }
    );

    const inputClass = classNames(
        "bg-white accent-asu-maroon",
        "focus:outline-none focus:shadow-outline",
        "border border-neutral-300 rounded-lg py-2",
        {
            "pl-10": type === "search",
            "pl-4": type !== "search",
        },
        "pr-4 w-full appearance-none leading-normal"
    );

    const labelClass = classNames(
        "text-sm w-full text-left p-2",
    );

    return (
        <div className={containerClass}>
                {label && (<div className={labelClass}>{`${label}:`}</div>)}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className={inputClass}
                />
                {type === "search" && (
                    <div className={iconClass}>
                        <SearchIcon />
                    </div>
                )}
        </div>
    );
}
