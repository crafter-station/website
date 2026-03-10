const LUMA_API_BASE = "https://api.lu.ma/public/v1";
const CS_TAG = "Crafter Station";
function buildLocation(geo) {
  if (!geo) return "Online";
  const { city, country } = geo;
  if (city && country) return `${city}, ${country}`;
  if (city) return city;
  if (country) return country;
  return "Online";
}
async function fetchPage(apiKey, cursor) {
  const url = new URL(`${LUMA_API_BASE}/calendar/list-events`);
  url.searchParams.set("series_mode", "sessions");
  if (cursor) url.searchParams.set("pagination_cursor", cursor);
  const res = await fetch(url.toString(), {
    headers: {
      "x-luma-api-key": apiKey,
      "Accept": "application/json"
    }
  });
  if (!res.ok) {
    throw new Error(`Luma API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
async function fetchCrafterStationEvents() {
  const apiKey = "secret-l99hZ9Ve4EYBoBtBCN0SrxLVn";
  const allEntries = [];
  let cursor;
  do {
    const page = await fetchPage(apiKey, cursor);
    allEntries.push(...page.entries);
    cursor = page.next_cursor ?? void 0;
  } while (cursor);
  const csEntries = allEntries.filter(
    (entry) => entry.tags?.some((tag) => tag.name === CS_TAG)
  );
  const now = /* @__PURE__ */ new Date();
  const events = csEntries.map((entry) => {
    const ev = entry.event;
    const otherTags = (entry.tags ?? []).map((t) => t.name).filter((name) => name !== CS_TAG);
    return {
      id: entry.api_id,
      title: ev.name,
      startAt: new Date(ev.start_at),
      endAt: new Date(ev.end_at),
      description: ev.description_md ?? "",
      url: ev.url,
      coverUrl: ev.cover_url ?? null,
      location: buildLocation(ev.geo_address_json),
      timezone: ev.timezone ?? "UTC",
      tags: otherTags
    };
  });
  const upcoming = events.filter((e) => e.startAt > now).sort((a, b) => a.startAt.valueOf() - b.startAt.valueOf());
  const past = events.filter((e) => e.startAt <= now).sort((a, b) => b.startAt.valueOf() - a.startAt.valueOf());
  const all = [...upcoming, ...past];
  const tagSet = /* @__PURE__ */ new Set();
  events.forEach((e) => e.tags.forEach((t) => tagSet.add(t)));
  const filterTags = Array.from(tagSet).sort();
  return { upcoming, past, all, filterTags };
}
function formatEventDate(date, lang) {
  const locale = lang === "pt-br" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US";
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export { formatEventDate as a, fetchCrafterStationEvents as f };
