import { useOnClickOutside } from 'hooks/useOnClickOutSide'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import {
    useSlippageTolerance,
    useTransactionDeadline,
} from 'states/application/hooks'

interface TransactionProps {
    setSetting: React.Dispatch<React.SetStateAction<boolean>>
    setting: boolean
    handleClose: () => void
}

const Transaction = ({
    setSetting,
    setting,
    handleClose,
}: TransactionProps) => {
    const [active, setActive] = useState('')
    const { slippage, setSlippage } = useSlippageTolerance()
    const { deadline, setDeadline } = useTransactionDeadline()
    const selection = '1'
    const [textError, setTextError] = useState<string>('')

    const validateInputNumber = (e: string) => {
        const value = e
            .replace(/[^0-9.,]/g, '')
            .replace(' ', '')
            .replace(',', '.')
            .replace(/(\..*?)\..*/g, '$1')
        if (Number(value) < 0.1) {
            setSlippage(value)
            setTextError('Your transaction may be failed')
            setActive('setIcon')
        } else if (Number(value) > 100) {
            setTextError('Enter a valid slippage percentage')
            setActive('setWarning')
        } else {
            setActive('')
            setTextError('')
            setSlippage(value)
        }
    }
    const validateInputDealine = (e: string) => {
        e = e
            .replace(/[^0-9.,]/g, '')
            .replace(' ', '')
            .replace(',', '.')
            .replace(/(\..*?)\..*/g, '$1')
        console.log('eeeeeeee', e)
        if (Number(e) < 1) {
            setDeadline(Number(1) * 60)
            setTextError('Your transaction may be failed')
        } else if (Number(e) > 60) {
            setTextError('Your transaction can take a long time')
        } else {
            setTextError('')
            setDeadline(Number(e) * 60)
        }
    }

    const ref = useRef<any>()
    useOnClickOutside(ref, () => setSetting(false))

    return (
        <>
            <Container ref={ref} className={setting ? 'active' : ''}>
                <Wrap>
                    <TransactionSetting>
                        <HeaderTitle>
                            Settings
                            <div onClick={handleClose}>X</div>
                        </HeaderTitle>
                        <WrapContainer>
                            <SubTitle>
                                <span>Slippage tolerance</span>
                                <IconQuestion>
                                    ?
                                    <SlippageText>
                                        Your transaction will revert if the
                                        price changes unfavorably by more than
                                        this percentage.
                                    </SlippageText>
                                </IconQuestion>
                            </SubTitle>
                            <GroupButton>
                                <WrapButton>
                                    <Item
                                        setting={setting}
                                        className={
                                            slippage === selection
                                                ? 'active'
                                                : ''
                                        }
                                        onClick={() => {
                                            validateInputNumber(selection)
                                        }}
                                    >
                                        Auto
                                    </Item>
                                </WrapButton>
                                <WrapInputPercent>
                                    <span
                                        className={`${
                                            active === 'setIcon' ? 'active' : ''
                                        }`}
                                    >
                                        ⚠️
                                    </span>
                                    <Input
                                        className={`${
                                            active === 'setWarning' ? 'red' : ''
                                        }`}
                                        type={'text'}
                                        value={slippage}
                                        style={{
                                            padding: '0.1rem 1.7rem 0 1rem',
                                        }}
                                        placeholder="0.10"
                                        onChange={(e) =>
                                            validateInputNumber(e.target.value)
                                        }
                                    />
                                </WrapInputPercent>
                                <Percent
                                    className={`${
                                        active === 'setWarning' ? 'red' : ''
                                    }`}
                                >
                                    %
                                </Percent>
                            </GroupButton>
                            <WarningText
                                className={`${textError ? 'active' : ''} ${
                                    active === 'setWarning' ? 'warning' : ''
                                }`}
                            >
                                {textError}
                            </WarningText>
                            <SubTitle>
                                <span>Transaction deadline</span>
                                <IconQuestion>
                                    ?
                                    <SlippageText>
                                        Your transaction will revert if it is
                                        pending for more than this period of
                                        time.
                                    </SlippageText>
                                </IconQuestion>
                            </SubTitle>
                            <SubTitle>
                                <InputTime
                                    placeholder={(deadline / 60).toString()}
                                    type={'text'}
                                    value={Number(deadline) / 60}
                                    onChange={(e) =>
                                        validateInputDealine(e.target.value)
                                    }
                                />
                                <p> minutes</p>
                            </SubTitle>
                        </WrapContainer>
                    </TransactionSetting>
                </Wrap>
            </Container>
        </>
    )
}

export default Transaction

const InputTime = styled.input`
    border: 1px solid var(--border1);
    outline: none;
    background: none;
    max-width: 80px;
    padding: 11px 11px;
    backdrop-filter: blur(2.9465px);
    border-radius: 4px;
    text-align: left;
    color: var(--main-color);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 129.7%;
    ::placeholder {
        color: var(--main-color);
    }
`
const TransactionSetting = styled.div`
    gap: 8px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`

const Container = styled.div<{ ref: any }>`
    position: absolute;
    height: fit-content;
    top: 32px;
    left: -160px;
    transform: translateX(-50%);
    opacity: 0;
    transition: all 0.2s linear;
    z-index: 9999;

    &.active {
        opacity: 1;
        z-index: 3;
    }
    @media screen and (max-width: 375px) {
        scale: 0.8;
    }
`

const Wrap = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin: auto;
    font-size: 14px;
    width: 100%;
    backdrop-filter: blur(10px);
    border-radius: 8px;
    backdrop-filter: blur(10px);
    border-radius: 12px;
    border: 0.5px solid #bdbdbd;
    background: #1e2936;
    @media screen and (max-width: 390px) {
        /* max-width: 370px; */
    }
    @media screen and (max-width: 375px) {
        padding: 15px 8px;
    }
`
const HeaderTitle = styled.div`
    width: 100%;
    font-size: 20px;
    line-height: 23px;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    padding: 20px 28px;
    border-bottom: 1px solid #364453;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
        font-size: 17px;
        font-style: normal;
        font-weight: 400;
        color: #2d73f5;
        cursor: pointer;
    }
`
const SubTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 13px;
    > span {
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 129.7%;
    }
    > p {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 129.7%;
    }
`
const WrapContainer = styled.div`
    padding: 35px 50px;
`
const GroupButton = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 29px;
    align-items: center;
`
const WrapButton = styled.div`
    display: flex;
    text-align: center;
    width: 80px;
    height: 46px;
    align-items: center;
    justify-content: space-around;
    margin-right: 12px;
    padding: 2px;
    background: var(--btn1);
    backdrop-filter: blur(2.9465px);
    border-radius: 6px;
    color: #fff;
`
const Item = styled.div<{ setting: boolean }>`
    font-size: 1rem;
    border-radius: 8px;
    width: 100%;
    cursor: pointer;
    transition: all 0.2s linear;
    visibility: ${({ setting }) => (setting ? '' : 'hidden')};
    &.active {
        background: ${({ theme }) => theme.bg1};
    }
    @media screen and (max-width: 375px) {
    }
`

const IconQuestion = styled.div`
    background: ${({ theme }) => theme.bg3};
    border-radius: 50%;
    border: 1px solid var(--border1);
    height: 18px;
    width: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 1px;
    cursor: default;
    font-style: initial;
    :hover {
        background: ${({ theme }) => theme.bg9};
        div {
            display: block;
        }
    }
`
const WarningText = styled.div`
    color: rgb(243, 132, 30);
    width: 100%;
    height: 15px;
    font-size: 15px;
    display: none;
    &.active {
        display: block;
    }
    &.warning {
        color: rgb(255, 0, 0);
    }
`
const Percent = styled.div`
    font-size: 16px;
    margin-left: 10px;
    &.red {
        color: red;
    }
`

const SlippageText = styled.div`
    position: absolute;
    top: 20px;
    z-index: 2;
    transform: translate3d(-40%, 25px, 0px);
    inset: 0px auto auto 0px;
    width: 256px;
    padding: 0.6rem 1rem;
    font-weight: 400;
    word-break: break-word;
    background: rgba(157, 195, 230, 0.8);
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: 1px solid ${({ theme }) => theme.bd1};
    backdrop-filter: blur(10px);
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 300;
    letter-spacing: 0.4px;

    display: none;

    ::before {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        border-top: 1px solid ${({ theme }) => theme.bd1};
        border-left: 1px solid ${({ theme }) => theme.bd1};
        transform: rotate(45deg);
        background: ${({ theme }) => theme.bg9};
        top: -5px;
        left: 42%;
        margin: auto;
    }
`

const WrapInputPercent = styled.div`
    border-radius: 5px;
    position: relative;
    span {
        color: rgb(243, 132, 30);
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translate(0, -50%);
        z-index: 1;
        display: none;
        &.active {
            display: block;
        }
    }
`

const Input = styled.input`
    height: 46px;
    position: relative;
    padding: 0px 0.5rem;
    flex: 1 1 0%;
    color: var(--main-color);
    align-items: center;
    border-radius: 4px;
    font-size: 1rem;
    text-align: left;
    width: auto;
    min-width: 1.5rem;
    outline: none;
    border: none;
    border-radius: 10px;
    background: #364453;
    &.red {
        color: rgb(255, 67, 67);
    }
    ::placeholder {
        color: ${({ theme }) => theme.text2};
    }
`
