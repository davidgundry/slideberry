import { ScriptStatus, useScript } from '@custom-react-hooks/use-script';
import * as React  from 'react'
import { Helmet } from 'react-helmet';

// spell-checker: ignore graphre

type Nomnoml = 
{
    renderSvg: (code: string) => string
}

export function Nomnoml({code} : {code: string})
{
    const [innerHTML, setInnerHTML] = React.useState<string | undefined>(undefined);

    if (typeof document === "undefined") 
        return <div></div> // We cannot call useScript during SSR

    //TODO: Finish moving this to loading local scripts
    const script: ScriptStatus = useScript("//unpkg.com/graphre/dist/graphre.js")
    const script2: ScriptStatus = useScript("//unpkg.com/nomnoml/dist/nomnoml.js")

    React.useEffect(() => 
    {
        if (script === "ready" && script2 === "ready")
        {
            let svgCode: string = (window["nomnoml" as keyof Window] as Nomnoml).renderSvg(code)
            svgCode = svgCode.replace(/width=".+?"/,"")
            svgCode = svgCode.replace(/height=".+?"/,"")
            setInnerHTML(svgCode)
        }
    }, [script, script2]);
        
    return <div>
            {innerHTML && <div style={{width: "100%", height: "100%"}} dangerouslySetInnerHTML={{__html: innerHTML}}></div>}
            <Helmet>
                <script src={`/graphre.0.1.3.js`}></script>
                <script src={`/nomnoml.1.6.2.js`}></script>
            </Helmet>
        </div>    
}
