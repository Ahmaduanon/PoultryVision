/**
 * PoultryVision - Google Sheets Waitlist Backend
 * -------------------------------------------------------------
 * INSTRUCTIONS:
 * 1. Open Google Sheets (create a new blank sheet e.g. "PoultryVision Waitlist").
 * 2. In the top menu, click Extensions > Apps Script.
 * 3. Delete any default code in the editor, and paste this ENTIRE file.
 * 4. Click "Save" (disk icon).
 * 5. Click "Deploy" (top right) > "New deployment".
 * 6. Under "Select type" (gear icon), select "Web app".
 * 7. Set:
 *    - Description: "PoultryVision Waitlist API"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (crucial so your website can send entries)
 * 8. Click "Deploy", authorize access with your Google account.
 * 9. Copy the "Web app URL" (looks like https://script.google.com/macros/s/.../exec).
 * 10. Paste it into your project's .env file (VITE_GOOGLE_SHEET_URL=your_url)
 *     or directly into src/config/waitlist.js.
 * -------------------------------------------------------------
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for any other concurrent submission to finish
  lock.tryLock(30000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();

    // If the sheet is brand new, automatically create the bold header row
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Submission Date / Time",
        "Full Name",
        "Email Address",
        "WhatsApp Number",
        "Farm Type",
        "Flock Size",
        "CCTV Status",
        "Biggest Challenge / Notes"
      ];
      sheet.appendRow(headers);

      // Style header row: Dark slate background, white text, bold
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0F172A");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    // Extract submission parameters
    var data = {};
    if (e && e.parameter) {
      data = e.parameter;
    }

    // Fallback if data was sent as JSON body
    if (e && e.postData && e.postData.contents) {
      try {
        var parsed = JSON.parse(e.postData.contents);
        for (var key in parsed) {
          data[key] = parsed[key];
        }
      } catch (err) {
        // Not JSON, continue with e.parameter
      }
    }

    var timestamp = data.submittedAt || new Date().toLocaleString();
    var fullName = data.fullName || "Anonymous";
    var email = data.email || "";
    var whatsapp = data.whatsapp || "N/A";
    var farmType = data.farmType || "Not Specified";
    var flockSize = data.flockSize || "Not Specified";
    var cctvStatus = data.cctvStatus || "Not Specified";
    var challenge = data.challenge || "N/A";

    // Append new row
    sheet.appendRow([
      timestamp,
      fullName,
      email,
      whatsapp,
      farmType,
      flockSize,
      cctvStatus,
      challenge
    ]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Waitlist entry saved" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Simple test to verify the Web App is working when visited in a browser
function doGet(e) {
  return ContentService
    .createTextOutput("PoultryVision Waitlist Endpoint is active and listening for submissions.")
    .setMimeType(ContentService.MimeType.TEXT);
}
