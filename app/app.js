/**
 * @file
 * This is the root component for your project.
 */

import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Layout from '@financial-times/g-components/article-layout';
import StoryTopper from '@financial-times/g-components/story-topper';
import Epilogue from '@financial-times/g-components/epilogue';
import { GridChild, GridRow, GridContainer } from '@financial-times/g-components/grid';
import GAudio from '@financial-times/g-audio';

const App = () => {
  const [context, setContext] = useState(null);

  useEffect(() => {
    GAudio.init();
  }, [context]);

  useEffect(() => {
    (async () => {
      setContext({
        ...(await (await fetch('./context.json')).json()),
        buildTime: window.BUILD_TIME,
      });
    })();
  }, []);

  return context ? (
    <Layout {...context}>
      <main key="main" role="main">
        <article className="article" itemScope itemType="http://schema.org/Article">
          <GridContainer className="article-head">
            <GridRow>
              <GridChild colspan="12 S11 Scenter M9 L7">
                <StoryTopper {...context} />
              </GridChild>
            </GridRow>
          </GridContainer>
          <div className="article-body o-editorial-typography-body" itemProp="articleBody">
            <GridContainer>
              <GridRow>
                <GridChild colspan="12 S11 Scenter M9 L7">
                  <div className="o-editorial-layout-wrapper">
                    <div dangerouslySetInnerHTML={{ __html: context.storyContent }} />
                  </div>
                </GridChild>
              </GridRow>
            </GridContainer>
          </div>
          <Epilogue />
        </article>
      </main>
    </Layout>
  ) : null;
};

export default hot(App);
