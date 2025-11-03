import * as React from "react"
import * as styles from "./math.module.css"
import { BaseSlide } from "../BaseSlide";
import QRCode from "react-qr-code";
import { useLocation } from '@reach/router';

const fontScale = 28

type TitleSlideProps = 
{
    metadata: {
        title?: string, 
        module?: string, 
        number?: number,
        author?: string
    }
    children?: React.ReactNode
    practical?: boolean
}

export const TitleSlide = ({metadata, children, practical}: TitleSlideProps) =>
{
    const [qrCode, setQRCode] = React.useState<string>()

    const href = useLocation().href;
    React.useEffect(() =>
    {
        setQRCode(href);
    })

    return (
        <BaseSlide styles={[styles.title, styles.common]} fontScale={fontScale}>
            <div className={styles.qrCode}>
                {qrCode ? <QRCode value={qrCode} 
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 256 256`}/> : <></>}
                    {/* <p>{href}</p> */}
            </div>

            <div className={styles.right}>
                <div>
                    <h1>{metadata.module}</h1>
                </div>
                <div>
                    <h2>{metadata.number !== undefined && <>{metadata.number}.</>} {metadata.title}</h2>
                </div>
                <p>{metadata.author}</p>
            </div>
            { children } 
        </BaseSlide>);
}

export const HeadSlide = ({children} : {children: React.ReactNode}) =>
{
    return <BaseSlide styles={[styles.sectionHead, styles.common]} fontScale={fontScale}>
        {children}
    </BaseSlide>
}

export const MainSlide = ({children} : {children: React.ReactNode}) =>
{
    return <BaseSlide styles={[styles.normal, styles.common]} fontScale={fontScale}>
        {children}
    </BaseSlide>
}

export const FullSlide = ({children} : {children: React.ReactNode}) =>
{
    return <BaseSlide styles={[styles.full, styles.common]} fontScale={fontScale}>
        {children}
    </BaseSlide>
}

export const Columns = ({children}: {children: React.ReactNode}) =>
{
    return <div className={styles.columns}>{children}</div>
}

export { CentreSlide } from "./CentreSlide";
