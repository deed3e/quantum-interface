import React from 'react'
import styled from 'styled-components'

type Props = {
    children?: React.ReactNode | JSX.Element
    fluid?: boolean
    fixed?: boolean
    className?: any
    style?: any
    xxl?: boolean
    xl?: boolean
    md?: boolean
    sm?: boolean
    id?: string
    mx?: 'mx-1480' | 'mx-1200'
}
const Container = ({
    children,
    fluid,
    fixed,
    className: classStyles,
    style,
    xl,
    md,
    sm,
    id,
    mx,
}: Props) => {
    return (
        <ContainerSection
            key={classStyles}
            id={id || classStyles}
            style={style}
            className={`container ${classStyles} ${mx && mx} ${
                fluid && 'container_fluid'
            } ${fixed && 'container_fixed'} ${xl && 'container-xl'} ${
                md && 'container-md'
            } ${sm && 'container-sm'}
         `}
        >
            {children}
        </ContainerSection>
    )
}

export default Container

const ContainerSection = styled.div`
    max-width: 1200px;
    margin: auto;
    margin-right: auto;
    margin-left: auto;
    width: 100%;
    &.mx-1480 {
        max-width: 1480px;
    }
    &.container_fluid {
        max-width: unset;
        width: 100%;
        margin: auto;
        display: flex;
        justify-content: center;
        padding: 0;
    }

    &.container_fixed {
        position: fixed;
        z-index: 5;
        left: 0;
        right: 0;
    }

    @media only screen and (max-width: 1550px) {
        &.mx-1480 {
            max-width: 100%;
            padding: 0 25px;
        }
        /* &.container,
        &.container-lg,
        &.container-md,
        &.container-sm,
        &.container-xl {
            max-width: 1140px;
            min-width: 1140px;
        } */
    }

    @media (max-width: 1200px) {
        &.container,
        &.container-lg,
        &.container-md,
        &.container-sm,
        &.container-xl {
            max-width: 1140px;
            padding: 0 25px;
        }
    }

    @media (max-width: 992px) {
        &.container,
        &.container-lg,
        &.container-md,
        &.container-sm {
            max-width: 990px;
        }
    }

    @media (max-width: 768px) {
        &.container,
        &.container-md,
        &.container-sm {
            max-width: 720px;
            padding: 0 15px;
        }
    }

    @media (max-width: 576px) {
        &.container,
        &.container-sm {
            max-width: 540px;
        }
    }
`
