import * as React from "react"
import { MainSlide } from ".."

import * as styles from "../programming.module.css"

export const VideoSlide = ({ url, title }: { url: string, title: string }) => {
    return <MainSlide>
        <p className={styles.noPrint}>This video is loading. If it does not load within a minute there may be a problem. Please contact me and I will fix it.</p>
        <iframe src={url} width="1920" height="360" frameBorder="0" scrolling="no" allowFullScreen title={title} style={{ border: "none", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, height: "100%", maxWidth: "100%" }}></iframe>
    </MainSlide>
}