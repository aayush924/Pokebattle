"use strict";
const { Router } = require("express");
const express = require("express");
const router = Router();
const { getData, } = require("./controllers");
router.get("/getData", getData);
module.exports = router;
