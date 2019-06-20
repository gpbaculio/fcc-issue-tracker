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
class IssueController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const params = __rest(req.body, []);
            console.log('params ', params);
            const newIssue = new Issue_1.default(params);
            newIssue.save((error, issue) => {
                if (error)
                    res.status(500).send(error.message);
                else
                    res.json({
                        issue,
                        message: `Successfully submitted issue ${issue.issue_title}`
                    });
            });
        });
        this.getIssues = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const params = __rest(req.query, []);
            yield Issue_1.default.find(params, (error, issues) => {
                if (error)
                    res.status(500).send(error.message);
                res.json({ issues });
            });
        });
    }
}
exports.default = IssueController;
//# sourceMappingURL=issueController.js.map