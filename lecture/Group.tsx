import * as React from "react";
import { Section, SectionProps } from "./Section";
import Grid from '@mui/material/Grid'; // Grid version 1
import Sticky from 'react-sticky-el';
import { Slide, SlideProps } from "../slides/Slide";
import { useWindowWidth } from '@react-hook/window-size'
import { LayoutsContext } from "./LecturePageContent";

import * as styles from "./style/group.module.css"
import { PresentationContext } from "../slides/PresentationContext";

type GroupProps = {
    children: React.ReactElement<SectionProps> | React.ReactElement<SlideProps> | (React.ReactElement<SectionProps> | React.ReactElement<SlideProps>)[]
    sticky?: boolean
}

const leftWidth = 5.5
const rightWidth = 6.5;
const swapSides = false;

export const Group = ({children, sticky}: GroupProps) =>
{
    const left: React.ReactElement<SectionProps>[] = [];
    const right: React.ReactElement<SlideProps>[] = [];
    const presentation = React.useContext(PresentationContext);

    React.Children.forEach(children, (c) =>
    {
        if (c.type === Section)
            left.push(c)
        if (c.type === Slide)
            right.push(c as React.ReactElement<SlideProps>)
    })

    if (presentation)
        return <>{right}</>

    if (left.length > 0 && right.length > 0)
    {
        return <Grid container spacing={0} direction={swapSides ? "row-reverse" : "row"} className={styles.group + " group"} sx={{marginTop:3}} justifyContent="space-between">
                    <Left>{left}</Left>
                    <Right sticky={sticky || false}>{right}</Right>
                </Grid>
    }
    else
        return <Grid container spacing={0} className="group">{left}{right}</Grid>
}

type LeftProps = {
    children: React.ReactElement<SectionProps> | React.ReactElement<SectionProps>[]
}    

const Left = ({children}: LeftProps) =>
{
    const layouts = React.useContext(LayoutsContext);
    const notes  = layouts?.indexOf("notes") !== -1;
    const slides  = layouts?.indexOf("slides") !== -1;

    return <Grid container item xs={12} xl={slides ? leftWidth : 12} sx={{display: notes ? "flex" : "none", minWidth: 0, overflow:"auto"}}>{children}</Grid>
}

type RightProps = {
    children: React.ReactElement<SlideProps> | React.ReactElement<SlideProps>[];
    sticky?: boolean
}

const Right = ({children, sticky}: RightProps) =>
{
    const layouts = React.useContext(LayoutsContext);
    const notes  = layouts?.indexOf("notes") !== -1;
    const slides  = layouts?.indexOf("slides") !== -1;
    const windowWidth = useWindowWidth()
    
    const disabled = !notes || windowWidth < 1536;
    const useSticky = sticky || false;

    return <Grid container item xs={12} xl={notes ? rightWidth : 12}  sx={{display: slides ? "flex" : "none"}} justifyContent="space-around">
            <div style={{flexGrow: 1}}>
                {React.Children.map(children, (c, i) =>
                    <div className={styles.right} key={i}>
                    { useSticky ? <Sticky boundaryElement=".group" hideOnBoundaryHit={false}  topOffset={-440} bottomOffset={-100} stickyStyle={{top: 78,  zIndex:2}} disabled={disabled}>
                            {c}
                        </Sticky> : <div>{c}</div> }
                    </div>)}
                </div>
        </Grid>
}
