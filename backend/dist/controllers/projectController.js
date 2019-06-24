"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = require("../models/Project");
class ProjectController {
    constructor() {
        this.getProject = (req, res) => {
            const { project_name } = req.body;
            Project_1.default.find({ project_name }, (error, issues) => {
                if (error)
                    res.status(500).send(error.message);
                res.json({ issues });
            });
        };
    }
}
exports.default = ProjectController;
//# sourceMappingURL=projectController.js.map