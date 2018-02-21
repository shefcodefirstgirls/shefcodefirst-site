var express = require('express');
var router = express.Router();
const yaml = require('js-yaml');
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    const portfolioYaml = yaml.safeLoad(fs.readFileSync('_data/portfolio.yml', 'utf8'));
    const slidesYaml = yaml.safeLoad(fs.readFileSync('_data/slides.yml', 'utf8'));
    const statsQuery = [{"fact": "this is a test", "number": 42, "icon": "fa-code-fork"}, {"fact": "this is a test", "number": 42, "icon": "fa-code-fork"}]
    console.log(portfolioYaml)
    res.render('index', { title: 'Simon Fish', portfolio: portfolioYaml, slides: slidesYaml, stats: statsQuery });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
