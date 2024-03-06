import Container from 'components/ui/Container'
import Title from 'components/ui/Title'
import React from 'react'
import styled from 'styled-components'
import FeatureImg1 from 'assets/home/feature-1.png'
import FeatureImg2 from 'assets/home/feature-2.png'
import FeatureImg3 from 'assets/home/feature-3.png'
import FeatureImg4 from 'assets/home/feature-4.png'
import FeatureBG1 from 'assets/home/feature-bg1.png'
import FeatureBG2 from 'assets/home/feature-bg2.png'
import TextLinearGradient from 'components/ui/TextLinearGradient'

const FeatureHome = () => {
    return (
        <Feature>
            <Background1 style={{ backgroundImage: `url(${FeatureBG1})` }} />
            <Background2 style={{ backgroundImage: `url(${FeatureBG2})` }} />
            <Container>
                <Title align="center">Feature</Title>
                <FeatureWrapper>
                    <div>
                        <img src={FeatureImg1} alt="" />
                        <div>
                            <TitleItem>
                                <TextLinearGradient>EARN</TextLinearGradient>
                            </TitleItem>
                            <p>
                                Liquidity Providers that deposit both assets of
                                a pair are rewarded with swapfees
                            </p>
                        </div>
                        <Button>+</Button>
                    </div>
                    <div>
                        <img src={FeatureImg2} alt="" />
                        <Title align="center" linear={true}>
                            FARM
                        </Title>
                        <p>
                            ALB tokens are rewarded to Liquidity providers who
                            stake their Liquidity Pool Tokens.
                        </p>{' '}
                        <Button>+</Button>
                    </div>
                    <div>
                        <Title linear={true}>STAKE</Title>
                        <Image>
                            <img src={FeatureImg3} alt="" />
                        </Image>{' '}
                        <Button>+</Button>
                    </div>
                    <div>
                        <Title linear={true}>DUAL FARM REWARDS</Title>
                        <Image>
                            <img src={FeatureImg4} alt="" />
                        </Image>{' '}
                        <Button>+</Button>
                    </div>
                </FeatureWrapper>
            </Container>
        </Feature>
    )
}

export default FeatureHome

const Feature = styled.div`
    position: relative;
    margin-top: 50px;
    max-width: 100vw;
    overflow-x: hidden;
`
const Background1 = styled.div`
    pointer-events: none;
    position: absolute;
    background-repeat: no-repeat;
    background-size: contain;
    top: 0;
    left: -10%;
    width: 608px;
    height: 405px;
`
const Background2 = styled.div`
    pointer-events: none;
    position: absolute;
    background-repeat: no-repeat;
    background-size: contain;
    bottom: 0px;
    right: -10%;
    width: 690.759px;
    height: 1036.138px;
`

const FeatureWrapper = styled.div`
    margin-top: 50px;
    display: grid;
    gap: 30px;
    > div {
        position: relative;
        border-radius: 40px;
        background: var(--thanhngang, #121926);
        border: 2px solid var(--background2, #2d73f5);
        &:nth-child(1) {
            grid-column: 1 / span 2;
            grid-row: 1;
            padding: 100px 57px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 57px;
            > img {
                max-width: 429px;
            }
            > div {
                max-width: 480px;
            }
            > p {
                line-height: 160%;
            }
            @media only screen and (max-width: 768px) {
                flex-wrap: wrap;
                gap: 0px;
                padding: 50px 15px 60px;
                > div {
                    margin-top: 15px;
                    max-width: 100%;
                    width: 100%;
                    text-align: center;
                }
            }
        }
        &:nth-child(2) {
            grid-column: 1;
            grid-row: 2 / span 2;
            padding: 50px 26px;
            text-align: center;
            > p {
                margin-top: 5px;
                line-height: 160%;
            }
            @media only screen and (max-width: 768px) {
                grid-column: 1 / span 2;
                grid-row: 2;
                padding: 50px 15px 60px;
                > img {
                    width: 100%;
                    max-width: 459px;
                }
            }
        }
        &:nth-child(3),
        &:nth-child(4) {
            padding: 22px 60px;
            display: flex;
            align-items: center;
            > div:first-child {
                max-width: 60%;
            }
            @media only screen and (max-width: 768px) {
                padding: 50px 15px 60px;
                grid-column: 1 / span 2;
                min-height: 150px;
            }
        }
        &:nth-child(3) {
            @media only screen and (max-width: 768px) {
                grid-row: 3;
            }
        }
        &:nth-child(4) {
            @media only screen and (max-width: 768px) {
                grid-row: 4;
            }
        }
    }
`
const TitleItem = styled.div`
    font-size: var(--text-title);
    font-weight: 900;
    line-height: 129.7%;
`
const Image = styled.div`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 50%;
    height: 80%;
    > img {
        width: 100%;
        max-height: 100%;
    }
`
const Button = styled.button`
    position: absolute;
    bottom: 14px;
    right: 14px;
    width: 39px;
    height: 39px;
    background: var(--bg-2);
    font-size: 30px;
    font-weight: 300;
    line-height: 129.7%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: none;
    outline: none;
    color: var(--main-color);
`
