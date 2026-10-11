موقع معين — ملفات الرفع (أكتوبر 2026)

الهيكل:
/index.html                 الرئيسية
/hourly-maid/index.html     عاملة منزلية بالساعة
/home-cleaning/index.html   تنظيف بلس
/monthly-maid/index.html    عاملة مقيمة بالشهر
/babysitter/index.html      جليسة أطفال
/hospitality/index.html     خدمات الضيافة
/terms/index.html           الشروط والأحكام
/404.html                   صفحة الخطأ (اضبطها في السيرفر كصفحة 404)
/sitemap.xml  /robots.txt
/assets/                    CSS و JS والصور

قبل الإطلاق (بحث واستبدال في كل ملفات HTML):
1) G-XXXXXXXXXX  ← رقم GA4 الخاص بمعين
2) رمز Google Search Console: فعّل السطر المعلّق google-site-verification في <head> (أو تحقق عبر DNS)
3) الدومين مضبوط على https://mueen.com.sa — إذا تغيّر، استبدله في HTML و sitemap.xml و robots.txt

التتبع:
- كل أزرار التحميل تذهب لـ OneLink بـ c=<اسم الصفحة> (و _organic للزيارات غير الإعلانية)
  af_sub1 = gclid ، af_sub2 = utm_term ، af_sub3 = مكان الزر
- أحداث GA4: app_store_click / play_store_click / app_download_click مع service و page و position
- وسم Google Ads: AW-16564588407

بعد الرفع: أرسل sitemap.xml في Google Search Console.
