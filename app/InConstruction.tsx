import * as React from "react"
import HandymanIcon from "@mui/icons-material/Handyman"
import Box from "@mui/material/Box"

export const InConstruction = () =>
{
    return <Box data-testid="construction" sx={{padding: 2}}>
        <HandymanIcon/>
        <h2>Oops, my bad</h2>
        <p>I'm still working on this page. It'll be ready soon!</p>
    </Box>
}