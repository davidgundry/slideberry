import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import * as React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { LecturePageContent } from '../LecturePageContent';

describe("LecturePageContent", () => {
    test("TableOfContents is shown when 'toc' layout is set", () => {
        mockAllIsIntersecting(true);
        const { getByTestId } = render(<LecturePageContent layouts={["toc"]} headings={[{id:"test",level:1,name:"Test"}]}> </LecturePageContent>)
        expect(getByTestId("tableOfContents")).toBeVisible();
    })

    test("TableOfContents is not shown when 'toc' layout is not set", () => {
        mockAllIsIntersecting(true);
        const { getByTestId } = render(<LecturePageContent layouts={[]} headings={[{id:"test",level:1,name:"Test"}]}> </LecturePageContent>)
        expect(getByTestId("tableOfContents")).not.toBeVisible();
    })

    test("TableOfContents is not shown when 'toc' headings array is empty", () => {
        mockAllIsIntersecting(true);
        const { getByTestId } = render(<LecturePageContent layouts={["toc"]} headings={[]}> </LecturePageContent>)
        expect(getByTestId("tableOfContents")).not.toBeVisible();
    })
})