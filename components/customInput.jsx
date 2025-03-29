import React from 'react'
import { Input } from './ui/input'

const CustomInput = (props) => {
    const { type,
        value,
        defaultValue,
        placeholder,
        name,
        disabled,
        readOnly,
        autoFocus,
        required,
        onChange,
        onBlur,
        onFocus,
        onKeyDown,
        onKeyUp,
        min,
        max,
        step,
        icon,
        className
    } = props;
    return (
        <div className={`relative flex items-center ${className}`}>
            {icon && <span className="absolute left-3">{icon}</span>}
            <Input
                {...props}
                className={`w-full p-2 rounded-md border 
                    ${icon ? 'pl-10' : ''}`}
            />
        </div>
    )
}

export default CustomInput