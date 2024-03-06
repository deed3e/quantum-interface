import React from 'react'
import { Token } from 'interfaces'
import styled from 'styled-components'
import { Row } from 'components/Layouts'
import LogoToken from 'components/LogoToken'

interface CommonBaseProps {
    token: Token
    onUserSelect: (token: Token) => void
}

const CommonBase = ({ token, onUserSelect }: CommonBaseProps) => {
    return (
        <WrapperCommonBase onClick={() => onUserSelect(token)}>
            <LogoToken token={token} />
            <div>{token.symbol}</div>
        </WrapperCommonBase>
    )
}
const WrapperCommonBase = styled(Row)`
    background: none;
    padding: 4px 10px;
    gap: 9px;
    cursor: pointer;
    align-items: center;
    transition: all ease-in-out 0.3s;
    border-radius: 8px;
    background: #495561;
    font-size: 15px;
    font-weight: 700;
    line-height: 129.7%;
    div {
        /* color: #000; */
    }

    &:hover {
        background-image: linear-gradient(#0dccea, #0d70ea);
    }
`

export default CommonBase
