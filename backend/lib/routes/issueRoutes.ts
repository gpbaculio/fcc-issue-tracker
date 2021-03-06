/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

import IssueController from '../controllers/issueController';

export default class IssueRoutes {
  public issueController: IssueController = new IssueController();
  public routes(app): void {
    app
      .route('/api/issues/:project_name')
      .get(this.issueController.getIssues)
      .post(this.issueController.create)
      .put(this.issueController.update)
      .delete(this.issueController.delete);
    app
      .route('/api/issues/count/:project_name')
      .get(this.issueController.getCount);

    app
      .route('/api/issues/:project_name/:issue_id')
      .delete(this.issueController.delete);
  }
}
