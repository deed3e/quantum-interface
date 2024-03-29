import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { Button } from 'components/Buttons/PrimaryButton'
import WalletModal from 'components/WalletModal'
import { Activity } from 'react-feather'
import { shortenAddress } from 'utils'
import arrowDown from 'assets/icons/chevron-white.svg'
import { useActiveWeb3React } from 'hooks'

const Web3Status = () => {
    const { account, isWrongNetwork } = useActiveWeb3React()
    const [toggleWalletModal, setToggleWalletModal] = useState<boolean>(false)
    const error = undefined

    function formatConnectorName(account: any, error: any) {
        return (
            <Fragment>
                <WalletName>
                    <Icon src="https://picsum.photos/50/50"></Icon>
                    <span>{account && shortenAddress(account)}</span>
                </WalletName>
                <IconArrow src={arrowDown}></IconArrow>
            </Fragment>
        )
    }

    const Web3StatusInner = (account: any, error: any) => {
        if (account) {
            return (
                <Web3StatusConnect
                    height={undefined}
                    id="web3-status-connected"
                    onClick={() => {
                        setToggleWalletModal(!toggleWalletModal)
                    }}
                    isWrongNetwork={isWrongNetwork}
                >
                    {isWrongNetwork
                        ? 'Wrong Network'
                        : formatConnectorName(account, error)}
                </Web3StatusConnect>
            )
        } else if (error) {
            return (
                <Web3StatusConnect height={undefined}>
                    <NetworkIcon></NetworkIcon>
                    <span>{error ? <p>Wrong Network</p> : <p>Error</p>}</span>
                </Web3StatusConnect>
            )
        } else {
            return (
                <Web3StatusConnect
                    height={undefined}
                    id="connect-wallet"
                    onClick={() => setToggleWalletModal(!toggleWalletModal)}
                >
                    Connect wallet
                </Web3StatusConnect>
            )
        }
    }

    return (
        <Fragment>
            <Web3StatusWrapper>
                {Web3StatusInner(account, error)}
            </Web3StatusWrapper>
            {toggleWalletModal ? (
                <WalletModal setToggleWalletModal={setToggleWalletModal} />
            ) : (
                ''
            )}
            {toggleWalletModal ? (
                <OpacityModal
                    onClick={() => setToggleWalletModal(!toggleWalletModal)}
                ></OpacityModal>
            ) : (
                ''
            )}
        </Fragment>
    )
}

export const OpacityModal = styled.div`
    position: fixed;
    width: 100vw;
    height: 100%;
    z-index: 2;
    background-color: #00000073;
    right: 0;
    top: 0;

    @media screen and (max-width: 1100px) {
        top: unset;
        height: 3000px;
        bottom: 0px;
    }
`

const NetworkIcon = styled(Activity)`
    margin-left: 0.25rem;
    margin-right: 0.5rem;
    width: 16px;
    height: 16px;
`

const IconArrow = styled.img`
    height: 18px;
    width: 18px;
`

const WalletName = styled.div`
    align-items: center;
    display: flex;
    gap: 5px;
    margin-right: 20px;
`
const Icon = styled.img`
    height: 20px;
    width: 20px;
    border-radius: 50%;
`

const Web3StatusConnect = styled(Button)<{ isWrongNetwork?: boolean }>`
    padding: 0 10px;
    width: unset;
    height: 40px;
    background: ${({ isWrongNetwork }) => isWrongNetwork && 'red'};
    border-radius: 30px;
    font-family: 'Orbitron', sans-serif;
    font-size: 20px;
    font-weight: 700;
    line-height: 129.7%;
    @media only screen and (max-width: 768px) {
        height: 30px;
        font-size: 16px;
        font-weight: 400;
    }
`

export const Web3StatusWrapper = styled.div``

export default Web3Status
