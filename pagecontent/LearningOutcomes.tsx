import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import * as styles from "./learningOutcomes.module.css";
import { LearningOutcome } from '../app/Metadata';

export const LearningOutcomesDropdowns = ({learningOutcomes}: {learningOutcomes?: LearningOutcome[]}) =>
{
    const [openSections, setOpenSections] = useState<string[]>([]);

    const toggleSection = (sectionId: string) => {
        setOpenSections((prevOpenSections) =>
            prevOpenSections.includes(sectionId)
            ? prevOpenSections.filter((id) => id !== sectionId)
            : [...prevOpenSections, sectionId]
        );
    };

    if (!learningOutcomes)
        return <></>

    return (
    <List>
        {learningOutcomes.map((section) => (
            <div key={section.overall}>
                <ListItem button onClick={() => toggleSection(section.overall)}>
                    {section.components && <ListItemIcon>
                        {openSections.includes(section.overall) ? <ExpandMoreIcon /> : <ChevronRightIcon /> }
                    </ListItemIcon> }
                    <ListItemText primary={section.overall} sx={{fontSize: "100%"}}/>
                </ListItem>
                {section.components && 
                    <Collapse
                        in={openSections.includes(section.overall)}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List className={styles.noPrint} component="ol" disablePadding>
                            {section.components?.map((component) => (
                                <ListItem key={component.id}>
                                    <ListItemText primary={component.text} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                }
                <List className={styles.printOnly} component="ol" disablePadding>
                    {section.components?.map((component) => (
                        <ListItem key={component.id}>
                            <ListItemText primary={component.text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        ))}
    </List>
    );
}

export const LearningOutcomesList = ({learningOutcomes}: {learningOutcomes?: LearningOutcome[]}) =>
{
    return <ol>
        {learningOutcomes?.map(o => <li key={o.overall}>{o.overall}</li>)}
    </ol>
}