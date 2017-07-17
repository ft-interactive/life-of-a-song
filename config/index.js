import * as bertha from 'bertha-client';
import article from './article';
import getFlags from './flags';
import getOnwardJourney from './onward-journey';

export default async (a, storyId, storyMetadata) => {
  const d = await article();
  const flags = await getFlags();
  const onwardJourney = await getOnwardJourney();

  d.id = storyMetadata.uuid;
  d.url = `https://ig.ft.com/life-of-a-song/${storyMetadata.storyId}.html`;
  d.headline = storyMetadata.headline;
  d.title = d.headline;
  d.summary = storyMetadata.standfirst;
  d.description = d.summary;
  d.mainImage.uuid = storyMetadata.masterimageuuid;
  d.mainImage.description = storyMetadata.masterimagecredit;
  d.publishedDate = new Date(storyMetadata.pubdate);
  d.byline = [{ name: storyMetadata.author, url: storyMetadata.authorlink }];

  const textContent = await bertha.get('1ofGFrK6_O_sZPvKuhOIhXruh-uzEqWXuXY7fP3miKcE', [storyId], { republish: true }).then(data => data[storyId]);

  const storyContent = textContent[0].text;

  return {
    ...d,
    flags,
    onwardJourney,
    storyContent,
  };
};
