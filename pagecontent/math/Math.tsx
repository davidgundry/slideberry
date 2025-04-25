import * as React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax"
import reactNodeToString from "react-node-to-string"
import "./katex.min.css";

// spell-checker: ignore empheq

const config = {
    loader: { load: ["[tex]/html","[tex]/cases", "[tex]/empheq"] },
    tex: {
      packages: { "[+]": ["html", "cases", "empheq"] },
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"]
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"]
      ]
    }
  };

export const MathContext = ({children} : {children: React.ReactNode}) =>
{
    return <>                
        <MathJaxContext config={config}>
            { children }
        </MathJaxContext>
    </>
}

export const M = ({children, block} : {children: React.ReactNode, block?: boolean}) =>
{
    if (block)
        return <div>{`\\[ ${reactNodeToString(children)} \\]`}</div>
    return <span>{`\\( ${reactNodeToString(children)} \\)`}</span>
}

export const DM = ({children, block} : {children: React.ReactNode, block?: boolean}) =>
{
    if (block)
        return <MathJax dynamic>{`\\[ ${reactNodeToString(children)} \\]`}</MathJax>
    return <MathJax inline dynamic>{`\\( ${reactNodeToString(children)} \\)`}</MathJax>
}
