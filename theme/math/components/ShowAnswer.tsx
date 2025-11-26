import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export const ShowAnswer = ({children, title}: {children: React.ReactNode, title?: string}) =>
{
    const [visible, setVisible] = React.useState(false);
    title = title || "Show Answer";

    return <div>
        <Button sx={{display: "inline-block", margin: 1}} onClick={() => setVisible(!visible)}>{visible ? "Hide Answer" : title}</Button>
        <Paper sx={{display: visible ? "block" : "none", backgroundColor: "info.light", color: "info.contrastText", padding: 1}}>
            {children}
        </Paper>
    </div>
}