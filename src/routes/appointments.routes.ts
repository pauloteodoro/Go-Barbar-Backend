import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepositories from '../Repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepositories = new AppointmentsRepositories();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepositories.all();
  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(appointmentsRepositories);
    const appointment = createAppointment.execute({ date: parseDate, provider });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
