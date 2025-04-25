import { ThemeProvider } from "@mui/material/styles";
import { useMediaQuery, createTheme, } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import { MyAppBar } from "./MyAppBar";
import { InConstruction } from "./InConstruction";
import { MyBottomNavigation } from "./MyBottomNavigation";
import Paper from "@mui/material/Paper";
import * as appStyles from "./app.module.css"
// import { DataConsent } from "../telemetry/DataConsent";
// import { SessionManager, SessionManagerContext } from "../telemetry/SessionManager";
import { Metadata, PageType, TopicMetadata } from "./Metadata";

type AppProps = {
    metadata: Metadata
    children: React.ReactNode
    pageType?: PageType
    inHeader?: React.ReactNode
    topLevel?: boolean
}

function pageTypeToPath(pageType: PageType): string 
{
    if (pageType === "lectures")
        return "lectures";
    if (pageType === "practicals")
        return "practicals";
    if (pageType === "assessments")
        return "assessment";
    if (pageType === "demos")
        return "demos";
    return ""
}

export const App = ({children, inHeader, metadata, pageType, topLevel} : AppProps) =>
{
    // const [sessionManager] = React.useState(new SessionManager());
    // if (!sessionManager.created)
    //     sessionManager.create();

    const backTo = topLevel ? undefined : (pageType ? `/${pageTypeToPath(pageType)}/` : "/")
    const prefersDarkMode = useIsDarkMode();
    const theme = React.useMemo(() =>
        createTheme({
          palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
            info: {
                main : "#025D8D"
            }
          },
        }),
      [prefersDarkMode],);

    const {hidden, links, slug} = metadata as TopicMetadata
    let pageExists = false;
    if (!hidden)
    {
        if (!pageType || (links?.indexOf(pageType) !== -1))
            pageExists = true;
    }
    if (process.env.GATSBY_DEVELOPMENT)
        pageExists = true;

    const appBar = React.useMemo(() => <MyAppBar title={metadata.title} inHeader={pageExists ? inHeader : <></>} backTo={backTo}/>,[backTo, inHeader, metadata.title])
    return <div className={appStyles.app}>
        <MyHelmet metadata={metadata} />
        <ThemeProvider theme={theme}>
            {/* <SessionManagerContext.Provider value={sessionManager}>
            <DataConsent /> */}
            {appBar}

            <div className={appStyles.mainContent}>
                {pageExists ?
                <div data-testid="appMainContent">
                    {children}
                    <MyBottomNavigation links={links} slug={slug} pageType={pageType} />
                </div> :
                <Paper><InConstruction /></Paper>}
            </div>
            {/* </SessionManagerContext.Provider> */}
        </ThemeProvider>
    </div>
}

const MyHelmet = ({metadata}: {metadata: Metadata}) =>
{
    const darkMode = useIsDarkMode();
    return <Helmet htmlAttributes={{lang: 'en'}} >
        <title>{metadata.title}</title>
        {metadata.author ? <meta name="author" content={metadata.author} /> : ""}
        <style>{`@media screen { body { margin: 0; background: ${ darkMode ? "#121212" : "fff"}}}`}</style>
    </Helmet>
}

function useIsDarkMode() 
{
    return useMediaQuery('(prefers-color-scheme: dark)');
}
