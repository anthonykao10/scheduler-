import React from "react";

import { render, fireEvent, cleanup } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
    <Form interviewers={interviewers}/>
    );

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
    <Form name="Lydia Miller-Jones" interviewers={interviewers}/>
    );

    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
  
    const { getByText } = render(
      <Form onSave={onSave} interviewers={interviewers} />
    );
  
    fireEvent.click(getByText(/save/i));
    
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
    const onSave = jest.fn();

    const { queryByText, getByText } = render(
      <Form 
      name={"Lydia Miller-Jones"}
      onSave={onSave}
      interviewers={interviewers} 
      />
    );

    fireEvent.click(getByText(/save/i));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
});