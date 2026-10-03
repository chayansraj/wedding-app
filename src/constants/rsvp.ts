/* RSVP phone contacts. The numbers are personal, so they are NOT in the repo:
   put them in `.env.local` (git-ignored) as
     NEXT_PUBLIC_RSVP_PHONE_1=+91XXXXXXXXXX
     NEXT_PUBLIC_RSVP_PHONE_2=+91XXXXXXXXXX
   and restart `next dev`. Names always render; the number and Call button
   appear once the value is filled in.
   (NEXT_PUBLIC_ values are embedded in the page bundle — that is intended,
   guests must be able to read and dial them.) */
export const RSVP_CONTACTS = [
  { name: 'Ajay Mishra', phone: (process.env.NEXT_PUBLIC_RSVP_PHONE_1 ?? '').trim() },
  { name: 'Sanjay Mishra', phone: (process.env.NEXT_PUBLIC_RSVP_PHONE_2 ?? '').trim() },
];
