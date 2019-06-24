"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ProjectController {
    constructor() {
        this.getProject = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('project_name fired!');
            res.send('project route');
            // const { project_name } = req.body;
            // await Project.find(
            //   { project_name: new RegExp(project_name, 'i') },
            //   (error, issues) => {
            //     console.log('error ', error);
            //     if (error) res.status(500).send(error.message);
            //     res.json({ issues });
            //   }
            // );
        });
    }
}
exports.default = ProjectController;
//# sourceMappingURL=projectController.js.map