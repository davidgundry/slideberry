import * as React from "react";
import slugify from "slugify";
import { LayoutsContext } from "./LecturePageContent";
import { Paper} from '@mui/material';
import { MathJax } from 'better-react-mathjax/MathJax'
import * as lectureStyles from "./style/lecture.module.css";
//import { ReactionButtons } from "../telemetry/ReactionButtons";
import { SectionContext } from "./SectionContext";

export type SectionProps = 
{
    hideInNav?: boolean,
    hideCheck?: boolean,
    children?: React.ReactNode,
    h1?: string,
    h2?: string,
    h3?: string,
    h4?: string,
    lo?: string[], //Learning outcomes
    type?: "section" | "aside" | "example" | "question" | "challenge",
    math? : boolean
}

export const Section = ({children, h1, h2, h3, h4, type, hideCheck, hideInNav, math}: SectionProps) =>
{
    const layouts = React.useContext(LayoutsContext);
    if (layouts)
    {
        const notes  = layouts.indexOf("notes") !== -1;
        if (!notes)
            return <></>
    }

    const heading: string = h1|| h2 || h3 || h4 || "";
    const slug = sectionSluggify(heading)

    return <>
        <Paper className={lectureStyles.paperSection} sx={{
                flexGrow: 1,
                backgroundColor: typeBackgroundColour(type),
                color: typeColour(type),
                padding: 1,
            }}>
            <SectionContext.Provider value={slug}>
                <section>
                    {h1 && <h1 id={sectionSluggify(h1)} className={hideInNav ? "" : "showInTOC"}>{h1}</h1> }
                    {h2 && <h2 id={sectionSluggify(h2)} className={hideInNav ? "" : "showInTOC"}>{h2}</h2> }
                    {h3 && <h3 id={sectionSluggify(h3)} className={hideInNav ? "" : "showInTOC"}>{h3}</h3> }
                    {h4 && <h4 id={sectionSluggify(h4)} className={hideInNav ? "" : "showInTOC"}>{h4}</h4> }

                    {math ? <MathJax>{children}</MathJax> : <>{children}</> }

                    {/*{hideCheck !== true && <ReactionButtons slug={slug} /> }*/}
                </section>
            </SectionContext.Provider>
        </Paper>
    </>
}


function typeColour(type: string | undefined)
{
    if (type === "question")
        return "primary.contrastText"
    if (type === "aside")
        return "secondary.contrastText"
    if (type === "example")
        return "secondary.contrastText"
    if (type === "challenge")
        return "secondary.contrastText"
    return "text.primary";
}

function typeBackgroundColour(type: string | undefined)
{
    if (type === "question")
        return "primary.main"
    if (type === "aside")
        return "secondary.main"
    if (type === "example")
        return "secondary.main"
    if (type === "challenge")
        return "secondary.main"
    return "background.paper";
}

export function sectionSluggify(name: string): string
{
    return "a" + slugify(name, {remove: /('|\?|:|\.)/});
}