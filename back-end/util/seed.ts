// Execute: npx ts-node util/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const deleteData = async () => {
    await prisma.appointment.deleteMany()
    await prisma.medicalRecord.deleteMany()
    await prisma.medicalTest.deleteMany()
    await prisma.doctor.deleteMany()
    await prisma.patient.deleteMany()
    await prisma.user.deleteMany()
}

const seedData = async () => {

    const adminUser = await prisma.user.create({
        data:{id: 99, email: "t@t.be", password: await bcrypt.hash("t", 12) }
    })

    const doktorUser = await prisma.user.create({
        data:{id: 1, email: "doctor@doctor.com", password: await bcrypt.hash("t", 12) }
    })

    const doktor2User = await prisma.user.create({
        data:{id:2 ,email: "doctor2@doctor.com", password: await bcrypt.hash("test", 12)}
    })

    const patientUser = await prisma.user.create({
        data:{id:3, email: "patient@patient.com", password: await bcrypt.hash("t", 12 )}
    })

    const patient2User = await prisma.user.create({
        data:{id:4, email: "patient2@patient.com", password: await bcrypt.hash("test", 12)}
    })

    const doktor = await prisma.doctor.create({
        
        data:{
            user: {
                connect: { id: doktorUser.id }            
            },
            name: "doctor",
            experience: "1",
            availability: "1"
        }
    })

    const doktor2 = await prisma.doctor.create({
        data:{
            user: {
                connect: { id: doktor2User.id }            
            },
            name: "doctor",
            experience: "1",
            availability: "1"
        }
    })

    const patient = await prisma.patient.create({
        data:{
            user: {
                connect: { id: patientUser.id }            
            },
            name: "patient",
            medical_History: "Sleep deprevation",
            street: "Bondgenotenlaan",
            postcode: 3000,
            housenr: 2,
            stad: "Leuven"
        }
    })

    const patient2 = await prisma.patient.create({
        data:{
            user: {
                connect: { id: patient2User.id }            
            },
            name: "patient2",
            medical_History: "Tetanus",
            street: "Miunsstraat",
            postcode: 3000,
            housenr: 1,
            stad: "Leuven"
        }
    })

    const diagnoseCovid = "COVID"
    const treatmentCovid = "Rest"
    const treatmentEbola = "ZMapp"
    const diagnoseEbola = "EBOLA"

    const medicalTest1Patient1 = await prisma.medicalTest.create({
        data:{
            name: "COVIDTEST",
            cost: 10,
            description: "COVID",
            patient: {
                connect: { id: patient.id }            
            },
            doctor: {
                connect: { id: doktor.id }            
            }
        }
    })

    const medicalTest2Patient1 = await prisma.medicalTest.create({
        data:{
            name: "EBOLATEST",
            cost: 15,
            description: "EBOLA",
            patient: {
                connect: { id: patient.id }            
            },
            doctor: {
                connect: { id: doktor2.id }            
            }
        }
    })

    const medicalTest1Patient2 = await prisma.medicalTest.create({
        data:{
            name: "COVIDTEST",
            cost: 10,
            description: "COVID",
            patient: {
                connect: { id: patient2.id }            
            },
            doctor: {
                connect: { id: doktor.id }            
            }
        }
    })

    const medicalTest2Patient2 = await prisma.medicalTest.create({
        data:{
            name: "EBOLATEST",
            cost: 15,
            description: "EBOLA",
            patient: {
                connect: { id: patient2.id }            
            },
            doctor: {
                connect: { id: doktor2.id }            
            }
        }
    })

    const medicalTestsPatient1 = [medicalTest1Patient1, medicalTest2Patient1]
    const medicalTestsPatient2 = [medicalTest1Patient2, medicalTest2Patient2]

    const date1 = new Date(2021, 1, 1, 1, 1, 1, 1)
    const date2 = new Date(2021, 1, 2, 1, 1, 1, 1)
    const date3 = new Date(2021, 1, 3, 1, 1, 1, 1)
    const date4 = new Date(2021, 1, 4, 1, 1, 1, 1)

    const medicalRecordPatient1 = await prisma.medicalRecord.create({
        data:{
            diagnosis: diagnoseCovid,
            treatment: treatmentCovid,
            patient: {
                connect: { id: patient.id }            
            },
            doctor: {
                connect: { id: doktor.id }            
            },
            date: date1
        }
     })

    const medicalRecordPatient2 = await prisma.medicalRecord.create({
            data:{
                diagnosis: diagnoseEbola,
                treatment: treatmentEbola,
                patient: {
                    connect: { id: patient2.id }            
                },
                doctor: {
                    connect: { id: doktor2.id }            
                },
                date: date1
            }
        })
    
    const medicalRecord2Patient1 = await prisma.medicalRecord.create({
            data:{
                diagnosis: diagnoseCovid,
                treatment: treatmentCovid,
                patient: {
                    connect: { id: patient.id }            
                },
                doctor: {
                    connect: { id: doktor.id }            
                },
                date: date2
            }
        })

    const medicalRecord2Patient2 = await prisma.medicalRecord.create({
            data:{
                diagnosis: diagnoseEbola,
                treatment: treatmentEbola,
                patient: {
                    connect: { id: patient2.id }            
                },
                doctor: {
                    connect: { id: doktor2.id }            
                },
                date: date2
            }
        })

    const appointmentPatient1 = await prisma.appointment.create({
            data:{
                time: date3,
                date: date3,
                patient: {
                    connect: { id: patient.id }            
                },
                doctor: {
                    connect: { id: doktor.id }            
                },
                medicalTest: {
                    connect: [{ id: medicalTest1Patient1.id }, { id: medicalTest2Patient1.id }]
                },
                medicalRecord: {
                    connect: { id: medicalRecordPatient1.id }
                }
            }
        })
    
    const appointmentPatient2 = await prisma.appointment.create({
            data:{
                time: date4,
                date: date4,
                patient: {
                    connect: { id: patient2.id }            
                },
                doctor: {
                    connect: { id: doktor2.id }            
                },
                medicalTest: {
                    connect: [{ id: medicalTest1Patient2.id }, { id: medicalTest2Patient2.id }]
                },
                medicalRecord: {
                    connect: { id: medicalRecordPatient2.id }
                }
            }
        })
}

(async () => {
    try {
        await deleteData();
        await seedData();
    } catch (error) {
        console.error("Error seeding the database:", error);
    } finally {
        await prisma.$disconnect();
    }
})();


