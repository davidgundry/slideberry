import * as React from "react";

export const Paragraph = ({h4, children}: {h4: string, children: React.ReactNode}) =>
{
    return <div style={{display: "flex", alignItems:"stretch"}}>
        <h4 style={{flex: "0 0 auto"}}>{h4}</h4>
        <div style={{flex: "1 1 auto", marginLeft: "1em"}}>
            {children}
        </div>
    </div>
}