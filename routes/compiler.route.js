const router = require("express").Router();
const { codeCompile } = require("../controllers/compiler.controller");

router.get("/compile", codeCompile);

module.exports = router;
