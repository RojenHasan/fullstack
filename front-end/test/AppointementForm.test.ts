// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';


// // Mocking dependencies
// jest.mock('@/service/PatientService');
// jest.mock('@/service/DoctorService');
// jest.mock('@/service/AppointmentService');
// jest.mock('next/router', () => ({
//   useRouter: jest.fn(),
// }));

// describe('AppointmentForm', () => {
//   test('renders form elements', () => {
//     const { getByLabelText, getByText } = render(<AppointmentForm />);

//     expect(getByLabelText(/Date/i)).toBeInTheDocument();
//     expect(getByLabelText(/Time/i)).toBeInTheDocument();
//     expect(getByLabelText(/Select Patient/i)).toBeInTheDocument();
//     expect(getByLabelText(/Select Doctor/i)).toBeInTheDocument();
//     expect(getByText(/Add/i)).toBeInTheDocument();
//   });

//   test('submits form with valid data', async () => {
//     // Mocking the fetch calls from services
//     // You would need to adjust this based on your actual service implementation
//     // For example, you can use `jest.mock` to mock the entire module.

//     // Mock the router
//     const useRouterMock = jest.fn();
//     useRouterMock.mockReturnValue({});
//     jest.mock('next/router', () => ({
//       useRouter: useRouterMock,
//     }));

//     const { getByLabelText, getByText } = render(<AppointmentForm />);

//     // Fill in the form
//     fireEvent.change(getByLabelText(/Date/i), { target: { value: '2023-01-01' } });
//     fireEvent.change(getByLabelText(/Time/i), { target: { value: '12:00' } });
//     fireEvent.change(getByLabelText(/Select Patient/i), { target: { value: '1' } });
//     fireEvent.change(getByLabelText(/Select Doctor/i), { target: { value: '2' } });

//     // Submit the form
//     fireEvent.click(getByText(/Add/i));

//     // You might want to adjust this part based on your actual implementation
//     await waitFor(() => {
//       expect(useRouterMock).toHaveBeenCalledWith('/appointments');
//     });
//   });
// });
