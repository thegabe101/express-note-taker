const express = require('express');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(require('./routes/apiRoute'));
app.use(require('./routes/htmlRoute'));


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
