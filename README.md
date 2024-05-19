# SheetAlert

SheetAlert is a Google Apps Script project that monitors changes in a specific cell of a Google Sheet and sends email notifications when changes are detected.

## Features

- Monitors cell changes in real-time.
- Sends email notifications for changes.

## Setup

1. Open Google Apps Script and create a new project.
2. Copy and paste the content of `Code.js` and `appsscript.json` into the script editor.
3. Replace `YOUR_SHEET_ID`, `C9`, and `YOUR_EMAIL_ADDRESS` in `Code.js` with your specific details.
4. Save and run `testAccess` to ensure it has the correct permissions.

## Usage

To use SheetAlert, follow these steps:

- Run the `createTrigger` function to start monitoring changes.
- Check your email for notifications when changes occur.

## License

This project is available under the MIT License. See the LICENSE file for more info.
