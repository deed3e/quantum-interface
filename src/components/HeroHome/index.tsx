import React from 'react'
import styled from 'styled-components'
import BgRight from 'assets/home/bg_right.png'
import Background from 'assets/home/background.png'
import Container from 'components/ui/Container'
import TextLinearGradient from 'components/ui/TextLinearGradient'
import Marquee from 'react-fast-marquee'
import { marqueeList } from './data'
import GetStartButton from 'DefaultLayout/common/GetStartButton'

const HeroHome = () => {
    return (
        <HeroHomeSection style={{ backgroundImage: `url(${Background})` }}>
            <Container mx="mx-1480">
                <HeroHomeWrapper>
                    <HeroHomeLeft>
                        <h1>
                            The Go To{' '}
                            <TextLinearGradient>
                                DEX for Crypto
                            </TextLinearGradient>{' '}
                            Enthusiasts
                        </h1>
                        <p>
                            We have built the most advanced decentralized
                            exchange to support the{' '}
                            <TextLinearGradient>
                                Base ecosystem
                            </TextLinearGradient>
                        </p>
                        <GetStartButton title="TRADE NOW" />
                    </HeroHomeLeft>
                    <HeroHomeRight>
                        <img src={BgRight} alt="image" />
                    </HeroHomeRight>
                </HeroHomeWrapper>
            </Container>
            <Marquee speed={120}>
                {marqueeList.map((img, index) => {
                    return (
                        <CardMarquee key={index}>
                            <img src={img} alt="logo-marquee" />
                        </CardMarquee>
                    )
                })}
            </Marquee>
        </HeroHomeSection>
    )
}

export default HeroHome

const CardMarquee = styled.div`
    width: 15vw;
    padding: 0px 50px;
    > img {
        width: 100%;
        max-height: 80px;
    }
    @media only screen and (max-width: 1200px) {
        width: 15vw;
        padding: 0px 35px;
    }
    @media only screen and (max-width: 992px) {
        width: 25vw;
        padding: 0px 25px;
    }
    @media only screen and (max-width: 768px) {
        width: 25vw;
        padding: 0px 20px;
    }
`

const HeroHomeSection = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: calc(62px + 26px);
    padding-bottom: 20px;
`

const HeroHomeWrapper = styled.div`
    display: flex;
    align-items: center;
    @media only screen and (max-width: 1200px) {
        padding-bottom: 50px;
    }
`

const HeroHomeLeft = styled.div`
    max-width: 60%;
    flex: 0 0 60%;
    padding-right: 55px;
    > h1 {
        font-size: var(--text-title);
        font-weight: 900;
        line-height: 129.7%; /* 103.76px */
        letter-spacing: 4px;
    }
    > p {
        margin-bottom: 67px;
        margin-top: 15px;
        font-size: 24px;
        font-weight: 700;
        line-height: 129.7%;
    }
    @media only screen and (max-width: 1200px) {
        max-width: 100%;
        flex: 0 0 100%;
        > p {
            margin-bottom: 45px;
        }
    }
    @media only screen and (max-width: 768px) {
        > p {
            font-size: 18px;
            margin-bottom: 30px;
        }
    }
`

const HeroHomeRight = styled.div`
    max-width: 40%;
    flex: 0 0 40%;
    padding: 165px 0;
    text-align: center;
    img {
        margin: auto;
        width: 100%;
        max-height: 505px;
    }
    @media only screen and (max-width: 1200px) {
        display: none;
    }
`
