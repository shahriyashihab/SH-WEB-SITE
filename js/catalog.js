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
    includes: ["Requirement analysis", "UI/UX design", "Development &amp; testing", "Deployment", "Training", "Support"]
  },
  "custom-software-development": {
    type: "Service", title: "Custom Software Development", icon: "code", color: "cyan",
    img: "assets/img/svc-software.jpg",
    short: "Tailor-made software built exactly for your business workflows.",
    overview: "We build custom software from the ground up &mdash; ERP, booking systems, CRM and internal tools &mdash; designed around how your business actually works.",
    features: ["Custom workflows", "Role-based access", "Reporting &amp; analytics", "API integration", "Scalable architecture", "Full source ownership"],
    includes: ["Discovery &amp; planning", "System architecture", "Agile development", "QA &amp; security", "Deployment", "Post-launch support"]
  },
  "mobile-apps-development": {
    type: "Service", title: "Mobile Apps Development", icon: "phone", color: "orange",
    img: "assets/img/svc-mobile.jpg",
    short: "Android & iOS apps that your customers will love to use.",
    overview: "Native and cross-platform mobile apps built for performance and great user experience &mdash; from idea to app store.",
    features: ["Android &amp; iOS", "Cross-platform (Flutter)", "Push notifications", "Offline support", "Payment integration", "App store deployment"],
    includes: ["UI/UX design", "App development", "API integration", "Testing", "Store submission", "Maintenance"]
  },
  "erp-crm-solutions": {
    type: "Service", title: "ERP & CRM Solutions", icon: "erp", color: "purple",
    img: "assets/img/svc-erp.jpg",
    short: "Enterprise resource planning and customer relationship management.",
    overview: "Bring your operations under one platform &mdash; inventory, accounts, HR, sales and customers &mdash; with real-time dashboards and reporting.",
    features: ["Inventory &amp; accounts", "Sales &amp; purchase", "HR &amp; payroll module", "Customer management", "Real-time reports", "Multi-branch support"],
    includes: ["Business analysis", "System setup", "Data migration", "Customization", "Staff training", "Ongoing support"]
  },
  "digital-marketing": {
    type: "Service", title: "Digital Marketing", icon: "cloud", color: "green",
    img: "assets/img/svc-marketing.jpg",
    short: "Grow your reach with SEO, social media and paid campaigns.",
    overview: "Data-driven digital marketing that brings real traffic and conversions &mdash; SEO, social media, content and paid advertising.",
    features: ["Search engine optimization", "Social media marketing", "Content strategy", "Paid ads management", "Analytics &amp; reporting", "Conversion optimization"],
    includes: ["Audit &amp; strategy", "Keyword research", "Campaign setup", "Content creation", "Monitoring", "Monthly reports"]
  },
  "it-support-consultancy": {
    type: "Service", title: "IT Support & Consultancy", icon: "shield", color: "blue",
    img: "assets/img/svc-support.jpg",
    short: "Reliable IT support and expert technology consultancy.",
    overview: "Keep your systems running and plan your technology roadmap with expert guidance and dependable support.",
    features: ["24/7 technical support", "Infrastructure consulting", "Security audits", "Cloud migration", "Backup &amp; recovery", "IT strategy"],
    includes: ["Assessment", "Recommendations", "Implementation", "Monitoring", "Maintenance", "Reports"]
  },
  "ecommerce-solution": {
    type: "Service", title: "E-commerce Solution", icon: "cart", color: "cyan",
    img: "assets/img/svc-web.jpg",
    short: "Sell online with a complete, secure e-commerce store.",
    overview: "Full-featured online stores with product catalog, cart, checkout, payments, order tracking and an admin dashboard.",
    features: ["Product catalog", "Cart &amp; checkout", "Payment gateways", "Order tracking", "Coupons &amp; offers", "Admin dashboard"],
    includes: ["Store setup", "Product upload", "Payment setup", "Design", "Training", "Support"]
  },
  "hr-payroll-management": {
    type: "Service", title: "HR & Payroll Management", icon: "users", color: "orange",
    img: "assets/img/svc-erp.jpg",
    short: "Automate HR operations and payroll processing.",
    overview: "Manage employees, attendance, leave, salary and payroll accurately &mdash; fully automated and compliant.",
    features: ["Employee records", "Attendance &amp; leave", "Automated payroll", "Salary sheets", "Tax &amp; compliance", "Self-service portal"],
    includes: ["Setup", "Data import", "Configuration", "Training", "Payroll runs", "Support"]
  },
  "pos-retail-software": {
    type: "Service", title: "POS & Retail Software", icon: "pos", color: "purple",
    img: "assets/img/svc-software.jpg",
    short: "Fast point-of-sale for shops, supershops and retail chains.",
    overview: "A modern POS with barcode billing, stock, suppliers and multi-outlet reporting &mdash; built for speed at the counter.",
    features: ["Barcode billing", "Stock management", "Supplier records", "Multi-outlet", "Sales reports", "Loyalty support"],
    includes: ["Hardware setup", "Software install", "Product entry", "Staff training", "Go-live", "Support"]
  },
  "school-management-system": {
    type: "Service", title: "School Management System", icon: "school", color: "green",
    img: "assets/img/svc-support.jpg",
    short: "Complete school management from admissions to results.",
    overview: "Manage admissions, attendance, exams, results, fees and parent communication in one secure platform.",
    features: ["Admissions", "Attendance", "Exams &amp; results", "Fees &amp; billing", "Parent portal", "Reports"],
    includes: ["Setup", "Data import", "Module config", "Training", "Go-live", "Support"]
  },
  "business-process-outsourcing": {
    type: "Service", title: "Business Process Outsourcing", icon: "cloud", color: "blue",
    img: "assets/img/svc-marketing.jpg",
    short: "Outsource your operations to a reliable, skilled team.",
    overview: "Reduce cost and focus on your core business while our team handles data entry, support and back-office operations.",
    features: ["Data entry &amp; processing", "Customer support", "Back-office tasks", "Quality assurance", "Scalable teams", "Cost savings"],
    includes: ["Requirement study", "Team setup", "Process documentation", "Training", "Delivery", "Reporting"]
  },
  "cyber-security": {
    type: "Service", title: "Cyber Security", icon: "shield", color: "cyan",
    img: "assets/img/svc-software.jpg",
    short: "Protect your business with enterprise-grade security.",
    overview: "Safeguard your data and systems with security audits, hardening, monitoring and incident response.",
    features: ["Security audit", "Penetration testing", "Firewall &amp; hardening", "Monitoring", "Backup &amp; recovery", "Compliance"],
    includes: ["Assessment", "Vulnerability scan", "Remediation", "Monitoring setup", "Reporting", "Support"]
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
