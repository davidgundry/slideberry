import * as React from "react"
import { navigate, Link } from 'gatsby';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PracticalIcon from '@mui/icons-material/Edit';
import LectureIcon from '@mui/icons-material/SpeakerNotes';
import QuizIcon from '@mui/icons-material/Quiz';
// spell-checker: ignore Ondemand
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import Paper from "@mui/material/Paper";
import * as appStyles from "./app.module.css"
import { PageType } from "./Metadata";

export const MyBottomNavigation = ({links, slug, pageType}: {links?: PageType[], slug?: string, pageType?: PageType}) =>
{
    if (!links || links.length <= 1)
        return <></>

    const [tab, setTab] = React.useState(pageType);

    return <Paper className={appStyles.bottomNavigation} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
            data-testid="bottomNavigation" 
            showLabels
            value={tab}
            onChange={(event, newValue) => {
                setTab(newValue);
                if (!slug)
                    navigate(`/${newValue}/`);
                else
                    navigate(`/${newValue}/${slug}/`);
                  
            }}
        >
            {(pageType==="lectures" || links?.indexOf("lectures") !== -1) && <BottomNavigationAction data-testid="lectureLink" component={Link} to={`/lectures/${slug}/`} value="lectures" label="Lecture" icon={<LectureIcon />} /> }
            {(pageType==="practicals" || links?.indexOf("practicals") !== -1) && <BottomNavigationAction data-testid="practicalLink" component={Link} to={`/practicals/${slug}/`} value="practicals" label="Practical" icon={<PracticalIcon />} /> }
            {(pageType==="assessments" || links?.indexOf("assessments") !== -1) && <BottomNavigationAction data-testid="assessmentLink" component={Link} to={`/assessment/${slug}/`} value="assessments" label="Assessment" icon={<QuizIcon />} /> }
            {(pageType==="demos" || links?.indexOf("demos") !== -1) && <BottomNavigationAction data-testid="demoLink" component={Link} to={`/demos/${slug}/`} value="demos" label="Demo" icon={<OndemandVideoIcon />} /> }
        </BottomNavigation>
    </Paper>
}
