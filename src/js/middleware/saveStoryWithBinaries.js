/*
Copyright 2017-2018 OCAD University
Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.
You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/fluid-project/sjrk-story-telling-server/master/LICENSE.txt
*/

"use strict";

var fluid = require("infusion");
require("kettle");

var sjrk = fluid.registerNamespace("sjrk");

fluid.defaults("sjrk.storyTelling.server.middleware.saveStoryWithBinaries", {
    gradeNames: ["kettle.middleware.multer"],
    binaryUploadOptions: {
        fileMaxCount: 10,
        uploadDirectory: "./uploads"
    },
    invokers: {
        "getMiddlewareForFileStrategy": {
            "funcName": "kettle.middleware.multer.getMiddlewareForFileStrategy",
            "args": ["{that}", "fields", [
                    {name: "file", maxCount: "{that}.options.binaryUploadOptions.fileMaxCount"},
                    {name: "model", maxCount: 1}
            ]]
        },
        "getStorage": {
            "func": "{that}.getDiskStorage"
        },
        "getDiskStorageDestinationFunc": {
            "funcName": "sjrk.storyTelling.server.middleware.saveStoryWithBinaries.getDiskStorageDestinationFunc",
            "args": ["{that}.options.binaryUploadOptions.uploadDirectory"]
        }
    }
});

sjrk.storyTelling.server.middleware.saveStoryWithBinaries.getDiskStorageDestinationFunc = function (uploadDirectory) {
    return function (req, file, cb) {
        cb(null, uploadDirectory);
    };
};
