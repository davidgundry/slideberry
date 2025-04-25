import * as React from "react";

// based on code from https://stackoverflow.com/a/11060206
export function useBeforePrint(callback: () => void)
{
    React.useEffect(() => {

        const changeEvent = (ev: MediaQueryListEvent) => {
            if (ev.matches)
                callback();
        };

        if (window.matchMedia) {
            const mediaQueryList = window.matchMedia('print');
            mediaQueryList.addEventListener("change", changeEvent); 
        }

        window.addEventListener("beforeprint", callback);

        return () =>
        {
            if (window.matchMedia) {
                const mediaQueryList = window.matchMedia('print');
                mediaQueryList.removeEventListener("change", changeEvent);
            }
            window.removeEventListener("beforeprint", callback);
        }
    }, [callback])
}

// based on code from https://stackoverflow.com/a/11060206
export function useAfterPrint(callback: () => void)
{
    React.useEffect(() => {

        const changeEvent = (ev: MediaQueryListEvent)  => {
            if (!ev.matches)
                callback();
        }

        if (window.matchMedia) {
            const mediaQueryList = window.matchMedia('print');
            mediaQueryList.addEventListener("change", changeEvent);
        }
        
        window.addEventListener("afterprint", callback);

        return () =>
        {
            if (window.matchMedia) {
                const mediaQueryList = window.matchMedia('print');
                mediaQueryList.removeEventListener("change", changeEvent);
            }
            window.removeEventListener("afterprint", callback);
        }
    }, [callback])
}