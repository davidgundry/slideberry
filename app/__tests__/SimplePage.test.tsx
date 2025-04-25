import * as React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { SimplePage } from "../SimplePage"

/**
 * @jest-environment jsdom
 */

describe("SimplePage", () =>
{
    test("When topLevel is set, there is no backArrow", () => {
        const metadata= {title:"",author:"",slug:"",summary:"" }
        const { queryByTestId } = render(<SimplePage metadata={metadata} topLevel> </SimplePage>)
        expect(queryByTestId("appBarLink")).toBeNull();
    })
    
    test("When topLevel is not set, there is a backArrow", () => {
        const metadata= {title:"",author:"",slug:"",summary:"" }
        const { queryByTestId } = render(<SimplePage metadata={metadata}> </SimplePage>)
        expect(queryByTestId("appBarLink")).toBeVisible();
    })
    
    test("SimplePage shows title of page", () => {
        const metadata= {title:"test",author:"",slug:"",summary:"" }
        const { queryByTestId } = render(<SimplePage metadata={metadata}> </SimplePage>)
        expect(queryByTestId("appBarTitle")).toHaveTextContent("test");
    })

    test("SimplePage content is shown", () => {
        const metadata= {title:"test",author:"",slug:"",summary:"" }
        const { queryByTestId } = render(<SimplePage metadata={metadata}><div data-testid="test"></div></SimplePage>)
        expect(queryByTestId("test")).toBeDefined();
    })
});