import React from 'react'
import styles from './index.module.scss'

const Input = ({
    type,
    className,
    value,
    placeholder,
    onChange,
    onKeyUp,
    none
}) => {
    return (
        <input
            type={type}
            value={value}
            placeholder={placeholder}
            className={`${styles.input} ${className}`}
            onChange={onChange}
            onKeyUp={onKeyUp}
            data-none={none}/>
    )
}

export default Input