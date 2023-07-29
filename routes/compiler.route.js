const router = require("express").Router();
const { codeCompile } = require("../controllers/compiler.controller");

router.post("/compile", codeCompile);

module.exports = router;
