# Project slugs

Full reference of every project slug in [`portfolioContent.ts`](./portfolioContent.ts),
for copy/pasting into [`hiddenProjects.ts`](./hiddenProjects.ts). Every project
listed here has its own case-study page under `src/app/projects/<slug>/`.

**Hidden** = currently listed in `HIDDEN_PROJECT_SLUGS` (invisible on the
site, direct URL 404s).

To hide a project: copy its slug, add it to `HIDDEN_PROJECT_SLUGS` in
`hiddenProjects.ts`, and add the matching `notFound()` guard in its
`page.tsx`. To un-hide: reverse both steps.

| Slug (copy this) | Project | Client | Hidden |
| --- | --- | --- | --- |
| `ashdar-tagor` | אשדר, תג'ור | אשדר | ✅ |
| `aura-natania` | אאורה, נתניה | אאורה | |
| `avisror-costa-rica-jerusalem` | אביסרור, קוסטה ריקה | אביסרור | |
| `avisror-ramat-hasharon` | אביסרור, רמת השרון | אביסרור | |
| `avisror-sde-dov` | אביסרור, שדה דב | אביסרור | |
| `avney-derech-beit-shemesh` | אבני דרך, בית שמש | אבני דרך | |
| `azorim-beit-hakerem` | אזורים, בית הכרם | אזורים | |
| `bat-yam-hotel` | מלון בת ים | פרויקט מלונאות | ✅ |
| `beit-hakerem` | בית הכרם | אלעד ישראל מגורים | |
| `bonei-binyan-hahagana-raanana` | בוני בניין, ההגנה | בוני בניין | |
| `dafna-tidhar` | תדהר דפנה | תדהר | |
| `gindi-kfar-azar` | גינדי כפר אז"ר | גינדי | |
| `guy-doron-levy-ramat-efal` | גיא דורון לוי, רמת אפעל | גיא דורון לוי | ✅ |
| `guy-doron-levy-tsur-hadassa` | גיא דורון לוי, צור הדסה | גיא דורון לוי | ✅ |
| `hayiriya-kiryat-yam` | הירייה, קרית ים | בריטניה ישראל | ✅ |
| `kardan-metsada-bat-yam` | כרדן, מצדה בת ים | כרדן | ✅ |
| `levinstein` | מגדלי לוינשטיין | לוינשטיין הנדסה | |
| `maoz-daniel-bat-yam` | מעוז דניאל, כצנלסון בת ים | מעוז דניאל | |
| `prashkovski-ashdod` | פרשקובסקי, אשדוד | פרשקובסקי | |
| `prashkovski-ramat-hanasi` | פרשקובסקי, רמת הנשיא | פרשקובסקי | |
| `ram-aderet-givat-hamatos` | רם אדרת, גבעת המטוס | רם אדרת | |
| `rotem-shani-beit-shemesh` | רותם שני, בית שמש | רותם שני | |
| `rotem-shani-petach-tikva` | רותם שני, פתח תקווה | רותם שני | |
| `sarfati-arnona-jerusalem` | צרפתי, ארנונה ירושלים | צרפתי | |
| `sela-baitar-hadera` | סלע ביתר · חדרה | סלע ביתר | |
| `shbiro-rishon-letzion` | שבירו, ראשון לציון | שבירו | |
| `vitania-har-hotzvim` | ויטניה, הר חוצבים | ויטניה | ✅ |

## Adding a brand-new project

When a new project is added to `portfolioContent.ts` and gets its own
case-study page under `src/app/projects/<slug>/`, add a row here too so this
stays the single place to look up any slug.
