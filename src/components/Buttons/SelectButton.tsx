import React from 'react'
import styled from 'styled-components'
import { Token } from 'interfaces'
import LogoToken from 'components/LogoToken'
import ArrowDownDark from 'assets/icons/select-down.svg'

interface SelectTokenButtonProps {
    token: Token | undefined
    onClick: () => void
    name?: string
    disabled?: boolean
}

const SelectTokenButton = ({
    disabled,
    token,
    name,
    onClick,
}: SelectTokenButtonProps) => {
    return (
        <Button disabled={disabled} onClick={() => onClick()}>
            <div>
                {token ? (
                    <>
                        <LogoToken size={'24px'} token={token} />
                        <span>{token.symbol}</span>
                    </>
                ) : (
                    <span>{name || 'Select a token'}</span>
                )}
            </div>
            {
                <img
                    className="chevron-down"
                    src={ArrowDownDark}
                    alt="arrow down"
                />
            }
        </Button>
    )
}

export default SelectTokenButton

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    padding: 4px 8px;
    height: 35px;
    gap: 22px;
    color: var(--main-color);
    // border: 1.5px solid var(--border1);
    width: fit-content;
    border: none;
    background: none;
    font-family: 'Orbitron', sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 129.7%;
    cursor: pointer;
    div {
        display: flex;
        align-items: center;
        gap: 7px;
    }

    .logo-token {
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }

    .chevron-down {
        width: 20px;
        height: 20px;
    }
    @media only screen and (max-width: 662px) {
        font-size: 10px;
        gap: 5px;
    }
`
