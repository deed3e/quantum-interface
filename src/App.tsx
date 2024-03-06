import React, { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import styled from 'styled-components'
import SwapUpdater from 'states/swap/updater'
import MintUpdater from 'states/mint/updater'
import AppUpdater from 'states/application/updater'
import MulticallUpdater from 'states/multicall/updater'
import ListUpdater from 'states/lists/updater'
import ToastMessage from 'components/ToastMessage'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Router from 'Router'
import DefaultLayout from 'DefaultLayout'

const App = () => {
    const Updater = () => {
        return (
            <>
                <SwapUpdater />
                <MintUpdater />
                <AppUpdater />
                <MulticallUpdater />
                <ListUpdater />
            </>
        )
    }

    return (
        <HashRouter>
            <Updater />
            <DefaultLayout>
                <Suspense fallback={''}>
                    <AppContainer>
                        <ToastMessage />
                        <Router />
                    </AppContainer>
                </Suspense>
            </DefaultLayout>
        </HashRouter>
    )
}

const AppContainer = styled.div``

export default App
