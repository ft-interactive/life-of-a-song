/**
 * Preflight rules
 * @author Ændrew Rininsland <andrew.rininsland@ft.com>
 *
 * These mainly check the existence of various meta data fields and ensures
 * tracking is installed. It does not verify whether tracking is working or
 * whether any of the meta values are correct.
 */
const bertha = require('bertha-client');
const chai = require('chai');
const { JSDOM } = require('jsdom');
const { readFileSync } = require('fs');

// const toc = await bertha.get('1ofGFrK6_O_sZPvKuhOIhXruh-uzEqWXuXY7fP3miKcE', ['toc'], { republish: true }).then(data => data.toc);
// const storyIds = data.toc.map(d => d.id);

const storyIds = ['yesterday'];
for (let i = 0; i < storyIds.length; i += 1) {
  const storyId = storyIds[i];

  const index = readFileSync(`${__dirname}/../../dist/${storyId}.html`, { encoding: 'utf-8' });
  const { document } = new JSDOM(index).window;
  const should = chai.should();

  describe('preflight tests', () => {
    describe(`dist/${storyId}.html`, () => {
      // Parse index.html into a DOM and run tests

      it('has a HTML title tag', () => {
        const title = document.querySelector('title');
        should.exist(title);
        title.textContent.should.not.equal('');
      });

      it('has a Twitter meta title', () => {
        const twitterMetaTitle = document.querySelector('meta[name="twitter:title"]');
        should.exist(twitterMetaTitle);
        twitterMetaTitle.getAttribute('content').should.not.equal('');
      });

      it('has a Open Graph meta title', () => {
        const ogMetaTitle = document.querySelector('meta[property="og:title"]');
        should.exist(ogMetaTitle);
        ogMetaTitle.getAttribute('content').should.not.equal('');
      });

      it('has a HTML meta description', () => {
        const metaDesc = document.querySelector('meta[name="description"]');
        should.exist(metaDesc);
        metaDesc.getAttribute('content').should.not.equal('');
      });

      it('has a Twitter meta description', () => {
        const twitterDesc = document.querySelector('meta[name="twitter:description"]');
        should.exist(twitterDesc);
        twitterDesc.getAttribute('content').should.not.equal('');
      });

      it('has a Open Graph meta description', () => {
        const ogDesc = document.querySelector('meta[property="og:description"]');
        should.exist(ogDesc);
        ogDesc.getAttribute('content').should.not.equal('');
      });

      it('has a Canonical link tag', () => {
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        should.exist(canonicalLink);
        canonicalLink.getAttribute('href').should.not.equal('');
      });

      it('has a Twitter meta url', () => {
        const twitterUrl = document.querySelector('meta[name="twitter:url"]');
        should.exist(twitterUrl);
        twitterUrl.getAttribute('content').should.not.equal('');
      });

      it('has a Open Graph meta url', () => {
        const ogUrl = document.querySelector('meta[property="og:url"]');
        should.exist(ogUrl);
        ogUrl.getAttribute('content').should.not.equal('');
      });

      it('has o-sharing', () => {
        const oShare = document.querySelector('.o-share');
        should.exist(oShare);
      });

      it('has a populated topic link', () => {
        const topicLink = document.querySelector('.o-typography-link-topic');

        should.exist(topicLink);
        topicLink.textContent.should.not.equal('');
        topicLink.getAttribute('href').should.not.equal('');
      });

      it('has a populated headline', () => {
        const headline = document.querySelector('h1.o-typography-heading1');

        should.exist(headline);
        headline.textContent.should.not.equal('');
      });

      // @TODO Add Onward Journey test
      // @TODO Find way of testing that tracking code is installed
    });
  });
}
