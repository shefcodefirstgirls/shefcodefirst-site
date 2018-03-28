var express = require('express');
var router = express.Router();
const yaml = require('js-yaml');
const fs = require('fs');
const axios = require('axios'); 
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; 
if (!GITHUB_TOKEN) throw new Error('Supply GitHub token'); 
const graphql = `{
  organization(login: "shefcodefirstgirls") {
    name
    url
    avatarUrl
    description
    repositories(last: 100) {
      totalCount
      edges {
        node {
          name
          url
          description
          homepageUrl
        }
      }
    }
  }
}`;

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.post('https://api.github.com/graphql',
    { query: graphql }, { headers: {'Authorization': `Bearer ${GITHUB_TOKEN}`} })
    .then((graphqlRes) => {
      const query = graphqlRes.data.data
      const org = query.organization
      const repos = org.repositories.edges.map(edge => edge.node)
      // const portfolioYaml = yaml.safeLoad(fs.readFileSync('_data/portfolio.yml', 'utf8')).reverse();
      res.render('index', {
        title: 'Code First: Girls | Sheffield',
        // portfolio: portfolioYaml,
        org: org,
        repos: repos
      })
    })
    .catch((err) => {
      console.error(err);
      res.render('error', {});
    });
});

module.exports = router;
