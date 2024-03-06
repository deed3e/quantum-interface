import React, { useState } from 'react'
import styled from 'styled-components'
import {
    getConnections,
    injectedConnection,
    bitkeepConnection,
    okexConnection,
} from 'components/connection'
import { Connection } from 'components/connection/types'
import { useAppDispatch } from 'states/hook'
import { updateSelectedWallet } from 'states/user/reducer'
import Loader from 'components/Loader'

const WALLET_VIEWS = {
    OPTIONS: 'options',
    ACCOUNT: 'account',
    PENDING: 'pending',
}

interface actionWallet {
    setWalletView: React.Dispatch<React.SetStateAction<string>>
    setPendingWallet: React.Dispatch<React.SetStateAction<string | undefined>>
    setToggleWalletModal: React.Dispatch<React.SetStateAction<boolean>>
    walletView: string
    pendingWallet: string | undefined
}

function OptionsWallet({
    walletView,
    pendingWallet,
    setWalletView,
    setPendingWallet,
    setToggleWalletModal,
}: actionWallet) {
    const connections = getConnections()
    const dispatch = useAppDispatch()
    const [typeConnect, setTypeConnect] = useState<'Wallet' | 'Social'>(
        'Wallet',
    )

    const tryActivation = async (connector: Connection | undefined) => {
        try {
            setWalletView(WALLET_VIEWS.PENDING)
            connector?.getName() && setPendingWallet(connector?.getName())
            if (connector?.type == 'ARGENT') {
                dispatch(updateSelectedWallet({ wallet: undefined }))
            } else {
                dispatch(updateSelectedWallet({ wallet: connector?.type }))
            }
            await connector?.connector?.activate()
        } catch (error) {
            console.log('err', error)
            setWalletView(WALLET_VIEWS.OPTIONS)
            setPendingWallet('')
        }
    }

    const installWallet = (option: Connection) => {
        return (
            <Item key={option + option.getName()}>
                <ItemContent
                    onClick={() => {
                        option.href &&
                            option.href !== null &&
                            window.open(option.href)
                    }}
                >
                    <img src={option.getIcon?.(true)}></img>
                    <span>Install {option.getName()}</span>
                </ItemContent>
            </Item>
        )
    }

    const getOptions = () => {
        return connections
            .filter((item) => item.shouldDisplay())
            .map((key, index) => {
                const option = key
                if (option.connector === injectedConnection.connector) {
                    // don't show injected if there's no injected provider
                    if (!(window.web3 || window.ethereum)) {
                        return installWallet(option)
                    }
                }
                if (option.connector == bitkeepConnection.connector) {
                    //don't show injected if there's no injected provider
                    if (!window.bitkeep) {
                        return installWallet(option)
                    }
                }
                if (option.connector == okexConnection.connector) {
                    //don't show injected if there's no injected provider
                    if (!window.okexchain) {
                        return installWallet(option)
                    }
                }
                return (
                    <Item key={key + option.getName()}>
                        <ItemContent
                            onClick={() => {
                                tryActivation(option)
                            }}
                        >
                            <span>{option.getName()}</span>
                            <img src={option.getIcon?.(true)}></img>
                        </ItemContent>
                        {walletView === WALLET_VIEWS.PENDING &&
                        pendingWallet === option.getName() ? (
                            <StyledLoader />
                        ) : (
                            ''
                        )}
                    </Item>
                )
            })
    }

    return (
        <Container>
            <HeaderWrapper>
                Connect a wallet
                <div onClick={() => setToggleWalletModal(false)}>X</div>
            </HeaderWrapper>
            <WrapContent>
                <WrapItem>{getOptions()}</WrapItem>
            </WrapContent>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 1;
    overflow: auto;
    max-width: 552px;
    width: 100%;
    left: 50%;
    bottom: 0px;
    top: 0px;
    transform: translateX(-50%);
    margin: auto;
    height: fit-content;
    z-index: 9999;
    color: var(--main-color);
    animation: 'fadeUp 0.3s linear';
    border-radius: 12px;
    border: 1px solid #bdbdbd;
    background: #1e2936;
    @media only screen and (max-width: 662px) {
        max-width: 95%;
    }

    @keyframes fadeIn {
        from {
            transform: translateX(100%);
            opacity: 1;
        }
        to {
            transform: translateX(0px);
            opacity: 1;
        }
    }
    @keyframes fadeOut {
        from {
            transform: translateX(0px);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 1;
        }
    }
    @keyframes fadeUp {
        from {
            transform: translateY(100%);
            opacity: 1;
        }
        to {
            transform: translateY(0px);
            opacity: 1;
        }
    }
`

const LabelSocialConnect = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    grid-gap: 10px;
    &.inactive {
        div:nth-child(4),
        div:nth-child(5),
        div:nth-child(6),
        div:nth-child(7),
        div:nth-child(8),
        div:nth-child(9),
        div:nth-child(10),
        div:nth-child(11),
        div:nth-child(12) {
            display: none;
        }
    }
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #003b5c;
        background: rgb(255, 255, 255);
        min-height: 48px;
        border-radius: 8px;
        @media screen and (max-width: 767px) {
            min-height: 42px;
        }
        :hover {
            background: rgba(255, 255, 255, 0.8);
        }

        img {
            width: 35px;
            height: 35px;
            @media screen and (max-width: 767px) {
                width: 30px;
                height: 30px;
            }
        }
    }
`

const StyledLoader = styled(Loader)`
    margin-right: 1rem;
`

const HeaderWrapper = styled.div`
    padding: 26px;
    color: var(--main-color);
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 129.7%;
    border-bottom: 0.5px solid #364453;
    display: flex;
    justify-content: space-between;
    justify-items: center;
    > div {
        font-size: 17px;
        font-style: normal;
        font-weight: 400;
        line-height: 129.7%;
        background: var(
            --btn-5,
            linear-gradient(180deg, #2d73f5 0%, #40bcfe 100%)
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        cursor: pointer;
    }
`
const WrapContent = styled.div`
    padding: 0.5rem 1.5rem 1.2rem;

    @media screen and (max-width: 390px) {
        padding: 0.5rem 0.5rem;
    }
`

const WrapItem = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > div {
        max-width: 47%;
        flex: 0 0 47%;
        margin-bottom: 20px;
    }
    @media only screen and (max-width: 662px) {
        > div {
            max-width: 100%;
            flex: 0 0 100%;
        }
    }
`

const Item = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 8px;
    width: 100%;
    transition: all ease-in-out 0.1s;

    :hover {
        background: rgba(146, 129, 129, 0.13);
    }
`
const ItemContent = styled.button`
    width: 100%;
    background: none;
    border-radius: 65px;
    border: 1px solid #fff;
    color: var(--main-color);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 15px 23px;
    justify-content: space-between;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 129.7%;

    img {
        width: 30px;
        height: 30px;
        object-fit: contain;
        border-radius: 50%;
    }
    span {
        font-size: 16px;
        font-weight: bold;
    }
    @media screen and (max-width: 767px) {
        img {
            height: 38px;
            width: 38px;
        }
        span {
            font-size: 14px;
        }
    }
`
export default OptionsWallet
