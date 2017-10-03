import structuredGoogleDoc from 'structured-google-docs-client';
import article from './article';
import getFlags from './flags';
import getOnwardJourney from './onward-journey';

async function transform(a, b) {
  return `<span class="g-audio">${a}<audio controls><source src="${b}" type="audio/mpeg"></audio></span>`;
}

export default async (a, storyId, storyMetadata) => {
  const d = await article();
  const flags = await getFlags();
  const onwardJourney = await getOnwardJourney();

  d.id = storyMetadata.uuid;
  d.url = `https://ig.ft.com/life-of-a-song/${storyId}.html`;
  d.headline = storyMetadata.headline;
  d.title = d.headline;
  d.summary = storyMetadata.standfirst;
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
