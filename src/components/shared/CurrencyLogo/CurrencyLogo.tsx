
interface CurrencyLogoProps {
    id: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    className?: string;
}

const CurrencyLogo = ({
    id,
    alt,
    width = 20,
    height = 20,
    className,
}: CurrencyLogoProps) => {

    return (
        <img
            src={`/src/assets/png/${id}.png`}
            alt={alt}
            width={width}
            height={height}
            className={className}
        />
    );
};

export default CurrencyLogo;