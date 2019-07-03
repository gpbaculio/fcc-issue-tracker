"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Issue_1 = require("../models/Issue");
const Project_1 = require("../models/Project");
class IssueController {
    constructor() {
        this.createIssue = (res, params) => {
            const newIssue = new Issue_1.default(params);
            newIssue.save((error, savedIssue) => {
                if (error)
                    return res.status(200).send(error.message);
                Issue_1.default.findById(savedIssue._id, 'issue_title issue_text created_by assigned_to status_text open _id createdAt updatedAt', (error, issue) => {
                    if (error)
                        return res.send(500).send(error.message);
                    res.status(200).json(error);
                    res.json(Object.assign({}, issue, { message: `Successfully submitted issue ${issue.issue_title}` }));
                });
            });
        };
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const params = __rest(req.body, []);
            const { project_name } = req.params;
            const project = yield Project_1.default.findOne({ project_name });
            if (project) {
                this.createIssue(res, params);
            }
            else {
                const newProject = new Project_1.default({ project_name });
                newProject.save((error, _project) => {
                    if (error)
                        return res.status(500).send(error.message);
                    this.createIssue(res, params);
                });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { project_name } = req.params;
            const { id } = req.body;
            const project = yield Project_1.default.findOne({ project_name });
            if (!project)
                return res.status(404).send('Project does not exist');
            Issue_1.default.findOneAndRemove({ _id: id, project_name }, (error, issue) => {
                if (error)
                    return res.status(404).send('Issue not found');
                res.json({
                    issue,
                    message: `Successfully deleted issue ${issue.issue_title}`
                });
            });
        });
        this.getIssues = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { project_name } = req.params;
            const _a = req.query, { offset, limit } = _a, params = __rest(_a, ["offset", "limit"]);
            const query = Object.keys(params).reduce((q, key) => {
                const param = params[key];
                if (key === 'open')
                    q['open'] = Boolean(param);
                else
                    q[key] = param;
                return q;
            }, { project_name });
            Project_1.default.findOne({ project_name }, (error, project) => {
                if (error)
                    return res.status(500).send(error.message);
                if (!project)
                    return res.status(500).send('Project does not exist');
                Issue_1.default.find(query, null, { skip: parseInt(offset), limit: parseInt(limit) }, (error, issues) => {
                    if (error)
                        return res.status(500).send(error.message);
                    Issue_1.default.countDocuments(query, (error, count) => {
                        if (error)
                            return res.status(500).send(error.message);
                        res.json({ issues, count });
                    });
                });
            });
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _b = req.body, { id } = _b, params = __rest(_b, ["id"]);
            const { project_name } = req.params;
            const query = Object.keys(params).reduce((q, key) => {
                const param = params[key];
                if (param || typeof param === 'boolean')
                    q[key] = param;
                return q;
            }, {});
            Project_1.default.findOne({ project_name }, (error, project) => {
                if (error)
                    return res.status(500).send(error.message);
                if (!project)
                    return res.status(500).send('Project does not exist');
                Issue_1.default.findOneAndUpdate({ _id: id, project_name }, { $set: query }, { new: true }, (error, issue) => {
                    if (error)
                        return res.status(404).send(error.message);
                    res.json({
                        issue,
                        message: `Successfully updated issue ${issue.issue_title}`
                    });
                });
            });
        });
    }
}
exports.default = IssueController;
//# sourceMappingURL=issueController.js.map