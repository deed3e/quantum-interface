import React from 'react'
import styled from 'styled-components'
import Button from 'components/ui/Button'
import IconArrowRight from 'assets/home/icon _arrow_right.svg'
import { useNavigate } from 'react-router-dom'
const GetStartButton = (props: { title?: string }) => {
    const navigate = useNavigate()
    return (
        <GetStarButton onClick={() => navigate('/trade')}>
            <label>{props?.title ? props?.title : 'GET STARTED'}</label>
            <Icon>
                <img src={IconArrowRight} alt="" />
            </Icon>
        </GetStarButton>
    )
}

export default GetStartButton
const GetStarButton = styled(Button)`
    height: 47px;
    padding: 0px 6px;
    display: flex;
    align-items: center;
    border-radius: 30px;
    text-transform: uppercase;
    font-size: var(--text-content);
    font-style: normal;
    font-weight: 700;
    label {
        padding: 0px 10px;
    }
    @media only screen and (max-width: 1400px) {
        height: 35px;
        label {
            padding: 0px 5px;
        }
    }
`

const Icon = styled.div`
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--main-color);
    padding: 9px;
    img {
        width: 100%;
        max-height: 13px;
    }
    @media only screen and (max-width: 1400px) {
        width: 22px;
        height: 22px;
        padding: 0px;
    }
    @media only screen and (max-width: 1200px) {
        padding: 4px;
    }
`
