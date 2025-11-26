import * as React from "react";
import * as styles from "./slideBox.module.css"

export const SlideBox = ({children, title, type}: {children: React.ReactNode, title?: string, type?: "example" | "warning" | "task" | "aside" | "good"}) =>
{
        let colour = "inherit";
        let bgColour = "#eeeeee";
        if (type === "example")
            bgColour = "#BCF4DE";
        if (type === "warning")
            bgColour = "#FFD6DD";
        if (type === "task")
            bgColour = "#ffffaa";
        if (type === "good")
            bgColour = "#A7F1A7";
        if (type === "aside")
            bgColour = "#EECDF4";
        colour = "black"
	return  <div className={styles.slideBox} style={{backgroundColor: bgColour, color: colour}}>
        {title && <h4 style={{marginTop: "0.2em"}}>{title}</h4>}
        {children}
        </div>
}