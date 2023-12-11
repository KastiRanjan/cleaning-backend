import db from '../orm/config/ormconfig';
import { Assignee } from '../orm/entities/assignee';

const assigneeRepository = db.getRepository(Assignee);

export const assigneeService = {
  post: async (req) => {
    const { appointment, user } = req.body;

    const newAssignee = new Assignee();

    newAssignee.appointment = appointment;
    newAssignee.user = user;

    return await assigneeRepository.save(newAssignee);
  },
};
