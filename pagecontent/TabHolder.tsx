import { Tab as MaterialTab, Tabs, Box } from "@mui/material";
import * as React from "react";
import * as styles from "./tabholder.module.css";

export const TabHolder = ({children}: {children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[]}) =>
{
    const [activeTab, setActiveTab] = React.useState(0);
    const handleChange = React.useCallback((event: React.ChangeEvent<object>, newValue: number) => {
        setActiveTab(newValue);
      },[]);
    
    return (
        <div>
            <Box className={styles.screenTabList} sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "dark" }}>
                <Tabs value={activeTab} onChange={handleChange} aria-label="tabs" variant="fullWidth" centered>
                    {(children instanceof Array) && children?.map((child: React.ReactElement<TabProps>, index: number) => (
                        <MaterialTab label={child.props.tabTitle} key={child.props.tabTitle} value={index} />
                    ))}
                </Tabs>
            </Box>
            
            {(children instanceof Array) && children?.map((child: React.ReactElement<TabProps>, index: number) => {
                return <div key={child.props.tabTitle}>
                        <Box className={styles.printTabList} sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "dark" }}>
                            <Tabs value={index} aria-label="tabs" variant="fullWidth" centered>
                                {(children instanceof Array) && children?.map((child: React.ReactElement<TabProps>, index: number) => (
                                    <MaterialTab label={child.props.tabTitle} key={child.props.tabTitle} value={index} />
                                ))}
                            </Tabs>
                        </Box>
                        <Box className={styles.tab} key={child.props.tabTitle} sx={{display: activeTab === index ? "block" : "none",  padding: 1}}>
                            {child}
                        </Box>
                    </div>
                })}
        </div>
    )
}

type TabProps = {
    children: React.ReactNode
    tabTitle: string
}

export const Tab = ({children}: TabProps) =>
{
    return <section>{children}</section>
}