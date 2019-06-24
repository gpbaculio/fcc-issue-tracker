/*
 *
 *
 *       Complete the API routing below
 *
 *
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const projectController_1 = require("../controllers/projectController");
class ProjectRoutes {
    constructor() {
        this.projectController = new projectController_1.default();
    }
    routes(app) {
        app.route('/api/project').get(this.projectController.getProject);
    }
}
exports.default = ProjectRoutes;
//# sourceMappingURL=projectRoutes.js.map