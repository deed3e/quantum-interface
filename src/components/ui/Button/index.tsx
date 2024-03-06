import React from 'react'
import styled from 'styled-components'
type ButtonProps = {
    children?: React.ReactNode | JSX.Element
    fluid?: boolean
    className?: any
    style?: any
    id?: string
    onClick?: any
}
const Button = ({
    children,
    fluid,
    className: classStyles,
    id,
    style,
    onClick,
}: ButtonProps) => {
    return (
        <Btn
            id={id || classStyles}
            style={style}
            className={`button ${classStyles} ${fluid && 'btn_fluid'}`}
            onClick={() => onClick()}
        >
            {children}
        </Btn>
    )
}

export default Button

const Btn = styled.button`
    background: var(--bg-2);
    color: #ffffff;
    outline: none;
    box-sizing: border-box;
    border: none;
    &.btn_fluid {
        width: 100%;
    }
`
