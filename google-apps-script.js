/**
 * PoultryVision - Google Sheets Waitlist Backend
 * ---------------------------------------------------------------------------
 * INSTRUCTIONS:
 * 
 * IF YOU CREATED THIS SCRIPT DIRECTLY AT script.google.com (STANDALONE):
 * 1. Open Google Sheets (https://sheets.new) and create a sheet (name it "PoultryVision Waitlist").
 * 2. Copy the URL of your sheet from the browser address bar.
 * 3. Paste it below into SPREADSHEET_URL_OR_ID.
 * 4. Click Save, then click "Deploy" > "Manage deployments" > Edit (pencil icon) > 
 *    select "New version" > click "Deploy".
 * 
 * IF YOU CREATED IT FROM INSIDE A SHEET (Extensions > Apps Script):
 * - Leave SPREADSHEET_URL_OR_ID as "" (blank). It links automatically.
 * ---------------------------------------------------------------------------
 */

// Paste your Google Sheet URL or Sheet ID here if you created a standalone script at script.google.com
var SPREADSHEET_URL_OR_ID = ""; // e.g. "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit"

function getTargetSpreadsheet() {
  if (SPREADSHEET_URL_OR_ID && SPREADSHEET_URL_OR_ID.trim() !== "") {
    var input = SPREADSHEET_URL_OR_ID.trim();
    if (input.indexOf("http") === 0) {
      return SpreadsheetApp.openByUrl(input);
    }
    return SpreadsheetApp.openById(input);
  }

  // Fallback to active container-bound sheet
  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) {
    throw new Error(
      "No Google Sheet is connected. Please paste your Google Sheet URL into SPREADSHEET_URL_OR_ID at the top of the script."
    );
  }
  return active;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for any other concurrent submission to finish
  lock.tryLock(30000);

  try {
    var doc = getTargetSpreadsheet();
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
  try {
    var doc = getTargetSpreadsheet();
    return ContentService
      .createTextOutput("PoultryVision Waitlist Endpoint is active and connected to: " + doc.getName())
      .setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService
      .createTextOutput("PoultryVision Waitlist Script is running, but needs a Google Sheet: " + err.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
