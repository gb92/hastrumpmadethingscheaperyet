"use client";
import dynamic from "next/dynamic";

export const BlueSkyEmbedWrapper = dynamic(
  () => import("./BlueskyEmbed").then((module) => module.BlueSkyEmbed),
  {
    ssr: false,
  }
);
