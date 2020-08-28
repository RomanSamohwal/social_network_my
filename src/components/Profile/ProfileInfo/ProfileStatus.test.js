import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("Profile status component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="Roman Boss" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("Roman Boss");
    });

    test("span ", () => {
        const component = create(<ProfileStatus status="Roman Boss" />);
        const root = component.root;
        let span = root.findByType("span")
        expect(span.length).not.toBeNull();
    });

    test("after create <input> should't be displayed", () => {
        const component = create(<ProfileStatus status="Roman Boss" />);
        const root = component.root;
        expect(()=>{let input = root.findByType('input')}).toThrow();
    });

    test("after create <span> should contain correct status", () => {
        const component = create(<ProfileStatus status="Roman Boss" />);
        const root = component.root;
        let span = root.findByType("span")
        expect(span.innerText).toBe("Roman Boss");
    });
});

