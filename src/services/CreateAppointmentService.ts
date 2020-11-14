import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../Repositories/AppointmentsRepository';

interface requestDTO{
  provider:string;
  date:Date;
}

class CreateAppointmentService {
  private appointmentsRepositories: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepositories = appointmentsRepository;
  }

  public execute({ provider, date }:requestDTO) :Appointment {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = this.appointmentsRepositories.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booker');
    }

    const appointment = this.appointmentsRepositories.create({ provider, date: appointmentDate });

    return appointment;
  }
}

export default CreateAppointmentService;
