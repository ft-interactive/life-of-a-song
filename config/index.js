import structuredGoogleDoc from 'structured-google-docs-client';
import cheerio from 'cheerio';
import article from './article';
import getFlags from './flags';
import getOnwardJourney from './onward-journey';

const trim = thing => thing.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

async function transform(a, b) {
  // make sure to strip out tags in b
  const $ = cheerio.load(b);
  const audioSource = trim($.text());

  return `<span class="g-audio">${a}<audio controls><source src="${audioSource}" type="audio/mpeg"></audio></span>`;
}

export default async (a, storyId, storyMetadata) => {
  const d = await article();
  const flags = await getFlags();
  const onwardJourney = await getOnwardJourney();

  d.id = storyMetadata.uuid;
  d.url = `https://ig.ft.com/sounds/${storyId}.html`;
  d.headline = storyMetadata.headline;
  d.title = d.headline;
  d.summary = storyMetadata.standfirst;
  d.topic.name = storyMetadata.topic;
  d.topic.url = storyMetadata.topiclink;
  d.description = d.summary;
  d.mainImage.uuid = storyMetadata.masterimageuuid;
  d.mainImage.description = storyMetadata.masterimagecredit;
  d.publishedDate = new Date(storyMetadata.pubdate);
  d.byline = [{ name: storyMetadata.author, url: storyMetadata.authorlink }];

  const textContent = await structuredGoogleDoc(storyMetadata.googledocid, { transform });
  const storyContent = (textContent ? textContent.replace('ft-ig-audio-prod.s3.amazonaws.com', 'ig-audio.ft.com') : textContent);

  return {
    ...d,
    flags,
    onwardJourney,
    storyContent,
  };
};
