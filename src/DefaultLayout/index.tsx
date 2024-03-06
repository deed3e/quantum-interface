import React, { useEffect, useState } from 'react'
import Header from './common/Header'
import Footer from './common/Footer'
import styled from 'styled-components'
import usePath from 'hooks/usePath'
import BG from 'assets/trade/background.png'

interface DefaultLayoutProps {
    children: React.ReactNode | JSX.Element
}

const DefaultLayout = (props: DefaultLayoutProps) => {
    const pathName = usePath()
    const [started, setStarted] = useState(false)
    useEffect(() => {
        if (pathName && pathName !== '/') {
            return setStarted(true)
        }
        setStarted(false)
    }, [pathName])
    return (
        <>
            <BodyLayout
                className={`${started ? 'startedPage' : 'homePage'}`}
                style={{ backgroundImage: `url(${started ? BG : ''})` }}
            >
                <Header started={started} />
                <Body className={started ? 'trade' : ''}>{props.children}</Body>
                <Footer started={started} />
            </BodyLayout>
        </>
    )
}

export default DefaultLayout

const BodyLayout = styled.div`
    background: var(--background1, #011027);
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;

    &.startedPage {
        padding-top: calc(62px + 26px);
        @media only screen and (max-width: 662px) {
            padding-top: 40px;
        }
    }
`

const Body = styled.div`
    min-height: 80vh;
    &.trade {
        padding-top: 50px;
        padding-bottom: 50px;
        min-height: calc(100vh - 88px);
        @media only screen and (max-width: 662px) {
            padding-bottom: 90px;
            padding-top: 15px;
        }
    }
`
