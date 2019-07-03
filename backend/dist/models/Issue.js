"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const IssueSchema = new mongoose.Schema({
    issue_title: {
        type: String,
        required: true
    },
    issue_text: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    assigned_to: {
        type: String,
        required: false
    },
    status_text: {
        type: String,
        required: false
    },
    project_name: {
        type: String,
        ref: 'Project',
        required: false
    },
    open: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = mongoose.model('Issue', IssueSchema);
//# sourceMappingURL=Issue.js.map