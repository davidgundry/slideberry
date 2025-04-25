import * as React from "react";
import { CodeBlock, a11yDark } from "react-code-blocks";
import * as styles from "./code.module.css"

export const PCode = ({children, dynamic}: {children: string, dynamic?: boolean}) => {
    const lines = children.split("\n").length
    if (!dynamic)
    {
        const preRendered = React.useMemo(() => <CodeBlock
                text={children}
                language="typescript"
                showLineNumbers={lines > 1}
                startingLineNumber={1}
                theme={{...a11yDark,mode: "dark"}}
                wrapLongLines={false}
            />, []);
        return preRendered;
    }
    return (
        <CodeBlock
            text={children}
            language="typescript"
            showLineNumbers={lines > 1}
            startingLineNumber={1}
            theme={{...a11yDark,mode: "dark"}}
            wrapLongLines={false}
        />
    );
}

export const Code = ({children}: {children: string}) =>
{
    return <code className={styles.code}>{children}</code>
}
