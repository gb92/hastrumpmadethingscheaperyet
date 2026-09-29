import { getPriceData, type PriceMetric } from "@/lib/data";

const sourceLinks = [
  {
    title: "Consumer Price Index",
    publisher: "U.S. Bureau of Labor Statistics",
    href: "https://www.bls.gov/cpi/",
  },
  {
    title: "How tariffs affect prices",
    publisher: "Tax Foundation",
    href:
      "https://taxfoundation.org/research/federal-tax/trump-tariffs-trade-war/",
  },
];

function formatChange(change: number) {
  return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
}

function Sparkline({ metric }: { metric: PriceMetric }) {
  const width = 260;
  const height = 68;
  const min = Math.min(...metric.history);
  const max = Math.max(...metric.history);
  const range = max - min || 1;
  const points = metric.history
    .map((value, index) => {
      const x = (index / Math.max(metric.history.length - 1, 1)) * width;
      const y = height - ((value - min) / range) * (height - 8) - 4;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      className="sparkline"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`${metric.label} CPI trend since January 2025`}
    >
      <polyline points={points} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default async function Home() {
  const priceData = await getPriceData();
  const overallChange =
    priceData.status === "ready" ? priceData.data.metrics[0].change : null;
  const answer =
    overallChange === null ? "Not proven." : overallChange <= 0 ? "Yes." : "No.";

  return (
    <div className="site-shell">
      <header className="masthead">
        <a className="wordmark" href="#top" aria-label="Back to top">
          HTMT<span>CY</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#scoreboard">The numbers</a>
          <a href="#context">The context</a>
        </nav>
        <span className="issue-date">Tracking since Jan. 2025</span>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-kicker">
            The national checkout report <span aria-hidden="true">↓</span>
          </div>
          <h1>
            Has Trump made
            <br />
            things <em>cheaper</em> yet?
          </h1>
          <div className="verdict-row">
            <p className="verdict">{answer}</p>
            <div className="verdict-note">
              {overallChange === null ? (
                <p>We could not reach the official price data right now.</p>
              ) : (
                <>
                  <strong>
                    Overall consumer prices are {Math.abs(overallChange).toFixed(1)}%
                    {overallChange >= 0 ? " higher" : " lower"} than January 2025.
                  </strong>
                  <p>
                    That&apos;s the broad U.S. average—not a slogan, a single
                    grocery receipt or a vibes-based index.
                  </p>
                </>
              )}
            </div>
          </div>
          <a className="scroll-cue" href="#scoreboard">
            Show me the receipts <span aria-hidden="true">↘</span>
          </a>
        </section>

        <section className="scoreboard section-wrap" id="scoreboard">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / The scoreboard</p>
              <h2>What prices are doing</h2>
            </div>
            {priceData.status === "ready" && (
              <p className="as-of">
                Latest available: <strong>{priceData.data.latestLabel}</strong>
              </p>
            )}
          </div>

          {priceData.status === "error" ? (
            <div className="data-error" role="status">
              <strong>Official data missed its connection.</strong>
              <p>{priceData.message}</p>
              <a href="https://www.bls.gov/cpi/">Check the BLS directly →</a>
            </div>
          ) : (
            <div className="metric-grid">
              {priceData.data.metrics.map((metric) => (
                <article className="metric-card" key={metric.id}>
                  <div className="metric-topline">
                    <span>{metric.label}</span>
                    <span className="metric-period">Since Jan. 2025</span>
                  </div>
                  <strong
                    className={`metric-number ${metric.change <= 0 ? "down" : ""}`}
                  >
                    {formatChange(metric.change)}
                  </strong>
                  <p>{metric.description}</p>
                  <Sparkline metric={metric} />
                  <div className="metric-foot">
                    <span>Jan. 2025</span>
                    <span>{metric.latestLabel}</span>
                  </div>
                </article>
              ))}
            </div>
          )}

          <p className="method-note">
            <span>Method:</span> change in the seasonally adjusted CPI-U index
            from January 2025 to the latest available month. A rising index means
            the average price level rose. Source:{" "}
            <a href="https://www.bls.gov/cpi/">U.S. Bureau of Labor Statistics</a>.
          </p>
        </section>

        <section className="context section-wrap" id="context">
          <div className="section-heading light">
            <div>
              <p className="eyebrow">02 / The context</p>
              <h2>“Cheaper” is not the same as “inflation slowed.”</h2>
            </div>
          </div>
          <div className="context-grid">
            <article>
              <span className="context-number">A</span>
              <h3>Prices can rise more slowly and still rise.</h3>
              <p>
                Inflation is the rate of change. If inflation falls from 6% to
                3%, prices did not fall; they just climbed at a slower pace.
                Broad price declines are called deflation.
              </p>
            </article>
            <article>
              <span className="context-number">B</span>
              <h3>Presidents matter, but they do not set the price tag.</h3>
              <p>
                Taxes, spending, tariffs and regulation can push costs around.
                So can the Federal Reserve, Congress, global energy markets,
                weather, supply chains and businesses.
              </p>
            </article>
            <article>
              <span className="context-number">C</span>
              <h3>Tariffs are taxes on imported goods.</h3>
              <p>
                Importers pay them, then may absorb the cost or pass some of it
                to customers. They can protect selected industries, but they are
                not a general-purpose price-cutting tool.
              </p>
            </article>
          </div>
          <div className="plain-english">
            <span>The short version</span>
            <p>
              Campaign promises are easy. Making the entire national price level
              go backward—without also breaking the economy—is not.
            </p>
          </div>
        </section>

        <section className="sources section-wrap">
          <div>
            <p className="eyebrow">Read past the punchline</p>
            <h2>Sources worth opening</h2>
          </div>
          <div className="source-list">
            {sourceLinks.map((source, index) => (
              <a href={source.href} key={source.href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{source.title}</strong>
                  <small>{source.publisher}</small>
                </div>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>Built for accountability. Kept alive by stubbornness.</p>
        <a
          href="https://www.github.com/gb92/hastrumpmadethingscheaperyet"
        >
          View source on GitHub ↗
        </a>
      </footer>
    </div>
  );
}
