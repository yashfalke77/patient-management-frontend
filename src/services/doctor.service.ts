import { backendApiUrl } from "@/lib/backend.config";
import { Doctor } from "@/models/doctor.model";
import axios from "axios";

export const getAllActiveDoctors = async() => {
    const {data : doctorArray} = await axios.get(`${backendApiUrl}/api/appointment/doctor`)
    return doctorArray;
}

export const getDoctorById = async(doctorId: string) => {
    const {data: doctor} = await axios.get(`${backendApiUrl}/api/appointment/doctor/${doctorId}`)
    return doctor
}