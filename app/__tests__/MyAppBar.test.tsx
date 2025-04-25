import * as React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { MyAppBar } from "../MyAppBar"

/**
 * @jest-environment jsdom
 */

describe("MyAppBar", ()=>{
  test("Displays the correct title", () => {
    const { getByTestId } = render(<MyAppBar title={"Test"} />)
    expect(getByTestId("appBarTitle")).toHaveTextContent("Test")
  })

  test("Links to the correct correct target", () => {
    const { getByTestId } = render(<MyAppBar title={"Test"} backTo={"/target"} />)
    expect((getByTestId("appBarLink") as HTMLAnchorElement).href.endsWith("/target")).toBe(true);
  })

  test("Does not show link if no backTo set", () => {
    const { queryByTestId } = render(<MyAppBar title={"Test"} />)
    const link = queryByTestId('appBarLink')
    expect(link).toBeNull() // it doesn't exist
  })

  test("Embeds the provided inHeader node", () => {
    const inHeader = <div data-testid="target"></div>
    const { getByTestId } = render(<MyAppBar title={"Test"} inHeader={inHeader} />)
    expect(getByTestId("target")).toBeDefined();
  })
})