// tslint:disable-next-line: no-var-requires
const express = require('express');
// tslint:disable-next-line: no-var-requires
const cors = require('cors');
// tslint:disable-next-line: no-var-requires
const bodyParser = require('body-parser');

const auth = require('./firebaseconfiguration/firebase-admin').auth();

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(getToken);

app.use('/', require('./routes/routes'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//Collecting the bearer token from the headers

async function getToken(req: any, res: any, next: any) {
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    const id = req.headers.authorization.split('Bearer ')[1];
    try {
      const token = await auth.verifyIdToken(id);
      req['currentUser'] = token;
    } catch (err) {
      console.log(err);
    }
  }
  next();
}

export {}