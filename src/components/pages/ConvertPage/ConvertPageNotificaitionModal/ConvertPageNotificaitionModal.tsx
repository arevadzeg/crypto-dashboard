import SuccessModal from "../../../ul/SuccessModal/SuccessModal"


interface ConverPageNotificaitionModalProps {
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    conversionResult: {
        from: string;
        to: string;
        amount: string;
        result: string;
    } | null

}

const ConvertPageNotificaitionModal = ({ isModalVisible, setIsModalVisible, conversionResult }: ConverPageNotificaitionModalProps) => {

    return <SuccessModal
        title="🎉 Conversion Successful! 🎉"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        content={
            conversionResult && (
                <p>
                    Successfully converted {conversionResult.amount} {conversionResult.from} to {' '}
                    <strong>
                        {conversionResult.result} {conversionResult.to}
                    </strong>
                </p>
            )
        }
    />
}

export default ConvertPageNotificaitionModal