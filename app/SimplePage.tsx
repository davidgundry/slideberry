import * as React from "react"
import { App } from "./App"
import Paper from "@mui/material/Paper"
import { Metadata } from "./Metadata"

export const SimplePage = ({children, metadata, topLevel}: {children: React.ReactNode, metadata: Metadata, topLevel?: boolean}) => {

  return <App metadata={metadata} topLevel={topLevel}>
        <main>
            <Paper sx={{
                    flexGrow: 1,
                    backgroundColor: "background.paper",
                    color: "text.primary",
                    marginBottom: 2,
                }}>
                {children}
            </Paper>
        </main>
    </App>
}
