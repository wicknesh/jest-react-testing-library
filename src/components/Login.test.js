import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Login from './Login';
import '@testing-library/jest-dom';

jest.mock("axios", () => ({
    __esModule: true,
    default: {
        get: () => ({
            data: {id:1, name: 'John'}
        })
    }
})
)

test('username input should be rendered', () => {
    render(<Login />);
    const userInputElement = screen.getByPlaceholderText(/username/i);
    expect(userInputElement).toBeInTheDocument();
})

test('password input should be rendered', () => {
    render(<Login />);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    expect(passwordInputElement).toBeInTheDocument();
})

test('button should be rendered', () => {
    render(<Login />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
})

test('username input should be empty', () => {
    render(<Login />);
    const userInputElement = screen.getByPlaceholderText(/username/i);
    expect(userInputElement.value).toBe("");
})

test('password input should be empty', () => {
    render(<Login />);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    expect(passwordInputElement.value).toBe("");
})

test('button should be disabled', () => {
    render(<Login />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
})

test('loading should not be rendered', () => {
    render(<Login />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).not.toHaveTextContent(/please wait/i)
})

test('error message should not be visible', () => {
    render(<Login />);
    const errorElement = screen.getByTestId('error');
    expect(errorElement).not.toBeVisible();
})

test('username input should change', () => {
    render(<Login />);
    const userInputElement = screen.getByPlaceholderText(/username/i);
    const testValue = 'test';
    fireEvent.change(userInputElement, {target: {value: testValue}});
    expect(userInputElement.value).toBe(testValue);
})

test('password input should change', () => {
    render(<Login />);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    const testValue = 'test';
    fireEvent.change(passwordInputElement, {target: {value: testValue}});
    expect(passwordInputElement.value).toBe(testValue);
})

test('button should not be disabled when inputs exist', () => {
    render(<Login />);
    const buttonElement = screen.getByRole("button");
    const usernameInputElement = screen.getByPlaceholderText(/username/i);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    const testvalue = 'test';

    fireEvent.change(usernameInputElement, {target: {value: testvalue}});
    fireEvent.change(passwordInputElement, {target: {value: testvalue}});

    expect(buttonElement).not.toBeDisabled();
})

test('loading should be rendered when clicked', () => {
    render(<Login />);
    const buttonElement = screen.getByRole("button");
    const usernameInputElement = screen.getByPlaceholderText(/username/i);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    const testvalue = 'test';

    fireEvent.change(usernameInputElement, {target: {value: testvalue}});
    fireEvent.change(passwordInputElement, {target: {value: testvalue}});
    fireEvent.click(buttonElement);

    expect(buttonElement).toHaveTextContent(/please wait/i);
})

test('loading should not be rendered after fetching', async () => {
    render(<Login />);
    const buttonElement = screen.getByRole("button");
    const usernameInputElement = screen.getByPlaceholderText(/username/i);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    const testvalue = 'test';

    fireEvent.change(usernameInputElement, {target: {value: testvalue}});
    fireEvent.change(passwordInputElement, {target: {value: testvalue}});
    fireEvent.click(buttonElement);

    await waitFor(() => expect(buttonElement).not.toHaveTextContent(/please wait/i));
})

test('user should be rendered after fetching', async () => {
    render(<Login />);
    const buttonElement = screen.getByRole("button");
    const usernameInputElement = screen.getByPlaceholderText(/username/i);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    const testvalue = 'test';

    fireEvent.change(usernameInputElement, {target: {value: testvalue}});
    fireEvent.change(passwordInputElement, {target: {value: testvalue}});
    fireEvent.click(buttonElement);

    const userItem = await screen.findByText("John");

    expect(userItem).toBeInTheDocument();
})