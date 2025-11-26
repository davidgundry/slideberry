import * as React from "react";
import Paper from "@mui/material/Paper"
import * as styles from "./task.module.css"

export const Task = ({children}: {children: React.ReactNode}) =>
{
	return <Paper className={styles.task} sx={{backgroundColor: "info.main", color: "info.contrastText", padding: 1}}>{children}</Paper>
}