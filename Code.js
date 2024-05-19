var sheetId = 'YOUR_SHEET_ID'; // Replace with your Google Sheet ID
var monitoredCell = 'C9'; // Replace with the cell you want to monitor
var emailRecipient = 'YOUR_EMAIL_ADDRESS'; // Replace with the recipient's email address


function checkCellValue() {
  var sheet;
  try {
    sheet = SpreadsheetApp.openById(sheetId);
  } catch (e) {
    Logger.log('Error accessing spreadsheet: ' + e.toString());
    return;
  }

  var cell;
  try {
    cell = sheet.getRange(monitoredCell);
  } catch (e) {
    Logger.log('Error accessing cell: ' + e.toString());
    return;
  }

  var newValue;
  try {
    newValue = cell.getValue();
  } catch (e) {
    Logger.log('Error getting cell value: ' + e.toString());
    return;
  }

  var lastValue = PropertiesService.getScriptProperties().getProperty('lastValue');
  
  if (newValue != lastValue) {
    sendEmailNotification(newValue, lastValue);
    PropertiesService.getScriptProperties().setProperty('lastValue', newValue);
  }
}

function sendEmailNotification(newValue, lastValue) {
  var subject = 'Cell Value Changed';
  var body = 'The value of cell ' + monitoredCell + ' has changed from ' + lastValue + ' to ' + newValue + '.';
  try {
    MailApp.sendEmail(emailRecipient, subject, body);
  } catch (e) {
    Logger.log('Error sending email: ' + e.toString());
  }
}

function createTrigger() {
  // Delete all existing triggers to avoid duplicates
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
  // Create a new time-based trigger to run checkCellValue every 5 minutes
  try {
    ScriptApp.newTrigger('checkCellValue')
      .timeBased()
      .everyMinutes(5) // Adjust the frequency as needed
      .create();
  } catch (e) {
    Logger.log('Error creating trigger: ' + e.toString());
  }
}

function testAccess() {
  var sheet;
  try {
    var sheet = SpreadsheetApp.openById(sheetId);
    Logger.log('Sheet Name: ' + sheet.getName());
    Logger.log('Sheet URL: ' + sheet.getUrl());
  } catch (e) {
    Logger.log('Error accessing spreadsheet: ' + e.toString());
  }
}

