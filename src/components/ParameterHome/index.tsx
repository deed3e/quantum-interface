import Title from 'components/ui/Title'
import React from 'react'
import styled from 'styled-components'
import ParameterBg from 'assets/home/parameter.png'
import Container from 'components/ui/Container'

const ParameterHome = () => {
    return (
        <Parameter>
            <Container>
                <Background
                    style={{ backgroundImage: `url(${ParameterBg})` }}
                />
                <Title align="center">JOIN OUR JOURNEY TO THE STARS</Title>
                <Description>
                    The QuantumAstro AMM has been developed to facilitate the
                    exchange of ERC-20 tokens through automated liquidity pools
                    in a straight forward, cost-effective, speedy, and secure
                    manner. By using QuantumAstro, you can be confident that you have
                    complete authority over your assets, and all your
                    transactions are safeguarded.
                </Description>
                <ParameterWrapper>
                    <ParameterItem>
                        <ItemTitle>Trade Volume 24h</ItemTitle>
                        <ItemNumber>20M</ItemNumber>
                    </ParameterItem>
                    <ParameterItem>
                        <ItemTitle>Total Value Locked</ItemTitle>
                        <ItemNumber>$180M</ItemNumber>
                    </ParameterItem>
                    <ParameterItem>
                        <ItemTitle>Integrations</ItemTitle>
                        <ItemNumber>300</ItemNumber>
                    </ParameterItem>
                    <ParameterItem>
                        <ItemTitle>Community Delegates</ItemTitle>
                        <ItemNumber>4,400+</ItemNumber>
                    </ParameterItem>
                </ParameterWrapper>
            </Container>
        </Parameter>
    )
}

export default ParameterHome

const Parameter = styled.div`
    position: relative;
    padding-top: 51px;
    padding-bottom: 20px;
    background: linear-gradient(
        180deg,
        rgba(45, 115, 245, 0.38) 0%,
        rgba(0, 0, 0, 0) 100%
    );
`
const Background = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    width: 80%;
    max-width: 925px;
    height: 100%;
`
const Description = styled.div`
    max-width: 1077px;
    margin-top: 35px;
    line-height: 160%;
    font-size: var(--text-content);
    text-align: center;
`
const ParameterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 85px;
    > div {
        &:first-child {
            padding-left: 0;
            border-left: none;
        }
        &:last-child {
            padding-right: 0;
        }
    }
    @media only screen and (max-width: 768px) {
        flex-wrap: wrap;
    }
`
const ParameterItem = styled.div`
    max-width: 25%;
    flex: 0 0 25%;
    text-align: center;
    border-left: dotted 1px var(--main-color);
    @media only screen and (max-width: 768px) {
        max-width: 50%;
        flex: 0 0 50%;
        margin-bottom: 20px;
    }
`
const ItemTitle = styled.div``
const ItemNumber = styled.div`
    margin-top: 8px;
    font-size: 50px;
    font-weight: 600;
    line-height: 129.7%;
    @media only screen and (max-width: 992px) {
        font-size: 25px;
    }
`
