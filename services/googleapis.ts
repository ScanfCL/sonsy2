import { google, Auth } from "googleapis";

export class GoogleApiService {
  private sheet = google.sheets("v4");
  private auth: Auth.JWT;
  private spreadsheetId: string;

  constructor(email?: string, key?: string, spreadsheetId?: string) {
    if (!email) {
      throw new Error("Email is required");
    }

    if (!key) {
      throw new Error("Key is required");
    }

    if (!spreadsheetId) {
      throw new Error("Spreadsheet ID is required");
    }

    this.spreadsheetId = spreadsheetId;
    this.auth = new google.auth.JWT({
      email: email,
      key: key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }

  _getRowNumberById = async (sheetName: string, id: string) => {
    const data = await googleApiService.getData(sheetName);
    const rows = data?.data?.values;
    let rowNumber = null;

    if (!rows?.length) {
      return;
    }

    for (let i = 0; i < rows.length; i++) {
      if (rows?.[i][0] === id) {
        rowNumber = i + 1;
        break;
      }
    }

    return rowNumber;
  };

  _getSheetId = async (
    sheetName: string,
    spreadsheetId: string,
  ): Promise<number | null> => {
    // Fetch the spreadsheet details
    const { data } = await this.sheet.spreadsheets.get({
      auth: this.auth,
      spreadsheetId,
      fields: "sheets.properties",
    });

    const sheets = data.sheets || [];

    // Find the sheetId for the sheet with the given name
    for (const sheet of sheets) {
      if (sheet.properties?.title === sheetName) {
        return sheet.properties?.sheetId || null;
      }
    }

    return null;
  };

  appendData = async (range: string, data: string[] | string[][]) => {
    await this.sheet.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      auth: this.auth,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [data],
      },
    });
  };

  updateData = async (
    range: string,
    id: string,
    newData: string[] | string[][],
  ) => {
    const rowNumber = await this._getRowNumberById(range, id);

    await this.sheet.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      auth: this.auth,
      range: `${range}!A${rowNumber}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [newData],
      },
    });
  };

  deleteData = async (range: string, id: string) => {
    try {
      const rowNumber = await this._getRowNumberById(range, id);
      const sheetId = await this._getSheetId(range, this.spreadsheetId);

      if (!rowNumber) {
        throw new Error("Row number is not found");
      }

      await this.sheet.spreadsheets.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        auth: this.auth,
        requestBody: {
          requests: [
            {
              deleteDimension: {
                range: {
                  sheetId: sheetId,
                  dimension: "ROWS",
                  startIndex: rowNumber - 1,
                  endIndex: rowNumber,
                },
              },
            },
          ],
        },
      });
    } catch (error) {
      console.log("error >", error);
    }
  };

  getData = async (range: string) => {
    return await this.sheet.spreadsheets.values.get({
      auth: this.auth,
      spreadsheetId: this.spreadsheetId,
      range,
    });
  };

  getDataByFilter = async (range: string, key: string, value: string) => {
    return await this.sheet.spreadsheets.getByDataFilter({
      spreadsheetId: this.spreadsheetId,
      requestBody: {
        dataFilters: [
          {
            developerMetadataLookup: {
              metadataKey: key, // This should match the key you've set in Developer Metadata
              metadataValue: value, // The value you want to filter by
              locationType: range,
              visibility: "DOCUMENT",
            },
          },
        ],
      },
    });
  };
}

export const googleApiService = new GoogleApiService(
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_CLIENT_EMAIL,
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_KEY,
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_SPREAD_ID,
);
