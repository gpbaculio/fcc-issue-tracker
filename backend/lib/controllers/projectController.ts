/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */
import { Request, Response } from 'express';
import Project, { ProjectDocument } from '../models/Project';

export default class ProjectController {
  public getProject = (req: Request, res: Response) => {
    console.log('api info');
    const { project_name } = req.query;
    Project.find(
      { project_name: { $regex: project_name, $options: 'i' } },
      'project_name',
      (error, issues) => {
        if (error) res.status(500).send(error.message);
        res.json({ issues });
      }
    );
  };
}
