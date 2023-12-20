// import React from 'react';
// import { render, fireEvent, getAllByRole, getByText } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import { format } from 'date-fns';
// import AppointmentsOverviewTable from '@/components/appointments/AppointmentsOverviewTable';
// import appointments from '@/pages/appointments';


// const mockAppointments = [
//     {
//       id: 1,
//       date: new Date('2023-01-01'),
//       time: new Date('2023-01-01T12:00:00'),
//       doctor: { name: 'Dr. Smith' },
//       patient: { name: 'John Doe' },
//       medicalRecord: { diagnosis: 'Some diagnosis' },
//     },
//     // Add more mock appointments as needed
//   ];
  
//   describe('AppointmentsOverviewTable', () => {
//     test('renders appointments table with correct data', () => {
      
// const AppointmentsOverviewTable: React.FC<Props> = ({ appointments, onAppointmentClick }: Props) => {
  
  
//       // Check if the table headers are rendered
//       expect(getByText(/Date/)).toBeInTheDocument();
//       expect(getByText(/Time/)).toBeInTheDocument();
//       expect(getByText(/Doctor/)).toBeInTheDocument();
//       expect(getByText(/Patient/)).toBeInTheDocument();
//       expect(getByText(/Medical Record/)).toBeInTheDocument();
//       expect(getByText(/Delete/)).toBeInTheDocument();
//       expect(getByText(/Update/)).toBeInTheDocument();
  
//       // Check if the appointments data is rendered
//       mockAppointments.forEach((appointment) => {
//         expect(getByText(format(new Date(appointment.date), 'MM/dd/yyyy'))).toBeInTheDocument();
//         expect(getByText(format(new Date(appointment.time), 'HH:mm:ss'))).toBeInTheDocument();
//         expect(getByText(appointment.doctor.name)).toBeInTheDocument();
//         expect(getByText(appointment.patient.name)).toBeInTheDocument();
//         expect(getByText(appointment.medicalRecord?.diagnosis)).toBeInTheDocument();
//       });
  
//       // Check if the delete and update buttons are rendered
//       const deleteButtons = getAllByRole('button', { name: /delete/i });
//       const updateButtons = getAllByRole('button', { name: /update/i });
  
//       expect(deleteButtons).toHaveLength(mockAppointments.length);
//       expect(updateButtons).toHaveLength(mockAppointments.length);
//     });
  
//     test('handles appointment click', () => {
//       const mockHandleClick = jest.fn();
//       const { getAllByRole } = render(
//         <AppointmentsOverviewTable appointments={mockAppointments} onAppointementClick={mockHandleClick} />
//       );
  
//       // Simulate a click on each appointment row
//       const appointmentRows = getAllByRole('button', { name: /delete/i });
  
//       appointmentRows.forEach((row, index) => {
//         fireEvent.click(row);
//         expect(mockHandleClick).toHaveBeenCalledWith(mockAppointments[index]);
//       });
//     });
  
//     test('renders "No appointments available" when there are no appointments', () => {
//       const { getByText } = render(<AppointmentsOverviewTable appointments={[]} onAppointementClick={() => {}} />);
//       expect(getByText(/No appointments available/)).toBeInTheDocument();
//     });
//   });