import * as React from "react"
import Box from "@mui/material/Box"
import { LinkList } from "./LinkList"
import HandymanIcon from "@mui/icons-material/Handyman"
import { SimplePage } from "../app/SimplePage"
import { Metadata } from "../app/Metadata"

type TopListPageProps = 
{
    pages: Metadata[]
    heading: string
    slug: string
    children?: React.ReactNode
}

export const TopListPage = ({pages, heading, slug, children}: TopListPageProps) => {
    const metadata = {
        title: heading,
        author: "",
        summary: "",
        slug: slug
    }
    return (
        <SimplePage metadata={metadata}>
            {children}
            {pages.length > 0 ?
                <LinkList pages={pages} prefix={"/"+slug+"/"}/> :
                <Box sx={{padding: 2}}>
                    <HandymanIcon />
                    <h2>Oops</h2>
                    <p>There are currently no links to show here.</p>
                </Box>}
        </SimplePage>
    )
}
