import * as React from "react"

//TODO: There is a problem here where on first load/render the height (perhaps) is not correct and only updates when it needs to rerender the contents
export const Wrap = ({children}: {children: React.ReactNode}) =>
{
    const container = React.createRef<HTMLDivElement>();
    const inner = React.createRef<HTMLDivElement>();

    React.useEffect(() =>
    {
        if (container.current)
        {
            const height = inner.current?.clientHeight.toString() + "px" || "0px";
            container.current.style.height = height;
        }
    });

    return <div ref={container} style={{position:"relative", height: 0}}>
            <div ref={inner} style={{position: "absolute", left: 0, right:0, overflowX: "auto"}}>
                {children}
            </div>
        </div>
}