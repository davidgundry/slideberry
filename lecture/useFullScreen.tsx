import * as React from "react"

export function useFullScreen(presentation: HTMLElement | null): [boolean, (setIsFullScreen: boolean) => void]
{
    const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);

    const setter = (goFullscreen: boolean) =>
    {
        if (goFullscreen)
        {
            document.documentElement.requestFullscreen();
            if (presentation)
                presentation.focus();
            setIsFullScreen(true);
        }
        else
            exitHandler();
    }

    const exitHandler = React.useCallback(() => {
        
        if (document.fullscreenElement === null && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
            setIsFullScreen(false); 
    }, []);

    React.useEffect(() => {
        document.addEventListener('fullscreenchange', exitHandler, false);
        document.addEventListener('mozfullscreenchange', exitHandler, false);
        document.addEventListener('MSFullscreenChange', exitHandler, false);
        document.addEventListener('webkitfullscreenchange', exitHandler, false);
        return () => {
            document.removeEventListener('fullscreenchange', exitHandler);
            document.removeEventListener('mozfullscreenchange', exitHandler);
            document.removeEventListener('MSFullscreenChange', exitHandler);
            document.removeEventListener('webkitfullscreenchange', exitHandler);
        };
    }, []);
    
    return [isFullScreen, setter]
}
