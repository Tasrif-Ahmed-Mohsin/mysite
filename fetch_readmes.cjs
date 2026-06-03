const https = require('https');

const repos = ['Gun-detection-with-yolov10', 'Restaurant-Saga', 'Robo-Pekka', 'Way-to-BRAC'];
let count = 0;

repos.forEach(repo => {
  const options = {
    hostname: 'api.github.com',
    path: `/repos/Tasrif-Ahmed-Mohsin/${repo}/readme`,
    headers: { 'User-Agent': 'Node.js', 'Accept': 'application/vnd.github.v3.raw' }
  };
  https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`\n--- README for ${repo} ---`);
      if (res.statusCode === 200) {
        console.log(data.substring(0, 500) + '...');
      } else {
        console.log(`No README found or error (${res.statusCode})`);
      }
    });
  }).on('error', console.error);
});
