import * as React from "react"
import Grid from '@mui/material/Grid';
import { MathContext } from "../pagecontent/math/Math";
import prefix from 'react-prefixer';
import { useHeadsObserver } from "../hooks";
import TableOfContents from "./TableOfContents";
import { HeadingData } from "./useHeadings";
import * as lectureStyles from "./style/lecture.module.css";

export const LayoutsContext = React.createContext<Array<string> | undefined>(undefined);

export type LecturePageLayouts = "toc" | "notes" | "slides";

type LecturePageContentProps = {
    children: React.ReactNode,
    layouts: LecturePageLayouts[]
    headings: HeadingData[]
}

export const LecturePageContent = ({children, layouts, headings}: LecturePageContentProps) =>
{
    const tocOpen = (layouts.indexOf("toc") !== -1) && headings.length > 0;

    const tocStyle: React.CSSProperties = prefix({
        position: "sticky",
        height: "calc( 100vh - 78px - 56px)",
        overflow: "auto", 
        top:78, 
        display: tocOpen ? "block" : "none" 
    })

    const {activeId} = useHeadsObserver()

    return <Grid container spacing={2}>
        <Grid className={lectureStyles.tableOfContents} item xs={12} lg={tocOpen ? 3 : 0}>
            <nav data-testid="tableOfContents" className={lectureStyles.nav} style={tocStyle}>
                <TableOfContents headings={headings} currentSection={activeId} />
            </nav>
        </Grid>

        <Grid className={lectureStyles.contentGrid} item xs={12} lg={tocOpen ? 9 : 12 }>
            <LayoutsContext.Provider value={layouts}>
                <MathContext>
                    <main className={lectureStyles.lecture}>
                        {children}
                    </main>
                </MathContext>
            </LayoutsContext.Provider>
        </Grid>
    </Grid>
}