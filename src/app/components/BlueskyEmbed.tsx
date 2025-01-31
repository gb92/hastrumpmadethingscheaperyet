"use client";
import "bsky-embed/dist/bsky-embed.es.js";

export const BlueSkyEmbed = () => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html:
          "<bsky-embed username='trumpflationtrkr.bsky.social' load-more='true' limit='3'></bsky-embed>",
      }}
    />
  );
};
