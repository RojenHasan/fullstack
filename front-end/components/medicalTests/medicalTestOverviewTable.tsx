import React from "react";
import { MedicalTest } from "../../types";

type Props = {
    medicalTests: Array<MedicalTest>;
};

const MedicalTestsOverviewTable: React.FC<Props> = ({ medicalTests }: Props) => {
    return (
        <>
        {medicalTests.length > 0 ? (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Cost</th>
                        <th scope="col">Patient name</th>
                    </tr>
                </thead>
                <tbody>
                    {medicalTests.map((medicalTest, index) => (
                        <tr key={index}>
                            <td>{medicalTest.name}</td>
                            <td>{medicalTest.description}</td>
                            <td>{medicalTest.cost}</td>
                            <td>{medicalTest.patient.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>No medical tests available for this doctor.</p>
        )}
    </>
);
};

export default MedicalTestsOverviewTable;