# myMeals

# Preview(to follow)

## Steps:

Follow these steps to create the project:

###### **Step 1**: Create new repository on GitHub

###### **Step 2**:Clone the repository on local workspace

<details><summary><b>Details</b></summary>
git clone + Shift&Insert - in GitBash terminal
</details>

###### **Step 3**: Initial Folder Structure

<details><summary><b>Details</b></summary>
open with Visual Studio Code, Add to SRC folder, index.html(with basic layout), style.css(with basic design) and index.js(with a console)
</details>

###### **Step 4**: Initialize project to use Prettier

<details><summary><b>Details</b></summary>
-create .prettierrc file
"touch .prettierrc" - in console
with the following content:
{
  "trailingComma": "none",
  "semi": true,
  "tabWidth": 2,
  "singleQuote": false,
  "printWidth": 120,
  "arrowParens": "avoid"
} 
Prettier Settings:
VSCode:  Manage >  Settings
Search: "Default Formatter" -> Select: "Prettier - Code..."
Search: "Format On Save" -> Check it
Right Click - Format Document With... (configure...)
</details>

###### **Step 5**: Initialize project to use NPM

<details><summary><b>Details</b></summary>
-Install NodeJs
-inside root folder run "npm init -y"
-in package.json file :
    -description-add description of the project
    -author- add name/names
</details>

###### **Step 6**: Initialize project to use Webpack

<details><summary><b>Details</b></summary>
 Install required npm packages- run in console GitBash:
"npm install --save-dev webpack webpack-cli
npm i -D webpack-dev-server
npm i -D html-webpack-plugin
npm i -D html-loader style-loader css-loader"

###### **Step 7**: create webpack.config.js file

Add to webpack.config.js:-run in console:"touch webpack.config.js" and add:

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
const isProduction = !!env.WEBPACK_BUILD;
return {
mode: isProduction ? "production" : "development",
entry: ["./src/index.js"],
devtool: isProduction ? false : "inline-source-map",
devServer: {
static: ["src"],
watchFiles: ["src/**/*.*"]
},
plugins: [
new HtmlWebpackPlugin({
template: "./src/index.html"
})
],
module: {
rules: [{
test: /\.html$/i,
        loader: "html-loader"
      }, {
        test: /\.css$/i,
use: ["style-loader", "css-loader"]
}]
},
output: {
filename: "main.js",
path: path.resolve(\_\_dirname, "docs"),
publicPath: ""
}
};
};

</details>

###### **Step 8**: Configure npm scripts

<details><summary><b>Details</b></summary>
Add following scripts inside package.json(only content inside the braces with a comma first):

"scripts": {
"clean": "rimraf docs",
"clear": "npm run clean && rimraf node_modules",
"prebuild": "npm run clean",
"build": "webpack --mode production",
"start": "webpack serve --open",
"demo": "set PORT=8080 && serve docs"
}

</details>

###### **Step 9**: Start Servers

<details><summary><b>Details</b></summary>
-run ```sh npm start ``` in terminal
<details>

###### **Step 10**: Import style.css and index.js

<details><summary><b>Details</b></summary>
Folder Structure:
📁docs
    index.js
    main.js
📁filenode_modules
📁src
    index.html
    index.js
    style.css
.gitgnore
📄.prettierrc
📄package.json
webpack.config.js

-Delete links to import style.css and index.js from index.html

- in index.js add "import './style.css'"
</details>

###### **Step 11**: Install Global Packages

<details><summary><b>Details</b></summary>
```sh
npm install --global serve
npm i -g rimraf
```
-npm run clean- will remove the DOCS folder
</details>

###### **Step 12**: Running Scripts

<details><summary><b>Details</b></summary>
```sh
npm start
npm run build
npm run demo
```
CTRL + Click in  terminal  to open :
-Local:  http://localhost:8080 or
-Network : https://192.168.68.132:8080

</details>

###### **Step 13**: Create main layout

<details><summary><b>Details</b></summary>
index.html:
<header>
<div id="header-wrapper">
<div id="my-picture">
<img src="images/picture.png" alt="picture" width="100px" height="100px" >
</div>
<div id="header-info">
<h1>Title</h1>
<h2>Subtitle</h2>
</div>
</div>

</header>
<section>
<button>❌Remove</button>
Table...
</section>
<footer>👨‍💻Source Code</footer>

-npm start

style.css:

html {
height:100%
}

body {
min-height:100%;
margin:0;
display:flex;
flex-direction:column;
background:#something;
}

body > section {
flex:1;
padding:15px
}

footer {
background-color:blue;
color:white;
padding:7px;
}

header {
background: url(images/picture1.png);
}

header img {
border-radius:50%;
border:4px solid #fff;
background-color:#ffffff90;
}

#my-picture {
padding:5px;
width:108px;
height:108px;
}

#header-wrapper {
display:flex;
flex-direction:row;
align-items:center;
background:linear-gradient(45deg, #color, transparent)
}

#header-info {
padding:10px;
text-shadow: 1px 1px 2px #000000;
}

h1 {
color:white;
margin:5px 0;
}

h2 {
color:white;
margin:5px 0;
font-weight:100;
font-size:1.2em;
}

<details>

###### **Step 14**: Create Table & CSS

<details><summary><b>Details</b></summary>
index.html:

<table id="teamsTable" border="1">
<thead>
<tr>
<th>Promotion</th>
<th>Members</th>
<th>Project Name</th>
<th>Project URL</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>FastTrackIT</td>
<td>WON15</td>
<td>Teams Networking</td>
<td>won15/teams-networking</td>
<td>x</td>
</tr>
</tbody>
</table>

style.css:

#teamsTable {
width:100%;
border-collapse:collapse;
}

#teamsTable td,
#teamsTable th {
border:1px solid blue;
padding:5px;
}

#teamsTable th {
color:white;
background:#blue;
}

#teamsTable tr:nth-child(even) {
background-color:#f2f2f2;
}

</details>

###### **Step 15**: Create teams.json, load them and print them in console

<details><summary><b>Details</b></summary>
...
</details
