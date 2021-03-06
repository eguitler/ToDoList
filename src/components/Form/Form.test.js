import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Form from ".";

describe("<Form />", () => {
    const mockOnSubmit = jest.fn();
    const btnText = "button testing text";
    const placeHolderText = "placeHolder testing text";

    let component;
    let form;
    let button;
    let input;

    beforeEach(() => {
        component = render(
            <Form
                onSubmit={mockOnSubmit}
                inputPlaceHolder={placeHolderText}
                textButton={btnText}
            />
        );
        form = component.getByTestId(/form/);
        button = component.getByText(btnText);
        input = component.getByPlaceholderText(placeHolderText);
    });

    test("checking render input correctly", () => {
        component.getByPlaceholderText(placeHolderText);
    });

    test("checking render button correctly", () => {
        component.getByText(btnText);
    });

    test("clicking the button does not calls event if input is empty", () => {
        const mockEvent = { target: { value: "" } };

        fireEvent.change(input, mockEvent);
        expect(input.value).toBe(mockEvent.target.value);

        fireEvent.click(button);
        expect(mockOnSubmit).toHaveBeenCalledTimes(0);
    });

    test("clicking the button calls event once if input is not empty", () => {
        const mockEvent = { target: { value: "some user input" } };

        fireEvent.change(input, mockEvent);
        expect(input.value).toBe(mockEvent.target.value);

        fireEvent.click(button);
        expect(mockOnSubmit).toHaveBeenCalled();
    });

    test("submiting the form calls event once if input is not empty", () => {
        const mockEvent = { target: { value: "some user input" } };

        fireEvent.change(input, mockEvent);
        expect(input.value).toBe(mockEvent.target.value);

        fireEvent.submit(form);
        expect(mockOnSubmit).toHaveBeenCalled();
    });
});
