import React, { useState } from 'react'
import styled from 'styled-components'
import BrandLogo from 'assets/home/logo.png'

import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import Container from 'components/ui/Container'
import GetStartButton from '../GetStartButton'
import NetworkSelector from 'components/NetworkSelector'
import Web3Status from 'components/Web3Status'

const Header = (props: { started: boolean }) => {
    const [activeBurger, setActiveBurger] = useState(false)

    const handleActiveBurger = () => {
        setActiveBurger(!activeBurger)
    }

    return (
        <HeaderCard>
            <Container className="header-container" mx="mx-1480">
                <HeaderWrapper>
                    <HeaderLeft>
                        <BurgerButton
                            className={activeBurger ? 'active' : ''}
                            onClick={handleActiveBurger}
                        />
                        <HeaderLogo>
                            <Link to={'/'}>
                                <img src={BrandLogo} alt="logo" />
                            </Link>
                        </HeaderLogo>
                        <Navbar
                            handleActiveBurger={handleActiveBurger}
                            active={activeBurger}
                        />
                    </HeaderLeft>
                    <HeaderRight>
                        {props.started ? (
                            <Connector>
                                <NetworkSelector />
                                <Web3Status />
                            </Connector>
                        ) : (
                            <GetStartButton />
                        )}
                    </HeaderRight>
                </HeaderWrapper>
            </Container>
        </HeaderCard>
    )
}

export default Header
const HeaderCard = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    margin-top: 26px;
    z-index: 999;
    @media only screen and (max-width: 1200px) {
        margin-top: 0px;
    }
    .header-container {
        @media only screen and (max-width: 1200px) {
            max-width: 100%;
            padding: 0px;
        }
    }
`
const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 62px;
    width: 100%;
    border-radius: 40px;
    background: var(--thanhngang, #121926);
    padding-left: 40px;
    padding-right: 12px;
    @media only screen and (max-width: 1200px) {
        width: 100vw;
        padding-left: 12px;
        padding-right: 12px;
        border-radius: 0px;
        height: 55px;
    }
`
const HeaderLeft = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 99px;
    height: 100%;
    @media only screen and (max-width: 1400px) {
        gap: 50px;
    }
    @media only screen and (max-width: 1200px) {
        margin-left: 60px;
    }
`

const BurgerButton = styled.div`
    display: none;
    @media only screen and (max-width: 1200px) {
        display: unset;
        transition: all 0.25s;
        content: '';
        position: absolute;
        left: 0;
        height: 6px;
        width: 30px;
        border-radius: 15px;
        background-color: rgba(255, 255, 255, 0.95);
        position: fixed;
        left: 12px;
        top: 24px;
        z-index: 999;
        &::before {
            transition: all 0.25s;
            content: '';
            position: absolute;
            left: 0;
            height: 6px;
            width: 30px;
            border-radius: 15px;
            background-color: rgba(255, 255, 255, 0.95);
            top: -8px;
        }
        &::after {
            transition: all 0.25s;
            content: '';
            position: absolute;
            left: 0;
            height: 6px;
            width: 30px;
            border-radius: 15px;
            background-color: rgba(255, 255, 255, 0.95);
            top: 8px;
        }
        &.active {
            background-color: transparent;
            transition: all 0.25s;
            &:before {
                transition: all 0.25s;
                transform: translate(0, 8px) rotate(45deg);
            }
            &:after {
                top: -0px;
                transform: rotate(-45deg);
            }
        }
    }
`
const HeaderLogo = styled.div`
    height: 33px;
    img {
        width: 301px;
        height: 100%;
    }
    @media only screen and (max-width: 1550px) {
        height: 20px;
        img {
            width: 190px;
            height: 100%;
        }
    }
    @media only screen and (max-width: 662px) {
        display: none;
    }
`

const HeaderRight = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Connector = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-end;
`
