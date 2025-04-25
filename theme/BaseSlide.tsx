import * as React from "react"
import { ScaleContext } from "../slides/Slide";

export const BaseSlide = ({children, styles, fontScale} : {children: React.ReactNode, styles: string[], fontScale: number}) =>
{
    const scale = React.useContext(ScaleContext);
    const style: React.CSSProperties = { fontSize: fontScale * scale }

    return <>
        <div className={[...styles].join(" ")} style={style}>
            <div>
                {children}
            </div>
        </div>
    </>
}
