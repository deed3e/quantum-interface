import React from 'react'
import styled from 'styled-components'

const TextLinearGradient = (props: {
    children: React.ReactNode | JSX.Element
}) => {
    return <Text>{props.children}</Text>
}

export default TextLinearGradient
const Text = styled.span`
    background: var(--bg-2, linear-gradient(180deg, #2d73f5 0%, #40bcfe 100%));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`
