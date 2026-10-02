import logoImg from '../../assets/StockLite.png';

interface LogoProps {
    logoStyle: string
    imgSize: number,
    textStyle: string,
    secondTextColor: string
}

function Logo ({logoStyle, imgSize, textStyle, secondTextColor}: LogoProps) {

    return (
        <div className={logoStyle}>
            <img src={logoImg} alt="StockLite-Logo" height={imgSize} width={imgSize}/>
            <p className={textStyle}>Stock<span className={secondTextColor}>Lite</span></p>
        </div>
    )

}
export default Logo