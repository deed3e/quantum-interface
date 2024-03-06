import React from 'react'
import Polling from 'components/Polling'
import { Routes, Route, Navigate } from 'react-router-dom'

const Swap = React.lazy(() => import('pages/swap'))
const Home = React.lazy(() => import('newPages/home'))
const Trade = React.lazy(() => import('newPages/Trade'))
const AddLiquidity = React.lazy(() => import('newPages/add'))
const Farms = React.lazy(() => import('newPages/farm'))
const Staking = React.lazy(() => import('newPages/staking'))
const LaunchpadS1 = React.lazy(() => import('pages/launchpads1'))
const LaunchpadS2 = React.lazy(() => import('pages/launchpads2'))
const Pools = React.lazy(() => import('pages/pool'))

const Nft = React.lazy(() => import('pages/nft'))
const Comingsoon = React.lazy(() => import('pages/ComingSoon'))

interface NavbarDataProps {
    name?: string
    path: string
    isNavbar?: boolean
    element: React.ReactNode | JSX.Element
    submenu?: SubmenuNavProps[]
}
interface SubmenuNavProps {
    name?: string
    path: string
    element: React.ReactNode | JSX.Element
}

const Router = () => {
    return (
        <Routes>
            {NavbarData?.map((item: NavbarDataProps, index: number) => (
                <Route key={index} path={item?.path} element={item?.element} />
            ))}
            {/* <Route path="/swap" element={<Swap />} /> */}
            <Route path="/pools" element={<Farms />} />
            {/* <Route path="/add" element={<AddLiquidity />} /> */}
            <Route path="/add/:token0/:token1" element={<AddLiquidity />} />
            <Route path="/private_sale" element={<LaunchpadS1 />} />
            <Route path="/public_sale" element={<LaunchpadS2 />} />
            <Route path="/position" element={<Pools />} />
            <Route path="/nft" element={<Nft />} />
            <Route path="/comingsoon" element={<Comingsoon />} />
            <Route path="*" element={<Navigate to="/swap" />} />
        </Routes>
    )
}

export default Router

export const NavbarData: NavbarDataProps[] = [
    {
        path: '/',
        isNavbar: true,
        element: <Home />,
    },
    {
        name: 'Trade',
        path: '/trade',
        isNavbar: true,
        element: <Trade />,
        // submenu: [
        //     {
        //         name: 'Trade submenu 1',
        //         path: '/trade',
        //         element: <Trade />,
        //     },
        //     {
        //         name: 'Trade submenu 2',
        //         path: '/trade',
        //         element: <Trade />,
        //     },
        // ],
    },
    // {
    //     name: 'Pools',
    //     path: '/pools',
    //     isNavbar: true,
    //     element: <Home />,
    // },
    {
        name: 'Farm',
        path: '/farm',
        isNavbar: true,
        element: <Farms />,
    },
    {
        name: 'Bridge',
        path: 'https://www.orbiter.finance/?source=Ethereum&dest=Base&token=ETH',
        isNavbar: true,
        element: <Home />,
    },
    {
        name: 'Staking',
        path: '/staking',
        isNavbar: true,
        element: <Staking />,
    },
    {
        name: 'Docs',
        path: 'https://docs.quantumastro.finance/',
        isNavbar: true,
        element: <Home />,
    },
    {
        name: 'AddLiquidity',
        path: '/add',
        element: <AddLiquidity />,
    },
]
