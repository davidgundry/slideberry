import * as React from "react";
import Paper from "@mui/material/Paper"

export const Task = ({children}: {children: React.ReactNode}) =>
{
	return <Paper sx={{backgroundColor: "info.main", color: "info.contrastText", padding: 1}}>{children}</Paper>
}