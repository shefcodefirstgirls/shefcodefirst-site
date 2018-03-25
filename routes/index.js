var express = require('express');
var router = express.Router();
const yaml = require('js-yaml');
const fs = require('fs');
const axios = require('axios'); 
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; 
if (!GITHUB_TOKEN) throw new Error('Supply GitHub token'); 
const graphql = `{
  viewer {
    organizations(last: 100) {
      edges {
        node {
          name
          url
          avatarUrl
          description
        }
      }
    }
    contributedRepositories(last: 100) {
      totalCount
    }
    starredRepositories(last: 100) {
      totalCount
    }
    issueComments {
      totalCount
    }
    isHireable
    isCampusExpert
  }
}`;

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.post('https://api.github.com/graphql',
    { query: graphql }, { headers: {'Authorization': `Bearer ${GITHUB_TOKEN}`} })
    .then((graphqlRes) => {
      const simon = graphqlRes.data.data.viewer
      const orgs = simon.organizations.edges.map(edge => edge.node);
      const contributedRepositories = simon.contributedRepositories.totalCount
      const starredRepositories = simon.starredRepositories.totalCount
      const issueComments = simon.issueComments.totalCount
      const isHireable = simon.isHireable
      const isCampusExpert = simon.isCampusExpert
      const portfolioYaml = yaml.safeLoad(fs.readFileSync('_data/portfolio.yml', 'utf8')).reverse();
      const slidesYaml = yaml.safeLoad(fs.readFileSync('_data/slides.yml', 'utf8'));
      const statsQuery = [
        { "fact": "repositories contributed to", 
          "number": contributedRepositories, 
          "icon": "fa-code-fork"
        }, 
        { "fact": "repositories starred", 
          "number": starredRepositories, 
          "icon": "fa-star"
        }, 
        { "fact": "comments made on issues", 
          "number": issueComments, 
          "icon": "fa-comments"
        } 
      ]
      res.render('index', { 
        title: 'Simon Fish', 
        portfolio: portfolioYaml, 
        orgs: orgs, 
        slides: slidesYaml, 
        stats: statsQuery,
        isHireable: isHireable
      });
    })
    .catch((err) => {
      console.error(err);
      res.render('error', {});
    });
});

module.exports = router;
