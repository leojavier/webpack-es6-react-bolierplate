#todo:

## Dev Environment
The following command will clean the directory, build the project and run webpack-dev-server with hot reload. 
There is not routing within this environment. This environment's focus is to provide you with the necesary tools to prototype UIs.

```
npm start 
```

###Instruction for development
This is an Isomorphic application. It is not recommended to use babel-node on production, so the project needs to be transpiled to ES5 in order to run without babel-node. The following instructions are steps that must be taken in order to build the application.
- create a new view in: [views/newpage.ejs]
- add a new property in webpack to the `entryProd object` to compile its css `viewName: path.join(__dirname, 'src/css/viewName.less')`
- Create view `styleFile.less` inside [src/css/viewName.less]
- Create `viewComponent` inside [src/viewName.jsx]
- Add the route in the [lib/server.js] and its dependencies for production

## Staging Environment
Will clean the directory, build the project and run the express server in lib/server.js
```
npm run server
```

## Production Environment
Will do the following:
- Clean dist folder since is the base directory
- create a folder [build] 
- buid the project for node and organize the files within the [build folder]

**Note: The project must be run from the build folder**

```
npm run build-node
npm nodemon build/lib/server.js // run the server
```