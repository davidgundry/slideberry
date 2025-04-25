import * as React from "react"

export type HeadingData = {
    id: string
    level: number
    name: string
}

export function useHeadings(layouts: string[]): HeadingData[]
{
    const [headings, setHeadings] = React.useState<HeadingData[]>([])

    React.useEffect(() => {
        const newHeadings = Array.from(document.querySelectorAll("h1.showInTOC, h2.showInTOC, h3.showInTOC, h4.showInTOC"))
            .map((element) => ({
                name: (element as HTMLElement).innerText,
                level: Number(element.nodeName.charAt(1)),
                id: element.id
            }))
            .filter(h => h.name)
            if (newHeadings.length !== headings.length)
                setHeadings(newHeadings);
            else
            {
                let same = true;
                for (let i=0;i<newHeadings.length;i++)
                    if (newHeadings[i].id === headings[i].id)
                        if (newHeadings[i].level === headings[i].level)
                            if (newHeadings[i].name === headings[i].name)
                            {
                                same = false;
                                break;
                            }
                if (!same)
                    setHeadings(newHeadings);
            }
    },[layouts])
    return headings;
}
