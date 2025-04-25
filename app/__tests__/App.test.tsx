import * as React from "react"
import { App } from "../App"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"

/**
 * @jest-environment jsdom
 */

describe("App", () => {

test("Hidden pages show in construction message", () => {
  const metadata= {
    title:"",
    author:"",
    slug:"",
    summary:"",
    hidden: true
  }

  const { getByTestId } = render(<App metadata={metadata} pageType="lectures"> </App>)
  expect(getByTestId("construction")).toBeDefined();
})

test("Pages that are not hidden show content", () => {
  const metadata= { title:"", author:"", slug:"", summary:""}
  const { getByTestId } = render(<App metadata={metadata} pageType="lectures"> </App>)
    expect(getByTestId("appMainContent")).toBeVisible();
  })

  test("Pages that are not hidden do not show construction message", () => {
    const metadata= { title:"", author:"", slug:"", summary:""}
    const { queryByTestId } = render(<App metadata={metadata}> </App>)
    expect(queryByTestId("construction")).toBeNull();
  })

  test("Pages with a pageType not in links show 'in construction' message", () => {
    const metadata= { title:"", author:"", slug:"", summary:"", links:["lectures"]}
    const { queryByTestId } = render(<App metadata={metadata} pageType="practicals"> </App>)
    console.log(queryByTestId("construction"));
    expect(queryByTestId("construction")).toBeVisible();
  })


  test("Pages with a pageType not in links do not show content", () => {
    const metadata= { title:"", author:"", slug:"", summary:"", links:["lectures"]}
    const { queryByTestId } = render(<App metadata={metadata} pageType="practicals"> </App>)
    expect(queryByTestId("appMainContent")).toBeNull();
  })


  test("Pages with a pageType in links do not show construction message", () => {
    const metadata= { title:"", author:"", slug:"", summary:"", links:["lectures"]}
    const { queryByTestId } = render(<App metadata={metadata} pageType="lectures"> </App>)
    expect(queryByTestId("construction")).toBeNull();
  })

  test("Pages with a pageType in links show content", () => {
    const metadata= { title:"", author:"", slug:"", summary:"", links:["lectures"]}
    const { queryByTestId } = render(<App metadata={metadata} pageType="lectures"> </App>)
    expect(queryByTestId("appMainContent")).toBeVisible();
  })


  test("App content is shown", () => {
    const metadata= { title:"", author:"", slug:"", summary:""}
    const { queryByTestId } = render(<App metadata={metadata}><div data-testid="test"></div></App>)
    expect(queryByTestId("test")).toBeVisible();
  })
})