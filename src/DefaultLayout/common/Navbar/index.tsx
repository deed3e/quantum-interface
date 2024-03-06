import React from 'react'
import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import { NavbarData } from 'Router'
import IconDrop from 'assets/icons/drop-icon.svg'

// export const itemNav = [
//     { path: '/launchpad', name: 'Launchpad', img: '' },
//     { path: '/create-launchpad', name: 'Create', img: '' },
//     { path: '/levels', name: 'Levels', img: '' },
//     { path: '/admin', name: 'Admin', img: '' },
// ]

const Navbar = (props: { active: boolean; handleActiveBurger: () => void }) => {
    return (
        <>
            <NavbarWrapper className={props.active ? 'activeMobile' : ''}>
                {NavbarData.map((item, index) => {
                    return (
                        item.name &&
                        item?.isNavbar && (
                            <NavLink
                                onClick={props.handleActiveBurger}
                                to={item.path}
                                key={index}
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'active'
                                        : ''
                                }
                            >
                                <NavLinkItem>
                                    <LinkItem>
                                        {item.name}{' '}
                                        {item?.submenu &&
                                            item?.submenu?.length > 0 && (
                                                <img src={IconDrop} alt="" />
                                            )}
                                        {item?.submenu &&
                                            item?.submenu?.length > 0 && (
                                                <Submenu className="submenu">
                                                    <div>
                                                        {item?.submenu?.map(
                                                            (el, i) => (
                                                                <SubmenuLink
                                                                    key={i}
                                                                >
                                                                    <Link
                                                                        to={`${el.path}`}
                                                                    >
                                                                        {
                                                                            el.name
                                                                        }
                                                                    </Link>
                                                                </SubmenuLink>
                                                            ),
                                                        )}
                                                    </div>
                                                </Submenu>
                                            )}
                                    </LinkItem>
                                </NavLinkItem>
                            </NavLink>
                        )
                    )
                })}
            </NavbarWrapper>
        </>
    )
}

const NavbarWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 60px;
    font-size: 18px;
    height: 100%;
    a {
        font-size: 15px;
        font-weight: 700;
        line-height: 129.7%;
        text-decoration: none;
        height: 100%;
    }
    .active {
        div {
            color: #2d73f5;
        }
        div::after {
            display: inherit;
            @media screen and (max-width: 1200px) {
                display: none;
            }
        }
        div {
            @media screen and (max-width: 1200px) {
                color: #2d73f5;
            }
        }
    }
    @media screen and (max-width: 1300px) {
        gap: 40px;
    }
    @media screen and (max-width: 1200px) {
        display: unset;
        gap: 0;
        position: fixed;
        top: 0;
        left: 0;
        background: var(--thanhngang, #95989d);
        width: 0%;
        height: 0%;
        text-align: center;
        z-index: 99;
        padding-top: 80px;
        transition: 0.2s ease-in-out;
        overflow: hidden;
        > a {
            opacity: 0;
            transition: 0.25s 0.2s ease;
        }
        &.activeMobile {
            width: 100%;
            height: 100%;
            > a {
                opacity: 1;
            }
        }
    }
`
const NavLinkItem = styled.div`
    height: 100%;
    @media screen and (max-width: 1200px) {
        height: unset;
        width: fit-content;
        margin: auto;
        margin-top: 10px;
    }
`
const LinkItem = styled.div`
    position: relative;
    font-weight: 600;
    color: var(--main-color);
    height: 100%;
    display: flex;
    align-items: center;
    gap: 5px;
    &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 3px;
        background: var(--btn5);
        display: none;
    }
    &:hover .submenu {
        transform: translateX(-50%) scaleY(1);
        @media screen and (max-width: 1200px) {
            transform: translateX(0) scaleY(1);
            justify-content: center;
        }
    }
    img {
        width: 10px;
    }
    @media screen and (max-width: 1200px) {
        margin-top: 20px;
        height: unset;
        display: unset;
        img {
            display: none;
        }
    }
`

const Submenu = styled.div`
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) scaleY(0);
    padding-top: 3px;
    width: 200px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    z-index: 99;
    transition: 0.15s ease-in;
    transform-origin: 0% 0%;
    > div {
        border-radius: 3px;
        padding: 10px;
        background: #1e2936;
        border: 0.5px solid var(--main-color);
        > * ~ * {
            margin-top: 5px;
        }
    }
    @media screen and (max-width: 1200px) {
        position: relative;
        top: auto;
        left: auto;
        transform: translateX(0) scaleY(1);
        text-align: center;
        width: auto;
        border-top: 0.5px solid var(--main-color);
        margin-top: 10px;
        > div {
            padding: 0;
            background: none;
            border: none;
        }
    }
`
const SubmenuLink = styled.div`
    > a {
        color: var(--main-color);
        font-size: 13px;
        font-weight: 400;
        line-height: 129.7%;
        text-decoration: none;
        &:hover {
            color: var(--text-hover);
        }
    }
`

export default Navbar
