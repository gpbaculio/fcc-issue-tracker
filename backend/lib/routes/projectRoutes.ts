/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

import ProjectController from '../controllers/projectController';

export default class ProjectRoutes {
  public projectController: ProjectController = new ProjectController();
  public routes(app): void {
    app.route('/api/project').get(this.projectController.getProject);
  }
}
