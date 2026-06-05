import express from 'express';
import https from 'https';

const app = express();

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.get(['/login', '/login/'], (req, res) => {
  res.type('text/plain');
  res.send('ayham');
});

app.get(['/id/:n', '/id/:n/'], (req, res) => {
  const n = req.params.n;
  const options = {
    hostname: 'nd.kodaktor.ru',
    path: `/users/${n}`,
    method: 'GET',
    headers: {}
  };

  https.get(options, response => {
    let data = '';

    response.on('data', chunk => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        const login = parsed.login || parsed.user?.login || parsed.data?.login || '';
        res.type('text/plain');
        res.send(login);
      } catch {
        res.type('text/plain');
        res.send('');
      }
    });
  }).on('error', () => {
    res.type('text/plain');
    res.send('');
  });
});

app.all('*', (req, res) => {
  res.type('text/plain');
  res.send('ayham');
});

app.listen(process.env.PORT || 3000);
