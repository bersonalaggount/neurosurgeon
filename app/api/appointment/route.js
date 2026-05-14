import { google } from 'googleapis';

export async function POST(req) {
  
  try {
    const body = await req.json();

    const { name, phone, reason } = body;

    const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // <-- this line
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

    const sheets = google.sheets({
      version: 'v4',
      auth,
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:C',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, phone, reason]],
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Appointment route error:', error?.message, error?.stack);
    return Response.json(
      { error: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}