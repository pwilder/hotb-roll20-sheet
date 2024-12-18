# Houses of the Blooded Character Sheet

## Preamble

This repository is a desperate attempt to create a functioning character sheet 
for the [Houses of the Blooded](https://www.drivethrurpg.com/en/product/61061/houses-of-the-blooded)
role playing game.

**Warning**: At the time of this writing this sheet is still undergoing major revisions. If your really want 
to contribute we can talk but my recommendation for now is to stay away. 


## Prerequisites

* A roll 20 professional account
  * Required for all character sheet development. 
* Npm/Node installation
  * Testing on Windows NPM 10.8.2 / Node 20.18.1
  * I was using [NVM for Windows](https://github.com/coreybutler/nvm-windows)
* A [Git](https://git-scm.com/downloads) installation to download this project.
* Some knowledge of 
  * [HTML](https://www.w3schools.com/html/default.asp)
  * [CSS/Sass](https://sass-lang.com/documentation/syntax/)
  * [pug](https://pugjs.org/api/getting-started.html)
  * [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)


## Recommended
* [Chrome Browser](https://www.google.com/intl/en_ca/chrome/)
* [Roll 20 API and Sheet Autouploader](https://chromewebstore.google.com/detail/roll20-api-and-sheet-auto/hboggmcfmaakkifgifjbccnpfmnegick?pli=1)
  * Useful for [accelerating turnaround](https://wiki.roll20.net/Roll20_Autouploader) on uploading changes to the sheet.
* A good IDE.
  * I was using [Webstorm](https://www.jetbrains.com/webstorm/).
  * [VSCode](https://code.visualstudio.com/) is free and work probably work with the right plugins

## Setup
* Log into roll 20 with a professional account.
* Create a new custom sheet sandbox
* Launch the custom sheet sandbox
  * If your auto uploader extension is working properly you should be prompted to pick a directory. The extension will 
  then monitor the directory and auto upload changes the html and css files in the root directory.

* Install dependencies using `npm ci`
  * `npm install` might work `ci` guarantees dependencies are aligned.
* Run the command `npm run watch`
  * This will trigger the execution of the build command any time there is a change in any files with pug, scss or 
  js extensions. This should not trigger an infinite loop as the generated files are a html and css, i.e. distinct 
  extensions.

If all goes according to plan you should be able to make changes and see them uploaded to your sandbox.

A clean build of the project will look something like this in a command window:

```
PS D:\WebstormProjects\hotb-roll20-sheet> npm run watch

> hotb-rpg@1.0.0 watch
> npm-watch

No task specified. Will go through all possible tasks
[build] [nodemon] 3.1.4
[build] Sheet build completed. Time taken: 0.184 s.
[build] [nodemon] clean exit - waiting for changes before restart
```

A failed build will have an error and look something like:

```
[build] [nodemon] starting `npm.cmd run --silent build`
[build] An error occured in the CSS build.
1:14 Invalid CSS after "/* PC Tabs */": expected 1 selector or at-rule, was ".charsheet .sheet-c".
[build] [nodemon] clean exit - waiting for changes before restart
```

## FAQ

**Why am I not seeing changes in my sandbox?**

This would normally imply there is an error in your build or the auto uploaded is not working properly. Check
your console for watcher errors and check the timestamps of your autouploader to ensure it is seeing changes. 

IF all of this looks good, recommend making drastic changes that should be obvious to prove that anything is being seen.

## Roll 20 Wisdom of the ancients

A grab bag of things I learned the hard way.

* When adding new inputs to repeating sections name **and** type (e.g. text) of input fields is critical for that data to be persisted.
* input names **are** carried over between repeating fields so if the same attr is used in two places they will share the same information (change 1 you change the other, delete 1 you delete the other).