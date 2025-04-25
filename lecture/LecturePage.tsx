import * as React from "react"
import { App } from "../app/App";
import { LectureHeaderContent } from "./LectureHeaderContent";
import { FullscreenSlides } from "../slides/FullscreenSlides";
import { LecturePageContent, LecturePageLayouts } from "./LecturePageContent";
import { useHeadings } from "./useHeadings";
import { useFullScreen } from "./useFullScreen";
import * as lectureStyles from "./style/lecture.module.css";
import { Slide } from "../slides/Slide";
import { MetadataContext } from "./SectionContext";
import { PageType, TopicMetadata } from "../app/Metadata";
import { MathContext } from "../pagecontent/math/Math";

type LecturePageProps = {
    children: React.ReactElement | React.ReactElement[]
    metadata: TopicMetadata
    pageType?: PageType
    topLevel?: boolean,
}

const fullScreenStyle: React.CSSProperties = {
    visibility: "hidden",
    height: 0,
    overflow: "hidden",
}

const normalStyle: React.CSSProperties  = {
    visibility: "visible",
    height: "auto",
    overflow: "inherit"
}

export const LecturePage = ({children, metadata, pageType, topLevel} : LecturePageProps) =>
{
    const [layouts, setLayouts] = React.useState<Array<LecturePageLayouts>>(["toc", "notes", "slides"]);
    const presentation = React.createRef<HTMLDivElement>();
    const [isFullScreen, setIsFullScreen] = useFullScreen(presentation.current);
    const headings = useHeadings(layouts);

    if (layouts.indexOf("slides") !== -1 && layouts.indexOf("notes") === -1)
        usePageCSS("16cm 9cm", "0")
    else
        usePageCSS("auto", "2cm")

    
    React.useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        if (queryParameters.get("slides"))
            setLayouts(["slides"]);
    }, []);
        
    const inHeader = <LectureHeaderContent layouts={layouts} hasTOC={headings.length > 0} enterPresentMode={() => setIsFullScreen(true)} setLayouts={setLayouts} />

    const m = {...metadata}

    return <>
        <MathContext>
            { isFullScreen && 
                <div ref={presentation} className={lectureStyles.lecture} style={{visibility: isFullScreen ? "visible" : "hidden"}}>
                    <FullscreenSlides>
                        { React.Children.map(children, c => findSlide(c) )}
                    </FullscreenSlides>
                </div> }
            <div style={isFullScreen ? fullScreenStyle : normalStyle}>
                <App inHeader={inHeader} metadata={m} pageType={pageType} topLevel={topLevel}>
                    <MetadataContext.Provider value={metadata} >
                        <LecturePageContent layouts={layouts} headings={headings}>    
                            {layouts.indexOf("notes") !== -1 && <h1 className={lectureStyles.printOnlyTitle}>{metadata.module}</h1> }
                            {children}
                        </LecturePageContent>
                    </MetadataContext.Provider>
                </App>
            </div>
        </MathContext>
    </>
}

function findSlide(node: React.ReactElement): React.ReactNode
{
    if (node && node.type === Slide)
        return node

    const result: React.ReactNode[] = []
    React.Children.forEach(node, c => result.push(c)) //TODO: this will not look recursively

    return <> {result} </>
}

function addStyleFunction() {
    const style = document.createElement('style');
    document.head.appendChild(style);
    return function (rule: string) {
        style.innerHTML = rule;
    };
}

function usePageCSS(size: string, margin: string) {

    const [styleFunction, setStyleFunction] = React.useState<({func: (rule: string) => void}) | null>(null);

    React.useEffect(() => 
    {
        setStyleFunction({func: addStyleFunction()});
    }, []);

    if (styleFunction)
        styleFunction.func(`@page { size: ${size}; margin: ${margin};}`);
}
