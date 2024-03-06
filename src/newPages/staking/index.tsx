import Container from 'components/ui/Container'
import Title from 'components/ui/Title'
import React from 'react'
import styled from 'styled-components'
import Logo from 'assets/trade/logo.png'
import Button from 'components/ui/Button'

const Staking = () => {
    return (
        <StakingPage>
            <Container>
                <Title>Staking</Title>
                <StakingWrapper>
                    <CardHeader>
                        <HeaderWrapper>
                            <div>
                                <img src={Logo} alt="Logo" />
                                eQTAT
                            </div>
                            <button>Rewards distributed once per day</button>
                        </HeaderWrapper>
                        <HeaderInfo>
                            <div>
                                <h5>Total Staked</h5>
                                <span>$239.863</span>
                            </div>
                            <div>
                                <h5>estimated APY 7 D</h5>
                                <span>54.147%</span>
                            </div>
                            <div>
                                <h5>Deposit Fee</h5>
                                <span>1%</span>
                            </div>
                        </HeaderInfo>
                    </CardHeader>
                    <CardBodyLeft>
                        <div>Pending Rewards</div>
                        <h3>- QTAT</h3>
                        <div>$-</div>
                        <Button>Harvest</Button>
                    </CardBodyLeft>
                    <CardBodyRight>
                        <div>Staked</div>
                        <h3>- QTAT</h3>
                        <div>$-</div>
                        <Button>Enable to stake</Button>
                    </CardBodyRight>
                    <CardFooter>
                        <h3>Stake Information</h3>
                        <p>
                            Claim your share of protocol revenue generated. A
                            0.05% fee is deducted from every swap and used to
                            buy an QTAT which is distributed to all eQTAT
                            stakers. Rewards are distributed roughly once per
                            day, and you can Harvest at any time. The APY (7D)
                            metric shows an annualized return that is
                            forecasted, based on the revenue collected over the
                            previous seven days. Deposit fee is deducted when
                            you deposit your QTAT tokens. The deposit fee may be
                            modified at any time.
                        </p>
                    </CardFooter>
                </StakingWrapper>
            </Container>
        </StakingPage>
    )
}

export default Staking

const StakingPage = styled.div`
    padding-bottom: 50px;
    @media only screen and (max-width: 662px) {
        padding-top: 30px;
    }
`
const StakingWrapper = styled.div`
    display: grid;
    gap: 30px;
    margin-top: 42px;
    > div {
        padding: 30px 40px;
        border-radius: 16px;
        background: #1e2936;
    }
    @media only screen and (max-width: 662px) {
        gap: 15px;
        margin-top: 20px;
        > div {
            padding: 15px;
            border-radius: 10px;
        }
    }
`
const CardHeader = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;
`
const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 35px;
    > div {
        display: flex;
        align-items: center;
        gap: 26px;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 129.7%;
        img {
            width: 58px;
            height: 58px;
        }
    }
    > button {
        padding: 5px 30px;
        border-radius: 10px;
        border: 1px solid #2d73f5;
        background: var(
            --bg-2,
            linear-gradient(180deg, #2d73f5 0%, #40bcfe 100%)
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        outline: none;
        font-size: 16px;
        font-weight: 400;
        line-height: 160%;
    }
    @media only screen and (max-width: 662px) {
        flex-wrap: wrap;
        margin-bottom: 20px;
        > div {
            gap: 10px;
            font-size: 20px;
            img {
                width: 30px;
                height: 30px;
            }
        }
        > button {
            margin-top: 15px;
            width: 100%;
            padding: 3px 10px;
        }
    }
`
const HeaderInfo = styled.div`
    display: flex;
    gap: 65px;
    > div {
        h5 {
            color: #98a3af;
            font-size: 15px;
            font-weight: 400;
            line-height: 22px;
        }
        span {
            font-size: 30px;
            font-weight: 500;
            line-height: 129.7%;
        }
    }
    @media only screen and (max-width: 662px) {
        gap: 15px;
        flex-wrap: wrap;
        > div {
            width: 100%;
            text-align: center;
            h5 {
                font-size: 15px;
            }
            span {
                font-size: 20px;
            }
        }
    }
`
const CardBodyLeft = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    div {
        color: #98a3af;
        font-size: 15px;
        font-weight: 400;
        line-height: 22px;
    }
    h3 {
        font-size: 30px;
        font-weight: 500;
        line-height: 129.7%;
        margin-top: 15px;
        margin-bottom: 10px;
    }
    button {
        margin-top: 85px;
        width: 100%;
        padding: 15px 0;
        border-radius: 999px;
        box-shadow: 0px -1px 0px 0px rgba(14, 14, 44, 0.4) inset;
    }
    @media only screen and (max-width: 662px) {
        grid-column-start: 1;
        grid-column-end: 3;
        h3 {
            font-size: 20px;
            margin-top: 10px;
            margin-bottom: 5px;
        }
        button {
            margin-top: 30px;
            padding: 10px 0;
        }
    }
`
const CardBodyRight = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    div {
        color: #98a3af;
        font-size: 15px;
        font-weight: 400;
        line-height: 22px;
    }
    h3 {
        font-size: 30px;
        font-weight: 500;
        line-height: 129.7%;
        margin-top: 15px;
        margin-bottom: 10px;
    }
    button {
        margin-top: 85px;
        width: 100%;
        padding: 15px 0;
        border-radius: 999px;
        box-shadow: 0px -1px 0px 0px rgba(14, 14, 44, 0.4) inset;
    }
    @media only screen and (max-width: 662px) {
        grid-column-start: 1;
        grid-column-end: 3;
        h3 {
            font-size: 20px;
            margin-top: 10px;
            margin-bottom: 5px;
        }
        button {
            margin-top: 30px;
            padding: 10px 0;
        }
    }
`
const CardFooter = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;
    > h3 {
        font-size: 15px;
        font-style: normal;
        font-weight: 700;
        line-height: 22px;
        margin-bottom: 20px;
    }
    > p {
        color: #98a3af;
        font-size: 15px;
        font-weight: 400;
        line-height: 22px;
        padding-left: 20px;
    }
    @media only screen and (max-width: 662px) {
        > p {
            padding-left: 0px;
        }
    }
`
