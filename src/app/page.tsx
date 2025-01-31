import Image from "next/image";
import { BlueSkyEmbedWrapper } from "./components/BlueSkyEmbedWrapper";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl sm:text-5xl font-bold text-center sm:text-left">
          Has Trump Made Things Cheaper Yet?
        </h1>
        <h2 className="text-4xl sm:text-5xl font-bold text-center sm:text-left">
          No.
        </h2>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <p className="text-lg sm:text-xl text-center sm:text-left">
            Chances are he won&apos;t. That&apos;s just not how inflation works.
            In fact, if he imposes tariffs on more goods,{" "}
            <span>
              <a
                href="https://www.snopes.com/news/2024/09/19/trump-tariffs-explainer/"
                className=" hover:underline hover:underline-offset-4"
              >
                prices will likely go up.
              </a>
            </span>
          </p>
        </div>
        <div className="flex gap-4 items-center flex-col">
          <p className="text-md sm:text-lg text-center sm:text-left">
            In the meantime, here&apos;s a feed of the latest Trumpflation
            updates from{" "}
            <span>
              <a
                href="https://bsky.app/"
                className="hover:underline hover:underline-offset-4"
              >
                BlueSky
              </a>
            </span>
            .
          </p>
          <BlueSkyEmbedWrapper />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.github.com/gb92/hastrumpmadethingscheaperyet"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/GitHub_Invertocat_Light.svg"
            alt="GitHub Invertocat Logo"
            width={16}
            height={16}
          />
          See the Code
        </a>
      </footer>
    </div>
  );
}
