import * as React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { MyBottomNavigation } from "../MyBottomNavigation"

/**
 * @jest-environment jsdom
 */

describe("MyBottomNavigation", () => {

  test("Shows nothing if there are no links ", () => {
    const { getByTestId } = render(<div data-testid="container"><MyBottomNavigation pageType="lectures"  /></div>) 
    expect(getByTestId('container')).toBeEmptyDOMElement()
  })

  test("Shows nothing if only one link defined", () => {
    const { getByTestId } = render(<div data-testid="container"><MyBottomNavigation links={["lecture"]} pageType="lectures" /></div>)
    expect(getByTestId('container')).toBeEmptyDOMElement()
  })

  test("Shows navigation if at least two links defined", () => {
    const { getByTestId } = render(<MyBottomNavigation links={["lecture","practical"]} pageType="lectures" />)
    expect(getByTestId('bottomNavigation')).toBeDefined()
  })


  test("Shows lecture link if lecture link is one of at least two links defined", () => {
    const { getByTestId } = render(<MyBottomNavigation links={["lecture","practical"]} pageType="lectures" />)
    expect(getByTestId('lectureLink')).toBeDefined()
  })

  test("Shows practical link if lecture link is one of at least two links defined", () => {
    const { getByTestId } = render(<MyBottomNavigation links={["lecture","practical"]} pageType="practicals" />)
    expect(getByTestId('practicalLink')).toBeDefined()
  })

  test("Shows assessment link if lecture link is one of at least two links defined", () => {
    const { getByTestId } = render(<MyBottomNavigation links={["lecture","assessment"]} pageType="assessment" />)
    expect(getByTestId('assessmentLink')).toBeDefined()
  })


  test("Shows lecture link if current even if not one of two links defined", () => {
    const { getByTestId } = render(<MyBottomNavigation links={["assessment","practical"]} pageType="lectures" />)
    expect(getByTestId('lectureLink')).toBeDefined()
  })

  test("Shows practical link if current even if not one of two links defined", () => {
    const { getByTestId } = render(<MyBottomNavigation links={["lecture","assessment"]} pageType="practicals" />)
    expect(getByTestId('practicalLink')).toBeDefined()
  })

  test("Shows assessment link if current even if not one of two links defined", () => {
    const { getByTestId } = render(<MyBottomNavigation links={["lecture","practical"]} pageType="assessment" />)
    expect(getByTestId('assessmentLink')).toBeDefined()
  })


  test("Shows lecture link if in links even if pageType is undefined", () => {
    const { getByTestId } = render(<MyBottomNavigation links={["lecture","practical"]} />)
    expect(getByTestId('lectureLink')).toBeDefined()
  })

  test("Shows practical link if in links even if pageType is undefined", () => {
    const { getByTestId } = render(<MyBottomNavigation links={["practical","assessment"]} />)
    expect(getByTestId('practicalLink')).toBeDefined()
  })

  test("Shows assessment link if in links even if pageType is undefined", () => {
    const { getByTestId } = render(<MyBottomNavigation links={["lecture","assessment"]} />)
    expect(getByTestId('assessmentLink')).toBeDefined()
  })


  test("Lecture link links to /lectures/<slug>", () => {
    const { getByTestId } = render(<MyBottomNavigation links={["lecture","practical"]} pageType="lectures" slug="test-slug"/>)
    const element = (getByTestId('lectureLink') as HTMLAnchorElement);
    expect(element.href).toContain("/lectures/test-slug");
  })

  test("Practical link links to /practicals/<slug>", () => {
    const { getByTestId } = render(<MyBottomNavigation links={["lecture","practical"]} pageType="lectures" slug="test-slug"/>)
    const element = (getByTestId('practicalLink') as HTMLAnchorElement);
    expect(element.href).toContain("/practicals/test-slug");
  })

  test("Assessment link links to /assessment/<slug>", () => {
    const { getByTestId } = render(<MyBottomNavigation links={["assessment","practical"]} pageType="assessment" slug="test-slug"/>)
    const element = (getByTestId('assessmentLink') as HTMLAnchorElement);
    expect(element.href).toContain("/assessment/test-slug");
  })
})