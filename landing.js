/* ====================================
   O.R.C.A — Application Logic
   Dark/Light mode, i18n, Auth, Animations
   ==================================== */

'use strict';

// ── Translations ──────────────────────────────────────────────
const translations = {
  en: {
    ksp_full: 'Organised Crime Analysis Authority',
    scrb: 'State Crime Records Bureau',
    auth_title: 'Secure Access Portal',
    auth_subtitle: 'Authorised personnel only — Government of Karnataka',
    login: 'Login',
    signup: 'Sign Up',
    officer_id: 'Officer ID / Badge Number',
    password: 'Password',
    remember: 'Remember this device',
    forgot: 'Forgot Password?',
    login_btn: 'Login to Portal',
    or_continue: 'or continue with',
    demo_access: 'Demo Access',
    first_name: 'First Name',
    last_name: 'Last Name',
    badge_no: 'Badge / Officer ID',
    rank: 'Rank & Designation',
    select_rank: 'Select Rank',
    station: 'Police Station / Unit',
    gov_email: 'Government Email',
    create_password: 'Create Password',
    agree_terms: 'I agree to the Official Secrets Act obligations and O.R.C.A data policy',
    request_access: 'Request Access',
    approval_note: '⚠️ Account requires approval from your Station House Officer (SHO) before activation.',
    legal_note: 'This system is for authorised Organised Crime Analysis Authority personnel only. Unauthorised access is a punishable offence under IT Act 2000 & IPC.',
    nav_tagline: 'State Crime Records Bureau',
    nav_features: 'Features',
    nav_how: 'How It Works',
    nav_security: 'Security',
    nav_stats: 'Statistics',
    nav_contact: 'Contact',
    nav_login: 'Login',
    hero_badge: 'Government of Karnataka · Challenge 01',
    hero_title_1: 'Intelligent Conversational AI',
    hero_title_2: 'for O.R.C.A Crime Database',
    hero_desc: "Empowering Karnataka's 1100+ police stations with natural language crime intelligence, predictive analytics, and real-time insights — in English, Hindi & Kannada.",
    access_portal: 'Access Portal',
    explore: 'Explore Features',
    police_stations: 'Police Stations',
    languages: 'Languages',
    uptime: 'Uptime SLA',
    powered: 'Powered',
    ai_assistant: 'O.R.C.A AI Assistant',
    demo_q1: '"Show crime hotspots in Bengaluru for Q3 2024"',
    demo_a1: '🗺️ Analysing 847 cases across 32 zones... Highest density: Whitefield (+23%), Shivajinagar (+18%)',
    demo_q2: '"ಬೆಂಗಳೂರಿನಲ್ಲಿ ಅಪರಾಧ ಮಾದರಿ ತೋರಿಸಿ"',
    demo_a2: '📊 ಕನ್ನಡ ಭಾಷೆಯಲ್ಲಿ ಉತ್ತರಿಸುತ್ತಿದ್ದೇನೆ... 3 ಪ್ರಮುಖ ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ಅಧಿಕ ಅಪರಾಧ ಪ್ರಕರಣಗಳು ಕಂಡುಬಂದಿವೆ.',
    ask_anything: 'Ask anything in English, Hindi or Kannada...',
    problem_statement: 'Problem Statement',
    challenge_text: 'The State Crime Records Bureau (SCRB) manages a large and continuously expanding repository of crime-related data from 1100+ police stations across Karnataka. Current systems rely on static dashboards and manual queries, limiting deep analysis and real-time insights.',
    the_challenge: 'The Challenge',
    challenge_desc: 'Build an intelligent conversational AI platform enabling investigators to query crime data using natural language and uncover patterns, relationships, and predictive insights.',
    tag1: 'Crime Pattern Discovery', tag2: 'Criminal Network Analysis',
    tag3: 'Socio-demographic Insights', tag4: 'Behavioral Profiling',
    tag5: 'Proactive Crime Prevention',
    key_features_title: 'Key Features',
    f1: 'Natural language chatbot (English + Kannada + Hindi)',
    f2: 'Voice-enabled interaction', f3: 'Context-aware conversations',
    f4: 'PDF export of conversation history', f5: 'Criminal network visualization',
    f6: 'Crime trend & hotspot detection', f7: 'Predictive analytics & early warnings',
    f8: 'Explainable AI with audit trails', f9: 'Role-based secure access',
    capabilities: 'Core Capabilities',
    features_title: 'Everything You Need to Fight Crime Intelligently',
    features_subtitle: 'Built for Karnataka Police officers — from constables to senior IPS officers',
    feat1_title: 'Natural Language Queries',
    feat1_desc: 'Ask questions in plain English, Hindi, or Kannada. No SQL or complex filters needed. The AI understands police terminology and local context.',
    feat2_title: 'Crime Hotspot Detection',
    feat2_desc: 'Real-time geospatial analysis identifies emerging hotspots across districts, taluks, and police station jurisdictions with predictive alerts.',
    feat3_title: 'Criminal Network Analysis',
    feat3_desc: 'Visualise connections between suspects, associates, and criminal organisations. Uncover hidden links across multiple cases and districts.',
    feat4_title: 'Predictive Intelligence',
    feat4_desc: 'ML-powered predictions on crime occurrence, recidivism likelihood, and seasonal trends to proactively deploy resources.',
    feat5_title: 'Role-Based Access Control',
    feat5_desc: 'Strict access tiers from constable to DGP. Officers see only data within their jurisdiction. Full audit trail for every query.',
    feat6_title: 'Smart Reports & Export',
    feat6_desc: 'Auto-generate formatted investigation reports, statistical summaries, and court-ready documents with one click. PDF & Excel export.',
    feat7_title: 'Voice-Enabled Queries',
    feat7_desc: 'Speak your queries in Kannada, Hindi, or English. Ideal for field officers using mobile devices during active operations.',
    feat8_title: 'Real-Time SCRB Sync',
    feat8_desc: 'Live connection to SCRB databases. Data is updated as FIRs are registered across all 1100+ police stations in Karnataka.',
    feat9_title: 'Explainable AI (XAI)',
    feat9_desc: 'Every AI conclusion comes with a transparent reasoning chain. Officers can understand why a pattern was flagged, ensuring accountability.',
    process: 'Process',
    how_title: 'How O.R.C.A Works',
    how_subtitle: 'A seamless, secure pipeline from query to actionable intelligence',
    step1_title: 'Officer Submits Query',
    step1_desc: 'Login with your O.R.C.A credentials. Type or speak your question in any of the 3 supported languages. The system verifies your role and jurisdiction automatically.',
    step2_title: 'AI Processes & Analyses',
    step2_desc: 'The NLP engine translates natural language to structured queries. Machine learning models run pattern detection, network analysis, and predictive algorithms on SCRB data.',
    step3_title: 'Insights Delivered',
    step3_desc: 'Results are displayed as interactive charts, maps, network graphs, and plain-language summaries. Export as PDF, share with team, or escalate for action.',
    impact: 'Impact',
    stats_title: 'Karnataka Policing at Scale',
    stat1: 'Police Stations Covered', stat2: 'Annual FIR Records',
    stat3: 'Police Personnel', stat4: 'Avg. Query Response Time',
    stat5: 'Districts & Zones', stat6: 'Query Accuracy Rate',
    security_label: 'Security & Compliance',
    security_title: 'Built for Government-Grade Security',
    security_desc: 'Every layer of O.R.C.A is designed around the highest standards of data protection, access control, and legal compliance.',
    sec1_title: 'End-to-End Encryption', sec1_desc: 'AES-256 encryption at rest and TLS 1.3 in transit for all sensitive crime data.',
    sec2_title: 'Complete Audit Trails', sec2_desc: 'Every query, access, and export is logged with officer ID, timestamp, and IP for full accountability.',
    sec3_title: 'IT Act & MHA Compliant', sec3_desc: 'Fully compliant with IT Act 2000, MHA data guidelines, and Karnataka police regulations.',
    sec4_title: 'MeitY Cloud Hosting', sec4_desc: 'Hosted on government-approved MeitY cloud infrastructure within Indian data centres.',
    roadmap: 'Roadmap Suggestions',
    suggestions_title: 'What More Can This Platform Include?',
    suggestions_subtitle: "Proposed enhancements to further strengthen Karnataka's crime intelligence capabilities",
    sug1_title: 'Interactive GIS Crime Maps', sug1_desc: 'Layered geospatial maps showing crime density, patrol routes, and incident clustering with district-level drill-down capabilities.',
    sug2_title: 'Mobile Officer App', sug2_desc: 'Dedicated Android/iOS app for field officers to query the database, report incidents, and receive real-time alerts on patrol.',
    sug3_title: 'Inter-State Data Sharing', sug3_desc: 'Secure API integration with NCRB and neighbouring state police databases for cross-border criminal tracking and fugitive alerts.',
    sug4_title: 'Facial Recognition Integration', sug4_desc: 'CCTV footage analysis with AI-powered facial recognition matched against criminal databases, with strict privacy guardrails.',
    sug5_title: 'Social Media Monitoring', sug5_desc: 'AI-powered monitoring of public social media for threat indicators, misinformation, and organised crime communication patterns.',
    sug6_title: 'Court Case Tracker', sug6_desc: 'Integration with e-Courts to track case progress, conviction rates by crime type, and identify investigation gaps impacting prosecution.',
    sug7_title: 'Proactive Alert System', sug7_desc: 'Automated SMS/email alerts to SHOs when crime thresholds are crossed in their jurisdiction, with suggested preventive actions.',
    sug8_title: 'Witness & Victim Portal', sug8_desc: 'Secure, anonymous tip submission portal for citizens to report crimes, with AI triage and automatic case linkage.',
    sug9_title: 'Executive Dashboard', sug9_desc: 'High-level strategic dashboard for DGP and senior officers showing statewide trends, resource allocation recommendations, and KPI tracking.',
    contact_label: 'Get in Touch', contact_title: 'Contact & Support',
    helpdesk: 'Technical Helpdesk', helpdesk_hours: 'Mon–Sat, 8 AM – 8 PM',
    email_support: 'Email Support', response_time: 'Response within 24 hours',
    nodal_officer: 'Nodal Officer',
    footer_desc: 'An initiative of Organised Crime Analysis Authority & State Crime Records Bureau under the Government of Karnataka.',
    quick_links: 'Quick Links', legal: 'Legal', related: 'Related Portals',
    privacy_policy: 'Privacy Policy', terms_of_use: 'Terms of Use',
    accessibility: 'Accessibility', rti: 'RTI',
    copyright: '© 2024 Organised Crime Analysis Authority. All rights reserved. | IT Act 2000 Protected System',
    digital_india: 'Digital India', secure_portal: 'Secure Portal',
  },
  hi: {
    ksp_full: 'कर्नाटक राज्य पुलिस',
    scrb: 'राज्य अपराध अभिलेख ब्यूरो',
    auth_title: 'सुरक्षित प्रवेश पोर्टल',
    auth_subtitle: 'केवल अधिकृत कार्मिक — कर्नाटक सरकार',
    login: 'लॉगिन',
    signup: 'पंजीकरण',
    officer_id: 'अधिकारी ID / बैज नंबर',
    password: 'पासवर्ड',
    remember: 'इस डिवाइस को याद रखें',
    forgot: 'पासवर्ड भूल गए?',
    login_btn: 'पोर्टल में लॉगिन करें',
    or_continue: 'या इसके साथ जारी रखें',
    demo_access: 'डेमो एक्सेस',
    first_name: 'पहला नाम',
    last_name: 'अंतिम नाम',
    badge_no: 'बैज / अधिकारी ID',
    rank: 'पद एवं पदनाम',
    select_rank: 'पद चुनें',
    station: 'पुलिस स्टेशन / यूनिट',
    gov_email: 'सरकारी ईमेल',
    create_password: 'पासवर्ड बनाएं',
    agree_terms: 'मैं आधिकारिक गोपनीयता अधिनियम और O.R.C.A डेटा नीति से सहमत हूं',
    request_access: 'एक्सेस के लिए अनुरोध करें',
    approval_note: '⚠️ खाते को SHO की स्वीकृति के बाद ही सक्रिय किया जाएगा।',
    legal_note: 'यह प्रणाली केवल अधिकृत कर्नाटक पुलिस कार्मिकों के लिए है। अनधिकृत पहुंच IT अधिनियम 2000 के तहत दंडनीय अपराध है।',
    nav_tagline: 'राज्य अपराध अभिलेख ब्यूरो',
    nav_features: 'विशेषताएं',
    nav_how: 'यह कैसे काम करता है',
    nav_security: 'सुरक्षा',
    nav_stats: 'आंकड़े',
    nav_contact: 'संपर्क',
    nav_login: 'लॉगिन',
    hero_badge: 'कर्नाटक सरकार · चैलेंज 01',
    hero_title_1: 'बुद्धिमान संवादी AI',
    hero_title_2: 'O.R.C.A अपराध डेटाबेस के लिए',
    hero_desc: 'कर्नाटक के 1100+ पुलिस स्टेशनों को प्राकृतिक भाषा अपराध बुद्धिमत्ता, पूर्वानुमान विश्लेषण और वास्तविक समय जानकारी के साथ सशक्त बनाना।',
    access_portal: 'पोर्टल एक्सेस करें',
    explore: 'विशेषताएं देखें',
    police_stations: 'पुलिस स्टेशन',
    languages: 'भाषाएं',
    uptime: 'अपटाइम SLA',
    powered: 'AI संचालित',
    ai_assistant: 'O.R.C.A AI सहायक',
    demo_q1: '"बेंगलूरु में Q3 2024 के अपराध हॉटस्पॉट दिखाएं"',
    demo_a1: '🗺️ 32 क्षेत्रों में 847 मामलों का विश्लेषण... सबसे अधिक: व्हाइटफील्ड (+23%), शिवाजीनगर (+18%)',
    demo_q2: '"ಬೆಂಗಳೂರಿನಲ್ಲಿ ಅಪರಾಧ ಮಾದರಿ ತೋರಿಸಿ"',
    demo_a2: '📊 कन्नड़ में उत्तर दे रहा हूं... 3 प्रमुख क्षेत्रों में अधिक अपराध पाए गए।',
    ask_anything: 'अंग्रेजी, हिंदी या कन्नड़ में कुछ भी पूछें...',
    problem_statement: 'समस्या विवरण',
    challenge_text: 'राज्य अपराध अभिलेख ब्यूरो (SCRB) कर्नाटक के 1100+ पुलिस स्टेशनों से अपराध-संबंधित डेटा का एक बड़ा भंडार प्रबंधित करता है। वर्तमान प्रणाली स्थिर डैशबोर्ड और मैन्युअल प्रश्नों पर निर्भर है।',
    the_challenge: 'चुनौती',
    challenge_desc: 'एक बुद्धिमान संवादी AI प्लेटफॉर्म बनाएं जो अन्वेषकों को प्राकृतिक भाषा में अपराध डेटा क्वेरी करने और पैटर्न उजागर करने में सक्षम बनाए।',
    tag1: 'अपराध पैटर्न खोज', tag2: 'आपराधिक नेटवर्क विश्लेषण',
    tag3: 'सामाजिक-जनसांख्यिकीय अंतर्दृष्टि', tag4: 'व्यवहार प्रोफाइलिंग',
    tag5: 'सक्रिय अपराध रोकथाम',
    key_features_title: 'मुख्य विशेषताएं',
    f1: 'प्राकृतिक भाषा चैटबॉट (अंग्रेजी + कन्नड़ + हिंदी)',
    f2: 'वॉयस-सक्षम इंटरैक्शन', f3: 'संदर्भ-जागरूक बातचीत',
    f4: 'PDF निर्यात', f5: 'आपराधिक नेटवर्क विज़ुअलाइज़ेशन',
    f6: 'अपराध ट्रेंड और हॉटस्पॉट पहचान', f7: 'पूर्वानुमान विश्लेषण',
    f8: 'ऑडिट ट्रेल के साथ XAI', f9: 'भूमिका-आधारित सुरक्षित एक्सेस',
    capabilities: 'मुख्य क्षमताएं',
    features_title: 'अपराध से स्मार्ट तरीके से लड़ने के लिए सब कुछ',
    features_subtitle: 'कर्नाटक पुलिस अधिकारियों के लिए — कांस्टेबल से IPS अधिकारी तक',
    feat1_title: 'प्राकृतिक भाषा प्रश्न',
    feat1_desc: 'सरल हिंदी, अंग्रेजी या कन्नड़ में प्रश्न पूछें। SQL या जटिल फिल्टर की जरूरत नहीं।',
    feat2_title: 'अपराध हॉटस्पॉट पहचान',
    feat2_desc: 'रीयल-टाइम भू-स्थानिक विश्लेषण जिलों, तालुकों में उभरते हॉटस्पॉट की पहचान करता है।',
    feat3_title: 'आपराधिक नेटवर्क विश्लेषण',
    feat3_desc: 'संदिग्धों और आपराधिक संगठनों के बीच संबंधों को देखें।',
    feat4_title: 'पूर्वानुमान बुद्धिमत्ता',
    feat4_desc: 'ML-आधारित अपराध घटना, पुनरावृत्ति और मौसमी रुझानों की भविष्यवाणी।',
    feat5_title: 'भूमिका-आधारित एक्सेस नियंत्रण',
    feat5_desc: 'कांस्टेबल से DGP तक सख्त एक्सेस टियर। अधिकारी केवल अपने क्षेत्राधिकार का डेटा देखते हैं।',
    feat6_title: 'स्मार्ट रिपोर्ट और निर्यात',
    feat6_desc: 'एक क्लिक से फॉर्मेटेड जांच रिपोर्ट, सांख्यिकीय सारांश तैयार करें।',
    feat7_title: 'वॉयस-सक्षम प्रश्न',
    feat7_desc: 'फील्ड अधिकारियों के लिए कन्नड़, हिंदी या अंग्रेजी में बोलकर प्रश्न करें।',
    feat8_title: 'रीयल-टाइम SCRB सिंक',
    feat8_desc: 'SCRB डेटाबेस से लाइव कनेक्शन। FIR दर्ज होते ही डेटा अपडेट होता है।',
    feat9_title: 'व्याख्यात्मक AI (XAI)',
    feat9_desc: 'हर AI निष्कर्ष पारदर्शी तर्क श्रृंखला के साथ आता है।',
    process: 'प्रक्रिया',
    how_title: 'O.R.C.A कैसे काम करता है',
    how_subtitle: 'प्रश्न से कार्यवाही योग्य बुद्धिमत्ता तक एक सहज, सुरक्षित पाइपलाइन',
    step1_title: 'अधिकारी प्रश्न करता है',
    step1_desc: 'O.R.C.A क्रेडेंशियल से लॉगिन करें। 3 समर्थित भाषाओं में टाइप करें या बोलें।',
    step2_title: 'AI प्रक्रिया और विश्लेषण',
    step2_desc: 'NLP इंजन प्राकृतिक भाषा को संरचित प्रश्नों में बदलता है। ML मॉडल SCRB डेटा पर चलते हैं।',
    step3_title: 'अंतर्दृष्टि प्रदान की गई',
    step3_desc: 'परिणाम इंटरैक्टिव चार्ट, मानचित्र और सादे-भाषा सारांश के रूप में दिखाए जाते हैं।',
    impact: 'प्रभाव',
    stats_title: 'बड़े पैमाने पर कर्नाटक पुलिसिंग',
    stat1: 'पुलिस स्टेशन कवर', stat2: 'वार्षिक FIR रिकॉर्ड',
    stat3: 'पुलिस कार्मिक', stat4: 'औसत प्रश्न प्रतिक्रिया समय',
    stat5: 'जिले और क्षेत्र', stat6: 'प्रश्न सटीकता दर',
    security_label: 'सुरक्षा और अनुपालन',
    security_title: 'सरकारी-ग्रेड सुरक्षा के लिए निर्मित',
    security_desc: 'O.R.C.A की हर परत डेटा सुरक्षा, एक्सेस नियंत्रण और कानूनी अनुपालन के उच्चतम मानकों के आसपास डिज़ाइन की गई है।',
    sec1_title: 'एंड-टू-एंड एन्क्रिप्शन', sec1_desc: 'सभी संवेदनशील अपराध डेटा के लिए AES-256 एन्क्रिप्शन।',
    sec2_title: 'पूर्ण ऑडिट ट्रेल', sec2_desc: 'हर प्रश्न, एक्सेस और निर्यात अधिकारी ID और टाइमस्टैम्प के साथ लॉग किया जाता है।',
    sec3_title: 'IT अधिनियम और MHA अनुपालन', sec3_desc: 'IT अधिनियम 2000 और MHA दिशानिर्देशों का पूर्ण अनुपालन।',
    sec4_title: 'MeitY क्लाउड होस्टिंग', sec4_desc: 'भारत के डेटा केंद्रों में सरकार-स्वीकृत MeitY क्लाउड पर होस्ट किया गया।',
    roadmap: 'रोडमैप सुझाव',
    suggestions_title: 'इस प्लेटफॉर्म में और क्या हो सकता है?',
    suggestions_subtitle: 'कर्नाटक की अपराध बुद्धिमत्ता क्षमताओं को मजबूत करने के लिए प्रस्तावित संवर्द्धन',
    sug1_title: 'इंटरैक्टिव GIS अपराध मानचित्र',
    sug1_desc: 'जिला-स्तरीय ड्रिल-डाउन क्षमताओं के साथ अपराध घनत्व दिखाने वाले स्तरित भू-स्थानिक मानचित्र।',
    sug2_title: 'मोबाइल अधिकारी ऐप',
    sug2_desc: 'फील्ड अधिकारियों के लिए समर्पित Android/iOS ऐप।',
    sug3_title: 'अंतर-राज्य डेटा साझाकरण',
    sug3_desc: 'NCRB के साथ सुरक्षित API एकीकरण और सीमा पार आपराधिक ट्रैकिंग।',
    sug4_title: 'चेहरा पहचान एकीकरण',
    sug4_desc: 'CCTV फुटेज विश्लेषण के साथ AI-संचालित चेहरा पहचान।',
    sug5_title: 'सोशल मीडिया निगरानी',
    sug5_desc: 'खतरे के संकेतकों और संगठित अपराध के लिए AI-संचालित सार्वजनिक सोशल मीडिया निगरानी।',
    sug6_title: 'न्यायालय मामला ट्रैकर',
    sug6_desc: 'मामले की प्रगति, दोषसिद्धि दर और जांच अंतराल की पहचान के लिए e-Courts के साथ एकीकरण।',
    sug7_title: 'सक्रिय अलर्ट सिस्टम',
    sug7_desc: 'अपराध सीमा पार होने पर SHOs को स्वचालित SMS/ईमेल अलर्ट।',
    sug8_title: 'साक्षी और पीड़ित पोर्टल',
    sug8_desc: 'नागरिकों के लिए अपराध रिपोर्ट करने के लिए सुरक्षित, गुमनाम टिप सबमिशन पोर्टल।',
    sug9_title: 'कार्यकारी डैशबोर्ड',
    sug9_desc: 'DGP और वरिष्ठ अधिकारियों के लिए उच्च-स्तरीय रणनीतिक डैशबोर्ड।',
    contact_label: 'संपर्क करें', contact_title: 'संपर्क और सहायता',
    helpdesk: 'तकनीकी हेल्पडेस्क', helpdesk_hours: 'सोम–शनि, सुबह 8 – शाम 8',
    email_support: 'ईमेल सहायता', response_time: '24 घंटे में प्रतिक्रिया',
    nodal_officer: 'नोडल अधिकारी',
    footer_desc: 'कर्नाटक सरकार के अंतर्गत कर्नाटक राज्य पुलिस और SCRB की एक पहल।',
    quick_links: 'त्वरित लिंक', legal: 'कानूनी', related: 'संबंधित पोर्टल',
    privacy_policy: 'गोपनीयता नीति', terms_of_use: 'उपयोग की शर्तें',
    accessibility: 'अभिगम्यता', rti: 'RTI',
    copyright: '© 2024 कर्नाटक राज्य पुलिस। सर्वाधिकार सुरक्षित।',
    digital_india: 'डिजिटल इंडिया', secure_portal: 'सुरक्षित पोर्टल',
  },
  kn: {
    ksp_full: 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್',
    scrb: 'ರಾಜ್ಯ ಅಪರಾಧ ದಾಖಲೆ ಬ್ಯೂರೋ',
    auth_title: 'ಸುರಕ್ಷಿತ ಪ್ರವೇಶ ಪೋರ್ಟಲ್',
    auth_subtitle: 'ಅಧಿಕೃತ ಸಿಬ್ಬಂದಿ ಮಾತ್ರ — ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
    login: 'ಲಾಗಿನ್',
    signup: 'ನೋಂದಣಿ',
    officer_id: 'ಅಧಿಕಾರಿ ID / ಬ್ಯಾಡ್ಜ್ ಸಂಖ್ಯೆ',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    remember: 'ಈ ಸಾಧನವನ್ನು ನೆನಪಿಡಿ',
    forgot: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ?',
    login_btn: 'ಪೋರ್ಟಲ್‌ಗೆ ಲಾಗಿನ್ ಮಾಡಿ',
    or_continue: 'ಅಥವಾ ಮುಂದುವರಿಸಿ',
    demo_access: 'ಡೆಮೋ ಪ್ರವೇಶ',
    first_name: 'ಮೊದಲ ಹೆಸರು',
    last_name: 'ಕೊನೆಯ ಹೆಸರು',
    badge_no: 'ಬ್ಯಾಡ್ಜ್ / ಅಧಿಕಾರಿ ID',
    rank: 'ಹುದ್ದೆ ಮತ್ತು ಪದನಾಮ',
    select_rank: 'ಹುದ್ದೆ ಆಯ್ಕೆ ಮಾಡಿ',
    station: 'ಪೊಲೀಸ್ ಠಾಣೆ / ಘಟಕ',
    gov_email: 'ಸರ್ಕಾರಿ ಇಮೇಲ್',
    create_password: 'ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ',
    agree_terms: 'ನಾನು ಅಧಿಕೃತ ರಹಸ್ಯ ಕಾಯ್ದೆ ಮತ್ತು O.R.C.A ಡೇಟಾ ನೀತಿಗೆ ಒಪ್ಪಿಗೆ ನೀಡುತ್ತೇನೆ',
    request_access: 'ಪ್ರವೇಶಕ್ಕಾಗಿ ವಿನಂತಿ ಮಾಡಿ',
    approval_note: '⚠️ ಖಾತೆಯನ್ನು ನಿಮ್ಮ SHO ಅನುಮೋದನೆ ನಂತರ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗುತ್ತದೆ.',
    legal_note: 'ಈ ವ್ಯವಸ್ಥೆ ಅಧಿಕೃತ ಕರ್ನಾಟಕ ಪೊಲೀಸ್ ಸಿಬ್ಬಂದಿಗಾಗಿ ಮಾತ್ರ. ಅನಧಿಕೃತ ಪ್ರವೇಶ ಐಟಿ ಕಾಯ್ದೆ 2000 ಅಡಿಯಲ್ಲಿ ಶಿಕ್ಷಾರ್ಹ ಅಪರಾಧ.',
    nav_tagline: 'ರಾಜ್ಯ ಅಪರಾಧ ದಾಖಲೆ ಬ್ಯೂರೋ',
    nav_features: 'ವೈಶಿಷ್ಟ್ಯಗಳು',
    nav_how: 'ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    nav_security: 'ಭದ್ರತೆ',
    nav_stats: 'ಅಂಕಿಅಂಶಗಳು',
    nav_contact: 'ಸಂಪರ್ಕಿಸಿ',
    nav_login: 'ಲಾಗಿನ್',
    hero_badge: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರ · ಸವಾಲು 01',
    hero_title_1: 'ಬುದ್ಧಿವಂತ ಸಂವಾದಾತ್ಮಕ AI',
    hero_title_2: 'O.R.C.A ಅಪರಾಧ ಡೇಟಾಬೇಸ್‌ಗಾಗಿ',
    hero_desc: 'ಕರ್ನಾಟಕದ 1100+ ಪೊಲೀಸ್ ಠಾಣೆಗಳಿಗೆ ನೈಸರ್ಗಿಕ ಭಾಷಾ ಅಪರಾಧ ಬುದ್ಧಿಮತ್ತೆ, ಮುನ್ಸೂಚನಾ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ನೈಜ-ಸಮಯ ಒಳನೋಟಗಳೊಂದಿಗೆ ಸಶಕ್ತಗೊಳಿಸುವುದು.',
    access_portal: 'ಪೋರ್ಟಲ್ ಪ್ರವೇಶ',
    explore: 'ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    police_stations: 'ಪೊಲೀಸ್ ಠಾಣೆಗಳು',
    languages: 'ಭಾಷೆಗಳು',
    uptime: 'ಅಪ್‌ಟೈಮ್ SLA',
    powered: 'AI ಚಾಲಿತ',
    ai_assistant: 'O.R.C.A AI ಸಹಾಯಕ',
    demo_q1: '"ಬೆಂಗಳೂರಿನಲ್ಲಿ Q3 2024 ಅಪರಾಧ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳನ್ನು ತೋರಿಸಿ"',
    demo_a1: '🗺️ 32 ವಲಯಗಳಲ್ಲಿ 847 ಪ್ರಕರಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತಿದ್ದೇನೆ... ಹೆಚ್ಚಿನ ಸಾಂದ್ರತೆ: ವ್ಹೈಟ್‌ಫೀಲ್ಡ್ (+23%), ಶಿವಾಜಿನಗರ (+18%)',
    demo_q2: '"ಬೆಂಗಳೂರಿನಲ್ಲಿ ಅಪರಾಧ ಮಾದರಿ ತೋರಿಸಿ"',
    demo_a2: '📊 ಕನ್ನಡ ಭಾಷೆಯಲ್ಲಿ ಉತ್ತರಿಸುತ್ತಿದ್ದೇನೆ... 3 ಪ್ರಮುಖ ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ಅಧಿಕ ಅಪರಾಧ ಪ್ರಕರಣಗಳು ಕಂಡುಬಂದಿವೆ.',
    ask_anything: 'ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ ಅಥವಾ ಕನ್ನಡದಲ್ಲಿ ಏನಾದರೂ ಕೇಳಿ...',
    problem_statement: 'ಸಮಸ್ಯೆಯ ಹೇಳಿಕೆ',
    challenge_text: 'ರಾಜ್ಯ ಅಪರಾಧ ದಾಖಲೆ ಬ್ಯೂರೋ (SCRB) ಕರ್ನಾಟಕದ 1100+ ಪೊಲೀಸ್ ಠಾಣೆಗಳಿಂದ ಅಪರಾಧ-ಸಂಬಂಧಿತ ಡೇಟಾದ ದೊಡ್ಡ ಭಂಡಾರವನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.',
    the_challenge: 'ಸವಾಲು',
    challenge_desc: 'ತನಿಖಾಧಿಕಾರಿಗಳು ನೈಸರ್ಗಿಕ ಭಾಷೆ ಬಳಸಿ ಅಪರಾಧ ಡೇಟಾ ಪ್ರಶ್ನಿಸಲು ಮತ್ತು ಮಾದರಿಗಳನ್ನು ಕಂಡುಹಿಡಿಯಲು ಸಾಧ್ಯವಾಗುವ ಬುದ್ಧಿವಂತ AI ವೇದಿಕೆ ನಿರ್ಮಿಸಿ.',
    tag1: 'ಅಪರಾಧ ಮಾದರಿ ಆವಿಷ್ಕಾರ', tag2: 'ಅಪರಾಧ ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ಲೇಷಣೆ',
    tag3: 'ಸಾಮಾಜಿಕ-ಜನಾಂಗೀಯ ಒಳನೋಟ', tag4: 'ನಡವಳಿಕೆ ಪ್ರೊಫೈಲಿಂಗ್',
    tag5: 'ಸಕ್ರಿಯ ಅಪರಾಧ ತಡೆಗಟ್ಟುವಿಕೆ',
    key_features_title: 'ಪ್ರಮುಖ ವೈಶಿಷ್ಟ್ಯಗಳು',
    f1: 'ನೈಸರ್ಗಿಕ ಭಾಷಾ ಚಾಟ್‌ಬಾಟ್ (ಇಂಗ್ಲಿಷ್ + ಕನ್ನಡ + ಹಿಂದಿ)',
    f2: 'ಧ್ವನಿ-ಸಕ್ಷಮ ಸಂವಾದ', f3: 'ಸಂದರ್ಭ-ಜಾಗೃತ ಸಂಭಾಷಣೆಗಳು',
    f4: 'PDF ರಫ್ತು', f5: 'ಅಪರಾಧ ನೆಟ್‌ವರ್ಕ್ ದೃಶ್ಯೀಕರಣ',
    f6: 'ಅಪರಾಧ ಪ್ರವೃತ್ತಿ ಮತ್ತು ಹಾಟ್‌ಸ್ಪಾಟ್ ಪತ್ತೆ', f7: 'ಮುನ್ಸೂಚನಾ ವಿಶ್ಲೇಷಣೆ',
    f8: 'ಆಡಿಟ್ ಜಾಡುಗಳೊಂದಿಗೆ XAI', f9: 'ಪಾತ್ರ-ಆಧಾರಿತ ಸುರಕ್ಷಿತ ಪ್ರವೇಶ',
    capabilities: 'ಮೂಲ ಸಾಮರ್ಥ್ಯಗಳು',
    features_title: 'ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಅಪರಾಧ ಎದುರಿಸಲು ಅಗತ್ಯವಾದ ಎಲ್ಲವೂ',
    features_subtitle: 'ಕರ್ನಾಟಕ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳಿಗಾಗಿ — ಪೇದೆಗಳಿಂದ ಹಿಡಿದು ಹಿರಿಯ IPS ಅಧಿಕಾರಿಗಳವರೆಗೆ',
    feat1_title: 'ನೈಸರ್ಗಿಕ ಭಾಷಾ ಪ್ರಶ್ನೆಗಳು',
    feat1_desc: 'ಸರಳ ಕನ್ನಡ, ಹಿಂದಿ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ. SQL ಅಥವಾ ಸಂಕೀರ್ಣ ಫಿಲ್ಟರ್‌ಗಳ ಅಗತ್ಯವಿಲ್ಲ.',
    feat2_title: 'ಅಪರಾಧ ಹಾಟ್‌ಸ್ಪಾಟ್ ಪತ್ತೆ',
    feat2_desc: 'ನೈಜ-ಸಮಯ ಭೌಗೋಳಿಕ ವಿಶ್ಲೇಷಣೆ ಜಿಲ್ಲೆಗಳಲ್ಲಿ ಉದಯೋನ್ಮುಖ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳನ್ನು ಗುರುತಿಸುತ್ತದೆ.',
    feat3_title: 'ಅಪರಾಧ ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ಲೇಷಣೆ',
    feat3_desc: 'ಅನುಮಾನಿತರು ಮತ್ತು ಅಪರಾಧ ಸಂಘಟನೆಗಳ ನಡುವಿನ ಸಂಪರ್ಕಗಳನ್ನು ದೃಶ್ಯೀಕರಿಸಿ.',
    feat4_title: 'ಮುನ್ಸೂಚನಾ ಬುದ್ಧಿಮತ್ತೆ',
    feat4_desc: 'ML-ಚಾಲಿತ ಅಪರಾಧ ಸಂಭವ ಮತ್ತು ಋತುಮಾನ ಪ್ರವೃತ್ತಿಗಳ ಮುನ್ಸೂಚನೆ.',
    feat5_title: 'ಪಾತ್ರ-ಆಧಾರಿತ ಪ್ರವೇಶ ನಿಯಂತ್ರಣ',
    feat5_desc: 'ಪೇದೆಯಿಂದ DGP ವರೆಗೆ ಕಟ್ಟುನಿಟ್ಟಿನ ಪ್ರವೇಶ ಹಂತಗಳು.',
    feat6_title: 'ಸ್ಮಾರ್ಟ್ ವರದಿಗಳು ಮತ್ತು ರಫ್ತು',
    feat6_desc: 'ಒಂದು ಕ್ಲಿಕ್‌ನಲ್ಲಿ ತನಿಖಾ ವರದಿಗಳು ಮತ್ತು ನ್ಯಾಯಾಲಯ-ಸಿದ್ಧ ದಾಖಲೆಗಳನ್ನು ರಚಿಸಿ.',
    feat7_title: 'ಧ್ವನಿ-ಸಕ್ಷಮ ಪ್ರಶ್ನೆಗಳು',
    feat7_desc: 'ಕ್ಷೇತ್ರ ಅಧಿಕಾರಿಗಳಿಗೆ ಕನ್ನಡ, ಹಿಂದಿ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ ಪ್ರಶ್ನಿಸಿ.',
    feat8_title: 'ನೈಜ-ಸಮಯ SCRB ಸಿಂಕ್',
    feat8_desc: 'SCRB ಡೇಟಾಬೇಸ್‌ಗಳಿಗೆ ನೇರ ಸಂಪರ್ಕ. FIR ದಾಖಲಿಸಿದಂತೆ ಡೇಟಾ ಅಪ್‌ಡೇಟ್ ಆಗುತ್ತದೆ.',
    feat9_title: 'ವಿವರಣಾತ್ಮಕ AI (XAI)',
    feat9_desc: 'ಪ್ರತಿ AI ತೀರ್ಮಾನವು ಪಾರದರ್ಶಕ ತರ್ಕ ಸರಣಿಯೊಂದಿಗೆ ಬರುತ್ತದೆ.',
    process: 'ಪ್ರಕ್ರಿಯೆ',
    how_title: 'O.R.C.A ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    how_subtitle: 'ಪ್ರಶ್ನೆಯಿಂದ ಕ್ರಿಯಾಶೀಲ ಬುದ್ಧಿಮತ್ತೆಯವರೆಗೆ ಸುಗಮ, ಸುರಕ್ಷಿತ ಪೈಪ್‌ಲೈನ್',
    step1_title: 'ಅಧಿಕಾರಿ ಪ್ರಶ್ನೆ ಸಲ್ಲಿಸುತ್ತಾರೆ',
    step1_desc: 'O.R.C.A ರುಜುವಾತುಗಳೊಂದಿಗೆ ಲಾಗಿನ್ ಮಾಡಿ. 3 ಭಾಷೆಗಳಲ್ಲಿ ಯಾವುದಾದರೊಂದರಲ್ಲಿ ಟೈಪ್ ಅಥವಾ ಮಾತನಾಡಿ.',
    step2_title: 'AI ಪ್ರಕ್ರಿಯೆ ಮತ್ತು ವಿಶ್ಲೇಷಣೆ',
    step2_desc: 'NLP ಎಂಜಿನ್ ನೈಸರ್ಗಿಕ ಭಾಷೆಯನ್ನು ರಚನಾತ್ಮಕ ಪ್ರಶ್ನೆಗಳಿಗೆ ಭಾಷಾಂತರಿಸುತ್ತದೆ.',
    step3_title: 'ಒಳನೋಟಗಳು ತಲುಪಿಸಲ್ಪಡುತ್ತವೆ',
    step3_desc: 'ಫಲಿತಾಂಶಗಳನ್ನು ಸಂವಾದಾತ್ಮಕ ಚಾರ್ಟ್‌ಗಳು, ನಕ್ಷೆಗಳು ಮತ್ತು ಸರಳ-ಭಾಷಾ ಸಾರಾಂಶಗಳಾಗಿ ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತದೆ.',
    impact: 'ಪ್ರಭಾವ',
    stats_title: 'ವ್ಯಾಪಕ ಪ್ರಮಾಣದಲ್ಲಿ ಕರ್ನಾಟಕ ಪೊಲೀಸಿಂಗ್',
    stat1: 'ಪೊಲೀಸ್ ಠಾಣೆಗಳು', stat2: 'ವಾರ್ಷಿಕ FIR ದಾಖಲೆಗಳು',
    stat3: 'ಪೊಲೀಸ್ ಸಿಬ್ಬಂದಿ', stat4: 'ಸರಾಸರಿ ಪ್ರಶ್ನೆ ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ',
    stat5: 'ಜಿಲ್ಲೆಗಳು ಮತ್ತು ವಲಯಗಳು', stat6: 'ಪ್ರಶ್ನೆ ನಿಖರತೆ ದರ',
    security_label: 'ಭದ್ರತೆ ಮತ್ತು ಅನುಪಾಲನ',
    security_title: 'ಸರ್ಕಾರಿ-ದರ್ಜೆಯ ಭದ್ರತೆಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ',
    security_desc: 'O.R.C.A ಪ್ರತಿಯೊಂದು ಪದರವನ್ನು ಡೇಟಾ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಕಾನೂನು ಅನುಪಾಲನೆಯ ಉನ್ನತ ಮಾನದಂಡಗಳ ಸುತ್ತ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.',
    sec1_title: 'ಎಂಡ್-ಟು-ಎಂಡ್ ಎನ್‌ಕ್ರಿಪ್ಶನ್', sec1_desc: 'ಎಲ್ಲಾ ಸೂಕ್ಷ್ಮ ಅಪರಾಧ ಡೇಟಾಗಾಗಿ AES-256 ಎನ್‌ಕ್ರಿಪ್ಶನ್.',
    sec2_title: 'ಸಂಪೂರ್ಣ ಆಡಿಟ್ ಜಾಡುಗಳು', sec2_desc: 'ಪ್ರತಿ ಪ್ರಶ್ನೆ, ಪ್ರವೇಶ ಮತ್ತು ರಫ್ತನ್ನು ಅಧಿಕಾರಿ ID ಮತ್ತು ಟೈಮ್‌ಸ್ಟ್ಯಾಂಪ್‌ನೊಂದಿಗೆ ದಾಖಲಿಸಲಾಗುತ್ತದೆ.',
    sec3_title: 'IT ಕಾಯ್ದೆ ಮತ್ತು MHA ಅನುಪಾಲನ', sec3_desc: 'IT ಕಾಯ್ದೆ 2000 ಮತ್ತು MHA ಮಾರ್ಗಸೂಚಿಗಳ ಸಂಪೂರ್ಣ ಅನುಪಾಲನ.',
    sec4_title: 'MeitY ಕ್ಲೌಡ್ ಹೋಸ್ಟಿಂಗ್', sec4_desc: 'ಭಾರತೀಯ ಡೇಟಾ ಕೇಂದ್ರಗಳಲ್ಲಿ ಸರ್ಕಾರ-ಅನುಮೋದಿತ MeitY ಕ್ಲೌಡ್‌ನಲ್ಲಿ ಹೋಸ್ಟ್ ಮಾಡಲಾಗಿದೆ.',
    roadmap: 'ರೋಡ್‌ಮ್ಯಾಪ್ ಸಲಹೆಗಳು',
    suggestions_title: 'ಈ ವೇದಿಕೆಯಲ್ಲಿ ಇನ್ನೇನು ಸೇರಿಸಬಹುದು?',
    suggestions_subtitle: 'ಕರ್ನಾಟಕದ ಅಪರಾಧ ಬುದ್ಧಿಮತ್ತೆ ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಮತ್ತಷ್ಟು ಬಲಪಡಿಸಲು ಪ್ರಸ್ತಾವಿತ ಸುಧಾರಣೆಗಳು',
    sug1_title: 'ಸಂವಾದಾತ್ಮಕ GIS ಅಪರಾಧ ನಕ್ಷೆಗಳು',
    sug1_desc: 'ಜಿಲ್ಲಾ ಮಟ್ಟದ ಡ್ರಿಲ್-ಡೌನ್ ಸಾಮರ್ಥ್ಯಗಳೊಂದಿಗೆ ಅಪರಾಧ ಸಾಂದ್ರತೆ ತೋರಿಸುವ ಭೌಗೋಳಿಕ ನಕ್ಷೆಗಳು.',
    sug2_title: 'ಮೊಬೈಲ್ ಅಧಿಕಾರಿ ಅಪ್ಲಿಕೇಶನ್',
    sug2_desc: 'ಕ್ಷೇತ್ರ ಅಧಿಕಾರಿಗಳಿಗೆ ಮೀಸಲಾದ Android/iOS ಅಪ್ಲಿಕೇಶನ್.',
    sug3_title: 'ಅಂತರ-ರಾಜ್ಯ ಡೇಟಾ ಹಂಚಿಕೆ',
    sug3_desc: 'NCRB ಮತ್ತು ನೆರೆಯ ರಾಜ್ಯ ಪೊಲೀಸ್ ಡೇಟಾಬೇಸ್‌ಗಳೊಂದಿಗೆ ಸುರಕ್ಷಿತ API ಏಕೀಕರಣ.',
    sug4_title: 'ಮುಖ ಗುರುತಿಸುವಿಕೆ ಏಕೀಕರಣ',
    sug4_desc: 'AI-ಚಾಲಿತ ಮುಖ ಗುರುತಿಸುವಿಕೆಯೊಂದಿಗೆ CCTV ದೃಶ್ಯ ವಿಶ್ಲೇಷಣೆ.',
    sug5_title: 'ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಮೇಲ್ವಿಚಾರಣೆ',
    sug5_desc: 'ಬೆದರಿಕೆ ಸೂಚಕಗಳಿಗಾಗಿ AI-ಚಾಲಿತ ಸಾರ್ವಜನಿಕ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಮೇಲ್ವಿಚಾರಣೆ.',
    sug6_title: 'ನ್ಯಾಯಾಲಯ ಪ್ರಕರಣ ಟ್ರ್ಯಾಕರ್',
    sug6_desc: 'ಪ್ರಕರಣ ಪ್ರಗತಿ ಮತ್ತು ಅಪರಾಧ ಪ್ರಕಾರದ ಪ್ರಕಾರ ಅಪರಾಧ ಸಿದ್ಧಿ ದರಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು e-Courts ಜೊತೆ ಏಕೀಕರಣ.',
    sug7_title: 'ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆ ವ್ಯವಸ್ಥೆ',
    sug7_desc: 'ಅಪರಾಧ ಮಿತಿ ದಾಟಿದಾಗ SHOs ಗೆ ಸ್ವಯಂಚಾಲಿತ SMS/ಇಮೇಲ್ ಎಚ್ಚರಿಕೆಗಳು.',
    sug8_title: 'ಸಾಕ್ಷಿ ಮತ್ತು ಬಲಿಪಶು ಪೋರ್ಟಲ್',
    sug8_desc: 'ನಾಗರಿಕರಿಗೆ ಅಪರಾಧ ವರದಿ ಮಾಡಲು ಸುರಕ್ಷಿತ, ಅನಾಮಧೇಯ ಟಿಪ್ ಸಲ್ಲಿಕೆ ಪೋರ್ಟಲ್.',
    sug9_title: 'ಕಾರ್ಯಕಾರಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    sug9_desc: 'DGP ಮತ್ತು ಹಿರಿಯ ಅಧಿಕಾರಿಗಳಿಗೆ ರಾಜ್ಯಾದ್ಯಂತ ಪ್ರವೃತ್ತಿಗಳನ್ನು ತೋರಿಸುವ ಉನ್ನತ-ಮಟ್ಟದ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್.',
    contact_label: 'ಸಂಪರ್ಕಿಸಿ', contact_title: 'ಸಂಪರ್ಕ ಮತ್ತು ಬೆಂಬಲ',
    helpdesk: 'ತಾಂತ್ರಿಕ ಹೆಲ್ಪ್‌ಡೆಸ್ಕ್', helpdesk_hours: 'ಸೋಮ–ಶನಿ, ಬೆಳಿಗ್ಗೆ 8 – ಸಂಜೆ 8',
    email_support: 'ಇಮೇಲ್ ಬೆಂಬಲ', response_time: '24 ಗಂಟೆಯಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯೆ',
    nodal_officer: 'ನೋಡಲ್ ಅಧಿಕಾರಿ',
    footer_desc: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಅಡಿಯಲ್ಲಿ ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ ಮತ್ತು SCRB ಒಂದು ಉಪಕ್ರಮ.',
    quick_links: 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು', legal: 'ಕಾನೂನು', related: 'ಸಂಬಂಧಿತ ಪೋರ್ಟಲ್‌ಗಳು',
    privacy_policy: 'ಗೋಪ್ಯತಾ ನೀತಿ', terms_of_use: 'ಬಳಕೆಯ ನಿಯಮಗಳು',
    accessibility: 'ಸುಲಭ ಪ್ರವೇಶ', rti: 'RTI',
    copyright: '© 2024 ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್. ಎಲ್ಲ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿವೆ.',
    digital_india: 'ಡಿಜಿಟಲ್ ಇಂಡಿಯಾ', secure_portal: 'ಸುರಕ್ಷಿತ ಪೋರ್ಟಲ್',
  }
};

// ── State ─────────────────────────────────────────────────────
let currentLang = localStorage.getItem('ksp-lang') || 'en';
let currentTheme = localStorage.getItem('ksp-theme') || 'light';
let statsAnimated = false;
let scrollObserver = null;

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme, false);
  applyLang(currentLang, false);
  setupNavScroll();
  createParticles();
  animateChatMessages();
  setupScrollAnimations();
  setupCounters();
  setupPasswordStrength();
  setupSmoothLinks();
  // Show auth modal after 300ms
  setTimeout(() => {
    document.getElementById('auth-overlay').classList.add('active');
  }, 300);
});

// ── Theme ─────────────────────────────────────────────────────
function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
  localStorage.setItem('ksp-theme', currentTheme);
}

function applyTheme(theme, animate = true) {
  document.documentElement.setAttribute('data-theme', theme);
  currentTheme = theme;
}

// ── Language ──────────────────────────────────────────────────
function setLang(lang) {
  currentLang = lang;
  applyLang(lang);
  localStorage.setItem('ksp-lang', lang);
}

function applyLang(lang, animate = true) {
  const t = translations[lang] || translations.en;
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang);

  // Update all i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });

  // Update lang button states
  ['en', 'hi', 'kn'].forEach(l => {
    const btn = document.getElementById(`lang-${l}`);
    const btnMini = document.getElementById(`lang-${l}-mini`);
    if (btn) {
      btn.classList.toggle('active', l === lang);
      btn.setAttribute('aria-pressed', l === lang ? 'true' : 'false');
    }
    if (btnMini) btnMini.classList.toggle('active', l === lang);
  });
}

// ── Auth Modal ────────────────────────────────────────────────
function openAuth() {
  const overlay = document.getElementById('auth-overlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAuth() {
  const overlay = document.getElementById('auth-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close on overlay click (but not on modal click)
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('auth-overlay');
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeAuth();
  });
});

// ── Tab Switcher ──────────────────────────────────────────────
function switchTab(tab) {
  // Tabs
  document.querySelectorAll('.auth-tab').forEach(t => {
    t.classList.toggle('active', t.id === `tab-${tab}`);
    t.setAttribute('aria-selected', t.id === `tab-${tab}` ? 'true' : 'false');
  });
  // Panels
  document.querySelectorAll('.auth-panel').forEach(p => {
    p.classList.toggle('active', p.id === `panel-${tab}`);
  });
}

// ── Login Handler ─────────────────────────────────────────────
function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('login-btn');
  const text = btn.querySelector('.btn-text');
  const loader = btn.querySelector('.btn-loader');

  text.classList.add('hidden');
  loader.classList.remove('hidden');
  btn.disabled = true;

  setTimeout(() => {
    text.classList.remove('hidden');
    loader.classList.add('hidden');
    btn.disabled = false;
    closeAuth();
    showToast('✅ Welcome back, Officer! Access granted.', 'success');
  }, 1800);
}

// ── Signup Handler ────────────────────────────────────────────
function handleSignup(e) {
  e.preventDefault();
  closeAuth();
  showToast('📋 Access request submitted. Pending SHO approval.', 'info');
}

// ── Demo Login ────────────────────────────────────────────────
function handleDemoLogin() {
  closeAuth();
  showToast('🎯 Demo mode activated. Welcome to O.R.C.A!', 'info');
}

// ── Password Visibility ───────────────────────────────────────
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
  } else {
    input.type = 'password';
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  }
}

// ── Password Strength ─────────────────────────────────────────
function setupPasswordStrength() {
  const passInput = document.getElementById('su-pass');
  const fill = document.getElementById('strength-fill');
  if (!passInput || !fill) return;

  passInput.addEventListener('input', () => {
    const v = passInput.value;
    let score = 0;
    if (v.length >= 8) score++;
    if (/[A-Z]/.test(v)) score++;
    if (/[0-9]/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;

    const pct = (score / 4) * 100;
    fill.style.width = `${pct}%`;
    const colors = ['#ef4444', '#f97316', '#eab308', '#16a34a'];
    fill.style.backgroundColor = colors[score - 1] || '#ef4444';
  });
}

// ── Mobile Menu ───────────────────────────────────────────────
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const ham = document.getElementById('hamburger');
  const isOpen = menu.classList.toggle('open');
  ham.classList.toggle('open', isOpen);
  ham.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// ── Navbar Scroll ─────────────────────────────────────────────
function setupNavScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── Particles ─────────────────────────────────────────────────
function createParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${3 + Math.random() * 4}s;
      --delay: ${Math.random() * 3}s;
      width: ${2 + Math.random() * 4}px;
      height: ${2 + Math.random() * 4}px;
      opacity: ${0.1 + Math.random() * 0.3};
    `;
    container.appendChild(p);
  }
}

// ── Chat Animation ────────────────────────────────────────────
function animateChatMessages() {
  const messages = document.querySelectorAll('.chat-msg[data-delay]');
  messages.forEach(msg => {
    const delay = parseInt(msg.getAttribute('data-delay'));
    msg.style.animationDelay = `${delay * 0.8 + 0.5}s`;
  });
}

// ── Scroll Animations ─────────────────────────────────────────
function setupScrollAnimations() {
  // Add fade-up to all animatable cards
  const targets = document.querySelectorAll(
    '.feature-card, .challenge-card, .step, .stat-card, .suggestion-card, .contact-card, .security-point'
  );
  targets.forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 3) * 0.08}s`;
  });

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => scrollObserver.observe(el));
}

// ── Counters ──────────────────────────────────────────────────
function setupCounters() {
  const counters = document.querySelectorAll('.stat-value[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        counters.forEach(counter => animateCounter(counter));
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats');
  if (statsSection) counterObserver.observe(statsSection);
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── Smooth Nav Links ──────────────────────────────────────────
function setupSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ── Keyboard Accessibility ────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('auth-overlay');
    if (overlay.classList.contains('active')) closeAuth();
  }
});

// ── Prevent main scroll when modal open ──────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('auth-overlay');
  if (overlay.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  }
});

window.toggleTheme = toggleTheme;
window.setLang = setLang;
window.openAuth = openAuth;
window.closeAuth = closeAuth;
window.toggleMobileMenu = toggleMobileMenu;
