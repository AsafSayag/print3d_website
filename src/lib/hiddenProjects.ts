/** Slugs of projects temporarily hidden from public view (not ready to show yet).
 *  Remove a slug from this list to bring that project back live. */
export const HIDDEN_PROJECT_SLUGS: string[] = [
  "vitania-har-hotzvim",
  "ashdar-tagor",
  "guy-doron-levy-ramat-efal",
  "bat-yam-hotel",
  "hayiriya-kiryat-yam",
  "guy-doron-levy-tsur-hadassa",
  "kardan-metsada-bat-yam",
];

/* Reference: every project slug, for copy/pasting into HIDDEN_PROJECT_SLUGS
 * above. Keep this in sync with src/lib/SLUGS.md — same table, same source of
 * truth (src/lib/portfolioContent.ts). When a new project is registered,
 * add a row here too (see project_builder.md step 4).
 *
 * | Slug (copy this) | Project | Client | Hidden |
 * | --- | --- | --- | --- |
 * | `ashdar-tagor` | אשדר, תג'ור | אשדר | ✅ |
 * | `aura-natania` | אאורה, נתניה | אאורה | |
 * | `avisror-costa-rica-jerusalem` | אביסרור, קוסטה ריקה | אביסרור | |
 * | `avisror-ramat-hasharon` | אביסרור, רמת השרון | אביסרור | |
 * | `avisror-sde-dov` | אביסרור, שדה דב | אביסרור | |
 * | `avney-derech-beit-shemesh` | אבני דרך, בית שמש | אבני דרך | |
 * | `azorim-beit-hakerem` | אזורים, בית הכרם | אזורים | |
 * | `bat-yam-hotel` | מלון בת ים | פרויקט מלונאות | ✅ |
 * | `beit-hakerem` | בית הכרם | אלעד ישראל מגורים | |
 * | `bonei-binyan-hahagana-raanana` | בוני בניין, ההגנה | בוני בניין | |
 * | `dafna-tidhar` | תדהר דפנה | תדהר | |
 * | `gindi-kfar-azar` | גינדי כפר אז"ר | גינדי | |
 * | `guy-doron-levy-ramat-efal` | גיא דורון לוי, רמת אפעל | גיא דורון לוי | ✅ |
 * | `guy-doron-levy-tsur-hadassa` | גיא דורון לוי, צור הדסה | גיא דורון לוי | ✅ |
 * | `hayiriya-kiryat-yam` | הירייה, קרית ים | בריטניה ישראל | ✅ |
 * | `kardan-metsada-bat-yam` | כרדן, מצדה בת ים | כרדן | ✅ |
 * | `levinstein` | מגדלי לוינשטיין | לוינשטיין הנדסה | |
 * | `maoz-daniel-bat-yam` | מעוז דניאל, כצנלסון בת ים | מעוז דניאל | |
 * | `prashkovski-ashdod` | פרשקובסקי, אשדוד | פרשקובסקי | |
 * | `prashkovski-ramat-hanasi` | פרשקובסקי, רמת הנשיא | פרשקובסקי | |
 * | `ram-aderet-givat-hamatos` | רם אדרת, גבעת המטוס | רם אדרת | |
 * | `rotem-shani-beit-shemesh` | רותם שני, בית שמש | רותם שני | |
 * | `rotem-shani-petach-tikva` | רותם שני, פתח תקווה | רותם שני | |
 * | `sarfati-arnona-jerusalem` | צרפתי, ארנונה ירושלים | צרפתי | |
 * | `sela-baitar-hadera` | סלע ביתר · חדרה | סלע ביתר | |
 * | `shbiro-rishon-letzion` | שבירו, ראשון לציון | שבירו | |
 * | `vitania-har-hotzvim` | ויטניה, הר חוצבים | ויטניה | ✅ |
 */
