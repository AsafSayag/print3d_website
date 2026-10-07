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

  // עמודות G ואילך: מאיזו מודעה/קמפיין הגיע הליד (נשמר אוטומטית מה-URL של הפרסום)
  var HEADERS = [
    "תאריך ושעה", "שם", "טלפון", "אימייל", "על הפרויקט", "מקור",
    "gclid", "gbraid", "wbraid",
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
    "זמן המרה (ISO)"
  ];
  // כותרות בפעם הראשונה, ובגיליון קיים — משלימים כותרות חסרות בלי לגעת בנתונים
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  } else {
    for (var i = 0; i < HEADERS.length; i++) {
      if (sheet.getRange(1, i + 1).getValue() === "") {
        sheet.getRange(1, i + 1).setValue(HEADERS[i]);
      }
    }
  }

  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.receivedAt || "",
    data.name || "",
    data.phone || "",
    data.email || "",
    data.project || "",
    data.source || "",
    data.gclid || "",
    data.gbraid || "",
    data.wbraid || "",
    data.utm_source || "",
    data.utm_medium || "",
    data.utm_campaign || "",
    data.utm_term || "",
    data.utm_content || "",
    data.receivedAtIso || ""
  ]);

  // מייל התראה ל-frank, נשלח ישירות מהגיליון (לא תלוי בהגדרות Resend/Vercel)
  try {
    var lines = [
      "ליד חדש נכנס לגיליון:",
      "",
      "שם: " + (data.name || ""),
      "טלפון: " + (data.phone || ""),
      "מקור: " + (data.source || "")
    ];
    if (data.email) lines.push("אימייל: " + data.email);
    if (data.project) lines.push("על הפרויקט: " + data.project);
    if (data.utm_campaign) lines.push("קמפיין: " + data.utm_campaign);
    if (data.utm_term) lines.push("מילת מפתח: " + data.utm_term);
    lines.push("תאריך ושעה: " + (data.receivedAt || ""));

    var subject = "ליד חדש - Print3D" + (data.source && data.source !== "אתר" ? " · " + data.source : "");
    MailApp.sendEmail("frank@print3d.co.il", subject, lines.join("\n"));
  } catch (err) {
    // לא לחסום את השמירה בגיליון אם שליחת המייל נכשלה
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

> **חשוב:** אחרי שמדביקים את הקוד המעודכן, צריך לפרסם מחדש כדי שהוא ייכנס לתוקף
> על אותו URL קיים: **Deploy → Manage deployments** → לחצו על עיפרון העריכה ליד
> הפריסה הקיימת → **Version: New version** → **Deploy**.
> (אם עושים "New deployment" במקום זאת, מקבלים URL חדש וצריך לעדכן אותו ב-`LEADS_SHEET_WEBHOOK_URL`.)

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

---

## חלק ד׳ — מעקב קמפיינים בגוגל אדס

כל ליד נשמר אוטומטית עם הפרמטרים של המודעה שממנה הגיע: `gclid` (מזהה הקליק של גוגל)
ו-`utm_*` (קמפיין, מילת מפתח, מודעה). הם מופיעים בעמודות G–O בגיליון ובמייל ההתראה.

- **gclid** נוסף לבד כשמפעילים Auto-tagging בחשבון Google Ads (ברירת המחדל).
- כדי לראות גם שם קמפיין ומילת מפתח, מגדירים ב-Google Ads (רמת החשבון → Tracking template / Final URL suffix):
  `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={creative}`

### המרות ב-Google Ads
האתר שולח אירועי טופס, וואטסאפ וטלפון ישירות ל-GA4. בדף הקמפיין הממומן ובדף התודה שלו נטען
גם Google Tag Manager לניהול תגי המרה; בקוד האתר עצמו אין תגי Google Ads.
פירוט האירועים: [ANALYTICS.md](ANALYTICS.md).

### דיווח לידים שנסגרו (Offline conversions)
כשליד הופך ללקוח, אפשר להעלות ל-Google Ads קובץ עם ה-`gclid` שלו ועמודת "זמן המרה (ISO)",
כך שהבידינג ילמד אילו קליקים מביאים עסקאות ולא רק פניות.
