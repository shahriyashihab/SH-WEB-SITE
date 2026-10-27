/* =========================================================
   Shahriar LLC — Content Store
   ---------------------------------------------------------
   A single source of truth for all editable site content.
   Works out of the box with localStorage (so it runs on
   localhost immediately), and can be pointed at Firebase
   Realtime Database by setting window.SH_USE_FIREBASE = true
   and window.SH_FIREBASE_URL.

   Public pages call SH.get() to render live content.
   Admin panel calls SH.set()/SH.save() to edit everything.

   Schema:
     site      { company, tagline, subTagline, phone, email, address,
                 facebook, instagram, telegram, logo (dataURL|url) }
      services  [ {id, title, icon, color, img, short, overview,
                   features[], includes[]} ]
      subservices [ {id, parent, title, icon, color, img, tagline,
                   overview, features[], includes[], price, delivery} ]
      products  [ {id, name, tag, logo, img, short, overview,
                  features[], price} ]
     team      [ {id, name, role, img, bio, focus[]} ]
     ceo       { name, role, img, message[] }
      slides    [ {id, img, alt} ]
     admins    [ {id, username, password, role} ]
     stats     { visitors, pageviews, orders }
   ========================================================= */
(function () {
  "use strict";

  var KEY = "shahriar_llc_content_v1";
  var USE_FB = !!window.SH_USE_FIREBASE;
  var FB_URL = window.SH_FIREBASE_URL || "";
  /* cloud merge flag: true once remote data has arrived */
  var CLOUD = false;

  /* ---------- default seed content ---------- */
  function seed() {
    return {
      site: {
        company: "Shahriar LLC",
        subCompany: "BD LTD",
        tagline: "Best Software Company in Bangladesh",
        topPhone: "+880 1958-633202",
        topEmail: "info@sprint.fast-page.org",
        phone: "+880 1958-633202",
        email: "info@sprint.fast-page.org",
        address: "Dhaka, Bangladesh",
        facebook: "#", instagram: "#", telegram: "#", linkedin: "#", youtube: "#",
        logo: ""
      },
      hero: {
        badge: "Trusted Development Team",
        title: "Top 1% software company in Bangladesh since 2007",
        subtitle: "Shahriar LLC is a diversified offshore IT services company delivering software, ERP, CRM, POS, HR & payroll, web and mobile solutions.",
        stat1n: "18+", stat1l: "Years Experience",
        stat2n: "500+", stat2l: "Projects Delivered",
        stat3n: "24/7", stat3l: "Support"
      },
      services: [
        { id: "website-design-development", title: "Website Design & Development", icon: "code", color: "blue", img: "assets/img/svc-web.jpg", short: "Professional, responsive websites designed to grow your business.", overview: "We design and build fast, secure and beautiful websites.", features: ["Custom responsive design", "SEO-friendly structure", "Fast loading & secure", "Analytics integration", "Content management", "Lifetime support"], includes: ["Requirement analysis", "UI/UX design", "Development & testing", "Deployment", "Training", "Support"] },
        { id: "custom-software-development", title: "Custom Software Development", icon: "code", color: "cyan", img: "assets/img/svc-software.jpg", short: "Tailor-made software built exactly for your business.", overview: "We build custom software from the ground up.", features: ["Custom workflows", "Role-based access", "Reporting", "API integration", "Scalable architecture", "Full source ownership"], includes: ["Discovery", "Architecture", "Agile development", "QA & security", "Deployment", "Support"] },
        { id: "mobile-apps-development", title: "Mobile Apps Development", icon: "phone", color: "orange", img: "assets/img/svc-mobile.jpg", short: "Android & iOS apps your customers will love.", overview: "Native and cross-platform mobile apps.", features: ["Android & iOS", "Flutter", "Push notifications", "Offline support", "Payments", "Store deployment"], includes: ["UI/UX design", "Development", "API integration", "Testing", "Store submission", "Maintenance"] },
        { id: "erp-crm-solutions", title: "ERP & CRM Solutions", icon: "erp", color: "purple", img: "assets/img/svc-erp.jpg", short: "ERP and CRM to run your whole business.", overview: "Bring operations under one platform.", features: ["Inventory & accounts", "Sales & purchase", "HR & payroll", "Customer management", "Real-time reports", "Multi-branch"], includes: ["Business analysis", "Setup", "Data migration", "Customization", "Training", "Support"] },
        { id: "digital-marketing", title: "Digital Marketing", icon: "cloud", color: "green", img: "assets/img/svc-marketing.jpg", short: "Grow reach with SEO and campaigns.", overview: "Data-driven digital marketing.", features: ["SEO", "Social media", "Content strategy", "Paid ads", "Analytics", "Conversion optimization"], includes: ["Audit", "Keyword research", "Campaign setup", "Content", "Monitoring", "Reports"] },
        { id: "it-support-consultancy", title: "IT Support & Consultancy", icon: "shield", color: "blue", img: "assets/img/svc-support.jpg", short: "Reliable IT support and expert guidance.", overview: "Keep systems running and plan your roadmap.", features: ["24/7 support", "Infrastructure consulting", "Security audits", "Cloud migration", "Backup", "IT strategy"], includes: ["Assessment", "Recommendations", "Implementation", "Monitoring", "Maintenance", "Reports"] }
      ],
      subservices: [
        {"id":"website-design-development:corporate-business-website","parent":"website-design-development","title":"Corporate & Business Website","icon":"code","color":"blue","img":"assets/img/svc-web.jpg","tagline":"A credible, professional website that wins customer trust.","overview":"A polished multi-page corporate website that presents your company, services and credibility. Built to convert visitors into enquiries with clear calls-to-action, fast load times and full mobile responsiveness.","features":["Up to 10 custom pages","Company, services & contact pages","Enquiry / quotation forms","Google Maps & WhatsApp integration","SEO-ready structure","Admin-editable content"],"includes":["Requirement & sitemap","UI/UX design","Responsive build","Content setup","Go-live & testing","30-day support"],"price":"Contact for pricing","delivery":"7-14 days"},
        {"id":"website-design-development:ecommerce-website","parent":"website-design-development","title":"E-commerce Website","icon":"code","color":"blue","img":"assets/img/svc-web.jpg","tagline":"Sell online with a full, secure online store.","overview":"A complete online store with product catalog, cart, checkout, online payments, order tracking and an admin dashboard. Built for retail, fashion, grocery and multi-vendor businesses.","features":["Product catalog & variants","Cart & secure checkout","bKash / Nagad / card payments","Order & delivery tracking","Coupons & offers","Sales dashboard"],"includes":["Store setup & design","Product upload","Payment gateway setup","Order workflow","Training","Support"],"price":"Contact for pricing","delivery":"14-21 days"},
        {"id":"website-design-development:web-application","parent":"website-design-development","title":"Custom Web Application","icon":"code","color":"blue","img":"assets/img/svc-software.jpg","tagline":"Dashboards, portals and business tools built to fit.","overview":"A custom web application tailored to your workflow &mdash; client portals, dashboards, booking systems, CRM front-ends and internal tools, with secure role-based access.","features":["Custom workflows","Role-based user access","Dashboards & reports","API integrations","Secure authentication","Scalable architecture"],"includes":["Discovery & planning","Architecture","Agile development","QA & security","Deployment","Post-launch support"],"price":"Contact for pricing","delivery":"3-8 weeks"},
        {"id":"website-design-development:landing-page","parent":"website-design-development","title":"Landing Page","icon":"code","color":"blue","img":"assets/img/svc-marketing.jpg","tagline":"High-converting single page for a campaign or product.","overview":"A focused, single-page site designed to promote one product, service or campaign and drive leads &mdash; ideal for ads, launches and seasonal promotions.","features":["Conversion-focused layout","Hero + benefits + CTA","Lead capture form","Fast loading","Mobile-first","Analytics tracking"],"includes":["Copy layout","Design","Build","Form setup","Go-live","Support"],"price":"Contact for pricing","delivery":"3-5 days"},
        {"id":"custom-software-development:enterprise-software","parent":"custom-software-development","title":"Enterprise Software","icon":"code","color":"cyan","img":"assets/img/svc-software.jpg","tagline":"Large-scale systems for complex organisations.","overview":"Robust, secure, high-availability software for enterprises that need complex workflows, integrations and multi-department access with full audit trails.","features":["Multi-department modules","Single sign-on","Role & permission matrix","Third-party integrations","Audit logging","Scalable to thousands of users"],"includes":["Business analysis","System design","Development","Security hardening","Deployment","Ongoing support"],"price":"Contact for pricing","delivery":"2-4 months"},
        {"id":"custom-software-development:booking-reservation-system","parent":"custom-software-development","title":"Booking & Reservation System","icon":"code","color":"cyan","img":"assets/img/svc-software.jpg","tagline":"Online bookings for hotels, clinics, salons and more.","overview":"Let customers book appointments, rooms or services online with automatic scheduling, reminders, payments and a management dashboard.","features":["Online booking calendar","Availability & slots","Automated reminders","Online payment","Staff management","Booking reports"],"includes":["Requirement study","UI/UX","Development","Payment setup","Training","Support"],"price":"Contact for pricing","delivery":"3-6 weeks"},
        {"id":"custom-software-development:internal-tools","parent":"custom-software-development","title":"Internal Business Tools","icon":"code","color":"cyan","img":"assets/img/svc-support.jpg","tagline":"Automate the manual work inside your company.","overview":"Replace spreadsheets and manual paperwork with secure internal tools &mdash; approvals, records, tracking and reporting that save hours every day.","features":["Custom forms & approvals","Data records & search","Automated reports","User roles","Email/SMS alerts","Export to Excel/PDF"],"includes":["Process mapping","Design","Build","Data import","Training","Support"],"price":"Contact for pricing","delivery":"2-5 weeks"},
        {"id":"mobile-apps-development:android-app","parent":"mobile-apps-development","title":"Android App Development","icon":"code","color":"orange","img":"assets/img/svc-mobile.jpg","tagline":"Native Android apps on Google Play.","overview":"Fast, reliable native Android apps built with Kotlin/Java &mdash; from utility apps to full business applications with offline support and push notifications.","features":["Native Android (Kotlin)","Google Play publishing","Push notifications","Offline mode","Payment integration","Analytics"],"includes":["UI/UX design","Development","API integration","Testing","Store submission","Support"],"price":"Contact for pricing","delivery":"4-8 weeks"},
        {"id":"mobile-apps-development:ios-app","parent":"mobile-apps-development","title":"iOS App Development","icon":"code","color":"orange","img":"assets/img/svc-mobile.jpg","tagline":"Polished apps for iPhone and iPad.","overview":"Beautiful, high-performance iOS apps built with Swift, following Apple's human interface guidelines and ready for the App Store.","features":["Native iOS (Swift)","App Store publishing","Push notifications","Apple Pay","Offline support","Analytics"],"includes":["UI/UX design","Development","API integration","Testing","App Store submission","Support"],"price":"Contact for pricing","delivery":"4-8 weeks"},
        {"id":"mobile-apps-development:cross-platform-app","parent":"mobile-apps-development","title":"Cross-Platform App (Flutter)","icon":"code","color":"orange","img":"assets/img/svc-mobile.jpg","tagline":"One codebase, both Android and iOS.","overview":"Build once and run on both Android and iOS with Flutter &mdash; cost-effective, near-native performance and a single maintained codebase.","features":["Single codebase","Android + iOS","Near-native speed","Push notifications","Payment integration","Store deployment"],"includes":["UI/UX design","Development","API integration","Testing","Both store submissions","Support"],"price":"Contact for pricing","delivery":"5-9 weeks"},
        {"id":"erp-crm-solutions:erp-implementation","parent":"erp-crm-solutions","title":"ERP Implementation","icon":"code","color":"purple","img":"assets/img/prod-erp.jpg","tagline":"Run inventory, accounts, sales and HR in one system.","overview":"A complete ERP rollout that unifies inventory, accounts, purchase, sales and HR into one platform &mdash; with real-time dashboards and multi-branch support.","features":["Inventory & stock","Accounts & finance","Sales & purchase","HR & payroll module","Real-time dashboards","Multi-branch"],"includes":["Business analysis","Setup & configuration","Data migration","Customisation","Staff training","Support"],"price":"Contact for pricing","delivery":"2-6 weeks"},
        {"id":"erp-crm-solutions:crm-setup","parent":"erp-crm-solutions","title":"CRM Setup","icon":"code","color":"purple","img":"assets/img/prod-crm.jpg","tagline":"Capture leads and close more deals.","overview":"A CRM that helps you capture leads, track the sales pipeline, automate follow-ups and understand your customers from one dashboard.","features":["Lead management","Sales pipeline","Follow-up automation","Customer history","Email/SMS integration","Analytics"],"includes":["Setup","Pipeline configuration","Data import","Integration","Training","Support"],"price":"Contact for pricing","delivery":"1-3 weeks"},
        {"id":"erp-crm-solutions:hr-payroll-module","parent":"erp-crm-solutions","title":"HR & Payroll Module","icon":"code","color":"purple","img":"assets/img/prod-hr.jpg","tagline":"Automate your people operations.","overview":"Manage employee records, attendance, leave and payroll accurately &mdash; fully automated and compliant with local rules.","features":["Employee records","Attendance & leave","Automated payroll","Salary & tax sheets","Self-service portal","Reports"],"includes":["Setup","Data import","Configuration","Training","Payroll run","Support"],"price":"Contact for pricing","delivery":"2-4 weeks"},
        {"id":"digital-marketing:seo-service","parent":"digital-marketing","title":"SEO (Search Engine Optimization)","icon":"code","color":"green","img":"assets/img/svc-marketing.jpg","tagline":"Get found on Google, organically.","overview":"Technical and content SEO that improves your Google ranking for the keywords your customers actually search &mdash; with monthly reporting.","features":["Technical SEO audit","Keyword research","On-page optimisation","Content optimisation","Link building","Monthly reports"],"includes":["Audit","Keyword plan","On-page work","Content guidance","Monitoring","Reporting"],"price":"Contact for pricing","delivery":"Ongoing monthly"},
        {"id":"digital-marketing:social-media-marketing","parent":"digital-marketing","title":"Social Media Marketing","icon":"code","color":"green","img":"assets/img/svc-marketing.jpg","tagline":"Build your brand on Facebook, Instagram and more.","overview":"Consistent, engaging social media management and campaigns that grow your audience and turn followers into customers.","features":["Content calendar","Post design","Community management","Paid boosting","Audience targeting","Performance reports"],"includes":["Strategy","Content creation","Scheduling","Campaigns","Monitoring","Monthly reports"],"price":"Contact for pricing","delivery":"Ongoing monthly"},
        {"id":"digital-marketing:google-ads","parent":"digital-marketing","title":"Google & Facebook Ads","icon":"code","color":"green","img":"assets/img/svc-marketing.jpg","tagline":"Paid campaigns that bring instant leads.","overview":"Targeted paid advertising on Google and Facebook that puts your business in front of the right audience and delivers measurable leads.","features":["Campaign setup","Audience targeting","Ad creatives","Landing page advice","Conversion tracking","Optimisation"],"includes":["Strategy","Campaign build","Creative setup","Tracking","Optimisation","Reporting"],"price":"Contact for pricing","delivery":"Ongoing monthly"},
        {"id":"it-support-consultancy:managed-it-support","parent":"it-support-consultancy","title":"Managed IT Support","icon":"code","color":"blue","img":"assets/img/svc-support.jpg","tagline":"Your IT team on call, whenever you need.","overview":"Ongoing technical support for your website, software and infrastructure &mdash; so problems are fixed fast and your business keeps running.","features":["24/7 helpdesk","Remote troubleshooting","Software updates","Backup management","Monitoring","Priority response"],"includes":["Assessment","Support setup","Monitoring","Maintenance","Monthly reports","Escalation path"],"price":"Contact for pricing","delivery":"Ongoing monthly"},
        {"id":"it-support-consultancy:security-audit","parent":"it-support-consultancy","title":"Security Audit & Hardening","icon":"code","color":"blue","img":"assets/img/svc-software.jpg","tagline":"Protect your data and systems.","overview":"A thorough security review of your website or application, with penetration testing and fixes to close vulnerabilities before attackers find them.","features":["Security audit","Penetration testing","Vulnerability report","Hardening","Backup & recovery plan","Compliance guidance"],"includes":["Assessment","Vulnerability scan","Remediation","Monitoring setup","Reporting","Support"],"price":"Contact for pricing","delivery":"1-2 weeks"},
        {"id":"it-support-consultancy:cloud-migration","parent":"it-support-consultancy","title":"Cloud Migration","icon":"code","color":"blue","img":"assets/img/svc-support.jpg","tagline":"Move to the cloud safely and affordably.","overview":"Plan and execute a smooth migration of your website, database or application to the cloud, with backup and rollback planning.","features":["Migration planning","Zero-downtime move","Database migration","Backup & rollback","Performance tuning","Cost optimisation"],"includes":["Assessment","Migration plan","Execution","Testing","Monitoring","Support"],"price":"Contact for pricing","delivery":"1-2 weeks"},
        {"id":"ecommerce-solution:online-store","parent":"ecommerce-solution","title":"Online Store","icon":"code","color":"cyan","img":"assets/img/svc-web.jpg","tagline":"A complete store to sell your products online.","overview":"A complete e-commerce store with product catalog, cart, secure checkout, online payments and order management.","features":["Product catalog","Cart & checkout","bKash / Nagad / card","Order tracking","Coupons","Sales dashboard"],"includes":["Store setup","Product upload","Payment setup","Design","Training","Support"],"price":"Contact for pricing","delivery":"2-4 weeks"},
        {"id":"ecommerce-solution:multi-vendor-marketplace","parent":"ecommerce-solution","title":"Multi-Vendor Marketplace","icon":"code","color":"cyan","img":"assets/img/svc-web.jpg","tagline":"Let many sellers sell on one platform.","overview":"A marketplace where multiple vendors register, list products and manage orders, while you run the platform and take commission.","features":["Vendor registration","Vendor dashboards","Commission management","Payouts","Order flow","Admin control"],"includes":["Platform setup","Vendor onboarding","Payment setup","Design","Training","Support"],"price":"Contact for pricing","delivery":"4-8 weeks"},
        {"id":"hr-payroll-management:hr-software","parent":"hr-payroll-management","title":"HR Management Software","icon":"code","color":"orange","img":"assets/img/prod-hr.jpg","tagline":"All your employee records in one place.","overview":"Manage employee records, attendance, leave and documents with a clean HR dashboard your team will actually use.","features":["Employee database","Attendance tracking","Leave management","Document storage","Self-service portal","Reports"],"includes":["Setup","Data import","Configuration","Training","Go-live","Support"],"price":"Contact for pricing","delivery":"2-4 weeks"},
        {"id":"hr-payroll-management:payroll-automation","parent":"hr-payroll-management","title":"Payroll Automation","icon":"code","color":"orange","img":"assets/img/prod-hr.jpg","tagline":"Accurate salaries in minutes, every month.","overview":"Automate monthly salary, deductions, tax and payslip generation &mdash; accurate, compliant and audit-ready.","features":["Automated payroll","Tax & deductions","Payslip generation","Bank file export","Compliance reports","Audit history"],"includes":["Setup","Rule configuration","Data import","Testing","Payroll run","Support"],"price":"Contact for pricing","delivery":"1-3 weeks"},
        {"id":"pos-retail-software:retail-pos","parent":"pos-retail-software","title":"Retail POS","icon":"code","color":"purple","img":"assets/img/prod-erp.jpg","tagline":"Fast billing for shops and supershops.","overview":"A fast, reliable point-of-sale for retail &mdash; barcode billing, stock control, supplier records and daily sales reports.","features":["Barcode billing","Stock management","Supplier records","Sales reports","Cash & card","Offline mode"],"includes":["Hardware setup","Software install","Product entry","Staff training","Go-live","Support"],"price":"Contact for pricing","delivery":"1-2 weeks"},
        {"id":"pos-retail-software:multi-outlet-pos","parent":"pos-retail-software","title":"Multi-Outlet POS","icon":"code","color":"purple","img":"assets/img/prod-erp.jpg","tagline":"Manage many branches from one place.","overview":"Run several outlets under one system with central stock, pricing and live sales reporting across all branches.","features":["Central dashboard","Stock transfer","Per-outlet pricing","Live sales reports","User roles","Consolidated reports"],"includes":["Setup","Branch configuration","Data import","Training","Go-live","Support"],"price":"Contact for pricing","delivery":"2-3 weeks"},
        {"id":"school-management-system:school-erp","parent":"school-management-system","title":"School ERP","icon":"code","color":"green","img":"assets/img/prod-school.jpg","tagline":"Run admissions, exams, fees and more.","overview":"A complete school ERP covering admissions, attendance, exams, results, fees and parent communication in one secure platform.","features":["Admissions","Attendance","Exams & results","Fees & billing","Parent portal","SMS alerts"],"includes":["Setup","Data import","Module config","Training","Go-live","Support"],"price":"Contact for pricing","delivery":"3-6 weeks"},
        {"id":"school-management-system:college-university-erp","parent":"school-management-system","title":"College & University ERP","icon":"code","color":"green","img":"assets/img/prod-school.jpg","tagline":"For colleges, universities and institutes.","overview":"An ERP built for colleges and universities &mdash; departments, semesters, credit, results, fees and student portals at scale.","features":["Department & semester","Credit & grading","Results publication","Fees & accounts","Student & staff portal","Reports"],"includes":["Setup","Data import","Module config","Training","Go-live","Support"],"price":"Contact for pricing","delivery":"4-8 weeks"},
        {"id":"business-process-outsourcing:data-entry","parent":"business-process-outsourcing","title":"Data Entry & Processing","icon":"code","color":"blue","img":"assets/img/svc-marketing.jpg","tagline":"Accurate, fast data handling at scale.","overview":"Reliable data entry, cleaning and processing so your team can focus on higher-value work, with quality checks built in.","features":["Data entry","Data cleaning","Document digitisation","Quality checks","Daily/weekly batches","Reporting"],"includes":["Requirement study","Team setup","Process docs","Training","Delivery","Reporting"],"price":"Contact for pricing","delivery":"Ongoing"},
        {"id":"business-process-outsourcing:customer-support-outsourcing","parent":"business-process-outsourcing","title":"Customer Support Outsourcing","icon":"code","color":"blue","img":"assets/img/svc-support.jpg","tagline":"Friendly support for your customers, 24/7.","overview":"Outsource your helpdesk and customer support &mdash; phone, email and chat &mdash; to a trained, accountable team.","features":["Phone support","Email & chat","Ticketing","Multilingual option","24/7 shifts","Quality monitoring"],"includes":["Requirement study","Team setup","Scripts & flows","Training","Go-live","Reporting"],"price":"Contact for pricing","delivery":"Ongoing"},
        {"id":"cyber-security:penetration-testing","parent":"cyber-security","title":"Penetration Testing","icon":"code","color":"cyan","img":"assets/img/svc-software.jpg","tagline":"Find weaknesses before attackers do.","overview":"Ethical hacking and penetration testing of your website or application, with a clear report and prioritised fixes.","features":["Web/app pen test","Vulnerability report","Risk rating","Remediation guidance","Re-test","Certificate of testing"],"includes":["Scoping","Testing","Report","Remediation help","Re-test","Support"],"price":"Contact for pricing","delivery":"3-7 days"},
        {"id":"cyber-security:security-monitoring","parent":"cyber-security","title":"Security Monitoring & Backup","icon":"code","color":"cyan","img":"assets/img/svc-support.jpg","tagline":"Stay protected and always backed up.","overview":"Continuous monitoring, firewall hardening and automated backups so your business keeps running and your data stays safe.","features":["24/7 monitoring","Firewall & hardening","Automated backups","Incident response","Restore testing","Reports"],"includes":["Assessment","Monitoring setup","Backup setup","Hardening","Testing","Support"],"price":"Contact for pricing","delivery":"Ongoing monthly"}
      ],
      products: [
        { id: "sheba-erp", name: "Sheba ERP", tag: "Best ERP Software in Bangladesh", logo: "ERP", img: "assets/img/prod-erp.jpg", short: "All-in-one enterprise resource planning.", overview: "Sheba ERP unifies accounts, inventory, sales and HR.", features: ["Accounts & finance", "Inventory", "Sales & purchase", "HR & payroll", "Dashboards", "Multi-branch"], price: "Contact for pricing" },
        { id: "hr-sheba", name: "HR Sheba", tag: "Best HR & Payroll Software", logo: "HR", img: "assets/img/prod-hr.jpg", short: "Complete HR and payroll automation.", overview: "HR Sheba handles employees, attendance and payroll.", features: ["Employee database", "Attendance", "Payroll", "Tax sheets", "Self-service", "Reports"], price: "Contact for pricing" },
        { id: "smart-educare", name: "Smart Educare", tag: "Best School Management System", logo: "EDU", img: "assets/img/prod-school.jpg", short: "Modern school management.", overview: "Admissions, attendance, exams, results and fees.", features: ["Admissions", "Attendance", "Exams & results", "Fees", "Parent portal", "SMS"], price: "Contact for pricing" },
        { id: "gym-master", name: "Gym Master", tag: "Best Gym Management Software", logo: "GYM", img: "assets/img/prod-gym.jpg", short: "Manage memberships and billing.", overview: "Gym Master handles members, packages and payments.", features: ["Member management", "Packages", "Payments", "Attendance", "Reminders", "Reports"], price: "Contact for pricing" },
        { id: "crm-suite", name: "CRM Suite", tag: "Best CRM Software in Bangladesh", logo: "CRM", img: "assets/img/prod-crm.jpg", short: "Manage leads and your sales pipeline.", overview: "Capture leads and track deals.", features: ["Lead management", "Pipeline", "Follow-up", "Customer history", "Automation", "Analytics"], price: "Contact for pricing" },
        { id: "remit-sheba", name: "Remit Sheba", tag: "Best Remittance Management System", logo: "RMS", img: "assets/img/prod-remit.jpg", short: "Secure remittance management.", overview: "Manage senders, beneficiaries and transactions.", features: ["Sender & beneficiary", "Exchange rates", "Transactions", "Compliance", "Outlets", "Reports"], price: "Contact for pricing" }
      ],
      team: [
        { id: "md-mofakhkharul-islam", name: "Md. Mofakhkharul Islam", role: "CEO & Managing Director", img: "assets/img/team-1.jpg", bio: "Engr. Md. Mofakhkharul Islam has led Shahriar LLC since its founding in 2007.", focus: ["Strategy", "Project management", "Technology leadership", "Client relationships"] },
        { id: "md-mohiuddin-ahmed", name: "Md. Mohiuddin Ahmed", role: "Director (Finance)", img: "assets/img/team-2.jpg", bio: "Md. Mohiuddin Ahmed leads finance, budgeting and compliance.", focus: ["Financial planning", "Budgeting", "Compliance", "Risk management"] },
        { id: "md-tariqul-azam", name: "Md Tariqul Azam", role: "Managing Partner (Business Development)", img: "assets/img/team-3.jpg", bio: "Capt. Tarique Lincoln drives business development and partnerships.", focus: ["Business development", "Partnerships", "Market expansion", "Client growth"] },
        { id: "john-henao", name: "John Henao", role: "Inter. Market Managing Partner", img: "assets/img/team-4.jpg", bio: "John Henao brings 15+ years in international marketing.", focus: ["International marketing", "Market research", "Growth strategy", "Brand"] },
        { id: "head-of-engineering", name: "Head of Engineering", role: "Software Architecture", img: "assets/img/team-5.jpg", bio: "Leads the technical architecture of every project.", focus: ["System architecture", "Code quality", "Security", "Mentoring"] },
        { id: "manager-client-success", name: "Manager, Client Success", role: "Customer Support", img: "assets/img/team-6.jpg", bio: "Ensures every customer receives prompt support.", focus: ["Client onboarding", "Support", "Delivery", "Satisfaction"] }
      ],
      ceo: {
        name: "Md. Mofakhkharul Islam",
        role: "CEO & Managing Director",
        img: "assets/img/ceo.jpg",
        message: [
          "Welcome to Shahriar LLC.",
          "Since 2007 we have grown from a small team of passionate engineers into a diversified offshore IT services company trusted by organisations across Bangladesh and beyond.",
          "In a fast-moving digital world, we believe the difference between good and great companies is accountability. Every project is owned end-to-end by a senior team.",
          "Whether you need a website, an enterprise platform, or a fully custom solution, our commitment is quality engineering, transparent delivery and lifetime-friendly support."
        ]
      },
      admins: [
        { id: "admin-1", username: "admin", password: "shahriyar123", role: "Owner" }
      ],
      /* hero slider images (admin-editable). Shown where the hero picture is. */
      slides: [
        { id: "slide-1", img: "assets/img/hero-team.jpg", alt: "Our development team" },
        { id: "slide-2", img: "assets/img/about-office.jpg", alt: "Our office" },
        { id: "slide-3", img: "assets/img/cta-bg.jpg", alt: "Shahriar LLC" }
      ],
      stats: { visitors: 0, pageviews: 0, orders: 0 }
    };
  }

  /* ---------- load / save ---------- */
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    var s = seed();
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
    return s;
  }

  var DATA = load();

  function save(opts) {
    try { localStorage.setItem(KEY, JSON.stringify(DATA)); } catch (e) { console.warn("save failed", e); }
    /* Push to the cloud only for real edits:
         - opts.local  -> local-only (visit tracking), never push
         - opts.remote -> applying a cloud snapshot, never push back
         - otherwise   -> an editor action (public SH.save/upsert/remove)
       A plain visitor page-load uses opts.local, so it can never
       overwrite the admin's saved content in the cloud. */
    var push = !(opts && (opts.local || opts.remote));
    if (push) {
      if (window.SHDB && !(opts && opts.remote)) {
        window.SHDB.push(DATA);
      } else if (USE_FB && FB_URL) {
        fetch(FB_URL.replace(/\/$/, "") + "/content.json", {
          method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(DATA)
        }).catch(function () {});
      }
    }
    try { window.dispatchEvent(new CustomEvent("sh:change")); } catch (e) {}
    return true;
  }

  /* ---------- merge a remote/cloud snapshot ---------- */
  function mergeRemote(remote) {
    if (!remote || typeof remote !== "object" || remote.__message) return false;
    /* Merge each collection safely:
       - objects (site/hero/stats/ceo): merge field-by-field
       - arrays (team/products/services/subservices): only take the cloud
         copy when it is a real array. A null/undefined cloud value must
         NEVER wipe the local seed, otherwise admin data can be lost. */
    Object.keys(remote).forEach(function (k) {
      var val = remote[k];
      if (k === "site" || k === "hero" || k === "stats" || k === "ceo") {
        if (val && typeof val === "object") DATA[k] = Object.assign({}, DATA[k] || {}, val);
      } else if (Array.isArray(val)) {
        DATA[k] = val;
      } else if (val && typeof val === "object") {
        DATA[k] = val;
      }
      /* val === null/undefined -> keep the local value */
    });
    CLOUD = true;
    try { localStorage.setItem(KEY, JSON.stringify(DATA)); } catch (e) {}
    try { window.dispatchEvent(new CustomEvent("sh:change")); } catch (e) {}
    return true;
  }

  /* ---------- live sync bootstrap (tabs + cloud) ---------- */
  function startLive() {
    if (!window.SHDB) return;
    /* initial cloud read: cloud content wins if it exists */
    window.SHDB.pull(function (remote) { if (remote) mergeRemote(remote); });
    /* live updates from other tabs / polled cloud changes */
    window.SHDB.subscribe(function (msg) {
      if (!msg || !msg.data) return;
      if (msg.data.__message) {
        var msgs = DATA.orders || (DATA.orders = []);
        msgs.push(msg.data.__message);
        try { localStorage.setItem(KEY, JSON.stringify(DATA)); } catch (e) {}
        try { window.dispatchEvent(new CustomEvent("sh:change")); } catch (e) {}
        return;
      }
      mergeRemote(msg.data);
    });
  }

  /* ---------- public API ---------- */
  window.SH = {
    get: function () { return DATA; },
    save: save,
    reset: function () { DATA = seed(); save(); return DATA; },
    /* real-time helpers */
    isCloud: function () { return CLOUD; },
    live: startLive,
    /* generic collection helpers */
    list: function (coll) { return DATA[coll] || []; },
    getItem: function (coll, id) {
      var a = DATA[coll] || [];
      for (var i = 0; i < a.length; i++) if (a[i].id === id) return a[i];
      return null;
    },
    upsert: function (coll, obj) {
      if (!DATA[coll]) DATA[coll] = [];
      if (!obj.id) obj.id = (obj.title || obj.name || "item").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString(36);
      var a = DATA[coll], found = false;
      for (var i = 0; i < a.length; i++) if (a[i].id === obj.id) { a[i] = obj; found = true; break; }
      if (!found) a.push(obj);
      save();
      return obj;
    },
    remove: function (coll, id) {
      DATA[coll] = (DATA[coll] || []).filter(function (x) { return x.id !== id; });
      save();
    }
  };

  /* ---------- visit tracking (live dashboard) ---------- */
  try {
    var today = new Date().toISOString().slice(0, 10);
    var vk = "sh_visit_" + today;
    if (!sessionStorage.getItem(vk)) {
      sessionStorage.setItem(vk, "1");
      DATA.stats.visitors = (DATA.stats.visitors || 0) + 1;
      save({ local: true });
    }
    DATA.stats.pageviews = (DATA.stats.pageviews || 0) + 1;
    save({ local: true });
  } catch (e) {}

  /* ---------- go live (free real-time sync) ---------- */
  startLive();
})();
