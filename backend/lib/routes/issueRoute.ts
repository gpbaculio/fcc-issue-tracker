/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

import IssueController from '../controllers/issueController';

export default class ApiRoutes {
  public issueController: IssueController = new IssueController();
  public routes(app): void {
    app.route('/api/issues/:project_name').post(this.issueController.create);
  }
}
