/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */
import { Request, Response } from 'express';
import Issue, { IssueDocument } from '../models/Issue';
import Project, { ProjectDocument } from '../models/Project';

export default class IssueController {
  private createIssue = (res, params) => {
    const newIssue = new Issue(params);
    newIssue.save((error, issue) => {
      if (error) res.status(500).send(error.message);
      res.json({
        issue,
        message: `Successfully submitted issue ${issue.issue_title}`
      });
    });
  };
  public create = async (req: Request, res: Response) => {
    const { ...params } = req.body;
    const { project_name } = req.params;
    const project = await Project.findOne({ project_name });
    if (project) {
      this.createIssue(res, params);
    } else {
      const newProject = new Project({ project_name });
      newProject.save((error, _project) => {
        if (error) res.status(500).send(error.message);
        this.createIssue(res, params);
      });
    }
  };

  public update = async (req: Request, res: Response) => {
    const { id, ...params } = req.body;
    const { project_name } = req.params;
    const query = Object.keys(params).reduce((q, key) => {
      const param = params[key];
      if (param || typeof param === 'boolean') q[key] = param;
      return q;
    }, {});
    const project = await Project.findOne({ project_name });
    if (!project) res.status(404).send('Project does not exist');
    Issue.findOneAndUpdate(
      { _id: id, project_name },
      { $set: query },
      { new: true },
      (error, issue) => {
        console.log('asdasdsadasd', issue);
        if (error) res.status(404).send('Issue not found');
        res.json({
          issue,
          message: `Successfully updated issue ${issue.issue_title}`
        });
      }
    );
  };
  public delete = async (req: Request, res: Response) => {
    const { project_name } = req.params;
    const { id } = req.body;
    const project = await Project.findOne({ project_name });
    if (!project) res.status(404).send('Project does not exist');
    Issue.findOneAndRemove({ _id: id, project_name }, (error, issue) => {
      if (error) res.status(404).send('Issue not found');
      res.json({
        issue,
        message: `Successfully deleted issue ${issue.issue_title}`
      });
    });
  };
  public getIssues = async (req: Request, res: Response) => {
    const { project_name, offset, limit } = req.params;
    Project.findOne({ project_name }, (error, project) => {
      if (error) res.status(500).send(error.message);
      if (!project) res.status(500).send('Project does not exist');
      Issue.find(
        { project_name },
        null,
        { skip: offset, limit },
        (error, issues) => {
          if (error) res.status(500).send(error.message);
          Issue.countDocuments({ project_name }, (error, count) => {
            if (error) res.status(500).send(error.message);
            res.json({ issues, count });
          });
        }
      );
    });
  };
}
