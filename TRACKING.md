# מדידה ותגיות — Google Tag Manager

מסמך עבודה למי שמנהל את השיווק והמדידה באתר (כולל פרילנסר). מתאר מה האתר שולח,
מה מוגדר ב-Tag Manager, ומה מותר לשנות בלי מפתח.

## איך זה בנוי

- **האתר לא טוען את GA4 או את Google Ads ישירות.** הוא טוען רק את Google Tag Manager
  (`NEXT_PUBLIC_GTM_ID`), ושולח אירועים ל-`dataLayer`. כל ההגדרות — GA4, המרות Ads —
  נמצאות בתוך ה-container ב-GTM.
- **GTM נטען באיחור קטן בכוונה:** אחרי שהדף סיים להיטען, או 3 שניות לכל היותר. זה שומר
  על מהירות הטעינה. אירועים שקרו לפני כן לא הולכים לאיבוד — GTM מעבד אותם כשהוא עולה.
- **בלי `NEXT_PUBLIC_GTM_ID`** (פיתוח מקומי, תצוגות מקדימות של Vercel) לא נטען כלום ולא
  מוצג באנר עוגיות. ב-Vercel המשתנה מוגדר רק לסביבת Production.

## האירועים שהאתר שולח (dataLayer)

כל אירוע הוא `dataLayer.push({ event: "<שם>", ...פרמטרים })`. לפני כל אירוע האתר
מאפס את מודל ה-dataLayer, כך שפרמטר של אירוע קודם לא "נדבק" לאירוע הבא.

| event | פרמטרים | מתי |
|---|---|---|
| `page_view` | — | כל צפייה בדף, כולל מעבר בין דפים בלי טעינה מחדש |
| `cta_click` | `cta_name`, `location` | לחיצה על כפתור קריאה לפעולה |
| `whatsapp_click` | `location` | לחיצה על קישור וואטסאפ |
| `phone_click` | `location`, `phone_type` (`office` / `mobile`) | לחיצה על מספר טלפון |
| `form_start` | `form_name`, `location` | הקלדה ראשונה בטופס |
| `form_submit` | `form_name`, `location` | ליד שנשלח בהצלחה (רק אחרי שהשרת קיבל אותו) |
| `project_view` | `project_name`, `project_category`, `project_slug` | צפייה בעמוד פרויקט |
| `article_view` | `article_name`, `article_category`, `article_slug` | צפייה במאמר |
| `consent_update` | `consent` (`granted` / `denied`) | המבקר בחר בבאנר העוגיות |

`location` הוא תמיד שם קבוע של המקום בדף (למשל `hero`, `footer`, `lp_sales_model_hero`).
**אף פעם לא נשלח מידע אישי** (שם, טלפון, מייל) — זה נחסם גם בקוד.

הרשימה המלאה והטיפוסים: `src/lib/analytics.ts`.

## מה מוגדר ב-container

קובץ ייבוא מוכן: `gtm/print3d-container.json` (GTM → Admin → Import Container → Merge).

| תג | סוג | מופעל ב |
|---|---|---|
| Google tag - GA4 | Google tag, `send_page_view = false` | Initialization – All Pages |
| GA4 - Event - site events | GA4 Event, שם האירוע = `{{Event}}`, כל הפרמטרים מהטבלה למעלה | כל אירועי האתר (טריגר regex) |
| Conversion Linker | Conversion Linker | All Pages |
| Google Ads - Conversion - Lead form | Google Ads Conversion | `form_submit` |
| Google Ads - Conversion - WhatsApp click | Google Ads Conversion | `whatsapp_click` |
| Google Ads - Conversion - Phone click | Google Ads Conversion | `phone_click` |

**תגי Google Ads מגיעים מושהים (Paused).** כדי להפעיל: למלא את המשתנים
`Const - Ads Conversion ID` ו-`Const - Ads Label - …` מהגדרות ההמרות ב-Google Ads, לבטל את
ההשהיה, לבדוק ב-Preview ולפרסם.

## עוגיות והסכמה (Consent Mode v2)

- באנר קטן בתחתית המסך עם "אישור" / "לא תודה". הבחירה נשמרת בדפדפן (`p3d_consent`).
- **ברירת מחדל:** למבקרים מהאיחוד האירופי, בריטניה ושווייץ — הכל חסום עד אישור.
  לכל השאר (בפועל: ישראל) — מופעל, ו"לא תודה" חוסם.
- תגי Google (GA4, Ads) מכבדים את ההסכמה אוטומטית. **כל תג שאינו של גוגל** שמוסיפים
  ב-GTM צריך הגדרת Consent (Additional consent checks) כדי לא לרוץ בלי הסכמה.
- המדיניות מוגדרת במקום אחד: `src/components/analytics/consent.ts`.

## חוקים למי שעובד ב-GTM

1. **לא להוסיף קוד GA4 נוסף** (לא באתר ולא ב-GTM) — כל צפייה תיספר פעמיים.
2. **ב-GA4: לכבות את Enhanced Measurement → "Page changes based on browser history events"**,
   אחרת מעברי דף ייספרו פעמיים (האתר כבר שולח `page_view` בעצמו).
3. **כלים שאינם של גוגל (פיקסל של מטא, לינקדאין, Clarity וכו') ייחסמו** עד שיתווספו
   לרשימת ה-CSP באתר (`next.config.ts`). מוסיפים כלי חדש? לבקש מהמפתח להוסיף את
   הדומיינים שלו — זה שינוי של דקה, אבל בלעדיו התג פשוט לא יעבוד.
4. **Custom JavaScript Variables עובדים** (ה-CSP מאפשר זאת).
5. **תמיד לבדוק ב-Preview (Tag Assistant) לפני Publish.** מצב Preview נתמך ב-CSP.
