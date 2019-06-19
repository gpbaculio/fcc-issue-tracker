/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */
import { Request, Response } from 'express';
import Issue, { IssueDocument } from '../models/Issue';

export default class IssueController {
  public create = async (req: Request, res: Response) => {
    const {
      issue_title,
      issue_text,
      created_by,
      assigned_to,
      status_text
    } = req.body;
    const newIssue = new Issue({
      issue_title,
      issue_text,
      created_by,
      assigned_to,
      status_text
    });
    newIssue.save((err, file) => {
      if (err) res.send(err);
      else res.json({ file });
    });
  };
  public getIssues = async (req: Request, res: Response) => {
    const { ...params } = req.query;
    await Issue.find(params, (error, issues) => {
      if (error) res.send(error);
      res.json({ issues });
    });
  };
}
