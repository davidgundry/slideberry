import * as React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { LecturePage } from "../LecturePage"
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

jest.mock('@react-hook/window-size', () => {
    return {
      useWindowWidth: () => null,
    }
  })

describe("LecturePage", () =>
{
    test("When topLevel is set, there is no backArrow", () => {
        mockAllIsIntersecting(true);
        const metadata= {title:"",author:"",slug:"",summary:"", module:"", links:[] }
        const { queryByTestId } = render(<LecturePage metadata={metadata} topLevel><></></LecturePage>)
        expect(queryByTestId("appBarLink")).toBeNull();
    })
    
    test("When topLevel is not set, there is a backArrow", () => {
        mockAllIsIntersecting(true);
        const metadata= {title:"",author:"",slug:"",summary:"", module:"", links:[] }
        const { queryByTestId } = render(<LecturePage metadata={metadata}><></></LecturePage>)
        expect(queryByTestId("appBarLink")).toBeVisible();
    })
    
    test("LecturePage shows title of page", () => {
        mockAllIsIntersecting(true);
        const metadata= {title:"test",author:"",slug:"",summary:"", module:"", links:[] }
        const { queryByTestId } = render(<LecturePage metadata={metadata}><></></LecturePage>)
        expect(queryByTestId("appBarTitle")).toHaveTextContent("test");
    })

    test("LecturePage content is shown", () => {
        mockAllIsIntersecting(true);
        const metadata = {title:"",author:"",slug:"",summary:"", module:"", links:[] }
        const { queryAllByTestId } = render(<LecturePage metadata={metadata}><div data-testid="testContent"></div></LecturePage>)
        expect(queryAllByTestId("testContent")).toBeDefined();
    })

    {/*
    test("When there are headings with class showInTOC there is a TOC button", () => {
        mockAllIsIntersecting(true);
        const metadata= {title:"",author:"",slug:"",summary:"", module:"", links:[] }
        const { queryByTestId } = render(<LecturePage metadata={metadata}> <h2 id="test" className="showInTOC">Test</h2></LecturePage>)
        expect(queryByTestId("tocButton")).toBeVisible();
    })*/}

    test("When there are no headings there is no TOC button", () => {
        mockAllIsIntersecting(true);
        const metadata= {title:"",author:"",slug:"",summary:"", module:"", links:[] }
        const { queryByTestId } = render(<LecturePage metadata={metadata}><></></LecturePage>)
        expect(queryByTestId("tocButton")).toBeNull();
    })
});
