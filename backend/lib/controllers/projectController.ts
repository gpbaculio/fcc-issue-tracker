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
  public getProject = async (req: Request, res: Response) => {
    console.log('project_name fired!');
    res.send('project route');
    // const { project_name } = req.body;
    // await Project.find(
    //   { project_name: new RegExp(project_name, 'i') },
    //   (error, issues) => {
    //     console.log('error ', error);
    //     if (error) res.status(500).send(error.message);
    //     res.json({ issues });
    //   }
    // );
  };
}

export default ProjectController;
