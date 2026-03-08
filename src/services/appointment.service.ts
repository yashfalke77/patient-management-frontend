import { backendApiUrl } from "@/lib/backend.config";
import axios from "axios";
import { Appointment } from '@/models/appointment.model'

export const createNewAppointment = async(appointmentRequest: Appointment, token: string) => {
    const { data: appointment } = await axios.post(
        `${backendApiUrl}/api/appointment`,
        appointmentRequest,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return appointment;
}

export const updateAppointment = async(appointmentId: string, appointmentRequest: Partial<Appointment>, token: string) => {
    const { data: appointment } = await axios.put(
        `${backendApiUrl}/api/appointment/${appointmentId}`,
        appointmentRequest,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return appointment;
}

export const getAppointmentById = async(appointmentId: string) =>{
    console.log("appointmentId:", appointmentId);
    const {data: appointment} = await axios.get(
        `${backendApiUrl}/api/appointment/${appointmentId}`
    )
    return appointment;
}