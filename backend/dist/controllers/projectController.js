"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = require("../models/Project");
class ProjectController {
    constructor() {
        this.getProject = (req, res) => {
            const { project_name } = req.query;
            Project_1.default.find({ project_name: { $regex: project_name, $options: 'i' } }, 'project_name', (error, issues) => {
                if (error)
                    res.status(500).send(error.message);
                res.json({ issues });
            });
        };
    }
}
exports.default = ProjectController;
//# sourceMappingURL=projectController.js.map