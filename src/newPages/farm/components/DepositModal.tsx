import PrimaryButton from 'components/Buttons/PrimaryButton'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { Columns, Row } from 'components/Layouts'
import SingleModal from 'components/Modal/SingleModal'
import { useActiveWeb3React } from 'hooks'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useToken } from 'hooks/useToken'
import { Field } from 'interfaces'
import styled from 'styled-components'

const DepositModal = ({
    lp,
    onDeposit,
    isOpen,
    setIsOpen,
    value,
    setValue,
}: {
    lp: string | undefined
    onDeposit: () => void
    isOpen: boolean
    setIsOpen: (bool: boolean) => void
    value: string
    setValue: (v: string) => void
}) => {
    const lpToken = useToken(lp)
    const { account } = useActiveWeb3React()
    const balance = useCurrencyBalance(account, lpToken)

    const handleInput = (field: Field, value: string) => {
        setValue(value)
    }

    const ModalContent = (onClose: () => void) => {
        return (
            <ModalContainer>
                <ModalHeader jus="center" className="Stake_Token">
                    <span>Stake Lp Token</span>
                </ModalHeader>
                <ModalBody>
                    <InputWrapper>
                        {
                            <CurrencyInputPanel
                                token={lpToken}
                                value={value}
                                onUserInput={handleInput}
                                onUserSelect={() => {}}
                                field={Field.INPUT}
                                hideMaxButton={false}
                                disabledSelect={true}
                            />
                        }
                    </InputWrapper>
                    <PrimaryButton
                        name="Confirm"
                        onClick={onDeposit}
                        disabled={
                            !balance ||
                            !value ||
                            Number(balance) < Number(value)
                        }
                    />
                </ModalBody>
            </ModalContainer>
        )
    }

    return (
        <SingleModal
            children={ModalContent}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        />
    )
}

const ModalContainer = styled.div`
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #fff;
    background: #1e2936;
`

const InputWrapper = styled(Row)`
    border: 1px solid var(--border1);
    border-radius: 12px;
    overflow: hidden;
    margin-top: 10px;
`

const ModalBody = styled(Columns)`
    gap: 20px;
`

const ModalHeader = styled(Row)`
    font-size: 24px;
    font-weight: 600;
    color: var(--main-color);
    margin-bottom: 15px;
`

export default DepositModal
