const https = require('https');

const options = {
  hostname: 'api.github.com',
  path: '/users/Tasrif-Ahmed-Mohsin/repos',
  headers: {
    'User-Agent': 'Node.js'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const repos = JSON.parse(data);
      const parsed = repos.map(repo => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        url: repo.html_url
      }));
      console.log(JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.error(e);
    }
  });
}).on('error', (e) => {
  console.error(e);
});
