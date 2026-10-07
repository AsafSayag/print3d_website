# מדידה באתר — Google Analytics 4

האתר טוען את GA4 ישירות דרך `NEXT_PUBLIC_GA_MEASUREMENT_ID`. דף הקמפיין
`/lp/sales-model` ודף התודה `/lp/sales-model/thank-you` טוענים בנוסף את
הקונטיינר `GTM-MDG2VG8X` של Google Tag Manager. בשאר הדפים הקונטיינר אינו נטען.
הטופס מפנה לדף התודה רק אחרי שהפנייה התקבלה בשרת. כדי למנוע ספירה כפולה, אין להפעיל בקונטיינר
תג GA4 נוסף עבור אותו מזהה מדידה.

`GoogleAnalytics.tsx` מגדיר `send_page_view: false`. `PageViewTracker` שולח
צפייה אחת לכל דף, כולל ניווט פנימי. יש להשאיר את אפשרות מדידת השינויים בהיסטוריית
הדפדפן כבויה ב־Enhanced Measurement של GA4 כדי למנוע ספירה כפולה.

| אירוע | מתי |
|---|---|
| `page_view` | צפייה בדף |
| `cta_click` | לחיצה על כפתור פעולה |
| `whatsapp_click` | לחיצה על וואטסאפ |
| `phone_click` | לחיצה על מספר טלפון |
| `form_start` | תחילת מילוי טופס |
| `form_submit` | שליחת טופס שהתקבלה בשרת |
| `project_view` | צפייה בפרויקט |
| `article_view` | צפייה במאמר |

שמות האירועים והפרמטרים מוגדרים ב־`src/lib/analytics.ts`. פרטי קשר שהגולש מקליד
אינם נשלחים ל־GA4. בחירת העוגיות מנוהלת ב־`src/components/analytics/consent.ts`.
