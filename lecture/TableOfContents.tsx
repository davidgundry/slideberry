import React from 'react';
import { List, Typography } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import { sectionSluggify } from './Section';

export type TOCHeading = {
  name: string;
  level: number;
  id: string;
}

interface Props {
    currentSection: string;
    headings: TOCHeading[];
}

const normalStyle = {
  backgroundColor: "background.paper",
  color: "text.primary"
}

const highlightStyle = {
    backgroundColor: "primary.main",
    color: "primary.contrastText"
}

const TableOfContents: React.FC<Props> = ({ currentSection, headings }) => {
   let level = 4;
   for (const h of headings)
      level = Math.min(level, h.level);
   const jsx = React.useMemo(() => <>{renderTOC([...headings],level, currentSection)}</>, [currentSection, headings]);
   return jsx;
};

function renderTOC(
    children: TOCHeading[],
    parentLevel: number,
    currentSection: string): JSX.Element
{
    const elements = []
    while (children.length > 0)
    {  
        const child = children.shift();
        if (!child)
            continue;
        const { name, level } = child;
        const slug = sectionSluggify(name);

        if (level === parentLevel) 
            elements.push(makeElement(name, slug===currentSection, child));
        else if (level > parentLevel)
        {
            children.unshift(child);
            elements.push(
              <Collapse key={slug} in={true} timeout="auto">
                <List key={slug} component="div" disablePadding sx={{paddingLeft: 2}}>
                  {renderTOC(children, parentLevel + 1, currentSection)}
                </List>
              </Collapse>
            );
        }
        else if (level === 0) 
            continue;
        else if (level < parentLevel)
        {
          children.unshift(child);
            break;   
        }
    }

    return (
        <List sx={{ width: '100%' }} component="nav">
            {elements}
        </List>
    );
}

function makeElement(heading: string, current: boolean, {id}: TOCHeading): React.ReactNode
{
    return <ListItemButton key={heading} sx={current ? highlightStyle : normalStyle} 
        onClick={(e) => {
              e.preventDefault()
              const yOffset = -100; 
              const target = document.querySelector(`#${id}`)
              if (target)
              {
                  const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({top: y, behavior: 'smooth'});
              }
          }}>
      
            <Typography sx={{color: current ? "primary.contrastText" : "text.primary",}}>{heading}</Typography>
            &nbsp;
        </ListItemButton>
}

export default TableOfContents;
