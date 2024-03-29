# [Life of a Song](https://ig.ft.com/life-of-a-song/greensleeves.html)

>

[![Build Status][circle-image]][circle-url] [![Dependency Status][devdeps-image]][devdeps-url]

This project relies on a [Bertha spreadsheet](https://github.com/ft-interactive/bertha) and Google Drive API keys for [structured-google-docs-client](https://github.com/Financial-Times/structured-google-docs-client) usage.

## Examples of stories created

- [‘Greensleeves’ — an irresistible earworm, from Henry VIII to Elvis](https://ig.ft.com/life-of-a-song/greensleeves.html) (Oct 30, 2017)
- [Roll over Beethoven! Classical music and the real gig economy](https://ig.ft.com/sounds/classical-gig-economy.html) (Aug 4, 2017)

## Local

```
npm start
```

Build/compile, start a dev server and watches for changes.

# Deploy

1. Write code in a branch.
2. Make a PR. CI will automatically:
   - build and test the branch
   - deploy green builds to the review site
3. Do quick smoke testing of the review build
4. Get a code review. Once you get a thumbs up, merge into main.
5. CI will build, test and deploy a build to Production.

## Uses Starter Kit

This project was scaffolded with [Starter Kit @4a85bf3](https://github.com/ft-interactive/starter-kit/tree/4a85bf3).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

Please note the MIT licence includes only the software, and does not cover any FT content made available using the software, which is copyright &copy; The Financial Times Limited, all rights reserved. For more information about re-publishing FT content, please contact our [syndication department](http://syndication.ft.com/).

<!-- badge URLs -->

[circle-url]: https://circleci.com/gh/ft-interactive/life-of-a-song-new
[circle-image]: https://circleci.com/gh/ft-interactive/life-of-a-song-new/tree/main.svg?style=shield
[devdeps-url]: https://david-dm.org/ft-interactive/life-of-a-song-new#info=devDependencies
[devdeps-image]: https://img.shields.io/david/dev/ft-interactive/life-of-a-song-new.svg?style=flat-square
