import * as React from 'react'
import { MathJax } from 'better-react-mathjax/MathJax'
import { Paper} from '@mui/material';
import * as style from "./style/slide.module.css"
import { useBeforePrint } from './useBeforePrint';
import { LayoutsContext } from '../lecture/LecturePageContent';
import { PresentationContext } from './PresentationContext';

export type SlideProps =
{
    children?: React.ReactNode;
    direction?: "horizontal" | "vertical";
    noTitle?: boolean;
    horizontal? :boolean
    math?: boolean
    type?: "aside";
}

export const ScaleContext = React.createContext<number>(1);

export const Slide = ({children, math, type}: SlideProps) =>
{
    const ref = React.useRef<HTMLDivElement>(null);

    const [scale, setScale] = React.useState(1);

    React.useEffect(() => {
        const resizeObserver = new ResizeObserver((event) => {
            setScale(event[0].contentBoxSize[0].inlineSize / 1000);
        });
        if (ref.current)
            resizeObserver.observe(ref.current);
    });

    const layouts = React.useContext(LayoutsContext);
    const notes  = layouts?.indexOf("notes") !== -1;

    useBeforePrint(() => {
        if (ref.current)
            setScale(ref.current.clientWidth / 1000)      
    });
   
    const presentation = React.useContext(PresentationContext);

    if (type === "aside" && presentation)
        return <></>

    return (<>
        <Paper sx={{
            paddingBottom: presentation ? 0 : "56.25%", /* 16:9 */
            position:"relative",
            width: "100%",
            height: "100%",
            backgroundColor: "background.paper",
            color: "text.primary",
            border: (type === "aside") ? "5px solid" : "none",
            borderColor: "secondary.main"
        }} ref={ref} className={style.paper + " presentationSlide " + (!notes ? style.slidesOnlySlide :"")}>
            <section className={style.slide}>
                <ScaleContext.Provider value={scale}>
                    {children && (math ? <MathJax> {children}</MathJax> : <> {children}</>)}
                </ScaleContext.Provider>
            </section>
        </Paper>
    </>);
}
