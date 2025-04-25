import * as React from "react";
import * as styles from "./codeBlk.module.css"
import { a11yLight, CodeBlock } from "react-code-blocks";

export const CodeBlk = ({language, text}: {language: string, text: string}) =>
{
    return <div className={styles.codeBlk}>
        {language !== "plaintext" ? <p className={styles.language}>{language}</p> : ``}
        <CodeBlock language={language} showLineNumbers={false} startingLineNumber={1} wrapLongLines={false} theme={{ ...a11yLight, mode: "light", backgroundColor: "#fefefe" }} text={text} />
    </div>
}