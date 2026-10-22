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
> **מומלץ בהמשך:** לאמת את הדומיין `print3d.co.il` ב‑Resend (Domains → Add Domain),
> להוסיף ב‑DNS של print3d.co.il את הרשומות ש‑Resend מציג (DKIM ב‑`resend._domainkey`,
> ו‑MX + SPF על תת‑הדומיין `send` — הן לא נוגעות ב‑MX של Google Workspace),
> ואז להגדיר `LEAD_NOTIFY_FROM=Print3D <leads@print3d.co.il>` כדי לשלוח מכתובת רשמית.
> (את `print3d.ltd` אי אפשר לאמת — אין לנו גישה ל‑DNS שלו.)

---

## חלק ב׳ — קובץ הלידים (Google Sheets)

1. צור גיליון חדש ב‑<https://sheets.new>. תן לו שם, למשל **"לידים – Print3D"**.
2. בתפריט **Extensions → Apps Script**. מחק את הקוד שמופיע והדבק במקומו:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  // A–E: פרטי הליד · F: מקור (ממומן / אורגני / לא ידוע) · G ואילך: מאיזו מודעה/קמפיין הגיע הליד
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
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    var current = headerRange.getValues()[0];
    var changed = false;
    for (var i = 0; i < HEADERS.length; i++) {
      if (current[i] === "") { current[i] = HEADERS[i]; changed = true; }
    }
    if (changed) headerRange.setValues([current]);
  }

  var data = JSON.parse(e.postData.contents);
  // ערך שמתחיל ב- = + - @ גוגל שיטס מריץ כנוסחה — גרש בהתחלה שומר אותו כטקסט
  // (השרת כבר מנטרל את זה; כאן זו שכבת הגנה נוספת)
  function safe(v) {
    v = v == null ? "" : String(v);
    return /^[=+\-@\t\r]/.test(v) ? "'" + v : v;
  }
  sheet.appendRow([
    data.receivedAt,
    data.name,
    data.phone,
    data.email,
    data.project,
    data.channel,
    data.gclid,
    data.gbraid,
    data.wbraid,
    data.utm_source,
    data.utm_medium,
    data.utm_campaign,
    data.utm_term,
    data.utm_content,
    data.receivedAtIso
  ].map(safe));

  // מייל התראה לפרנק, נשלח ישירות מהגיליון (לא תלוי בהגדרות Resend/Vercel)
  try {
    var lines = [
      "ליד חדש נכנס לגיליון:",
      "",
      "שם: " + (data.name || ""),
      "טלפון: " + (data.phone || ""),
      "מקור: " + (data.channel || "")
    ];
    if (data.email) lines.push("אימייל: " + data.email);
    if (data.project) lines.push("על הפרויקט: " + data.project);
    if (data.utm_campaign) lines.push("קמפיין: " + data.utm_campaign);
    if (data.utm_term) lines.push("מילת מפתח: " + data.utm_term);
    lines.push("תאריך ושעה: " + (data.receivedAt || ""));

    var subject = "ליד חדש - Print3D" + (data.channel ? " · " + data.channel : "");
    MailApp.sendEmail("frank@print3d.co.il", subject, lines.join("\n"));
  } catch (err) {
    // לא לחסום את השמירה בגיליון אם שליחת המייל נכשלה
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

> **עמודת "מקור"** מתמלאת אוטומטית ב‑**ממומן**, **אורגני** או **לא ידוע**. ממומן = הליד הגיע מדף
> הנחיתה של הפרסום הממומן (`/lp/sales-model`), או מקליק על מודעת Google Ads (`gclid`),
> או מקישור עם `utm_medium` של פרסום ממומן (`cpc`, `paid_social` וכו׳). אורגני = הגעה
> ממנוע חיפוש מזוהה או קישור עם `utm_medium=organic` ו־`utm_source` של מנוע חיפוש.
> תנועה ישירה או ללא סימן ברור
> נשמרת כ״לא ידוע״; היא לא נספרת בטעות כאורגנית. סיווג חדש לא משנה שורות עבר.
> כשיש הפניה ממנוע חיפוש, שם הדומיין מופיע גם במייל ההתראה. בגיליון נשמר הסיווג
> בעמודת ״מקור״; מבנה העמודות של הגיליון לא משתנה.
> הלוגיקה נמצאת ב‑`src/lib/leadSources.ts`.
>
> **מייל לפרנק:** הסקריפט גם שולח מייל התראה ל‑`frank@print3d.co.il` על כל ליד, מחשבון
> ה‑Google שהגיליון שייך לו. בפריסה הראשונה של הגרסה הזו Google יבקש לאשר הרשאה
> לשליחת מיילים — יש לאשר. המייל לא מעכב את המבקר: האתר עונה לו ברגע שהליד נשמר.

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
