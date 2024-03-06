import React from 'react'
import styled from 'styled-components'

interface Props {
    children: React.ReactNode | JSX.Element
    linear?: boolean
    align?: 'center' | 'right' | 'left'
}

const Title = (props: Props) => {
    return (
        <TitleText
            style={{ textAlign: `${props.align ? props.align : 'left'}` }}
            className={props.linear ? 'linear' : ''}
        >
            {props.children}
        </TitleText>
    )
}

export default Title

const TitleText = styled.div`
    font-size: var(--text-page-title);
    font-weight: 600;
    line-height: 129.7%; /* 51.88px */
    text-transform: uppercase;
    &.linear {
        background: var(
            --bg-2,
            linear-gradient(180deg, #2d73f5 0%, #40bcfe 100%)
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`
