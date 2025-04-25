import * as React from "react"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import AppBar from "@mui/material/AppBar"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "gatsby"
import * as appStyles from "./app.module.css"

export const MyAppBar = ({title, inHeader, backTo}: {title: string, inHeader?: React.ReactNode, backTo?: string}) =>
{
    return <AppBar className={appStyles.hideInPrint} position="fixed">
        <Toolbar style={{ display: 'flex', justifyContent: 'flex-start' }}>

            {backTo !== undefined &&
                <IconButton data-testid="appBarLink" component={Link} to={backTo}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="back"
                    sx={{ mr: 2 }}
                ><ArrowBackIcon /></IconButton>}

            <Typography data-testid="appBarTitle" variant="h6" noWrap sx={{ mr: 3 }}>{title}</Typography>

            {inHeader}

        </Toolbar>
    </AppBar>
}