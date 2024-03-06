import FaqHome from 'components/FaqHome'
import FeatureHome from 'components/FeatureHome'
import HeroHome from 'components/HeroHome'
import ParameterHome from 'components/ParameterHome'
import PartershipHome from 'components/PartershipHome'
import React from 'react'
import styled from 'styled-components'

const Home = () => {
    return (
        <HomePage>
            <HeroHome />
            <ParameterHome />
            <FeatureHome />
            <PartershipHome />
            <FaqHome />
        </HomePage>
    )
}

export default Home

const HomePage = styled.div``
