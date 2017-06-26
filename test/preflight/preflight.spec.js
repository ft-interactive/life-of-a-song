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

const should = chai.should();

describe('preflight tests', () => {
  let stories;

  before(async () => {
    stories = (await bertha.get('1B-nm2Cip5AU57KC9Yt03WM0JB5jSxNL0CFjJmyN2upo', ['toc'], { republish: true })).toc
      .map((story) => {
        const html = readFileSync(`${__dirname}/../../dist/${story.id}.html`, { encoding: 'utf-8' });
        return new JSDOM(html).window.document;
      });
  });

  describe('QA checks on stories', () => {
    it('has a HTML title tag', () => stories.forEach((document) => {
      const title = document.querySelector('title');
      should.exist(title);
      title.textContent.should.not.equal('');
    }));

    it('has a Twitter meta title', () => stories.forEach((document) => {
      const twitterMetaTitle = document.querySelector('meta[name="twitter:title"]');
      should.exist(twitterMetaTitle);
      twitterMetaTitle.getAttribute('content').should.not.equal('');
    }));

    it('has a Open Graph meta title', () => stories.forEach((document) => {
      const ogMetaTitle = document.querySelector('meta[property="og:title"]');
      should.exist(ogMetaTitle);
      ogMetaTitle.getAttribute('content').should.not.equal('');
    }));

    it('has a HTML meta description', () => stories.forEach((document) => {
      const metaDesc = document.querySelector('meta[name="description"]');
      should.exist(metaDesc);
      metaDesc.getAttribute('content').should.not.equal('');
    }));

    it('has a Twitter meta description', () => stories.forEach((document) => {
      const twitterDesc = document.querySelector('meta[name="twitter:description"]');
      should.exist(twitterDesc);
      twitterDesc.getAttribute('content').should.not.equal('');
    }));

    it('has a Open Graph meta description', () => stories.forEach((document) => {
      const ogDesc = document.querySelector('meta[property="og:description"]');
      should.exist(ogDesc);
      ogDesc.getAttribute('content').should.not.equal('');
    }));

    it('has a Canonical link tag', () => stories.forEach((document) => {
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      should.exist(canonicalLink);
      canonicalLink.getAttribute('href').should.not.equal('');
    }));

    it('has a Twitter meta url', () => stories.forEach((document) => {
      const twitterUrl = document.querySelector('meta[name="twitter:url"]');
      should.exist(twitterUrl);
      twitterUrl.getAttribute('content').should.not.equal('');
    }));

    it('has a Open Graph meta url', () => stories.forEach((document) => {
      const ogUrl = document.querySelector('meta[property="og:url"]');
      should.exist(ogUrl);
      ogUrl.getAttribute('content').should.not.equal('');
    }));

    it('has o-sharing', () => stories.forEach((document) => {
      const oShare = document.querySelector('.o-share');
      should.exist(oShare);
    }));

    it('has a populated topic link', () => stories.forEach((document) => {
      const topicLink = document.querySelector('.o-typography-link-topic');

      should.exist(topicLink);
      topicLink.textContent.should.not.equal('');
      topicLink.getAttribute('href').should.not.equal('');
    }));

    it('has a populated headline', () => stories.forEach((document) => {
      const headline = document.querySelector('h1.o-typography-heading1');

      should.exist(headline);
      headline.textContent.should.not.equal('');
    }));

    // @TODO Add Onward Journey test
    // @TODO Find way of testing that tracking code is installed
  });
});
