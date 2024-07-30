"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleByIndex = exports.getAllArticles = void 0;
const Article_1 = __importDefault(require("../models/Article"));
const getAllArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    try {
        const articles = yield Article_1.default.find()
            .skip((page - 1) * limit) // Пропуск статей для получения правильной страницы
            .limit(limit); // Ограничение количества статей, возвращаемых за один запрос
        return res.status(200).json(articles);
    }
    catch (error) {
        const errorMessage = error.message;
        return res.status(500).json({ message: errorMessage });
    }
});
exports.getAllArticles = getAllArticles;
const getArticleByIndex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { index } = req.params;
    try {
        const article = yield Article_1.default.findOne({ index });
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        return res.status(200).json(article);
    }
    catch (error) {
        const errorMessage = error.message;
        return res.status(500).json({ message: errorMessage });
    }
});
exports.getArticleByIndex = getArticleByIndex;
