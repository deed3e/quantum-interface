import React from 'react'
import styled from 'styled-components'

interface PrimaryButtonProps {
    img?: string
    height?: string
    width?: string
    name: string
    onClick?: any
    disabled?: boolean
    type?: string
    color?: string
    isLoading?: boolean
    size?: string
}

const PrimaryButton = ({
    img,
    height,
    width,
    name,
    onClick,
    disabled,
    type,
    color,
    isLoading,
    size,
}: PrimaryButtonProps) => {
    return (
        <Button
            height={height}
            width={width}
            onClick={() => onClick()}
            disabled={disabled}
            className={type}
            color={color}
            isLoading={isLoading}
            size={size}
        >
            {img && <img src={img} alt="button image" />} <span>{name}</span>
        </Button>
    )
}

export default PrimaryButton

export const Button = styled.button<{
    height?: any
    width?: any
    color?: any
    disabled?: boolean
    isLoading?: boolean
    size?: string
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ width }) => (width ? width : '100%')};
    border-radius: 3px;
    border: none;
    outline: none;
    background: ${({ color }) => (color ? color : 'var(--btn1)')};
    cursor: ${({ disabled }) =>
        disabled ? 'not-allowed !important' : 'pointer'};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    color: var(--text3);

    border-radius: 30px;
    font-family: 'Orbitron', sans-serif;
    font-size: 20px;
    font-weight: 700;
    line-height: 129.7%;
    padding: 8px 0px;
    span {
        font-weight: 400;
    }

    :hover {
        opacity: 0.8;
    }

    @media (max-width: 576px) {
        font-size: 12px;
        height: 30px;
    }

    ${({ isLoading }) =>
        isLoading &&
        `
        :after {
            content: '.';
            animation: loading linear 3s infinite;
            @keyframes loading {
                0% {
                    content: '.';
                }
                50% {
                    content: '..';
                }
                100% {
                    content: '...';
                }
            }
        }
    `}
`
