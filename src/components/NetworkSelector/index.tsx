import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import imgDownArrowWhite from 'assets/icons/chevron-white.svg'
import { useOnClickOutside } from 'hooks/useOnClickOutSide'
import { useActiveWeb3React } from 'hooks'
import imgCircleWhite from '../../assets/icons/circleWhite.png'
import imgCircleGreen from '../../assets/icons/circleGreen.png'
import { InfoNetwork, ListNetwork } from 'constants/networks/index'
import { OpacityModal } from 'components/Web3Status'

const NetworkSelector = () => {
    const [networkModal, setNetworkModal] = useState(false)
    const { chainId, account, connector, isWrongNetwork } = useActiveWeb3React()

    const networkRef = useRef<any>()
    useOnClickOutside(networkRef, () => {
        setNetworkModal(false)
    })

    const showNameNetworkCurrent = (chainId: any) => {
        if (chainId && !InfoNetwork[chainId]) {
            return (
                <>
                    <div>
                        <TextUnknownNetwork>Linea network</TextUnknownNetwork>
                    </div>
                    <DownArrow src={imgDownArrowWhite} alt="arrow-down" />
                </>
            )
        }
        return (
            <>
                <div>
                    <img
                        src={InfoNetwork[chainId]?.logo}
                        alt={InfoNetwork[chainId]?.name}
                    />
                    <NameNetWork>{InfoNetwork[chainId]?.name}</NameNetWork>
                </div>
                <DownArrow src={imgDownArrowWhite} alt="arrow-down" />
            </>
        )
    }
    return (
        <NetworkSelectorWrapper>
            <NetworkButton
                onClick={async () => {
                    setNetworkModal((i) => !i)
                }}
            >
                {chainId == 0
                    ? 'Ethereum Mainnet'
                    : !isWrongNetwork
                    ? showNameNetworkCurrent(chainId)
                    : 'Switch Network'}
            </NetworkButton>
            <DropdownModal networkModal={networkModal} ref={networkRef}>
                <ul>
                    {ListNetwork.map((item, index) => {
                        return (
                            <li
                                key={index}
                                onClick={async () => {
                                    if (account) {
                                        await connector.activate(
                                            item.switchNetwork[0],
                                        )
                                    } else {
                                        await connector.activate(
                                            item.switchNetwork[0].chainId,
                                        )
                                    }
                                }}
                            >
                                <span>
                                    {item.logo && (
                                        <img
                                            src={item.logo}
                                            alt=""
                                            className="network-logo"
                                        />
                                    )}
                                    <TextNetwork>{item.name}</TextNetwork>
                                </span>
                                <img
                                    src={
                                        item.chainId === chainId
                                            ? imgCircleGreen
                                            : imgCircleWhite
                                    }
                                    alt=""
                                />
                            </li>
                        )
                    })}
                </ul>
            </DropdownModal>
            {networkModal ? <OpacityModal></OpacityModal> : ''}
        </NetworkSelectorWrapper>
    )
}

const TextUnknownNetwork = styled.span`
    font-size: 13px;
`

const TextNetwork = styled.span`
    font-size: 14px;
`
const DownArrow = styled.img`
    height: 24px;
    width: 24px;
`

const NetworkSelectorWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-end;
    @media only screen and (max-width: 1100px) {
        position: fixed;
        bottom: 5px;
        right: 5px;
        width: 100%;
        background: var(--bg-2);
        backdrop-filter: blur(3px);
        padding: 2px 8px;
        width: fit-content;
        z-index: 999999;
        border-radius: 15px;
    }
    @media only screen and (max-width: 576px) {
        padding: 0px;
    }
`

const NetworkButton = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    padding: 0 10px;
    border: none;
    border-radius: 4px;
    justify-content: space-between;
    cursor: pointer;
    align-items: center;
    font-family: Montserrat, sans-serif;
    height: 30px;
    padding: 0px 8px;
    @media only screen and (max-width: 576px) {
        font-size: 12px;
        height: 25px;
    }
    > div {
        display: flex;
        gap: 5px;
        align-items: center;
        > img {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 5px;
            @media only screen and (max-width: 768px) {
                width: 15px;
                height: 15px;
            }
        }
    }
`
const NameNetWork = styled.p`
    max-width: 80px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-family: 'Orbitron' sans-serif;
    font-size: 15px;
    font-weight: 700;
    line-height: 129.7%;
    @media only screen and (max-width: 768px) {
        font-size: 13px;
        font-weight: 400;
        line-height: 129.7%;
    }
`
const DropdownModal = styled.div<{ networkModal: boolean }>`
    z-index: 3;
    border: 1px solid #ffffff;
    width: 230px;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    position: absolute;
    background: var(--bg1);
    border-radius: 15px;
    top: 52px;
    right: -37px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    cursor: pointer;
    @media screen and (max-width: 1100px) {
        bottom: 54px;
        top: unset;
        right: 10px;
    }
    li.select_options {
        position: relative;
        padding-bottom: 5px;
        margin-bottom: 5px;
    }
    li.select_options:before {
        content: '';
        position: absolute;
        left: 2px;
        bottom: -5px;
        width: 95%;
        height: 2px;
        background: rgb(7 99 128);
    }

    ul {
        padding: 0px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        .button-sui {
            cursor: no-drop;
            opacity: 0.8;
        }
    }
    a {
        text-decoration: none;
        color: #fff;
        :hover {
            opacity: 0.8;
        }
    }
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #000;
        padding: 5px 10px;
        transition: 0.5s;
        &:hover {
            background: var(--btn1);
            transition: 0.5s;
        }

        span {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            img {
                height: 20px;
                width: 20px;
            }
        }
        span:nth-child(3) {
            width: 40px;
        }
        img {
            height: 20px;
            width: 20px;
        }
    }

    animation: ${({ networkModal }) =>
        networkModal
            ? `dropdown 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) both`
            : `fadeOut 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) both`};

    @keyframes dropdown {
        0% {
            opacity: 0;
            height: 0;
            overflow: hidden;
        }
        100% {
            opacity: 1;
            height: fit-content;
            overflow: hidden;
        }
    }
    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        40% {
            opacity: 0.4;
            height: 60px;
            overflow: hidden;
        }
        80% {
            opacity: 0.1;
            height: 20px;
            overflow: hidden;
        }
        100% {
            height: 0px;
            opacity: 0;
            overflow: hidden;
        }
    }
`
export default NetworkSelector
