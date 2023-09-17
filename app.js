const express = require('express');
const app = express();

// public 
app.use(express.static(__dirname));

// body parser 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get / index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
}
);

// serve app on 3000

app.listen(3000, () => {
    console.log('App listening on port 3000!');
}
);


