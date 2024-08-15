# the lipstick killers site
 
The marketing site for the lipstick killers band
## install apps

1. [brew][brew] - follow instructions on that website
1. [hugo][hugo]: `brew install hugo`
1. [nodejs][nodejs]: `brew install node`
1. [yarn][yarn]: `npm install -g yarn`
1. [ftp][ftp]: `brew install inetutils`

## then project deps:
```bash
# insert your own path here instead of path/to/this/repo
cd path/to/this/repo
yarn # this installs the deps
```
## run locally

This will start a server so you can see it on your local machine.
Any changes you make will trigger the site to reload with those changes.

```bash
hugo server -D --disableFastRender
# Then go to http://localhost:1313
```

## build site

```bash
hugo  # this builds your site in the 'public' directory
```
## run site you just built 
```bash
cd public 
# then run a server eg: 
python -m SimpleHTTPServer
# Then go to http://localhost:8000
```

### if deploying to firebase... optional - you can put it where you want

* firebase-tools: `yarn global add firebase-tools`

## todo

* Reduce size of the image - esp for mobile
* Tickets
* media player


## give it to me in english 

[brew]: https://brew.sh
[hugo]: https://gohugo.io/
[nodejs]: https://nodejs.org/en/
[yarn]: https://yarnpkg.com/
[ftp]: https://en.wikipedia.org/wiki/File_Transfer_Protocol