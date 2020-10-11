import React from 'react'
import styles from './index.module.scss'

const Button = ({
    children,
    secondary,
    icon,
    white,
    onClick,
    style,
    className,
}) => {
    return (
        <button
            className={`${styles.button} ${className}`}
            data-secondary={secondary}
            data-white={white}
            data-icon={icon}
            style={style}
            onClick={onClick}>
                {icon ? (
                    <img 
                        src={`/icons/${icon}.svg`}
                        alt={`${icon} icon`}/>
                ) : children}
        </button>
    )
}

export default Button