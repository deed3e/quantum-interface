import React from 'react'
import styled from 'styled-components'
import GetStartButton from '../GetStartButton'
import Container from 'components/ui/Container'
import { Link, NavLink } from 'react-router-dom'
import { NavbarData } from 'Router'
import BrandLogo from 'assets/home/logo.png'
import NetWorkIcon1 from 'assets/home/nw-1.png'
import NetWorkIcon2 from 'assets/home/nw-2.png'
import NetWorkIcon3 from 'assets/home/nw-3.png'
import NetWorkIcon4 from 'assets/home/nw-4.png'
import NetWorkIcon5 from 'assets/home/nw-5.png'
import FooterBg from 'assets/home/footerBg.png'
import IconNetWork1 from 'assets/icons/iconx.png'
import IconNetWork2 from 'assets/icons/iconweb.png'
import IconNetWork3 from 'assets/icons/icontele.png'

const Footer = (props: { started: boolean }) => {
    return props.started ? (
        <FooterTrade>
            <Container>
                <FooterTradeWrapper>
                    <FooterTradeLeft>
                        <NetWorkWrapper>
                            <img src={IconNetWork1} alt="" />
                            <img src={IconNetWork2} alt="" />
                            <img src={IconNetWork3} alt="" />
                        </NetWorkWrapper>
                        <Link to={'https://docs.quantumastro.finance/'}>Docs</Link>
                    </FooterTradeLeft>
                    <FooterTradeCopyRight>
                        © 2024 Quantum. All rights reserved
                    </FooterTradeCopyRight>
                </FooterTradeWrapper>
            </Container>
        </FooterTrade>
    ) : (
        <FooterCard>
            <Background style={{ backgroundImage: `url(${FooterBg})` }} />
            <Container>
                <HeaderButton>
                    <GetStartButton />
                </HeaderButton>
                <NavFooterWrapper>
                    <FooterLogo>
                        <Link to={'/'}>
                            <img src={BrandLogo} alt="logo" />
                        </Link>
                    </FooterLogo>
                    <NavbarWrapper>
                        {NavbarData.map((item, index) => {
                            return (
                                item.name &&
                                item?.isNavbar && (
                                    <NavLink
                                        to={item.path}
                                        key={index}
                                        className={({ isActive, isPending }) =>
                                            isPending
                                                ? 'pending'
                                                : isActive
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        <LinkItem>{item.name}</LinkItem>
                                    </NavLink>
                                )
                            )
                        })}
                    </NavbarWrapper>
                    <FooterLink>
                        <div>
                            <Link to={'/'}>Privacy Policy</Link>
                        </div>
                        <div>
                            <Link to={'/'}>Terms of Service</Link>
                        </div>
                    </FooterLink>
                </NavFooterWrapper>
                <NavCopyRight>
                    <div>© 2023 Quantum. All rights reserved</div>
                    <div>
                        QuantumAstro Base is developed and managedinde <br />
                        pendently of the Coinbase / Base team{' '}
                    </div>
                </NavCopyRight>
                <FooterNetwork>
                    <NetworkItem>
                        <Link to={'/'}>
                            <img src={NetWorkIcon1} alt="" />
                        </Link>
                    </NetworkItem>
                    <NetworkItem>
                        <Link to={'/'}>
                            <img src={NetWorkIcon2} alt="" />
                        </Link>
                    </NetworkItem>
                    <NetworkItem>
                        <Link to={'/'}>
                            <img src={NetWorkIcon3} alt="" />
                        </Link>
                    </NetworkItem>
                    <NetworkItem>
                        <Link to={'/'}>
                            <img src={NetWorkIcon4} alt="" />
                        </Link>
                    </NetworkItem>
                    <NetworkItem>
                        <Link to={'/'}>
                            <img src={NetWorkIcon5} alt="" />
                        </Link>
                    </NetworkItem>
                </FooterNetwork>
            </Container>
        </FooterCard>
    )
}

export default Footer
const FooterTrade = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    @media only screen and (max-width: 1100px) {
        bottom: 20px;
    }
    @media only screen and (max-width: 662px) {
        bottom: 20px;
    }
`
const FooterTradeWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 0;
    @media only screen and (max-width: 662px) {
        flex-wrap: wrap;
    }
`
const FooterTradeLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 56px;
    a {
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 129.7%;
        color: var(--main-color);
    }
    @media only screen and (max-width: 662px) {
        width: 100%;
        justify-content: space-between;
    }
`
const NetWorkWrapper = styled.div`
    display: flex;
    gap: 25px;
    align-items: center;
    > img {
        width: 23px;
        max-height: 23px;
    }
`
const FooterTradeCopyRight = styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 129.7%;
    @media only screen and (max-width: 662px) {
        width: 100%;
        margin-top: 10px;
        text-align: center;
        font-size: 10px;
    }
`
const FooterCard = styled.div`
    padding-top: 27px;
    background: var(--thanhngang, #121926);
    position: relative;
    overflow: hidden;
`

const Background = styled.div`
    pointer-events: none;
    position: absolute;
    background-repeat: no-repeat;
    background-size: cover;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
`
const HeaderButton = styled.div`
    display: flex;
    justify-content: center;
`
const NavFooterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 65px;
    @media only screen and (max-width: 992px) {
        flex-wrap: wrap;
    }
    @media only screen and (max-width: 768px) {
        justify-content: center;
        margin-top: 30px;
    }
`

const FooterLogo = styled.div`
    height: 33px;
    img {
        width: 301px;
        height: 100%;
    }
    @media only screen and (max-width: 1400px) {
        height: 20px;
        img {
            width: 190px;
            height: 100%;
        }
    }
    @media only screen and (max-width: 662px) {
        margin-bottom: 15px;
    }
`

const NavbarWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 40px;
    @media only screen and (max-width: 992px) {
        gap: 20px;
    }
    @media only screen and (max-width: 768px) {
        justify-content: center;
        width: 100%;
    }
    @media only screen and (max-width: 412px) {
        display: none;
    }
    a {
        text-decoration: none;
    }
`

const LinkItem = styled.div`
    position: relative;
    font-size: 15px;
    font-weight: 700;
    line-height: 129.7%;
    color: var(--main-color);
    @media only screen and (max-width: 768px) {
        font-size: 12px;
    }
`
const FooterLink = styled.div`
    display: flex;
    gap: 30px;

    > div {
        text-align: center;
        max-width: 80px;
    }
    a {
        font-size: 15px;
        font-style: normal;
        font-weight: 700;
        line-height: 129.7%;
        color: var(--main-color);
    }
    @media only screen and (max-width: 992px) {
        margin-top: 15px;
        width: 100%;
        justify-content: flex-end;
        > div {
            max-width: 100%;
        }
    }
    @media only screen and (max-width: 768px) {
        justify-content: center;
        a {
            font-size: 12px;
        }
    }
    @media only screen and (max-width: 412px) {
        margin-top: 0px;
    }
`
const NavCopyRight = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    font-weight: 700;
    margin-top: 5px;
    padding-top: 25px;
    border-top: 1px solid var(--main-color);
    > div:last-child {
        text-align: right;
    }
    @media only screen and (max-width: 768px) {
        justify-content: center;
        flex-wrap: wrap;
        font-size: 13px;
        font-weight: 400;
        > div {
            margin: 2px;
            width: 100%;
            text-align: center !important;
        }
    }
`
const FooterNetwork = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 15px;
    padding-bottom: 10px;
    gap: 35px;
    @media screen and (max-width: 1100px) {
        padding-bottom: 50px;
    }
    @media only screen and (max-width: 768px) {
        justify-content: center;
    }
    @media only screen and (max-width: 576px) {
        gap: 20px;
    }
`
const NetworkItem = styled.div`
    img {
        width: 30px;
        max-height: 30px;
        @media only screen and (max-width: 576px) {
            width: 25px;
            max-height: 25px;
        }
    }
`
