import { ToggleButtonGroup, ToggleButton } from "@mui/material"
import React from "react"
import SlideShowIcon from '@mui/icons-material/Slideshow';
import RuleIcon from '@mui/icons-material/Rule';
import DescriptionIcon from '@mui/icons-material/Description';
import PresentationIcon from '@mui/icons-material/CoPresent';
import { LecturePageLayouts } from "./LecturePageContent";

type LectureHeaderContentProps =
{
    layouts: LecturePageLayouts[]
    hasTOC: boolean
    enterPresentMode: () => void
    setLayouts: (newLayouts: LecturePageLayouts[]) => void
}

export const LectureHeaderContent = ({layouts, enterPresentMode, setLayouts, hasTOC}: LectureHeaderContentProps ) =>
{
    const handleLayoutChange = React.useCallback((event: React.MouseEvent<HTMLElement>, newLayouts: LecturePageLayouts[] ) => {
        if (!(newLayouts.length === 0 || (newLayouts.length === 1 && newLayouts[0] === "toc")))
            setLayouts(newLayouts);
    }, []);

    return  <>
        <ToggleButtonGroup
            value={layouts}
            onChange={handleLayoutChange}
            aria-label="layout sections visible"
            exclusive={false}
            sx={{alignSelf:"right"}} 
        >
            {hasTOC ?
                <ToggleButton data-testid="tocButton" value="toc" aria-label="Table of Contents" >
                    <RuleIcon htmlColor="white" />
                </ToggleButton> : <div style={{width: "47px"}}></div> }
            <ToggleButton value="notes" aria-label="Notes">
                <DescriptionIcon htmlColor="white" />
            </ToggleButton>
            <ToggleButton value="slides" aria-label="Slides">
                <SlideShowIcon htmlColor="white" />
            </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButton value={false} component="button" onChange={enterPresentMode} aria-label="presentation mode" sx={{marginLeft: 1}} >
            <PresentationIcon htmlColor="white" />
        </ToggleButton>
    </>
}

// Necessary because error with MUI means that ToggleButtonGroup tries to pass fullWidth to <ToggleButton>
const consoleError = console.error;
const SUPPRESSED_ERRORS = ['React does not recognize the `%s` prop on a DOM element.'];
console.error = (msg, ...args) => {
    if (!SUPPRESSED_ERRORS.some((entry) => msg && msg.includes(entry))) {
        consoleError(msg, ...args);
    }
};
