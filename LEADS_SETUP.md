# הגדרת טופס הלידים — מדריך הפעלה

כל פעם שמישהו משאיר פרטים באתר קורים שני דברים אוטומטית:

1. **מייל התראה** נשלח ל‑`asaf00500@gmail.com` עם השם, הטלפון והתאריך והשעה המדויקים.
2. **שורה חדשה** נוספת לגיליון Google Sheets שלך — כך שיש לך תמיד קובץ אחד עם כל הלידים.

בנוסף, מיד אחרי השארת הפרטים מופיע פופ‑אפ תודה בצבעי האתר.

כדי שהכול יעבוד צריך למלא 3–4 משתני סביבה. הנה איך.

---

## חלק א׳ — מייל (Resend)

1. היכנס ל‑<https://resend.com> והירשם עם `asaf00500@gmail.com`.
2. בתפריט **API Keys** → **Create API Key**. העתק את המפתח (מתחיל ב‑`re_...`).
3. שמור אותו כמשתנה `RESEND_API_KEY` (ראה חלק ג׳).

> **מצב התחלתי (מהיר):** בלי הגדרות נוספות, המערכת שולחת מהכתובת המשותפת של Resend
> (`onboarding@resend.dev`). היא מצליחה להגיע רק לכתובת שאיתה נרשמת ל‑Resend —
> ולכן ההרשמה עם `asaf00500@gmail.com` חשובה.
>
> **מומלץ בהמשך:** לאמת את הדומיין `print3d.ltd` ב‑Resend (Domains → Add Domain),
> ואז להגדיר `LEAD_NOTIFY_FROM=Print3D <leads@print3d.ltd>` כדי לשלוח מכתובת רשמית.

---

## חלק ב׳ — קובץ הלידים (Google Sheets)

1. צור גיליון חדש ב‑<https://sheets.new>. תן לו שם, למשל **"לידים – Print3D"**.
2. בתפריט **Extensions → Apps Script**. מחק את הקוד שמופיע והדבק במקומו:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  // כותרות בפעם הראשונה
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["תאריך ושעה", "שם", "טלפון", "אימייל", "על הפרויקט"]);
  }

  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.receivedAt || "",
    data.name || "",
    data.phone || "",
    data.email || "",
    data.project || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. לחץ **Deploy → New deployment**.
4. ליד "Select type" לחץ על גלגל השיניים ובחר **Web app**.
5. תחת **Execute as** בחר **Me**. תחת **Who has access** בחר **Anyone**.
6. לחץ **Deploy**, אשר את ההרשאות, והעתק את ה‑**Web app URL**
   (נראה כמו `https://script.google.com/macros/s/AKfy.../exec`).
7. שמור אותו כמשתנה `LEADS_SHEET_WEBHOOK_URL` (חלק ג׳).

> הגיליון הזה הוא "הקובץ" שלך — נכנסים אליו בכל רגע ורואים את כל מי שהשאיר פרטים,
> כולל תאריך ושעה מדויקים. אפשר גם לייצא ל‑Excel דרך File → Download.

---

## חלק ג׳ — הזנת המשתנים

### מקומית (בזמן פיתוח)
צור קובץ בשם `.env.local` בתיקיית `print3d-web` (אפשר להעתיק מ‑`.env.example`) עם:

```
RESEND_API_KEY=re_xxxxxxxx
LEAD_NOTIFY_TO=asaf00500@gmail.com
LEADS_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfy.../exec
```

### בפרודקשן (Vercel)
Vercel → הפרויקט → **Settings → Environment Variables**, והוסף את אותם משתנים.
לאחר מכן **Redeploy** כדי שייכנסו לתוקף.

---

## בדיקה
מלא את הטופס באתר עם פרטים אמיתיים ולחץ שליחה. אמורים:
- להופיע פופ‑אפ "תודה שהשארת פרטים !".
- להגיע מייל ל‑`asaf00500@gmail.com`.
- להתווסף שורה חדשה בגיליון.

אם משהו לא עובד — האתר עדיין שומר את הליד כל עוד לפחות אחד משני הערוצים (מייל/גיליון)
פעיל, ומדפיס שגיאה בלוגים של Vercel (Deployments → Functions) שמסבירה מה חסר.
