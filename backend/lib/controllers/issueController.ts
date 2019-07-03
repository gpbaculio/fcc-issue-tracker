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
    const requiredFields = ['issue_title', 'issue_text', 'created_by'];
    const paramKeys = Object.keys(params);
    const valid = requiredFields.every(k => paramKeys.includes(k));
    if (!valid) return res.status(200).send('missing inputs');
    newIssue.save((error, savedIssue) => {
      if (error) return res.status(500).send(error.message);
      Issue.findById(savedIssue._id, (error, issue) => {
        if (error) return res.send(500).send(error.message);
        res.status(200).json(issue);
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
        if (error) return res.status(500).send(error.message);
        this.createIssue(res, params);
      });
    }
  };
  public delete = async (req: Request, res: Response) => {
    const { project_name } = req.params;
    const { id } = req.body;
    const project = await Project.findOne({ project_name });
    if (!project) return res.status(404).send('Project does not exist');
    Issue.findOneAndRemove({ _id: id, project_name }, (error, issue) => {
      if (error) return res.status(404).send('Issue not found');
      res.json({
        issue,
        message: `Successfully deleted issue ${issue.issue_title}`
      });
    });
  };
  public getIssues = async (req: Request, res: Response) => {
    const { project_name } = req.params;
    const { offset, limit, ...params } = req.query;
    const query = Object.keys(params).reduce(
      (q, key) => {
        const param = params[key];
        if (key === 'open') q['open'] = Boolean(param);
        else q[key] = param;
        return q;
      },
      { project_name }
    );
    Project.findOne({ project_name }, (error, project) => {
      if (error) return res.status(500).send(error.message);
      if (!project) return res.status(500).send('Project does not exist');
      Issue.find(
        query,
        null,
        { skip: parseInt(offset), limit: parseInt(limit) },
        (error, issues) => {
          if (error) return res.status(500).send(error.message);
          Issue.countDocuments(query, (error, count) => {
            if (error) return res.status(500).send(error.message);
            res.json(issues);
          });
        }
      );
    });
  };
  public update = async (req: Request, res: Response) => {
    const { _id, ...params } = req.body;
    const { project_name } = req.params;
    const query = Object.keys(params).reduce((q, key) => {
      const param = params[key];
      if (param || typeof param === 'boolean') q[key] = param;
      return q;
    }, {});
    Project.findOne({ project_name }, (error, project) => {
      if (error) return res.status(500).send(error.message);
      if (!project) return res.status(500).send('Project not found');
      Issue.findOneAndUpdate(
        { _id, project_name },
        { $set: query },
        { new: true },
        (error, issue) => {
          if (error) return res.status(404).send(error.message);
          res.send('successfully updated');
        }
      );
    });
  };
}
