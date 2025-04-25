import { ListItemButton, ListItemAvatar, ListItemText, Typography, List, Avatar, Divider } from "@mui/material"
import { Link } from "gatsby"
import React from "react";
import HandymanIcon from "@mui/icons-material/Handyman"
import { Metadata } from "../app/Metadata";

export const LinkList = ({pages, prefix}: {pages: Metadata[], prefix: string}) => 
{
    if (prefix && !prefix.endsWith("/"))
        prefix += "/"

    return <List component="nav">
        {pages.map((doc: Metadata) => (
        <div key={doc.slug}>
            <ListItemButton component={Link} to={prefix + doc.slug} key={doc.slug} alignItems="flex-start">
                <ListItemAvatar>
                    {doc.hidden ? 
                    <HandymanIcon /> :
                    <Avatar alt={doc.title} src="/static/images/avatar/1.jpg" /> }
                </ListItemAvatar>

            <ListItemText
                primary={doc.title}
                secondary={
                <React.Fragment>
                    {doc.summary}
                </React.Fragment>
                }
            />
            {doc.number !== undefined && <Typography component="span" color="text.primary" sx={{fontSize:"130%", marginRight: 1, flexShrink:0, marginLeft: 2}}>{doc.number < 10 ? <>{`0`+doc.number}</> : <>{doc.number}</>}</Typography>}
            </ListItemButton>
            <Divider variant="inset" component="li" />   
        </div>))}
    </List>
}
