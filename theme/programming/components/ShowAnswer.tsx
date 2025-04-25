import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import * as styles from "./showAnswer.module.css";

export const ShowAnswer = ({children, title}: {children: React.ReactNode, title?: string}) =>
{
    const [visible, setVisible] = React.useState(false);
    title = title || "Show Answer";

    return <div>
        <Button className={styles.button} sx={{display: "inline-block", margin: 1}} onClick={() => setVisible(!visible)}>{visible ? "Hide Answer" : title}</Button>
        <Paper className={styles.answer} sx={{display: visible ? "block" : "none", backgroundColor: "info.light", color: "info.contrastText", padding: 1}}>
            <div className={styles.printOnly}>
                <p><strong>{title}:</strong> This answer is hidden by default, but is included in the PDF</p>
            </div>
            {children}
        </Paper>
    </div>
}