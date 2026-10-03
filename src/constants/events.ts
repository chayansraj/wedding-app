import { generateMapLink } from '@/lib/wedding-utils';

/** The multi-day celebration. `key` doubles as the `schedule.<key>*` locale prefix. */
export const WEDDING_EVENTS = [
  { key: 'matra-pujan', art: 'matra-pujan', symbol: '✦' },
  { key: 'haldi', art: 'haldi', symbol: '❀' },
  { key: 'mehendi', art: 'mehendi', symbol: '✿' },
  { key: 'sangeet', art: 'engagement', symbol: '♫' },
  { key: 'wedding', art: 'wedding', symbol: 'ॐ' },
] as const;

export type WeddingEventKey = (typeof WEDDING_EVENTS)[number]['key'];

/** Venues in programme order; name/address text lives under `schedule.<firstEvent>-venue/-address`.
    `mapUrl` is a full Google Maps link (paste the "Share" link for an exact pin);
    otherwise `mapQuery` is resolved through Maps search. */
export const EVENT_VENUES: ReadonlyArray<{ events: readonly WeddingEventKey[]; mapQuery: string | null; mapUrl?: string }> = [
  { events: ['matra-pujan'], mapQuery: null },
  { events: ['haldi', 'mehendi'], mapQuery: 'Coco and Khwaab Farms, Sector 135, Noida, Uttar Pradesh 201304' },
  { events: ['sangeet'], mapQuery: 'Khwaab Farm House, Sector 135, Noida, Uttar Pradesh 201304' },
  { events: ['wedding'], mapQuery: 'The Saffron, CBD Ground, Karkardooma, Delhi 110092' },
];

export const venueMapHref = (venue: (typeof EVENT_VENUES)[number]): string | null => venue.mapUrl ?? (venue.mapQuery ? generateMapLink(venue.mapQuery) : null);

// Bump ART_VERSION whenever an artwork file is replaced so browsers drop the cached copy.
const ART_VERSION = 3;
export const eventArt = (name: string, thumb = false) => `/assets/images/events/${name}${thumb ? '-thumb' : ''}.webp?v=${ART_VERSION}`;
