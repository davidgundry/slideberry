import * as React from "react"
import { App } from "../App"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"

/**
 * @jest-environment jsdom
 */

test("When topLevel is set, there is no backArrow", () => {
    const metadata= {title:"",author:"",slug:"",summary:"" }
    const { queryByTestId } = render(<App metadata={metadata} topLevel> </App>)
    expect(queryByTestId("appBarLink")).toBeNull();
})
  
test("When topLevel is not set, there is a backArrow", () => {
    const metadata= {title:"",author:"",slug:"",summary:"" }
    const { queryByTestId } = render(<App metadata={metadata}> </App>)
    expect(queryByTestId("appBarLink")).toBeVisible();
})
  
test("If pageType is lecture, back arrow goes to /lectures/", () => {
    const metadata= {title:"",author:"",slug:"",summary:"" }
    const { queryByTestId } = render(<App metadata={metadata} pageType="lectures"> </App>)
    expect((queryByTestId("appBarLink") as HTMLAnchorElement).href).toBe("http://localhost/lectures/");
})

test("If pageType practical, back arrow goes to /practicals/", () => {
    const metadata= {title:"",author:"",slug:"",summary:"" }
    const { queryByTestId } = render(<App metadata={metadata} pageType="practicals"> </App>)
    expect((queryByTestId("appBarLink") as HTMLAnchorElement).href).toBe("http://localhost/practicals/");
})

test("If pageType is assessment, back arrow goes to /assessment/", () => {
    const metadata= {title:"",author:"",slug:"",summary:"" }
    const { queryByTestId } = render(<App metadata={metadata} pageType="assessment"> </App>)
    expect((queryByTestId("appBarLink") as HTMLAnchorElement).href).toBe("http://localhost/assessment/");
})
  
test("If pageType not set, arrow goes to /", () => {
    const metadata= {title:"",author:"",slug:"",summary:"" }
    const { queryByTestId } = render(<App metadata={metadata}> </App>)
    expect((queryByTestId("appBarLink") as HTMLAnchorElement).href).toBe("http://localhost/");
})
  
test("Title shows title of page", () => {
    const metadata= {title:"test",author:"",slug:"",summary:"" }
    const { queryByTestId } = render(<App metadata={metadata}> </App>)
    expect(queryByTestId("appBarTitle")).toHaveTextContent("test");
})
  
test("A page with multiple links shows the links", () => {
    const metadata= {title:"",author:"",slug:"",summary:"", links:["lecture","practical","assessment"] }
    const { queryByTestId } = render(<App metadata={metadata}> </App>)
    expect(queryByTestId("lectureLink")).toBeVisible();
    expect(queryByTestId("practicalLink")).toBeVisible();
    expect(queryByTestId("assessmentLink")).toBeVisible();
})
  