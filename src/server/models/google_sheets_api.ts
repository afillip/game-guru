import { IGoogleSheetsAPI } from '../interfaces/IGoogleSheetsApi';
import { ISheetsAccess } from '../interfaces/ISheetsAccess';

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

export class GoogleSheetAPIAuth implements IGoogleSheetsAPI {
    
    // If modifying these scopes, delete token.json.
    private readonly _SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    private readonly _TOKEN_PATH = 'token.json';

    // id of the spreadsheet that contains all board game data
    public readonly spreadsheetId: string = '1thEWgt0ADWtL88ipSJRq_RLlgTkQt8O8KMkKN5V8-wk';

    // holds access to spreadsheet data
    private _sheetsAccess: ISheetsAccess;
    public get sheetsAccess(): ISheetsAccess {
        return this._sheetsAccess;
    }

    constructor() {
        this._loadClientSecrets();
    }

    private _loadClientSecrets(): void {
        // Load client secrets from a local file.
        fs.readFile('credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Sheets API.
            this._authorize(JSON.parse(content), this._initializeSheetsConnection.bind(this));
        });
    }

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    private _authorize(credentials, callback) {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        // // Check if we have previously stored a token.
        fs.readFile(this._TOKEN_PATH, (err, token) => {
            if (err) return this._getNewToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    private _getNewToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this._SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) return console.error('Error while trying to retrieve access token', err);
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(this._TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) return console.error(err);
                    console.log('Token stored to', this._TOKEN_PATH);
                });
                callback(oAuth2Client);
            });
        });
    }

    /**
     * @see https://docs.google.com/spreadsheets/d/1thEWgt0ADWtL88ipSJRq_RLlgTkQt8O8KMkKN5V8-wk/edit
     * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
     */
    private _initializeSheetsConnection(auth) {
        this._sheetsAccess = google.sheets({ version: 'v4', auth });
    }

}
