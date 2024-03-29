import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { Row, Columns } from 'components/Layouts'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { Field, Token } from 'interfaces'
import { useSwapActionHandlers, useSwapState } from 'states/swap/hooks'
import PoolPriceBar from './PoolPriceBar'
import PrimaryButton from 'components/Buttons/PrimaryButton'
import LabelButton from 'components/Buttons/LabelButton'
import SwapIcon from 'assets/icons/down.svg'
import { useActiveWeb3React } from 'hooks'
import { usePair } from 'hooks/useAllPairs'
import Setting from 'components/HeaderLiquidity'
import { useTokenApproval } from 'hooks/useToken'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import WalletModal from 'components/WalletModal'

import { ALL_SUPPORTED_CHAIN_IDS, WRAPPED_NATIVE_COIN } from 'constants/index'
import {
    ROUTERS,
    SYNCSWAP_ROUTERS,
    WRAPPED_NATIVE_ADDRESSES,
} from 'constants/addresses'
import { divNumberWithDecimal, mulNumberWithDecimal } from 'utils/math'
import {
    useRouterContract,
    useSyncSwapRouterContract,
    useTokenContract,
} from 'hooks/useContract'
import {
    calcSlippageAmount,
    calcTransactionDeadline,
    computeGasLimit,
    isNativeCoin,
} from 'utils'
import { ZERO_ADDRESS } from 'constants/index'
import {
    useAppState,
    useSlippageTolerance,
    useTransactionDeadline,
} from 'states/application/hooks'
import { useTransactionHandler } from 'states/transactions/hooks'
import ComponentsTransaction, {
    InitCompTransaction,
} from 'components/TransactionModal'
import { sendEvent } from 'utils/analytics'
import Blur from 'components/Blur'
import { useOnClickOutside } from 'hooks/useOnClickOutSide'
import { OpacityModal } from 'components/Web3Status'
import { useEstimateGas } from 'hooks/useEstimateGas'
import { useSyncSwapPair } from 'hooks/useSyncSwapPair'
import { defaultAbiCoder } from 'ethers/lib/utils'
import STABLE_ABI from 'constants/jsons/stablePool.json'
import { ethers } from 'ethers'
import useDebounce from 'hooks/useDebounce'

const Trade = () => {
    const swapState = useSwapState()
    const [poolPriceBarOpen, setPoolPriceBarOpen] = useState(true)
    const { inputAmount, outputAmount, swapType, tokenIn, tokenOut } = swapState
    const { onUserInput, onSwitchTokens, onTokenSelection, onChangeSwapState } =
        useSwapActionHandlers()
    const { chainId, account, provider } = useActiveWeb3React()
    const [isOpenWalletModal, setIsOpenWalletModal] = useState(false)
    let pair = usePair(chainId, tokenIn, tokenOut)
    let isStable = false
    let routerContract = useRouterContract()
    let routerAddress = chainId ? ROUTERS[chainId] : undefined
    const [isLoading, setIsLoading] = useState(false)
    const syncPair = useSyncSwapPair(chainId, tokenIn, tokenOut)
    const syncSwapRouterContract = useSyncSwapRouterContract()
    const amountInStable = useDebounce(inputAmount, 600)
    const amountOutStable = useDebounce(outputAmount, 600)

    if (syncPair !== undefined) {
        pair = syncPair
        isStable = syncPair.isStable
        routerAddress = chainId ? SYNCSWAP_ROUTERS[chainId] : undefined
        routerContract = syncSwapRouterContract
    }

    const contractApprove = useTokenContract(tokenIn?.address)
    const tokenApproval = useTokenApproval(account, routerAddress, tokenIn)
    const balanceIn = useCurrencyBalance(account, tokenIn)
    const { deadline } = useTransactionDeadline()
    const { addTxn } = useTransactionHandler()
    const initDataTransaction = InitCompTransaction()
    const { slippage } = useSlippageTolerance()
    const ref = useRef<any>()

    const isInsufficientAllowance =
        Number(tokenApproval?.allowance) < Number(inputAmount) &&
        !isNativeCoin(tokenIn)

    useOnClickOutside(ref, () => {
        setIsOpenWalletModal(false)
    })

    const handleOnUserInput = useCallback(
        (field: Field, value: string) => {
            onUserInput(field, value)
        },
        [onUserInput, swapState],
    )

    const handleOnTokenSelection = useCallback(
        (field: Field, token: Token) => {
            onTokenSelection(field, token)
        },
        [onTokenSelection, swapState],
    )

    const getSyncSwapMethod = useCallback(() => {
        return 'swap'
    }, [])

    const getSwapMethod = useCallback(() => {
        if (swapType === Field.INPUT) {
            if (isNativeCoin(tokenIn)) return 'swapExactETHForTokens'
            else if (isNativeCoin(tokenOut)) return 'swapExactTokensForETH'
            else return 'swapExactTokensForTokens'
        } else {
            if (isNativeCoin(tokenOut)) return 'swapTokensForExactETH'
            else if (isNativeCoin(tokenIn)) return 'swapETHForExactTokens'
            else return 'swapTokensForExactTokens'
        }
    }, [swapType, tokenIn, tokenOut])

    const getSyncSwapArguments = useCallback(() => {
        if (
            !inputAmount ||
            !outputAmount ||
            !tokenIn ||
            !tokenOut ||
            !chainId ||
            !syncPair
        )
            return
        const token0 = isNativeCoin(tokenIn) ? ZERO_ADDRESS : tokenIn.address
        const amountIn = mulNumberWithDecimal(inputAmount, tokenIn.decimals)
        const token = isNativeCoin(tokenIn)
            ? WRAPPED_NATIVE_COIN[chainId]
            : tokenIn
        const swapData: string = defaultAbiCoder.encode(
            ['address', 'address', 'uint8'],
            [token.address, account, 1], // tokenIn, to, withdraw mode
        )

        const steps = [
            {
                pool: syncPair.tokenLp.address,
                data: swapData,
                callback: ZERO_ADDRESS,
                callbackData: '0x',
            },
        ]
        const paths = [
            {
                steps,
                tokenIn: token0,
                amountIn,
            },
        ]

        return {
            args: [
                paths,
                '0', //amountOutMin
                calcTransactionDeadline(deadline),
            ],
            value: isNativeCoin(tokenIn) ? amountIn : '0', //amountIn
        }
    }, [inputAmount, outputAmount, tokenIn, tokenOut, chainId])

    const getSwapArguments = useCallback(() => {
        if (!inputAmount || !outputAmount || !tokenIn || !tokenOut || !chainId)
            return
        const amountIn = mulNumberWithDecimal(inputAmount, tokenIn.decimals)
        const amountOut = mulNumberWithDecimal(outputAmount, tokenOut.decimals)
        const amountOutMin = mulNumberWithDecimal(
            calcSlippageAmount(outputAmount, slippage)[0],
            tokenOut.decimals,
        )
        const amountInMax = mulNumberWithDecimal(
            calcSlippageAmount(inputAmount, slippage)[1],
            tokenIn.decimals,
        )
        if (swapType === Field.INPUT) {
            if (isNativeCoin(tokenIn))
                return {
                    args: [
                        amountOutMin, //amountOutMin
                        [WRAPPED_NATIVE_ADDRESSES[chainId], tokenOut.address],
                        account,
                        calcTransactionDeadline(deadline),
                        ZERO_ADDRESS,
                    ],
                    value: amountIn, //amountIn
                }
            else if (isNativeCoin(tokenOut))
                return {
                    args: [
                        amountIn, //amountIn
                        amountOutMin, //amountOutMin
                        [tokenIn.address, WRAPPED_NATIVE_ADDRESSES[chainId]],
                        account,
                        calcTransactionDeadline(deadline),
                        ZERO_ADDRESS,
                    ],
                    value: '0x00',
                }
            else
                return {
                    args: [
                        amountIn, //amountIn
                        amountOutMin, //amountOutMin
                        [tokenIn.address, tokenOut.address],
                        account,
                        calcTransactionDeadline(deadline),
                        ZERO_ADDRESS,
                    ],
                    value: '0x00',
                }
        } else {
            if (isNativeCoin(tokenOut))
                return {
                    args: [
                        amountOut, //amountOut
                        amountInMax, //amountInMax
                        [tokenIn.address, WRAPPED_NATIVE_ADDRESSES[chainId]],
                        account,
                        calcTransactionDeadline(deadline),
                        ZERO_ADDRESS,
                    ],
                    value: '0x00',
                }
            else if (isNativeCoin(tokenIn))
                return {
                    args: [
                        amountOut, //amountOut
                        [WRAPPED_NATIVE_ADDRESSES[chainId], tokenOut.address],
                        account,
                        calcTransactionDeadline(deadline),
                        ZERO_ADDRESS,
                    ],
                    value: amountInMax, //amountInMax
                }
            else
                return {
                    args: [
                        amountOut, //amountOut
                        amountInMax, //amountInMax
                        [tokenIn.address, tokenOut.address],
                        account,
                        calcTransactionDeadline(deadline),
                        ZERO_ADDRESS,
                    ],
                    value: '0x00',
                }
        }
    }, [inputAmount, outputAmount, tokenIn, tokenOut, chainId])

    const argsEstimate = useMemo(() => {
        if (isInsufficientAllowance) {
            return {
                contract: contractApprove,
                method: () => {
                    return 'approve'
                },
                args: () => {
                    return {
                        args: [
                            routerAddress,
                            mulNumberWithDecimal(
                                inputAmount || '0',
                                tokenIn?.decimals || 18,
                            ),
                        ],
                        value: '0x',
                    }
                },
            }
        }

        return {
            contract: routerContract,
            method: getSwapMethod,
            args: getSwapArguments,
        }
    }, [
        isInsufficientAllowance,
        swapType,
        inputAmount,
        outputAmount,
        tokenIn,
        tokenOut,
        chainId,
        contractApprove,
    ])

    const gasEstimate = useEstimateGas(
        argsEstimate.contract,
        argsEstimate.method,
        argsEstimate.args,
    )
    const handleDataUser = ({
        hash,
        status,
        method,
    }: {
        hash: string
        status: boolean
        method: string
    }) => {
        addTxn({
            hash,
            msg: method,
            status,
        })

        const date =
            new Date().toDateString().split(' ')?.slice(1, 3).join(' ') +
            ' ' +
            new Date().toLocaleTimeString('vi')
    }

    const handleOnSwap = async () => {
        try {
            if (inputAmount && outputAmount && tokenIn && tokenOut) {
                initDataTransaction.setError('')
                initDataTransaction.setPayload({
                    method: 'swap',
                    input: inputAmount,
                    output: outputAmount,
                    tokenIn,
                    tokenOut,
                })
                initDataTransaction.setAddErc20({
                    address: tokenOut.address,
                    symbol: tokenOut.symbol,
                    decimals: tokenOut.decimals,
                    image: tokenOut.logoURI,
                })
                initDataTransaction.setIsOpenConfirmModal(true)
            }
        } catch (error) {
            console.log('failed to swap', error)
        }
    }

    const handleOnApprove = async () => {
        try {
            initDataTransaction.setError('')

            if (tokenIn && inputAmount && routerAddress) {
                initDataTransaction.setIsOpenWaitingModal(true)
                const callResult: any = await tokenApproval?.approve(
                    routerAddress,
                    mulNumberWithDecimal(inputAmount, tokenIn.decimals),
                )
                initDataTransaction.setIsOpenWaitingModal(false)
                initDataTransaction.setIsOpenResultModal(true)

                const txn = await callResult.wait()
                initDataTransaction.setIsOpenResultModal(false)

                handleDataUser({
                    hash: callResult.hash,
                    status: txn.status === 1 ? true : false,
                    method: `Approve ${tokenIn.symbol}`,
                })
            }
        } catch (err) {
            initDataTransaction.setError('Failed')
            initDataTransaction.setIsOpenWaitingModal(false)
            initDataTransaction.setIsOpenResultModal(true)
        }
    }

    const onConfirm = useCallback(async () => {
        try {
            initDataTransaction.setIsOpenConfirmModal(false)
            initDataTransaction.setIsOpenWaitingModal(true)

            const method = syncPair ? getSyncSwapMethod() : getSwapMethod()
            const swapArguments = syncPair
                ? getSyncSwapArguments()
                : getSwapArguments()

            if (!swapArguments) {
                initDataTransaction.setError('Failed')
                initDataTransaction.setIsOpenWaitingModal(false)
                return initDataTransaction.setIsOpenResultModal(true)
            }
            const { args, value } = swapArguments
            console.log({ swapArguments, method })
            console.log(routerContract)
            const gasLimit = await routerContract?.estimateGas[method](
                ...args,
                {
                    value,
                },
            )
            const callResult = await routerContract?.[method](...args, {
                value,
                gasLimit: computeGasLimit(gasLimit),
            })

            initDataTransaction.setIsOpenWaitingModal(false)
            initDataTransaction.setIsOpenResultModal(true)

            sendEvent({
                category: 'Defi',
                action: 'Swap',
                label: [
                    tokenIn?.symbol,
                    tokenIn?.address,
                    tokenOut?.symbol,
                    tokenOut?.address,
                ].join('/'),
            })

            const txn = await callResult?.wait?.()
            // initDataTransaction.setIsOpenResultModal(false)
            if (!txn) return

            handleDataUser({
                hash: txn.transactionHash || callResult.hash,
                status: txn.status === 1 ? true : false,
                method:
                    tokenIn && tokenOut
                        ? `Swap ${tokenIn.symbol}/${tokenOut.symbol}`
                        : 'Swap',
            })
            /**
             * @dev reset input && output state when transaction success
             */
            onUserInput(Field.INPUT, '')
            onUserInput(Field.OUTPUT, '')
        } catch (error) {
            initDataTransaction.setError('Failed')
            initDataTransaction.setIsOpenResultModal(true)
            console.log('error', error)
        }
    }, [initDataTransaction, isInsufficientAllowance])

    const openWalletModal = () => {
        setIsOpenWalletModal(!isOpenWalletModal)
    }

    useEffect(() => {
        if (
            amountInStable &&
            pair &&
            tokenIn &&
            tokenOut &&
            swapType === Field.INPUT &&
            chainId &&
            isStable
        ) {
            const amountInWithDel = mulNumberWithDecimal(
                amountInStable,
                tokenIn.decimals,
            )
            const poolContract = new ethers.Contract(
                pair.tokenLp.address,
                STABLE_ABI,
                provider,
            )
            setIsLoading(true)
            poolContract
                .getAmountOut(
                    tokenIn.address,
                    amountInWithDel,
                    account || ZERO_ADDRESS,
                )
                .then((res: any) => {
                    const amountOut = divNumberWithDecimal(
                        res,
                        tokenOut.decimals,
                    )
                    onChangeSwapState({
                        ...swapState,
                        outputAmount: amountOut,
                    })
                    setIsLoading(false)
                })
                .catch((err: any) => {
                    onChangeSwapState({
                        ...swapState,
                        outputAmount: '',
                    })
                    setIsLoading(false)
                    console.log(
                        'failed to fetch amount out of syncswap stable pool',
                        err,
                    )
                })
        }
    }, [
        amountInStable,
        chainId,
        pair?.reserve0,
        pair?.reserve1,
        pair?.reserveLp,
        pair?.tokenLp.address,
        isStable,
    ])

    useEffect(() => {
        if (
            inputAmount &&
            pair &&
            tokenIn &&
            tokenOut &&
            swapType === Field.INPUT &&
            chainId &&
            !isStable
        ) {
            const amountInWithDel = mulNumberWithDecimal(
                inputAmount,
                tokenIn.decimals,
            )
            const tI = isNativeCoin(tokenIn)
                ? WRAPPED_NATIVE_COIN[chainId]
                : tokenIn
            const tO = isNativeCoin(tokenOut)
                ? WRAPPED_NATIVE_COIN[chainId]
                : tokenOut
            const swapRate = pair?.calcSwapRate(
                amountInWithDel,
                tI,
                tO,
                Field.INPUT,
            )
            if (isNaN(Number(swapRate))) {
                onChangeSwapState({
                    ...swapState,
                    outputAmount: '',
                })
            } else {
                onChangeSwapState({
                    ...swapState,
                    outputAmount: swapRate,
                })
            }
            return
        }
        return () => {}
    }, [
        inputAmount,
        chainId,
        pair?.reserve0,
        pair?.reserve1,
        pair?.reserveLp,
        pair?.tokenLp.address,
        isStable,
    ])

    useEffect(() => {
        if (
            amountOutStable &&
            pair &&
            tokenIn &&
            tokenOut &&
            swapType === Field.OUTPUT &&
            chainId &&
            isStable
        ) {
            const amountOutWithDel = mulNumberWithDecimal(
                amountOutStable,
                tokenOut.decimals,
            )
            const poolContract = new ethers.Contract(
                pair.tokenLp.address,
                STABLE_ABI,
                provider,
            )
            setIsLoading(true)
            poolContract
                .getAmountIn(
                    tokenOut.address,
                    amountOutWithDel,
                    account || ZERO_ADDRESS,
                )
                .then((res: any) => {
                    const amountIn = divNumberWithDecimal(res, tokenIn.decimals)
                    onChangeSwapState({
                        ...swapState,
                        inputAmount: amountIn,
                    })
                    setIsLoading(false)
                })
                .catch((err: any) => {
                    onChangeSwapState({
                        ...swapState,
                        inputAmount: '',
                    })
                    setIsLoading(false)
                    console.log(
                        'failed to fetch amount in of syncswap stable pool',
                        err,
                    )
                })
        }
    }, [
        amountOutStable,
        chainId,
        pair?.reserve0,
        pair?.reserve1,
        pair?.reserveLp,
        pair?.tokenLp.address,
        isStable,
    ])

    useEffect(() => {
        if (
            outputAmount &&
            pair &&
            tokenIn &&
            tokenOut &&
            swapType === Field.OUTPUT &&
            chainId &&
            !isStable
        ) {
            const amountOutWithDel = mulNumberWithDecimal(
                outputAmount,
                tokenOut.decimals,
            )
            const tI = isNativeCoin(tokenIn)
                ? WRAPPED_NATIVE_COIN[chainId]
                : tokenIn
            const tO = isNativeCoin(tokenOut)
                ? WRAPPED_NATIVE_COIN[chainId]
                : tokenOut
            const swapRate = pair?.calcSwapRate(
                amountOutWithDel,
                tI,
                tO,
                Field.OUTPUT,
            )

            if (isNaN(Number(swapRate))) {
                onChangeSwapState({
                    ...swapState,
                    inputAmount: '',
                })
            } else {
                onChangeSwapState({
                    ...swapState,
                    inputAmount: swapRate,
                })
            }
        }
        return () => {}
    }, [
        outputAmount,
        chainId,
        pair?.reserve0,
        pair?.reserve1,
        pair?.reserveLp,
        pair?.tokenLp.address,
        isStable,
    ])

    const SwapButton = () => {
        const isNotConnected = !account
        const unSupportedNetwork =
            chainId && !ALL_SUPPORTED_CHAIN_IDS.includes(chainId)
        const isUndefinedAmount = !inputAmount && !outputAmount
        const isInffuficientLiquidity = !pair || Number(inputAmount) < 0
        const isUndefinedCurrencies = !tokenIn || !tokenOut
        const isInsufficientBalance =
            inputAmount && balanceIn && Number(balanceIn) < Number(inputAmount)

        return (
            <TradeFooter>
                {isNotConnected ? (
                    <PrimaryButton
                        name="Connect Wallet"
                        onClick={openWalletModal}
                        isLoading={isLoading}
                    />
                ) : unSupportedNetwork ? (
                    <LabelButton name="Unsupported network" />
                ) : isUndefinedCurrencies ? (
                    <LabelButton name="Select a token" />
                ) : isUndefinedAmount ? (
                    <LabelButton name="Enter an amount" />
                ) : isLoading ? (
                    <PrimaryButton
                        disabled
                        isLoading={true}
                        name="Getting Price"
                    />
                ) : isInsufficientBalance ? (
                    <LabelButton name="Insufficient Balance" />
                ) : isInffuficientLiquidity ? (
                    <LabelButton name="Insufficient Liquidity" />
                ) : isInsufficientAllowance ? (
                    <PrimaryButton
                        name={`Approve ${tokenIn?.symbol}`}
                        onClick={handleOnApprove}
                    />
                ) : (
                    <PrimaryButton
                        onClick={() => handleOnSwap()}
                        name={'Swap'}
                    />
                )}
            </TradeFooter>
        )
    }

    return (
        <>
            <>
                <ComponentsTransaction
                    data={initDataTransaction}
                    onConfirm={
                        Number(tokenApproval?.allowance) <
                            Number(inputAmount) && !isNativeCoin(tokenIn)
                            ? handleOnApprove
                            : onConfirm
                    }
                />
                {(initDataTransaction.isOpenConfirmModal ||
                    initDataTransaction.isOpenResultModal ||
                    initDataTransaction.isOpenWaitingModal) && <Blur />}
            </>
            <div className="wp-container">
                <SwapContainer ref={ref}>
                    {!account && isOpenWalletModal && (
                        <>
                            <WalletModal
                                setToggleWalletModal={setIsOpenWalletModal}
                            />
                            <OpacityModal
                                onClick={() => setIsOpenWalletModal(false)}
                            />
                            {/* <Blur /> */}
                        </>
                    )}
                    <TradeHeader jus="space-between">
                        <Nav gap="20px">
                            <Link to="/trade">Swap</Link>
                        </Nav>
                        <Setting />
                    </TradeHeader>
                    <TradeBody>
                        <CurrencyInputPanel
                            token={tokenIn}
                            value={inputAmount}
                            onUserInput={handleOnUserInput}
                            onUserSelect={handleOnTokenSelection}
                            field={Field.INPUT}
                            // disabledInput={isLoading}
                        />
                        <Icon>
                            <img
                                src={SwapIcon}
                                alt="icon"
                                onClick={onSwitchTokens}
                            />
                        </Icon>
                        <CurrencyInputPanel
                            token={tokenOut}
                            value={outputAmount}
                            onUserInput={handleOnUserInput}
                            onUserSelect={handleOnTokenSelection}
                            field={Field.OUTPUT}
                            hideMaxButton={true}
                            // disabledInput={isLoading}
                        />
                    </TradeBody>

                    {pair && (
                        <TradePriceFooter>
                            <PoolPriceBar
                                pair={pair}
                                dropDown={poolPriceBarOpen}
                                setDropDown={setPoolPriceBarOpen}
                                gasFee={
                                    gasEstimate
                                        ? Number(gasEstimate)?.toFixed(5)
                                        : gasEstimate
                                }
                            />
                        </TradePriceFooter>
                    )}
                    <SwapButton />
                </SwapContainer>
            </div>
        </>
    )
}

const SwapContainer = styled(Columns)`
    margin: 0 auto 40px;
    margin-top: 0;
    height: fit-content;
    width: 520px;
    border-radius: 16px;
    background: #1e2936;
    box-shadow: 0px 1px 1px 0px rgba(25, 19, 38, 0.05),
        0px 2px 12px -8px rgba(25, 19, 38, 0.1);
    padding: 18px 0px;
    gap: 30px;
    position: relative;
    z-index: 0;
    .wp-left {
        text-align: right;
    }

    @media (max-width: 576px) {
        width: 96%;
        overflow: hidden;
        padding: 20px 10px;
    }
`

const TradeHeader = styled(Row)`
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 18px;
    border-bottom: 1px solid #364453;
    @media only screen and (max-width: 662px) {
        padding: 0;
        padding-bottom: 18px;
    }
`

const Nav = styled(Row)`
    a {
        font-size: 24px;
        font-weight: 700;
        line-height: 129.7%;
        color: var(--main-color);
        :hover {
            text-decoration: none !important;
        }
    }

    .active-link {
        background: var(--bg6);
    }
`
const TradeBody = styled(Columns)`
    padding: 0 24px;
    gap: 30px;
    @media only screen and (max-width: 662px) {
        padding: 0;
    }
`
const TradePriceFooter = styled.div`
    padding: 0 24px;
    @media only screen and (max-width: 662px) {
        padding: 0;
    }
`

const TradeFooter = styled(Row)`
    padding: 0 24px;
    @media only screen and (max-width: 662px) {
        padding: 0;
    }
`
const Icon = styled.div`
    width: 36px;
    height: 36px;
    margin: -20px auto;
    cursor: pointer;
    border-radius: 50%;
    -webkit-transition: all ease-in-out 0.3s;
    transition: all ease-in-out 0.3s;
    /* background: var(--bg4); */
    border: none;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    z-index: 1;
    background: transparent;
    border: 1px solid var(--main-color);
    border-radius: 50%;
    :hover {
        transform: rotate(180deg);
    }
    img {
        width: 25px;
    }
`

export default Trade
