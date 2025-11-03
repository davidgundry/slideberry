import * as React from "react";
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import * as styles from "./keyPoint.module.css"

export const KeyPoint = ({children}: {children: React.ReactNode}) =>
{
    return <div className={styles.keyPoint}>
        <div>
            <LightbulbIcon style={{height: "1.5em", width: "1.5em"}} />
        </div>
        <div>
            {children}
        </div>
    </div>
}