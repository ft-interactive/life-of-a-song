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
  d.mainImage.url = `https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod-us.s3.amazonaws.com%2F${storyMetadata.masterimageuuid}?source=next&fit=scale-down&width=700`;
  d.mainImage.description = storyMetadata.masterimagecredit;
  d.publishedDate = new Date(storyMetadata.pubdate);
  d.byline = [{ name: storyMetadata.author, url: storyMetadata.authorlink }];

  const textContent = await bertha.get('1B-nm2Cip5AU57KC9Yt03WM0JB5jSxNL0CFjJmyN2upo', [storyId], { republish: true }).then((data) => {
    return data[storyId];
  });

  const storyContent = textContent[0].text;

  return {
    ...d,
    flags,
    onwardJourney,
    storyContent,
  };
};
