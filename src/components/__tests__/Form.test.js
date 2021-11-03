import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

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
  const student = "Lydia Miller-Jones"
  const interviewer = interviewers[0]

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers}/>);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });
  
  it("renders with initial student name", () => {
    const { getByTestId } = render(<Form interviewers={interviewers} student={student}/>);
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });
  
  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render( <Form interviewers={interviewers} onClick={onSave} />);
    fireEvent.click(getByText("Save"));
    
    // onSave is not called because student name is missing
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("validates that the interviewer was not selected", () => {
    const onSave = jest.fn();
    const { getByText } = render( <Form interviewers={interviewers} student={student} onClick={onSave} />);
    fireEvent.click(getByText("Save"));
    
    // onSave is not called because interviewer is missing
    expect(getByText(/no interviewer selected/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the student name is defined and interviewer is selected", () => {
    const onSave = jest.fn();

    const { getByText, queryByText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
        student={student}
        interviewer={interviewer}
      />
    );
    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/no interviewer selected/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    });
  });

  it("submits information of student name entered by the user when interviewer is selected", () => {
    const onSave = jest.fn();

    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
        student={student}
        interviewer={interviewer}
      />
    );
    
    const input = getByPlaceholderText("Enter Student Name");
    fireEvent.change(input, {target: {value: "Lydia Miller-Jones"}})

    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", interviewer);
  });


  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        student={student}
        interviewer={interviewer}
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

});