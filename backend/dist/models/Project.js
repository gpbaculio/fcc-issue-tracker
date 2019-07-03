"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = mongoose.model('Project', ProjectSchema);
//# sourceMappingURL=Project.js.map