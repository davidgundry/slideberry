import * as React from "react";
import Paper from "@mui/material/Paper"
import * as boxStyles from "../boxes.module.css"

export const Task = ({children}: {children: React.ReactNode}) =>
{
	return <Paper className={boxStyles.infoBox} sx={{backgroundColor: "info.main", color: "info.contrastText", padding: 1, margin: 1}}>{children}</Paper>
}