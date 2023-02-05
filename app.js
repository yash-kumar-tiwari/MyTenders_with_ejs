import express from 'express';
import * as url from 'url';
import * as path from 'path';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import cookie from 'cookie-parser';

const app = express();
const __dirname = url.fileURLToPath(new URL ('.', import.meta.url));

// configuration for static file loading
app.use(express.static(path.join(__dirname, 'public')));

//configuration to handle cookie
app.use(cookie());

//configuration to enable session
app.use(session({"secret":"madhya_pradesh_police"}));

//configuration to extract request body content
app.use(bodyParser());

// //configuration to extract request file content
// app.use(fileUpload());

//configuration to extract request file content with size limit
app.use(fileUpload({
    limits:{ fileSize : 50 * 1024 * 1024 * 1024}
}));

// configuration for template pages and template engines
app.set("view engine", "ejs");
app.set("views", "./views");

//application level url routes

import index from './routes/IndexRoute.js';
import admin from './routes/AdminRoute.js';
import user from './routes/UserRoute.js';

//route level middleware

app.use("/admin", admin);
app.use("/user", user);
app.use("/", index);

app.listen(3007);

console.log("Server Invoked at link http://localhost:3007");