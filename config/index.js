/**
 * @file
 * Main entry point for collecting configuration options, to be passed
 * to app as `context`.
 */

import structuredGoogleDoc from 'structured-google-docs-client';
import * as cheerio from 'cheerio';
import article from './article';
import getFlags from './flags';
import getOnwardJourney from './onward-journey';

const trim = (thing) => thing.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

async function transform(a, b) {
  // make sure to strip out tags in b
  const $ = cheerio.load(b);
  const audioSource = trim($.text());

  return `<span class="g-audio">${a}<audio controls><source src="${audioSource}" type="audio/mpeg"></audio></span>`;
}

export default async (environment = 'development', storyId, storyMetadata) => {
  const d = await article(environment);
  const flags = await getFlags(environment);
  const { relatedContent } = await getOnwardJourney(environment);

  d.id = storyMetadata.uuid;
  d.url = `https://ig.ft.com/life-of-a-song/${storyId}.html`;
  d.headline = storyMetadata.headline;
  d.title = d.headline;
  d.summary = storyMetadata.standfirst;
  d.description = d.summary;
  d.mainImage.description = storyMetadata.masterimagecredit;
  d.publishedDate = new Date(storyMetadata.pubdate);
  d.bylines = [{ name: storyMetadata.author, url: storyMetadata.authorlink }];
  d.linkPageUrl = `https://www.ft.com/content/${storyMetadata.uuid}`;

  // if a URL is passed into the masterimageuuid field, then just use the URL
  // otherwise, use the UUID
  if (/^http/.test(storyMetadata.masterimageuuid)) {
    d.mainImage.url = storyMetadata.masterimageuuid;
    delete d.mainImage.uuid;
  } else {
    d.mainImage.uuid = storyMetadata.masterimageuuid;
    delete d.mainImage.url;
  }

  const textContent = await structuredGoogleDoc(storyMetadata.googledocid, { transform });
  let storyContent = textContent
    ? textContent.replace('ft-ig-audio-prod.s3.amazonaws.com', 'ig-audio.ft.com')
    : textContent;

  // Youtube link hotfix => convert /watch?v%3D_ to /watch?v=
  storyContent = storyContent.replace(/\/watch\?v%3D/g, '/watch?v=');

  // Remove underline markup around anchor tags
  storyContent = storyContent.replace(/<u><a(.*?)<\/a><\/u>/g, '<a$1</a>');

  return {
    ...d,
    flags,
    relatedContent,
    storyContent,
  };
};
