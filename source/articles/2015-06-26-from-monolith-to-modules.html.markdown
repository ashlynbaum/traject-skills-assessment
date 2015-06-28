---
title: Understanding Node.js Modules
date: 2015-06-26 13:01 NZST
tags: JavaScript
---

I have been working on a project using Node.js. With Node.js there are  READMORE so many options on how to organize your site, there may be a few best practice standards but many things come down to personal preference. One thing that many people agree on though is to make it modular. Break your large applications up into many small independent working parts, or modules.

Typical trajectories for building an application is: monolith first, and is the approach I took. I started build the back-end functionality of my application in one single file. This allowed me to recognize the hierarchy of the callbacks, see structure, and keep things organized in my mind. From there, I built integration tests which made refactoring easier. At that point, I could move the functionality of the application into individual self-contained files, known as modules.

## Installing modules

You can include public modules hosted on Node Package Manager, `npm`, using the following command.

``` $ npm install name-of-module```

Or you can write them yourself by exporting functionality of your code into small independent files. 

When installing a public module with `npm`, it will go directly to your `node_module` directory. Make sure you ignore this directory from version control.

## Comparing JavaScript modules with Ruby gems
Modules are great! They are easy to use and implement into your project. Node modules declare their dependencies, thus you cannot have version conflict issues. When compared to ruby gems, which do have version conflict issue, JavaScript modules' independence can definitely be seen as an advantage. 

The downside to the independence of JavaScript modules is that you have to declare every dependency in every file. This is makes using JavaScript modules less 'dry' when compared to using Gems with Ruby. Gems use global variables to require everything once. Basically, with JavaScript modules you will end up writing more code, but you will not have to deal with version conflicts.

## Components of a module

There are 3 main parts to a module: What you require, your content, and what you export.

When calling `require()` in an application, it will return `module.exports`.

If you install modules from npm, then you will only have to worry about requiring the module. But if you would like to break your application up into small independent parts, then you will likely write your own modules.

## How to require a module
If your module is in a `node_module` directory you do not need to give the direct path name.

```javascript
var helper = require('helper');
```

The file structure will look something like this:
```
/project-root
    /node_modles
        /helpers
    app.js
```

If your module is not in a `node_module` directory. Add a `./` in front of the file or directory name to indicate the `helper` directory is located on same level of the directory as the file it is being required in. If it is located one directory up then replace `./` with `../` and so on.

```javascript
var helper = require('./helper')
```
The file structure will look something like this:
```
/project-root
    /node_modles
    /helpers
    app.js
```

For further reading on file loading structure, check out the [Node.js API](https://nodejs.org/docs/latest/api/modules.html#modules_file_modules).

## Using file structure to you advantage
A simple trick so you do not have to include the `./` or and variation of your file path. Basically it comes down how you set up your directory structure.

```
Root/
    node_modules/      <-- npm installed modules
    sources/           <-- sources becomes the new root of your application
        node_modules/  <-- modules required privately by your application
        app.js
```

When you require a module, first node will look at the current level for the module, then in the `node_modules` directory. If it is not found in the first `node_modules` directory, then it will move up a directory in your application directory, and look for the module. Node will then look inside, this higher level `node_modules` directory to see if the modules live there. 

Thus if when ever you require any module, it will look in both `node_module` directories for your required module automatically. The need to preface `./` to describe the path to the module is not necessary if the modules live in either of the `node_module` directories. 

## Different exporting patterns
There are three main ways to to export in a modules. The most common ways are to either a function, an object, or a prototype. Exporting anonymously allows for simpler client interface; while named exports allow for more versatility when exporting because you have the ability to export more than one block. 

### Exporting functions
With exporting a function you can place the contents of your module in line with the export of the module.

#### Exporting an anonymous function

```javascript
// sample.js

module.exports = function (argument) {
  return argument.toString();
}
```

```javascript
// app.js

var sample = require('sample');

sample(argument);
```

This method sets the anonymous function in the `sample.js` module equal to the variable `sample`. Then the function `sample` can be called within `app.js`.

#### Exporting a named function

```javascript
// sample.js

exports.sample = function (argument) {
  return argument.toString();
}
```

```javascript
// app.js

var sample = require('sample').sample;

sample(argument);
```

This method exports a function, but sets the function as a method on the `exports` variable.

### Exporting objects
#### Exporting an anonymous object

```javascript
// sample.js
var Sample = function () {};

Sample.prototype.string = function (argument) {
  return argument.toString();
};

module.exports = new Sample();
```

```javascript
// app.js
var sample = require('sample');

sample.string(argument);
```

Another way to export an anonymous object be to just set the object equal to `module.exports`. View the routes example below to see this method being used.

```javascript
module.exports = {};
```

#### Exporting a named object
Exporting a named object is very similar to exporting an anonymous object. The difference is analogous to the difference with exporting functions.

```javascript
// sample.js
var Sample = function () {};

Sample.prototype.string = function (argument) {
  return argument.toString();
};

exports.Sample = new Sample();
```

```javascript
// app.js
var sample = require('sample').Sample;

sample.string(argument);
```


### Exporting a prototype
Exporting a prototype can be similar to exporting an object, where you create the instance of your object changes locations. When the prototype is exported, you must create the instance of of your object within your application.

#### exporting an anonymous prototype

```javascript
// sample.js
var Sample = function () {};

Sample.prototype.string = function (argument) {
  return argument.toString();
};

module.exports = Sample;
```

```javascript
// app.js
var Sample = require('sample');
var sample = new Sample();
sample.string(argument);
```

#### exporting a named prototype

```javascript
// sample.js
var Sample = function () {};

Sample.prototype.string = function (argument) {
  return argument.toString();
};

exports.Sample = Sample;
```

```javascript
// app.js
var Sample = require('sample').Sample;
var sample = new Sample();
sample.string(argument);
```

### Stay away form exporting global variables
Using global variables with Node.js makes the module no longer independent. In general, global variables will allow you to write least amount of code, and add some magic to your application, but can create some conflicts in the future. 

For example, the global variables that you define could already have assignment within your program and the conflict of variable assignment can create bugs with in your application. It is best practice to define local variables and call the local variable when needed.

## Modules are not just for Node.js.
Use [browserify](http://browserify.org/) to include modules to use them in the front end environment. You can require modules the same way you would in node, but run them in the browser.

## Example defining routes
In this example, in the `index.js` file of the `/routes` directory, I export an anonymous object. Some people will name the `/routes` directory as a `/models` directory.

```javascript
// routes/index.js

module.exports = {
  events: {
    create: require('./events/create')
   }
 };
```

Within the `app.js` file, I require the routes directory which will automatically include the index.js file located within `/routes`.

```javascript
//app.js
var app = require('express')
var routes = require('./routes')

// database is defined outside of this example
var db = database

// Create Event
app.post('/events', routes.events.create(db));

```

In this instance the application, `./routes` has been required in `app.js`. Node will load the top level `index.js` file within the `./routes` directory. `Index.js` exports an anonymous object, that contains methods which require other modules. 

```javascript
//routes/events/create.js

module.exports = function(db){
  return function(req, res) {
    db.collection('events').insert( req.body, function(err, result) {
      if (err) { return console.log(err) };
      res.status(201);
    });
  }
}
```

In `app.js`, `routes.events.create()` calls an anonymous function located in the `create.js`, a file within the `routes` directory. 

***
### Resources
1. [Node.js API]()
1. [Module Patterns](http://darrenderidder.github.io/talks/ModulePatterns/#/10)