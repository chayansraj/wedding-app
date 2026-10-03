/**
 * Wedding RSVP → Google Sheet
 * ---------------------------------------------------------------------------
 * One-time setup (about 3 minutes):
 *  1. Open the sheet → Extensions → Apps Script. Delete any sample code and
 *     paste this whole file. Save (Ctrl+S).
 *  2. Deploy → New deployment → type "Web app".
 *       Description : RSVP
 *       Execute as  : Me
 *       Who has access: Anyone            ← required, guests are anonymous
 *     Click Deploy, authorise with your Google account, and copy the
 *     "Web app URL" (ends in /exec).
 *  3. In the project's .env.local add
 *       NEXT_PUBLIC_RSVP_ENDPOINT=https://script.google.com/macros/s/…/exec
 *     and restart `next dev` (on Vercel: Settings → Environment Variables).
 *  4. Optional smoke test: open the Web app URL in a browser — you should see
 *     {"ok":true,"rows":N}.
 *
 * Every submission is appended to the "Responses" tab (created on first use).
 * The "Latest" tab shows ONE row per device (the most recent answer), which is
 * the de-duplicated view — created automatically on first use too.
 *
 * If you ever change this script, use Deploy → Manage deployments → ✎ → New
 * version, otherwise the old code keeps running at the same URL.
 */

var RESPONSES = 'Responses';
var LATEST = 'Latest';
var HEADERS = ['Received (IST)', 'Name', 'Answer', 'Previous answer', 'Language', 'Device ID', 'Page', 'User agent'];

function doPost(e) {
  var body = {};
  try { body = JSON.parse(e.postData && e.postData.contents ? e.postData.contents : '{}'); } catch (err) { body = {}; }

  var name = String(body.name || '').trim().slice(0, 120);
  var answer = String(body.attendance || '').trim().toLowerCase();
  if (!name || (answer !== 'yes' && answer !== 'maybe')) {
    return json_({ ok: false, error: 'invalid' });
  }

  var sheet = responsesSheet_();
  sheet.appendRow([
    Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss'),
    name,
    answer === 'yes' ? 'Yes' : 'Maybe',
    String(body.previous || ''),
    String(body.lang || ''),
    String(body.deviceId || ''),
    String(body.page || '').slice(0, 300),
    String(body.ua || '').slice(0, 300),
  ]);
  return json_({ ok: true });
}

function doGet() {
  var sheet = responsesSheet_();
  return json_({ ok: true, rows: Math.max(0, sheet.getLastRow() - 1) });
}

function responsesSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(RESPONSES);
  if (!sheet) {
    sheet = ss.insertSheet(RESPONSES);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  if (!ss.getSheetByName(LATEST)) {
    var latest = ss.insertSheet(LATEST);
    latest.getRange('A1').setValue('Newest answer per device (auto-updates). Edit nothing here — add notes in "Responses".');
    latest.getRange('A3:C3').setValues([['Received (IST)', 'Name', 'Answer']]).setFontWeight('bold');
    // Sort newest first, then keep the first row per Device ID (column 6).
    latest.getRange('A4').setFormula('=IFERROR(SORTN(SORT(FILTER(Responses!A2:F, Responses!A2:A<>""), 1, FALSE), 9^9, 2, 6, TRUE), "No responses yet")');
    latest.hideColumns(4, 3);
    latest.setFrozenRows(3);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
