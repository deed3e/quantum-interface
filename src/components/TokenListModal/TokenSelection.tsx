import React from 'react'
import { Token } from 'interfaces'
import styled from 'styled-components'
import { Row } from 'components/Layouts'
import LogoToken from 'components/LogoToken'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useActiveWeb3React } from 'hooks'
import { useRemoveTokenFromCurrentList } from 'states/lists/hooks'

interface TokenSelectionProps {
    token: Token
    onUserSelect: (token: Token) => void
    hideAddButton?: boolean
    onAdd?: () => void
}

const TokenSelection = ({
    token,
    onUserSelect,
    hideAddButton = true,
    onAdd,
}: TokenSelectionProps) => {
    const { account } = useActiveWeb3React()
    const balance = useCurrencyBalance(account, token)
    const onRemove = useRemoveTokenFromCurrentList()

    return (
        <WrapperSelection onClick={() => onUserSelect(token)}>
            <div className={'element-selection'}>
                <LogoToken token={token} size={'32px'} />
            </div>
            <div className={'element-selection'}>
                <div className="token-symbol">{token.symbol}</div>
                <div className="token-name">
                    <span>{token.name}</span>
                </div>
            </div>
            <div className={'element-selection'}>
                <div>{balance ? Number(balance).toFixed(4) : 0}</div>
                {token.external && (
                    <div className={'add-btn'} onClick={() => onRemove(token)}>
                        Remove
                    </div>
                )}
                {!hideAddButton && (
                    <div className={'add-btn'} onClick={onAdd}>
                        Add to coin list
                    </div>
                )}
            </div>
        </WrapperSelection>
    )
}

const WrapperSelection = styled(Row)`
    width: 100%;
    cursor: pointer;
    box-shadow: none;
    justify-content: space-between;
    font-style: normal;
    padding: 10px;

    .add-btn {
        color: #0089ff;
        position: relative;
        z-index: 1;
    }

    &:hover {
        background: var(--hover2);
    }

    .element-selection {
        display: flex;
        align-items: center;
    }

    .element-selection:nth-child(2) {
        width: 45%;
        flex-direction: column;
        align-items: flex-start;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .token-name {
            font-size: 8px;
            line-height: 129.7%;
            color: #9e9e9e;
            display: flex;
            gap: 4px;
            align-items: center;

            .dot {
                width: 4px;
                height: 4px;
                background: ${({ theme }) => theme.bgc1};
                border-radius: 50%;
            }
        }
        .token-symbol {
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 129.7%;
            color: #fdfdfd;
        }
    }

    .element-selection:nth-child(3) {
        width: 45%;
        overflow: hidden;
        align-items: flex-end;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex-direction: column;
        padding-right: 2px;
        /* color: #000; */
        .add-btn:hover {
            text-decoration: underline;
        }
    }
`

export default TokenSelection
