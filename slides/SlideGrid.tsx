import * as React from "react";
import { PresentationContext } from "./PresentationContext";
import * as style from "./style/slideGrid.module.css"

export const SlideGrid = ({children}: {children: React.ReactNode}) =>
{
    return <div className={style.slideGrid}>
        <PresentationContext.Provider value={true}>
            {children}
        </PresentationContext.Provider>
    </div>
}