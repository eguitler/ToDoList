import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render, screen} from '@testing-library/react'
import Button from '.';


test('show the text that is passed', () => {
    const text = "testing text"
    
    const component = render(<Button text={text} />)
    component.getByText(text)
})


test('clicking the button calls event handler once', () => {
    const mockHandler = jest.fn()
    const text = "This is the button"

    const component = render(<Button text={text} onClick={mockHandler} />)
    const button = component.getByText(text)
    fireEvent.click(button)
    expect(mockHandler).toHaveBeenCalledTimes(1)
})


test('clicking the disabled button does not calls event handler', () => {
    const mockHandler = jest.fn()
    const text = "This is the button"

    const component = render(<Button text={text} onClick={mockHandler} disabled={true} />)
    const button = component.getByText(text)
    fireEvent.click(button)
    expect(mockHandler).toHaveBeenCalledTimes(0)
})