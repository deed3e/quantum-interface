import Title from 'components/ui/Title'
import React from 'react'
import styled from 'styled-components'
import Partership1 from 'assets/home/partership-1.png'
import Partership2 from 'assets/home/partership-2.png'
import Partership3 from 'assets/home/partership-3.png'
import Partership4 from 'assets/home/partership-4.png'
import Partership5 from 'assets/home/partership-5.png'
import Partership6 from 'assets/home/partership-6.png'
import Partership7 from 'assets/home/partership-7.png'
import Partership8 from 'assets/home/partership-8.png'
import Partership9 from 'assets/home/partership-9.png'
import Partership10 from 'assets/home/partership-10.png'
import Partership11 from 'assets/home/partership-11.png'
import Container from 'components/ui/Container'
const PartershipHome = () => {
    return (
        <Partership>
            <Container>
                <Title align="center">PARTERSHIP</Title>
                <PartershipWrapper>
                    <div>
                        <img src={Partership1} alt="" />
                    </div>
                    <div>
                        <img src={Partership2} alt="" />
                    </div>
                    <div>
                        <img src={Partership3} alt="" />
                    </div>
                    <div>
                        <img src={Partership4} alt="" />
                    </div>
                    <div>
                        <img src={Partership5} alt="" />
                    </div>
                    <div>
                        <img src={Partership6} alt="" />
                    </div>
                    <div>
                        <img src={Partership7} alt="" />
                    </div>
                    <div>
                        <img src={Partership8} alt="" />
                    </div>
                    <div>
                        <img src={Partership9} alt="" />
                    </div>
                    <div>
                        <img src={Partership10} alt="" />
                    </div>
                    <div>
                        <img src={Partership11} alt="" />
                    </div>
                </PartershipWrapper>
            </Container>
        </Partership>
    )
}

export default PartershipHome

const Partership = styled.div`
    margin-top: 100px;
`

const PartershipWrapper = styled.div`
    display: grid;
    gap: 15px;
    margin-top: 60px;
    @media only screen and (max-width: 576px) {
        gap: 5px;
        margin-top: 30px;
    }
    > div {
        border: 1px solid var(--background, #2d73f5);
        background: var(--thanhngang);
        padding: 15px 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        @media only screen and (max-width: 768px) {
            padding: 10px 5px;
        }
        > img {
            width: 100%;
            max-height: 100%;
        }
        &:nth-child(1) {
            grid-column: 1;
            grid-row: 1 / span 6;
        }
        &:nth-child(2) {
            grid-column: 2;
            grid-row-start: 1;
            grid-row-end: 4;
        }
        &:nth-child(3) {
            grid-column: 2;
            grid-row-start: 4;
            grid-row-end: 7;
        }
        &:nth-child(4) {
            grid-column: 3;
            grid-row-start: 1;
            grid-row-end: 5;
        }
        &:nth-child(5) {
            grid-column: 3;
            grid-row-start: 5;
            grid-row-end: 7;
        }
        &:nth-child(6) {
            grid-column: 4;
            grid-row: 1 / span 6;
        }
        &:nth-child(7) {
            grid-column: 5;
            grid-row-start: 1;
            grid-row-end: 3;
        }
        &:nth-child(8) {
            grid-column: 5;
            grid-row-start: 3;
            grid-row-end: 7;
        }
        &:nth-child(9) {
            grid-column: 6;
            grid-row-start: 1;
            grid-row-end: 4;
        }
        &:nth-child(10) {
            grid-column: 6;
            grid-row-start: 4;
            grid-row-end: 7;
        }
        &:nth-child(11) {
            grid-column: 7;
            grid-row: 1 / span 6;
        }
    }
`
