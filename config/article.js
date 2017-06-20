export default () => ({ // eslint-disable-line

  // link file UUID
  id: '855d4ef2-9abd-11e6-8f9b-70e3cabccfae',

  // canonical URL of the published page
  // https://ig.ft.com/sites/life-of-a-song/yesterday get filled in by the ./configure script
  url: 'https://ig.ft.com/sites/life-of-a-song/yesterday',

  // To set an exact publish date do this:
  //       new Date('2016-05-17T17:11:22Z')
  publishedDate: new Date('2016-11-07T05:29:34Z'),

  headline: 'The Life of a Song: ‘Yesterday’',

  // summary === standfirst (Summary is what the content API calls it)
  summary: 'The song came to Paul McCartney in a dream one night in London in 1963',

  topic: {
    name: 'Life of a Song',
    url: 'https://www.ft.com/life-arts/life-of-a-song',
  },

  // relatedArticle: {
  //   text: 'Life of a Song »',
  //   url: 'https://www.ft.com/life-arts/life-of-a-song',
  // },

  mainImage: {
    title: '',
    description: '',
    url: '',
    width: 2048, // ensure correct width
    height: 1152, // ensure correct height
  },

  // Byline can by a plain string, markdown, or array of authors
  // if array of authors, url is optional
  byline: [
    { name: 'Bernadette McNulty', url: 'https://www.ft.com/stream/authorsId/NWE2MjU2ZjAtOGU5Mi00NDkyLWFmYWEtNzQzYzU4OGMwODI2-QXV0aG9ycw==' },
  ],

  // Appears in the HTML <title>
  title: 'The Life of a Song: ‘Yesterday’',

  // meta data
  description: 'The song came to Paul McCartney in a dream one night in London in 1963',

  /*
  TODO: Select Twitter card type -
        summary or summary_large_image

        Twitter card docs:
        https://dev.twitter.com/cards/markup
  */
  twitterCard: 'summary',

  /*
  TODO: Do you want to tweak any of the
        optional social meta data?
  */
  // General social
  // socialImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod-us.s3.amazonaws.com%2Fc72ccc9e-a289-11e6-aa83-bcb58d1d2193?source=next&fit=scale-down&width=700',
  // socialHeadline: 'The Life of a Song: ‘Yesterday’',
  // socialSummary: 'The song came to Paul McCartney in a dream one night in London in 1963',

  // TWITTER
  // twitterImage: '',
  // twitterCreator: '@individual's_account',
  // tweetText:  '',
  // twitterHeadline:  '',

  // FACEBOOK
  // facebookImage: '',
  // facebookHeadline: '',

  tracking: {

    /*

    Microsite Name

    e.g. guffipedia, business-books, baseline.
    Used to query groups of pages, not intended for use with
    one off interactive pages. If you're building a microsite
    consider more custom tracking to allow better analysis.
    Also used for pages that do not have a UUID for whatever reason
    */
    // micrositeName: '',

    /*
    Product name

    This will usually default to IG
    however another value may be needed
    */
    // product: '',
  },
});
