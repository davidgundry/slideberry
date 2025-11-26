import * as React from "react"
import { ScaleContext } from "../../slides/Slide";
import * as styles from "./math.module.css"

type CentreSlideProps =
{
    children?: React.ReactNode
    header?: React.ReactNode
    footer?: React.ReactNode
    backgroundImage?: string
    backgroundColor?: string
    color?: string
    columns?: boolean
}

export const CentreSlide = ({children, header, footer, backgroundImage, backgroundColor, color, columns} : CentreSlideProps) =>
{
    const scale = React.useContext(ScaleContext);
    const style = { fontSize: 28 * scale } as React.CSSProperties

    if (backgroundColor)        
        style.backgroundColor = backgroundColor;
    if (color)        
        style.color = color;
    if (backgroundImage)        
        style.backgroundImage = `url(${backgroundImage})`;

    const mainStyle = {
        top: header ? "20%" : "10%",
        left: "5%",
        right: "5%"
    } as React.CSSProperties

    if (columns)
    {
        mainStyle.display = "flex";
        mainStyle.flexDirection= "row"
        mainStyle.justifyContent = "space-evenly"
    }

    return <>
        <div className={[styles.centre, styles.common].join(" ")} style={style}>
            <header>
                {header}
            </header>
            <main style={mainStyle}>
                {children}
            </main>
            <footer>{footer}</footer>
        </div>
    </>
}