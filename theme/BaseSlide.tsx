import * as React from "react"
import { ScaleContext } from "../slides/Slide";

export const BaseSlide = ({children, styles, fontScale, style} : {children: React.ReactNode, styles: string[], fontScale: number, style?: React.CSSProperties}) =>
    {
        const scale = React.useContext(ScaleContext);
        style = { fontSize: fontScale * scale, ...style }
    
        return <>
            <div className={[...styles].join(" ")} style={style}>
                <div>
                    {children}
                </div>
            </div>
        </>
    }