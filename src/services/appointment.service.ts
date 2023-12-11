import db from '../orm/config/ormconfig';
import { Appointment } from '../orm/entities/appointment';

const appointmentRepository = db.getRepository(Appointment);

export const appointmentService = {
  post: async (req) => {
    const { noh, pr, materialRequired, frequency, date, time, location, source, service, customer } = req.body;

    const newAppointment = new Appointment();

    newAppointment.noh = noh;
    newAppointment.pr = pr;
    newAppointment.materialRequired = materialRequired;
    newAppointment.frequency = frequency;
    newAppointment.date = date;
    newAppointment.time = time;
    newAppointment.location = location;
    newAppointment.source = source;
    newAppointment.services = service;
    newAppointment.customer = customer;

    return await appointmentRepository.save(newAppointment);
  },
};
