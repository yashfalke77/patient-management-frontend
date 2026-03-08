import { backendApiUrl } from "@/lib/backend.config";
import { PatientSchema } from "@/models/patient.model";
import axios from "axios";

export const getPatientById =  async (id: string) => {
    const {data : patient} = await axios.get(`${backendApiUrl}/api/patient/${id}`)
    return patient;
}

export const updatePatientById = async(id: string, patientData: PatientSchema,  token: string) => {
    const {data: patient} = await axios.patch(`${backendApiUrl}/api/patient/${id}`, patientData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return patient;
}

export const getPatientByUserId = async(userId: string) => {
    const {data: patient} = await axios.get(`${backendApiUrl}/api/patient/user/${userId}`);
    return patient;
}