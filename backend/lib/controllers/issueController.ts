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
    const { ...params } = req.body;
    console.log('params ', params);
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
  public getIssues = async (req: Request, res: Response) => {
    const { ...params } = req.query;
    await Issue.find(params, (error, issues) => {
      if (error) res.status(500).send(error.message);
      res.json({ issues });
    });
  };
}
