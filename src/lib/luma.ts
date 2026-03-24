/**
 * Luma API integration for Crafter Station events.
 *
 * Fetches all events from the Luma calendar, filters to those tagged
 * "Crafter Station", and returns them split into upcoming/past arrays.
 *
 * ISR: Called at request time (SSR pages set revalidate = 21600 = 6h).
 */

const LUMA_API_BASE = 'https://api.lu.ma/public/v1';
const CS_TAG = 'Crafter Station';

export interface LumaEvent {
  id: string;
  title: string;
  startAt: Date;
  endAt: Date;
  description: string; // markdown
  url: string;         // Luma registration URL
  coverUrl: string | null;
  location: string;    // "City, Country" or "Online"
  timezone: string;
  tags: string[];      // tag names (excluding "Crafter Station")
}

interface LumaApiTag {
  api_id: string;
  name: string;
}

interface LumaApiGeo {
  city?: string;
  country?: string;
  full_address?: string;
}

interface LumaApiEvent {
  api_id: string;
  name: string;
  start_at: string;
  end_at: string;
  description_md?: string;
  url: string;
  cover_url?: string | null;
  geo_address_json?: LumaApiGeo | null;
  timezone?: string;
}

interface LumaApiEntry {
  api_id: string;
  event: LumaApiEvent;
  tags?: LumaApiTag[];
}

interface LumaApiResponse {
  entries: LumaApiEntry[];
  next_cursor?: string | null;
}

function buildLocation(geo: LumaApiGeo | null | undefined): string {
  if (!geo) return 'Online';
  const { city, country } = geo;
  if (city && country) return `${city}, ${country}`;
  if (city) return city;
  if (country) return country;
  return 'Online';
}

async function fetchPage(apiKey: string, cursor?: string): Promise<LumaApiResponse> {
  const url = new URL(`${LUMA_API_BASE}/calendar/list-events`);
  url.searchParams.set('series_mode', 'sessions');
  if (cursor) url.searchParams.set('pagination_cursor', cursor);

  const res = await fetch(url.toString(), {
    headers: {
      'x-luma-api-key': apiKey,
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Luma API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<LumaApiResponse>;
}

export interface CrafterStationEvents {
  upcoming: LumaEvent[];
  past: LumaEvent[];
  all: LumaEvent[];
  /** Unique tags present on CS events, excluding the "Crafter Station" tag itself */
  filterTags: string[];
}

export async function fetchCrafterStationEvents(): Promise<CrafterStationEvents> {
  const apiKey = import.meta.env.LUMA_API_KEY as string | undefined;

  if (!apiKey) {
    console.warn('[luma] LUMA_API_KEY is not set — returning empty events');
    return { upcoming: [], past: [], all: [], filterTags: [] };
  }

  const allEntries: LumaApiEntry[] = [];
  let cursor: string | undefined;

  // Paginate through all events
  do {
    const page = await fetchPage(apiKey, cursor);
    allEntries.push(...page.entries);
    cursor = page.next_cursor ?? undefined;
  } while (cursor);

  // Filter to entries tagged "Crafter Station"
  const csEntries = allEntries.filter((entry) =>
    entry.tags?.some((tag) => tag.name === CS_TAG)
  );

  const now = new Date();

  // Map to our clean LumaEvent shape
  const events: LumaEvent[] = csEntries.map((entry) => {
    const ev = entry.event;
    const otherTags = (entry.tags ?? [])
      .map((t) => t.name)
      .filter((name) => name !== CS_TAG);

    return {
      id: entry.api_id,
      title: ev.name,
      startAt: new Date(ev.start_at),
      endAt: new Date(ev.end_at),
      description: ev.description_md ?? '',
      url: ev.url,
      coverUrl: ev.cover_url ?? null,
      location: buildLocation(ev.geo_address_json),
      timezone: ev.timezone ?? 'UTC',
      tags: otherTags,
    };
  });

  // Split into upcoming (startAt > now) and past, with appropriate sort order
  const upcoming = events
    .filter((e) => e.startAt > now)
    .sort((a, b) => a.startAt.valueOf() - b.startAt.valueOf()); // soonest first

  const past = events
    .filter((e) => e.startAt <= now)
    .sort((a, b) => b.startAt.valueOf() - a.startAt.valueOf()); // most recent first

  const all = [...upcoming, ...past];

  // Collect unique filter tags across all CS events
  const tagSet = new Set<string>();
  events.forEach((e) => e.tags.forEach((t) => tagSet.add(t)));
  const filterTags = Array.from(tagSet).sort();

  return { upcoming, past, all, filterTags };
}

/** Format a Date to a locale-appropriate string */
export function formatEventDate(date: Date, lang: string): string {
  const locale =
    lang === 'zh' ? 'zh-CN' : lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
