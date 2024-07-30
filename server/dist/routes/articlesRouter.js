"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articlesController_1 = require("../controllers/articlesController");
const router = (0, express_1.Router)();
router.get('/articles', articlesController_1.getAllArticles);
router.get('/articles/:index', articlesController_1.getArticleByIndex);
exports.default = router;
