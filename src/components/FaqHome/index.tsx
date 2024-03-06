import Container from 'components/ui/Container'
import React, { useState } from 'react'
import styled from 'styled-components'
import FaqImg from 'assets/home/fqa.png'
import FaqBackground from 'assets/home/feature-bg1.png'
import Title from 'components/ui/Title'
import { faqList } from './common/data'

const FaqHome = () => {
    const [activeFaq, setActiveFaq] = useState('1')
    const hanldeActiveFaq = (id: string) => {
        setActiveFaq(id)
    }
    return (
        <Faq>
            <Background1 style={{ backgroundImage: `url(${FaqBackground})` }} />
            <Background2 style={{ backgroundImage: `url(${FaqBackground})` }} />
            <Container>
                <FaqWrapper>
                    <FaqLeft>
                        <img src={FaqImg} alt="" />
                    </FaqLeft>
                    <FaqRight>
                        <Title>Faq</Title>
                        <FaqList>
                            {faqList.map((item, index) => (
                                <FaqItem
                                    className={`${
                                        activeFaq === item.id ? 'active' : ''
                                    }`}
                                    key={index}
                                >
                                    <ItemButton
                                        onClick={() => hanldeActiveFaq(item.id)}
                                        className="item-button"
                                    >
                                        <article>{item.title}</article>
                                        <div>+</div>
                                    </ItemButton>
                                    <ItemContent className="item-content">
                                        <p>{item.content}</p>
                                    </ItemContent>
                                </FaqItem>
                            ))}
                        </FaqList>
                    </FaqRight>
                </FaqWrapper>
            </Container>
        </Faq>
    )
}

export default FaqHome

const Faq = styled.div`
    margin-top: 60px;
    padding: 60px 0px;
    position: relative;
    overflow: hidden;
    @media only screen and (max-width: 576px) {
        margin-top: 30px;
    }
`

const Background1 = styled.div`
    pointer-events: none;
    position: absolute;
    background-repeat: no-repeat;
    background-size: contain;
    bottom: 0;
    right: -15%;
    height: 648.292px;
    width: 602.09px;
    transform: rotate(-146.298deg);
    max-height: 100%;
    max-width: 100%;
    @media only screen and (max-width: 768px) {
        height: 300px;
        width: 290px;
    }
`
const Background2 = styled.div`
    pointer-events: none;
    position: absolute;
    background-repeat: no-repeat;
    background-size: contain;
    bottom: 0px;
    left: 0;
    transform: rotate(-77.537deg);
    height: 275.677px;
    width: 249.019px;
    @media only screen and (max-width: 768px) {
        height: 100px;
        width: 90px;
    }
`
const FaqWrapper = styled.div`
    display: flex;
    align-items: center;
    @media only screen and (max-width: 992px) {
        flex-wrap: wrap;
    }
`
const FaqLeft = styled.div`
    max-width: 40%;
    flex: 0 0 40%;
    > img {
        width: 100%;
        max-height: 90%;
    }
    @media only screen and (max-width: 992px) {
        display: none;
    }
`
const FaqRight = styled.div`
    max-width: 60%;
    flex: 0 0 60%;
    padding: 40px 50px;
    border-radius: 34px;
    border: 1px solid #fff;
    background: var(--thanhngang, #121926);
    @media only screen and (max-width: 992px) {
        max-width: 100%;
        flex: 0 0 100%;
        padding: 20px 30px;
        border-radius: 20px;
    }
    @media only screen and (max-width: 576px) {
        padding: 15px;
        border-radius: 15px;
    }
`
const FaqList = styled.div`
    margin-top: 11px;
`
const FaqItem = styled.div`
    margin-bottom: 25px;
    &.active {
        .item-button {
            > div {
                color: var(--background);
                background: var(--main-color);
            }
        }
        .item-content {
            transition: 0.25s ease-in-out;
            max-height: 200px;
        }
    }
    @media only screen and (max-width: 576px) {
        margin-bottom: 15px;
    }
`

const ItemButton = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    border: none;
    outline: none;
    font-size: 25px;
    font-weight: 500;
    line-height: 129.7%;
    > div {
        width: 28px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--bg-2);
        border-radius: 50%;
        font-weight: 300;
    }
    @media only screen and (max-width: 992px) {
        font-size: 20px;
    }
    @media only screen and (max-width: 576px) {
        font-size: 16px;
        > article {
            max-width: 80%;
            cursor: pointer;
        }
        > div {
            cursor: pointer;
            width: 20px;
            height: 20px;
        }
    }
`
const ItemContent = styled.div`
    margin-top: 20px;
    max-height: 0px;
    overflow: hidden;
    @media only screen and (max-width: 992px) {
        margin-top: 10px;
    }
    @media only screen and (max-width: 576px) {
        margin-top: 2px;
    }
`
