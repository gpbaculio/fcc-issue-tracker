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
      else
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
        else {
          this.createIssue(res, params);
        }
      });
    }
  };
  public update = async (req: Request, res: Response) => {
    const { id, ...params } = req.body;
    let query = {};
    query = Object.keys(params).reduce((obj, key) => {
      const param = params[key];
      if (param) query[key] = param;
      return query;
    }, query);
    Issue.findOneAndUpdate(
      { _id: id },
      { $set: query },
      { new: true },
      (error, issue) => {
        if (error) res.status(404).send(error.message);
        else
          res.json({
            issue,
            message: `Successfully updated issue ${issue.issue_title}`
          });
      }
    );
  };
  public getIssues = async (req: Request, res: Response) => {
    const { ...params } = req.query;
    await Issue.find(params, (error, issues) => {
      if (error) res.status(500).send(error.message);
      res.json({ issues });
    });
  };
}
