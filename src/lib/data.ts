const BLS_API = "https://api.bls.gov/publicAPI/v2/timeseries/data";
const BASELINE_YEAR = "2025";
const BASELINE_PERIOD = "M01";

type DataResult<T> =
  | { status: "ready"; data: T }
  | { status: "error"; message: string };

type BlsObservation = {
  year: string;
  period: string;
  periodName: string;
  value: string;
};

type BlsResponse = {
  status: string;
  message?: string[];
  Results?: {
    series?: Array<{
      seriesID: string;
      data: BlsObservation[];
    }>;
  };
};

export type PriceMetric = {
  id: string;
  label: string;
  description: string;
  change: number;
  latestLabel: string;
  latestValue: number;
  baselineValue: number;
  history: number[];
};

export type PriceData = {
  metrics: PriceMetric[];
  latestLabel: string;
};

const metricDefinitions = [
  {
    id: "CUSR0000SA0",
    label: "All items",
    description: "The broad national basket",
  },
  {
    id: "CUSR0000SAF1",
    label: "Food",
    description: "Groceries and dining out",
  },
  {
    id: "CUSR0000SA0E",
    label: "Energy",
    description: "Gasoline, electricity and fuel",
  },
];

async function fetchBlsSeries(
  id: string,
  endYear: number,
): Promise<BlsObservation[]> {
  const response = await fetch(
    `${BLS_API}/${id}?startyear=${BASELINE_YEAR}&endyear=${endYear}`,
    { next: { revalidate: 43200 } },
  );

  if (!response.ok) {
    throw new Error(`BLS returned HTTP ${response.status}`);
  }

  const payload = (await response.json()) as BlsResponse;
  const observations = payload.Results?.series?.[0]?.data;

  if (payload.status !== "REQUEST_SUCCEEDED" || !observations) {
    throw new Error(payload.message?.join(" ") || "BLS returned no series data");
  }

  return observations.filter(
    (observation) =>
      observation.period.startsWith("M") &&
      Number.isFinite(Number(observation.value)),
  );
}

export async function getPriceData(): Promise<DataResult<PriceData>> {
  try {
    const currentYear = new Date().getUTCFullYear();
    const series = await Promise.all(
      metricDefinitions.map((metric) => fetchBlsSeries(metric.id, currentYear)),
    );

    const metrics = metricDefinitions.map((definition, index) => {
      const observations = series[index];
      const latest = observations[0];
      const baseline = observations.find(
        (observation) =>
          observation.year === BASELINE_YEAR &&
          observation.period === BASELINE_PERIOD,
      );

      if (!latest || !baseline) {
        throw new Error(`BLS series ${definition.id} is missing required data`);
      }

      const latestValue = Number(latest.value);
      const baselineValue = Number(baseline.value);

      return {
        ...definition,
        change: ((latestValue / baselineValue) - 1) * 100,
        latestLabel: `${latest.periodName} ${latest.year}`,
        latestValue,
        baselineValue,
        history: [...observations]
          .reverse()
          .map((observation) => Number(observation.value)),
      };
    });

    return {
      status: "ready",
      data: { metrics, latestLabel: metrics[0].latestLabel },
    };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown BLS error";
    return {
      status: "error",
      message: `Current BLS data is temporarily unavailable. ${detail}`,
    };
  }
}
