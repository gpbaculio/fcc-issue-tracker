/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */
import { Request, Response } from 'express';
import Project, { ProjectDocument } from '../models/Project';

class ProjectController {
  public getProject = (req: Request, res: Response) => {
    const { project_name } = req.body;
    Project.find({ project_name }, (error, issues) => {
      if (error) res.status(500).send(error.message);
      res.json({ issues });
    });
  };
}

export default ProjectController;
