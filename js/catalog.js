/* =========================================================
   Shahriar LLC — shared catalog (services & products)
   Each item has a slug used in detail.html?item=SLUG
   ========================================================= */
window.CATALOG = {
  /* ---------------- SERVICES ---------------- */
  "website-design-development": {
    type: "Service", title: "Website Design & Development", icon: "code", color: "blue",
    img: "assets/img/svc-web.jpg",
    short: "Professional, responsive websites designed to grow your business.",
    overview: "We design and build fast, secure and beautiful websites &mdash; from corporate sites to complex web applications. Every site is mobile-friendly, SEO-ready and built on modern technology.",
    features: ["Custom responsive design", "SEO-friendly structure", "Fast loading &amp; secure", "Content management option", "Analytics integration", "Lifetime basic support"],
    includes: ["Requirement analysis", "UI/UX design", "Development &amp; testing", "Deployment", "Training", "Support"],
    items: [
      { slug: "corporate-business-website", title: "Corporate & Business Website", tagline: "A credible, professional website that wins customer trust.", img: "assets/img/svc-web.jpg",
        overview: "A polished multi-page corporate website that presents your company, services and credibility. Built to convert visitors into enquiries with clear calls-to-action, fast load times and full mobile responsiveness.",
        features: ["Up to 10 custom pages", "Company, services & contact pages", "Enquiry / quotation forms", "Google Maps & WhatsApp integration", "SEO-ready structure", "Admin-editable content"],
        includes: ["Requirement & sitemap", "UI/UX design", "Responsive build", "Content setup", "Go-live & testing", "30-day support"],
        price: "Contact for pricing", delivery: "7-14 days" },
      { slug: "ecommerce-website", title: "E-commerce Website", tagline: "Sell online with a full, secure online store.", img: "assets/img/svc-web.jpg",
        overview: "A complete online store with product catalog, cart, checkout, online payments, order tracking and an admin dashboard. Built for retail, fashion, grocery and multi-vendor businesses.",
        features: ["Product catalog & variants", "Cart & secure checkout", "bKash / Nagad / card payments", "Order & delivery tracking", "Coupons & offers", "Sales dashboard"],
        includes: ["Store setup & design", "Product upload", "Payment gateway setup", "Order workflow", "Training", "Support"],
        price: "Contact for pricing", delivery: "14-21 days" },
      { slug: "web-application", title: "Custom Web Application", tagline: "Dashboards, portals and business tools built to fit.", img: "assets/img/svc-software.jpg",
        overview: "A custom web application tailored to your workflow &mdash; client portals, dashboards, booking systems, CRM front-ends and internal tools, with secure role-based access.",
        features: ["Custom workflows", "Role-based user access", "Dashboards & reports", "API integrations", "Secure authentication", "Scalable architecture"],
        includes: ["Discovery & planning", "Architecture", "Agile development", "QA & security", "Deployment", "Post-launch support"],
        price: "Contact for pricing", delivery: "3-8 weeks" },
      { slug: "landing-page", title: "Landing Page", tagline: "High-converting single page for a campaign or product.", img: "assets/img/svc-marketing.jpg",
        overview: "A focused, single-page site designed to promote one product, service or campaign and drive leads &mdash; ideal for ads, launches and seasonal promotions.",
        features: ["Conversion-focused layout", "Hero + benefits + CTA", "Lead capture form", "Fast loading", "Mobile-first", "Analytics tracking"],
        includes: ["Copy layout", "Design", "Build", "Form setup", "Go-live", "Support"],
        price: "Contact for pricing", delivery: "3-5 days" }
    ]
  },
  "custom-software-development": {
    type: "Service", title: "Custom Software Development", icon: "code", color: "cyan",
    img: "assets/img/svc-software.jpg",
    short: "Tailor-made software built exactly for your business workflows.",
    overview: "We build custom software from the ground up &mdash; ERP, booking systems, CRM and internal tools &mdash; designed around how your business actually works.",
    features: ["Custom workflows", "Role-based access", "Reporting &amp; analytics", "API integration", "Scalable architecture", "Full source ownership"],
    includes: ["Discovery &amp; planning", "System architecture", "Agile development", "QA &amp; security", "Deployment", "Post-launch support"],
    items: [
      { slug: "enterprise-software", title: "Enterprise Software", tagline: "Large-scale systems for complex organisations.", img: "assets/img/svc-software.jpg",
        overview: "Robust, secure, high-availability software for enterprises that need complex workflows, integrations and multi-department access with full audit trails.",
        features: ["Multi-department modules", "Single sign-on", "Role & permission matrix", "Third-party integrations", "Audit logging", "Scalable to thousands of users"],
        includes: ["Business analysis", "System design", "Development", "Security hardening", "Deployment", "Ongoing support"],
        price: "Contact for pricing", delivery: "2-4 months" },
      { slug: "booking-reservation-system", title: "Booking & Reservation System", tagline: "Online bookings for hotels, clinics, salons and more.", img: "assets/img/svc-software.jpg",
        overview: "Let customers book appointments, rooms or services online with automatic scheduling, reminders, payments and a management dashboard.",
        features: ["Online booking calendar", "Availability & slots", "Automated reminders", "Online payment", "Staff management", "Booking reports"],
        includes: ["Requirement study", "UI/UX", "Development", "Payment setup", "Training", "Support"],
        price: "Contact for pricing", delivery: "3-6 weeks" },
      { slug: "internal-tools", title: "Internal Business Tools", tagline: "Automate the manual work inside your company.", img: "assets/img/svc-support.jpg",
        overview: "Replace spreadsheets and manual paperwork with secure internal tools &mdash; approvals, records, tracking and reporting that save hours every day.",
        features: ["Custom forms & approvals", "Data records & search", "Automated reports", "User roles", "Email/SMS alerts", "Export to Excel/PDF"],
        includes: ["Process mapping", "Design", "Build", "Data import", "Training", "Support"],
        price: "Contact for pricing", delivery: "2-5 weeks" }
    ]
  },
  "mobile-apps-development": {
    type: "Service", title: "Mobile Apps Development", icon: "phone", color: "orange",
    img: "assets/img/svc-mobile.jpg",
    short: "Android & iOS apps that your customers will love to use.",
    overview: "Native and cross-platform mobile apps built for performance and great user experience &mdash; from idea to app store.",
    features: ["Android &amp; iOS", "Cross-platform (Flutter)", "Push notifications", "Offline support", "Payment integration", "App store deployment"],
    includes: ["UI/UX design", "App development", "API integration", "Testing", "Store submission", "Maintenance"],
    items: [
      { slug: "android-app", title: "Android App Development", tagline: "Native Android apps on Google Play.", img: "assets/img/svc-mobile.jpg",
        overview: "Fast, reliable native Android apps built with Kotlin/Java &mdash; from utility apps to full business applications with offline support and push notifications.",
        features: ["Native Android (Kotlin)", "Google Play publishing", "Push notifications", "Offline mode", "Payment integration", "Analytics"],
        includes: ["UI/UX design", "Development", "API integration", "Testing", "Store submission", "Support"],
        price: "Contact for pricing", delivery: "4-8 weeks" },
      { slug: "ios-app", title: "iOS App Development", tagline: "Polished apps for iPhone and iPad.", img: "assets/img/svc-mobile.jpg",
        overview: "Beautiful, high-performance iOS apps built with Swift, following Apple's human interface guidelines and ready for the App Store.",
        features: ["Native iOS (Swift)", "App Store publishing", "Push notifications", "Apple Pay", "Offline support", "Analytics"],
        includes: ["UI/UX design", "Development", "API integration", "Testing", "App Store submission", "Support"],
        price: "Contact for pricing", delivery: "4-8 weeks" },
      { slug: "cross-platform-app", title: "Cross-Platform App (Flutter)", tagline: "One codebase, both Android and iOS.", img: "assets/img/svc-mobile.jpg",
        overview: "Build once and run on both Android and iOS with Flutter &mdash; cost-effective, near-native performance and a single maintained codebase.",
        features: ["Single codebase", "Android + iOS", "Near-native speed", "Push notifications", "Payment integration", "Store deployment"],
        includes: ["UI/UX design", "Development", "API integration", "Testing", "Both store submissions", "Support"],
        price: "Contact for pricing", delivery: "5-9 weeks" }
    ]
  },
  "erp-crm-solutions": {
    type: "Service", title: "ERP & CRM Solutions", icon: "erp", color: "purple",
    img: "assets/img/svc-erp.jpg",
    short: "Enterprise resource planning and customer relationship management.",
    overview: "Bring your operations under one platform &mdash; inventory, accounts, HR, sales and customers &mdash; with real-time dashboards and reporting.",
    features: ["Inventory &amp; accounts", "Sales &amp; purchase", "HR &amp; payroll module", "Customer management", "Real-time reports", "Multi-branch support"],
    includes: ["Business analysis", "System setup", "Data migration", "Customization", "Staff training", "Ongoing support"],
    items: [
      { slug: "erp-implementation", title: "ERP Implementation", tagline: "Run inventory, accounts, sales and HR in one system.", img: "assets/img/prod-erp.jpg",
        overview: "A complete ERP rollout that unifies inventory, accounts, purchase, sales and HR into one platform &mdash; with real-time dashboards and multi-branch support.",
        features: ["Inventory & stock", "Accounts & finance", "Sales & purchase", "HR & payroll module", "Real-time dashboards", "Multi-branch"],
        includes: ["Business analysis", "Setup & configuration", "Data migration", "Customisation", "Staff training", "Support"],
        price: "Contact for pricing", delivery: "2-6 weeks" },
      { slug: "crm-setup", title: "CRM Setup", tagline: "Capture leads and close more deals.", img: "assets/img/prod-crm.jpg",
        overview: "A CRM that helps you capture leads, track the sales pipeline, automate follow-ups and understand your customers from one dashboard.",
        features: ["Lead management", "Sales pipeline", "Follow-up automation", "Customer history", "Email/SMS integration", "Analytics"],
        includes: ["Setup", "Pipeline configuration", "Data import", "Integration", "Training", "Support"],
        price: "Contact for pricing", delivery: "1-3 weeks" },
      { slug: "hr-payroll-module", title: "HR & Payroll Module", tagline: "Automate your people operations.", img: "assets/img/prod-hr.jpg",
        overview: "Manage employee records, attendance, leave and payroll accurately &mdash; fully automated and compliant with local rules.",
        features: ["Employee records", "Attendance & leave", "Automated payroll", "Salary & tax sheets", "Self-service portal", "Reports"],
        includes: ["Setup", "Data import", "Configuration", "Training", "Payroll run", "Support"],
        price: "Contact for pricing", delivery: "2-4 weeks" }
    ]
  },
  "digital-marketing": {
    type: "Service", title: "Digital Marketing", icon: "cloud", color: "green",
    img: "assets/img/svc-marketing.jpg",
    short: "Grow your reach with SEO, social media and paid campaigns.",
    overview: "Data-driven digital marketing that brings real traffic and conversions &mdash; SEO, social media, content and paid advertising.",
    features: ["Search engine optimization", "Social media marketing", "Content strategy", "Paid ads management", "Analytics &amp; reporting", "Conversion optimization"],
    includes: ["Audit &amp; strategy", "Keyword research", "Campaign setup", "Content creation", "Monitoring", "Monthly reports"],
    items: [
      { slug: "seo-service", title: "SEO (Search Engine Optimization)", tagline: "Get found on Google, organically.", img: "assets/img/svc-marketing.jpg",
        overview: "Technical and content SEO that improves your Google ranking for the keywords your customers actually search &mdash; with monthly reporting.",
        features: ["Technical SEO audit", "Keyword research", "On-page optimisation", "Content optimisation", "Link building", "Monthly reports"],
        includes: ["Audit", "Keyword plan", "On-page work", "Content guidance", "Monitoring", "Reporting"],
        price: "Contact for pricing", delivery: "Ongoing monthly" },
      { slug: "social-media-marketing", title: "Social Media Marketing", tagline: "Build your brand on Facebook, Instagram and more.", img: "assets/img/svc-marketing.jpg",
        overview: "Consistent, engaging social media management and campaigns that grow your audience and turn followers into customers.",
        features: ["Content calendar", "Post design", "Community management", "Paid boosting", "Audience targeting", "Performance reports"],
        includes: ["Strategy", "Content creation", "Scheduling", "Campaigns", "Monitoring", "Monthly reports"],
        price: "Contact for pricing", delivery: "Ongoing monthly" },
      { slug: "google-ads", title: "Google & Facebook Ads", tagline: "Paid campaigns that bring instant leads.", img: "assets/img/svc-marketing.jpg",
        overview: "Targeted paid advertising on Google and Facebook that puts your business in front of the right audience and delivers measurable leads.",
        features: ["Campaign setup", "Audience targeting", "Ad creatives", "Landing page advice", "Conversion tracking", "Optimisation"],
        includes: ["Strategy", "Campaign build", "Creative setup", "Tracking", "Optimisation", "Reporting"],
        price: "Contact for pricing", delivery: "Ongoing monthly" }
    ]
  },
  "it-support-consultancy": {
    type: "Service", title: "IT Support & Consultancy", icon: "shield", color: "blue",
    img: "assets/img/svc-support.jpg",
    short: "Reliable IT support and expert technology consultancy.",
    overview: "Keep your systems running and plan your technology roadmap with expert guidance and dependable support.",
    features: ["24/7 technical support", "Infrastructure consulting", "Security audits", "Cloud migration", "Backup &amp; recovery", "IT strategy"],
    includes: ["Assessment", "Recommendations", "Implementation", "Monitoring", "Maintenance", "Reports"],
    items: [
      { slug: "managed-it-support", title: "Managed IT Support", tagline: "Your IT team on call, whenever you need.", img: "assets/img/svc-support.jpg",
        overview: "Ongoing technical support for your website, software and infrastructure &mdash; so problems are fixed fast and your business keeps running.",
        features: ["24/7 helpdesk", "Remote troubleshooting", "Software updates", "Backup management", "Monitoring", "Priority response"],
        includes: ["Assessment", "Support setup", "Monitoring", "Maintenance", "Monthly reports", "Escalation path"],
        price: "Contact for pricing", delivery: "Ongoing monthly" },
      { slug: "security-audit", title: "Security Audit & Hardening", tagline: "Protect your data and systems.", img: "assets/img/svc-software.jpg",
        overview: "A thorough security review of your website or application, with penetration testing and fixes to close vulnerabilities before attackers find them.",
        features: ["Security audit", "Penetration testing", "Vulnerability report", "Hardening", "Backup & recovery plan", "Compliance guidance"],
        includes: ["Assessment", "Vulnerability scan", "Remediation", "Monitoring setup", "Reporting", "Support"],
        price: "Contact for pricing", delivery: "1-2 weeks" },
      { slug: "cloud-migration", title: "Cloud Migration", tagline: "Move to the cloud safely and affordably.", img: "assets/img/svc-support.jpg",
        overview: "Plan and execute a smooth migration of your website, database or application to the cloud, with backup and rollback planning.",
        features: ["Migration planning", "Zero-downtime move", "Database migration", "Backup & rollback", "Performance tuning", "Cost optimisation"],
        includes: ["Assessment", "Migration plan", "Execution", "Testing", "Monitoring", "Support"],
        price: "Contact for pricing", delivery: "1-2 weeks" }
    ]
  },
  "ecommerce-solution": {
    type: "Service", title: "E-commerce Solution", icon: "cart", color: "cyan",
    img: "assets/img/svc-web.jpg",
    short: "Sell online with a complete, secure e-commerce store.",
    overview: "Full-featured online stores with product catalog, cart, checkout, payments, order tracking and an admin dashboard.",
    features: ["Product catalog", "Cart &amp; checkout", "Payment gateways", "Order tracking", "Coupons &amp; offers", "Admin dashboard"],
    includes: ["Store setup", "Product upload", "Payment setup", "Design", "Training", "Support"],
    items: [
      { slug: "online-store", title: "Online Store", tagline: "A complete store to sell your products online.", img: "assets/img/svc-web.jpg",
        overview: "A complete e-commerce store with product catalog, cart, secure checkout, online payments and order management.",
        features: ["Product catalog", "Cart & checkout", "bKash / Nagad / card", "Order tracking", "Coupons", "Sales dashboard"],
        includes: ["Store setup", "Product upload", "Payment setup", "Design", "Training", "Support"],
        price: "Contact for pricing", delivery: "2-4 weeks" },
      { slug: "multi-vendor-marketplace", title: "Multi-Vendor Marketplace", tagline: "Let many sellers sell on one platform.", img: "assets/img/svc-web.jpg",
        overview: "A marketplace where multiple vendors register, list products and manage orders, while you run the platform and take commission.",
        features: ["Vendor registration", "Vendor dashboards", "Commission management", "Payouts", "Order flow", "Admin control"],
        includes: ["Platform setup", "Vendor onboarding", "Payment setup", "Design", "Training", "Support"],
        price: "Contact for pricing", delivery: "4-8 weeks" }
    ]
  },
  "hr-payroll-management": {
    type: "Service", title: "HR & Payroll Management", icon: "users", color: "orange",
    img: "assets/img/svc-erp.jpg",
    short: "Automate HR operations and payroll processing.",
    overview: "Manage employees, attendance, leave, salary and payroll accurately &mdash; fully automated and compliant.",
    features: ["Employee records", "Attendance &amp; leave", "Automated payroll", "Salary sheets", "Tax &amp; compliance", "Self-service portal"],
    includes: ["Setup", "Data import", "Configuration", "Training", "Payroll runs", "Support"],
    items: [
      { slug: "hr-software", title: "HR Management Software", tagline: "All your employee records in one place.", img: "assets/img/prod-hr.jpg",
        overview: "Manage employee records, attendance, leave and documents with a clean HR dashboard your team will actually use.",
        features: ["Employee database", "Attendance tracking", "Leave management", "Document storage", "Self-service portal", "Reports"],
        includes: ["Setup", "Data import", "Configuration", "Training", "Go-live", "Support"],
        price: "Contact for pricing", delivery: "2-4 weeks" },
      { slug: "payroll-automation", title: "Payroll Automation", tagline: "Accurate salaries in minutes, every month.", img: "assets/img/prod-hr.jpg",
        overview: "Automate monthly salary, deductions, tax and payslip generation &mdash; accurate, compliant and audit-ready.",
        features: ["Automated payroll", "Tax & deductions", "Payslip generation", "Bank file export", "Compliance reports", "Audit history"],
        includes: ["Setup", "Rule configuration", "Data import", "Testing", "Payroll run", "Support"],
        price: "Contact for pricing", delivery: "1-3 weeks" }
    ]
  },
  "pos-retail-software": {
    type: "Service", title: "POS & Retail Software", icon: "pos", color: "purple",
    img: "assets/img/svc-software.jpg",
    short: "Fast point-of-sale for shops, supershops and retail chains.",
    overview: "A modern POS with barcode billing, stock, suppliers and multi-outlet reporting &mdash; built for speed at the counter.",
    features: ["Barcode billing", "Stock management", "Supplier records", "Multi-outlet", "Sales reports", "Loyalty support"],
    includes: ["Hardware setup", "Software install", "Product entry", "Staff training", "Go-live", "Support"],
    items: [
      { slug: "retail-pos", title: "Retail POS", tagline: "Fast billing for shops and supershops.", img: "assets/img/prod-erp.jpg",
        overview: "A fast, reliable point-of-sale for retail &mdash; barcode billing, stock control, supplier records and daily sales reports.",
        features: ["Barcode billing", "Stock management", "Supplier records", "Sales reports", "Cash & card", "Offline mode"],
        includes: ["Hardware setup", "Software install", "Product entry", "Staff training", "Go-live", "Support"],
        price: "Contact for pricing", delivery: "1-2 weeks" },
      { slug: "multi-outlet-pos", title: "Multi-Outlet POS", tagline: "Manage many branches from one place.", img: "assets/img/prod-erp.jpg",
        overview: "Run several outlets under one system with central stock, pricing and live sales reporting across all branches.",
        features: ["Central dashboard", "Stock transfer", "Per-outlet pricing", "Live sales reports", "User roles", "Consolidated reports"],
        includes: ["Setup", "Branch configuration", "Data import", "Training", "Go-live", "Support"],
        price: "Contact for pricing", delivery: "2-3 weeks" }
    ]
  },
  "school-management-system": {
    type: "Service", title: "School Management System", icon: "school", color: "green",
    img: "assets/img/svc-support.jpg",
    short: "Complete school management from admissions to results.",
    overview: "Manage admissions, attendance, exams, results, fees and parent communication in one secure platform.",
    features: ["Admissions", "Attendance", "Exams &amp; results", "Fees &amp; billing", "Parent portal", "Reports"],
    includes: ["Setup", "Data import", "Module config", "Training", "Go-live", "Support"],
    items: [
      { slug: "school-erp", title: "School ERP", tagline: "Run admissions, exams, fees and more.", img: "assets/img/prod-school.jpg",
        overview: "A complete school ERP covering admissions, attendance, exams, results, fees and parent communication in one secure platform.",
        features: ["Admissions", "Attendance", "Exams & results", "Fees & billing", "Parent portal", "SMS alerts"],
        includes: ["Setup", "Data import", "Module config", "Training", "Go-live", "Support"],
        price: "Contact for pricing", delivery: "3-6 weeks" },
      { slug: "college-university-erp", title: "College & University ERP", tagline: "For colleges, universities and institutes.", img: "assets/img/prod-school.jpg",
        overview: "An ERP built for colleges and universities &mdash; departments, semesters, credit, results, fees and student portals at scale.",
        features: ["Department & semester", "Credit & grading", "Results publication", "Fees & accounts", "Student & staff portal", "Reports"],
        includes: ["Setup", "Data import", "Module config", "Training", "Go-live", "Support"],
        price: "Contact for pricing", delivery: "4-8 weeks" }
    ]
  },
  "business-process-outsourcing": {
    type: "Service", title: "Business Process Outsourcing", icon: "cloud", color: "blue",
    img: "assets/img/svc-marketing.jpg",
    short: "Outsource your operations to a reliable, skilled team.",
    overview: "Reduce cost and focus on your core business while our team handles data entry, support and back-office operations.",
    features: ["Data entry &amp; processing", "Customer support", "Back-office tasks", "Quality assurance", "Scalable teams", "Cost savings"],
    includes: ["Requirement study", "Team setup", "Process documentation", "Training", "Delivery", "Reporting"],
    items: [
      { slug: "data-entry", title: "Data Entry & Processing", tagline: "Accurate, fast data handling at scale.", img: "assets/img/svc-marketing.jpg",
        overview: "Reliable data entry, cleaning and processing so your team can focus on higher-value work, with quality checks built in.",
        features: ["Data entry", "Data cleaning", "Document digitisation", "Quality checks", "Daily/weekly batches", "Reporting"],
        includes: ["Requirement study", "Team setup", "Process docs", "Training", "Delivery", "Reporting"],
        price: "Contact for pricing", delivery: "Ongoing" },
      { slug: "customer-support-outsourcing", title: "Customer Support Outsourcing", tagline: "Friendly support for your customers, 24/7.", img: "assets/img/svc-support.jpg",
        overview: "Outsource your helpdesk and customer support &mdash; phone, email and chat &mdash; to a trained, accountable team.",
        features: ["Phone support", "Email & chat", "Ticketing", "Multilingual option", "24/7 shifts", "Quality monitoring"],
        includes: ["Requirement study", "Team setup", "Scripts & flows", "Training", "Go-live", "Reporting"],
        price: "Contact for pricing", delivery: "Ongoing" }
    ]
  },
  "cyber-security": {
    type: "Service", title: "Cyber Security", icon: "shield", color: "cyan",
    img: "assets/img/svc-software.jpg",
    short: "Protect your business with enterprise-grade security.",
    overview: "Safeguard your data and systems with security audits, hardening, monitoring and incident response.",
    features: ["Security audit", "Penetration testing", "Firewall &amp; hardening", "Monitoring", "Backup &amp; recovery", "Compliance"],
    includes: ["Assessment", "Vulnerability scan", "Remediation", "Monitoring setup", "Reporting", "Support"],
    items: [
      { slug: "penetration-testing", title: "Penetration Testing", tagline: "Find weaknesses before attackers do.", img: "assets/img/svc-software.jpg",
        overview: "Ethical hacking and penetration testing of your website or application, with a clear report and prioritised fixes.",
        features: ["Web/app pen test", "Vulnerability report", "Risk rating", "Remediation guidance", "Re-test", "Certificate of testing"],
        includes: ["Scoping", "Testing", "Report", "Remediation help", "Re-test", "Support"],
        price: "Contact for pricing", delivery: "3-7 days" },
      { slug: "security-monitoring", title: "Security Monitoring & Backup", tagline: "Stay protected and always backed up.", img: "assets/img/svc-support.jpg",
        overview: "Continuous monitoring, firewall hardening and automated backups so your business keeps running and your data stays safe.",
        features: ["24/7 monitoring", "Firewall & hardening", "Automated backups", "Incident response", "Restore testing", "Reports"],
        includes: ["Assessment", "Monitoring setup", "Backup setup", "Hardening", "Testing", "Support"],
        price: "Contact for pricing", delivery: "Ongoing monthly" }
    ]
  },

  /* ---------------- PRODUCTS ---------------- */
  "sheba-erp": {
    type: "Product", title: "Sheba ERP", icon: "erp", color: "blue",
    img: "assets/img/prod-erp.jpg", tag: "Best ERP Software in Bangladesh",
    short: "All-in-one enterprise resource planning for growing businesses.",
    overview: "Sheba ERP unifies accounts, inventory, sales, purchase and HR into a single platform with real-time dashboards &mdash; so you always know how your business is doing.",
    features: ["Accounts &amp; finance", "Inventory management", "Sales &amp; purchase", "HR &amp; payroll module", "Real-time dashboards", "Multi-branch support"],
    price: "Contact for pricing"
  },
  "hr-sheba": {
    type: "Product", title: "HR Sheba", icon: "users", color: "orange",
    img: "assets/img/prod-hr.jpg", tag: "Best HR & Payroll Software",
    short: "Complete HR and payroll automation for your workforce.",
    overview: "HR Sheba handles employee records, attendance, leave, salary processing and compliance &mdash; saving your HR team hours every month.",
    features: ["Employee database", "Attendance &amp; leave", "Automated payroll", "Salary &amp; tax sheets", "Self-service portal", "Compliance reports"],
    price: "Contact for pricing"
  },
  "salesman": {
    type: "Product", title: "Salesman", icon: "pos", color: "purple",
    img: "assets/img/prod-sales.jpg", tag: "Best Sales & Distribution Software",
    short: "Manage your sales force and distribution efficiently.",
    overview: "Track orders, routes, dealers and targets with a powerful sales &amp; distribution system built for FMCG and retail distributors.",
    features: ["Order management", "Route &amp; dealer tracking", "Target management", "Stock &amp; delivery", "Sales reporting", "Mobile support"],
    price: "Contact for pricing"
  },
  "binyog": {
    type: "Product", title: "Binyog", icon: "erp", color: "green",
    img: "assets/img/prod-account.jpg", tag: "Best Accounting Software in Bangladesh",
    short: "Simple, accurate accounting for any business.",
    overview: "Binyog keeps your books accurate &mdash; ledgers, vouchers, VAT, and financial statements &mdash; with an easy interface your accountants will love.",
    features: ["Ledgers &amp; vouchers", "VAT &amp; tax", "Financial statements", "Multi-user", "Backup &amp; security", "Reports"],
    price: "Contact for pricing"
  },
  "smart-educare": {
    type: "Product", title: "Smart Educare", icon: "school", color: "cyan",
    img: "assets/img/prod-school.jpg", tag: "Best School Management System",
    short: "Modern school management from admissions to results.",
    overview: "Smart Educare manages admissions, attendance, exams, results, fees and parent communication &mdash; designed for schools, colleges and institutes.",
    features: ["Admissions", "Attendance", "Exams &amp; results", "Fees &amp; billing", "Parent portal", "SMS notifications"],
    price: "Contact for pricing"
  },
  "gym-master": {
    type: "Product", title: "Gym Master", icon: "users", color: "orange",
    img: "assets/img/prod-gym.jpg", tag: "Best Gym Management Software",
    short: "Manage memberships, billing and attendance with ease.",
    overview: "Gym Master handles member registration, packages, renewals, payments and attendance &mdash; keeping your gym running smoothly.",
    features: ["Member management", "Membership packages", "Payment &amp; billing", "Attendance tracking", "Renewal reminders", "Reports"],
    price: "Contact for pricing"
  },
  "crm-suite": {
    type: "Product", title: "CRM Suite", icon: "users", color: "purple",
    img: "assets/img/prod-crm.jpg", tag: "Best CRM Software in Bangladesh",
    short: "Manage leads, customers and your sales pipeline.",
    overview: "CRM Suite helps you capture leads, track deals, follow up automatically and understand your customers &mdash; all from one dashboard.",
    features: ["Lead management", "Sales pipeline", "Task &amp; follow-up", "Customer history", "Automation", "Analytics"],
    price: "Contact for pricing"
  },
  "asset-management": {
    type: "Product", title: "Asset Management System", icon: "shield", color: "blue",
    img: "assets/img/prod-asset.jpg", tag: "Best Asset Management System",
    short: "Track every asset across your organisation.",
    overview: "Know what you own, where it is and who has it &mdash; with maintenance schedules, depreciation and full audit trails.",
    features: ["Asset registry", "Assignment tracking", "Maintenance schedules", "Depreciation", "Barcode/QR", "Audit reports"],
    price: "Contact for pricing"
  },
  "remit-sheba": {
    type: "Product", title: "Remit Sheba", icon: "cloud", color: "green",
    img: "assets/img/prod-remit.jpg", tag: "Best Remittance Management System",
    short: "Secure remittance and money transfer management.",
    overview: "Remit Sheba manages senders, beneficiaries, exchange rates, transactions and compliance &mdash; built for remittance and exchange houses.",
    features: ["Sender &amp; beneficiary records", "Exchange rates", "Transaction management", "Compliance", "Agent/outlet support", "Reports"],
    price: "Contact for pricing"
  },
  "zentix-ai": {
    type: "Product", title: "Zentix AI", icon: "code", color: "purple",
    img: "assets/img/prod-zentix.jpg", tag: "AI Graphic Design &amp; Auto-Publishing Platform",
    short: "AI-powered design and automatic publishing.",
    overview: "Zentix AI generates professional graphics from prompts and auto-publishes them across your channels &mdash; design at scale, without a designer.",
    features: ["AI graphic generation", "Templates", "Auto-publishing", "Multi-channel", "Brand kit", "Analytics"],
    price: "Contact for pricing"
  },
  "filling-master": {
    type: "Product", title: "Filling Master", icon: "erp", color: "cyan",
    img: "assets/img/prod-account.jpg", tag: "Best Document Filling Software",
    short: "Prepare and manage official documents and forms.",
    overview: "Filling Master helps you fill, store and manage official documents and forms accurately, with templates and records.",
    features: ["Form templates", "Auto-fill", "Document storage", "Print &amp; export", "Records &amp; search", "Multi-user"],
    price: "Contact for pricing"
  },
  "pos-pro": {
    type: "Product", title: "POS Pro", icon: "pos", color: "orange",
    img: "assets/img/prod-erp.jpg", tag: "Best POS &amp; Retail Software",
    short: "Blazing-fast point-of-sale for retail businesses.",
    overview: "POS Pro delivers fast barcode billing, stock control, multi-outlet support and detailed sales reporting &mdash; built for busy shops.",
    features: ["Barcode billing", "Stock control", "Multi-outlet", "Sales reports", "Loyalty", "Offline mode"],
    price: "Contact for pricing"
  }
};
