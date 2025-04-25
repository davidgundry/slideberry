import * as React from "react"

import MinimizeIcon from '@mui/icons-material/Minimize';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import * as styles from "./stickyLecture.module.css"

export const StickyLecture = ({ url, title }: { url: string, title: string }) => {

    const [minimised, setMinimised] = React.useState(true);

    return <div className={styles.stickyLecture}  style={{ position: "fixed", bottom: 0, right: 0, width: 320, height: minimised ? 36 : 180, zIndex: 100 }} >
        <div style={{ visibility: minimised ? "hidden" : "visible" }}>
            <p>This video is loading. If it does not load within a minute there may be a problem. Please contact me and I will fix it.</p>
            <iframe src={url} width="640" height="360" frameBorder="0" scrolling="no" allowFullScreen title={title} style={{ border: "none", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, height: "100%", maxWidth: "100%" }}></iframe>
        </div>
        <div style={{ position: "absolute", right: 0, top: 0 }} >
            {!minimised &&
                <div style={{ display: "inline-block", height: 36, borderRadius: 4, backgroundColor: "coral" }}>
                    <HelpPopup />
                </div>}
            <div style={{ display: "inline-block", height: 36, borderRadius: 4, backgroundColor: "coral" }}>
                <IconButton onClick={() => setMinimised(!minimised)} aria-label="minimize" style={{ height: 36, background: "none" }}>
                    <span style={{ padding: 4, fontSize: 12, }}>{minimised ? "Show" : "Hide"}<br /> Video</span>

                    {minimised ? <OpenInFullIcon /> : <MinimizeIcon />}

                </IconButton>
            </div>

        </div>
    </div>
}

const HelpPopup = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    const togglePopup = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="help-popup-container">
            <IconButton onClick={togglePopup} aria-label="minimize" style={{ height: 36, background: "none" }}>
                <QuestionMarkIcon />
            </IconButton>
            {isVisible && (
                <div className="popup-box" style={{
                    position: "fixed",
                    bottom: 60,
                    right: 20,
                    width: 200,
                    padding: 15,
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: 5,
                    zIndex: 1000
                }}>
                    <IconButton onClick={togglePopup} aria-label="minimize" style={{ height: 36, background: "none" }}>
                        <CloseIcon />
                    </IconButton>

                    <p>To get access to the video, you must first follow the link to the lecture recording on Moodle</p>
                </div>
            )}
        </div>
    );
};
