import * as React from "react";
import { PresentationContext } from "./PresentationContext";
import * as style from "./style/fullscreen.module.css"

export const FullscreenSlides = ({children}: {children: React.ReactNode}) =>
{
    return <div className={style.fullscreenSlides}>
        <PresentationContext.Provider value={true}>
            {children}
        </PresentationContext.Provider>
    </div>
}
