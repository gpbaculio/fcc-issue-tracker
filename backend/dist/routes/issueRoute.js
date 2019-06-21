/*
 *
 *
 *       Complete the API routing below
 *
 *
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const issueController_1 = require("../controllers/issueController");
class ApiRoutes {
    constructor() {
        this.issueController = new issueController_1.default();
    }
    routes(app) {
        app
            .route('/api/issues/:project_name')
            .post(this.issueController.create)
            .put(this.issueController.update)
            .delete(this.issueController.delete);
    }
}
exports.default = ApiRoutes;
//# sourceMappingURL=issueRoute.js.map