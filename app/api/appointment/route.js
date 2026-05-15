import { google } from 'googleapis';

export async function POST(req) {
  
  try {
    const body = await req.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({
      version: 'v4',
      auth,
    });

    if (body.triage) {
      // Case Triage Submission -> Sheet2
      const { name, phone, email, priority, triage } = body;
      const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet2!A:I',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            timestamp,
            name || '',
            phone || '',
            email || '',
            priority || '',
            triage?.type || '',
            triage?.diagnosis || '',
            triage?.imaging || '',
            triage?.urgency || ''
          ]],
        },
      });
    } else {
      // Standard Appointment Request -> Sheet1
      const { name, phone, reason } = body;
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:C',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[name || '', phone || '', reason || '']],
        },
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Appointment route error:', error?.message, error?.stack);
    return Response.json(
      { error: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}