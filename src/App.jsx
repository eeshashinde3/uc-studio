import React, { useState, useMemo, useRef } from 'react';
import {
  Search, Upload, Sparkles, Filter, CheckCircle2, XCircle,
  BarChart3, MessageSquareQuote, ShieldAlert, Layers, FileJson,
  Database, Cpu, AlertTriangle
} from 'lucide-react';

const INITIAL_CORPUS = [
  {
    "id": "GP-f9e8cf9e-5",
    "source": "Google Play Store (IN)",
    "rating": 1.0,
    "date": "2026-10-31",
    "author": "Shivali Salunkhe",
    "raw_text": "Very poor experience. They don't show the professional profile before booking and payment. I didn't like the professional which was assigned so I requested to change the professional but nobody was available so they didn't change the professional and kept the same person. I asked multiple times to change the professional but it gave the same response. Also, there is no option to talk with a real person on a call to explain the situation. Lastly, they charged cancellation fees. This is robbery.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "Very poor experience. They don't show the professional profile before booking and payment."
  },
  {
    "id": "RD-1mtehmd",
    "source": "Reddit r/mumbai",
    "rating": null,
    "date": "2025-08-18",
    "author": "Few_Boysenberry1630",
    "raw_text": "Home Salon services. Are there any affordable home salon services available in Mumbai except yesmadam and urban company?",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_tier": "Tier-1 Metro",
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Mixed/Neutral",
    "root_cause_theme": "Other Friction",
    "alternative_mentioned": "Competitor App (NoBroker/etc.)",
    "verbatim_quote": "Are there any affordable home salon services available in Mumbai except yesmadam and urban company?"
  },
  {
    "id": "GP-5f1337ee-e",
    "source": "Google Play Store (IN)",
    "rating": 5.0,
    "date": "2026-11-09",
    "author": "Miss Hamdi",
    "raw_text": "the best apps for ever and good service",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "the best apps for ever and good service"
  },
  {
    "id": "RD-1u3t3xk",
    "source": "Reddit r/mumbai",
    "rating": null,
    "date": "2026-06-12",
    "author": "pinterest_paglu15",
    "raw_text": "Has anyone used Urban Company Revamp?. I'm planning to get a TV wall unit done for a 12 ft × 9 ft wall and have been exploring different options. I recently came across Urban Company's Revamp service, but I'm struggling to find independent reviews outside of the testimonials on their own platform.  \nHas anyone here used Revamp for a TV unit or any other interior/furniture project? How was your experience?  \nWould you consider it worth the cost, or would you recommend going with a local carpenter/interior designer instead?",
    "is_valid_india_core": true,
    "category": "Painting & Home Improvement",
    "city_tier": "Tier-1 Metro",
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Mixed/Neutral",
    "root_cause_theme": "Scope Ambiguity & Incomplete Execution",
    "alternative_mentioned": "None",
    "verbatim_quote": "Has anyone used Urban Company Revamp?"
  },
  {
    "id": "IOS-81543523",
    "source": "Apple App Store (IN)",
    "rating": 1.0,
    "date": "2026-10-18",
    "author": "Nidhi Duggal",
    "raw_text": "Urban company trust only in their employees and not the customers even if there are proves that the customers are right but because of their liar employee Vanshika who kept saying first that the house is in some commercial complex and when I have told the customer care that its not in commercial complex and booked from my phone then the same employee Vanshika said that there is no lady present in the house. I was very well there and then inly when I told them they changed the help and sent Sangeeta who worked for an hour and was very happy working. Your customer care employee Charu also did not believe us for which we are very much unhappy with Urban Company. Kindly have some honest employees instead of just hiring employees.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Post-Payment Support & Warranty Blackout",
    "alternative_mentioned": "None",
    "verbatim_quote": "Urban company trust only in their employees and not the customers even if there are proves that the customers are right"
  },
  {
    "id": "RD-1xl1hqe",
    "source": "Reddit r/india",
    "rating": null,
    "date": "2026-11-01",
    "author": "mimbari",
    "raw_text": "Urban Company Running a Scam for Members. [Urban Company Scam](https://x.com/anurag_aggarwal/status/2116861914362122467?a=ZJmyCKvD4mU39nNV6NU&s=20)\n\n  \nI have two accounts with Urban Company. One has a 6 months membership and other one does not.\n\n  \nI was trying to book a sofa cleaning service with Member account and saw that there were no slot. I thought about trying with the non member account and behold my surprise, the non member account is showing cheaper service rate.\n\n  \nThis looks like intentional to punish members.\n\n  \nPS: I could not find option to upload images to added link to the tweet I made",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_tier": "Unspecified",
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Other Friction",
    "alternative_mentioned": "None",
    "verbatim_quote": "I was trying to book a sofa cleaning service with Member account and saw that there were no slot."
  },
  {
    "id": "GP-79ef2da5-d",
    "source": "Google Play Store (IN)",
    "rating": 1.0,
    "date": "2026-11-05",
    "author": "myangel mani",
    "raw_text": "do not hire their electricians at all. they overcharged by miles. had two very bad experiences. when contacted the uc customer care, they just give round about replies. not worth it. but the microwave repair team is good or atleast the technician they provided was good. so for electricians, please go to your local elec. I don't know about the rest as these two are the only services I got. thankyou",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "Local Technician / Hardware Shop",
    "verbatim_quote": "do not hire their electricians at all. they overcharged by miles."
  },
  {
    "id": "RD-1vn34ek",
    "source": "Reddit r/hyderabad",
    "rating": null,
    "date": "2026-08-13",
    "author": "viparitananda",
    "raw_text": "I really wonder if there’s a day that goes by without getting scammed in this country.. This is good overall. I’d just clean up a few phrases for natural English and make the timeline clearer. I’d post it like this:\n\nAround a year ago, I booked a chimney deep-cleaning service through Urban Company. After disassembling everything for cleaning, when it was time to put everything back together, the technician told me that the blower was faulty because there was some play/noise coming from it. I agreed to replace it, so he bought a new one from a spare-parts shop and left the original/old blower with me.\n\nFast forward to yesterday—I decided to deep-clean the chimney myself. While putting everything back together, I thought I’d try the old blower, so I installed it. Turns out, it’s working perfectly fine. 😭\n\nAnd this isn’t even the first time something like this has happened to me.\n\nAround four months ago, I had a gas cylinder leakage, so I called my gas agency and asked them to send a mechanic. When he arrived, he said the regulator needed to be replaced. I got it replaced and kept the old one with me.\n\nThen, last month, I had the same problem again. I called the agency, and a different mechanic came this time. He said the regulator was faulty and told me that I could only get it replaced at the agency office.\n\nSo I went to the agency office, and it turned out that the regulator that had been installed four months earlier was actually a duplicate/fake one. And the old one was perfectly fine. 🤦🏻‍♂️\n\nNow I’m seriously wondering how many times I’ve been scammed without even realizing it.\n\nWhy is there such a lack of professionalism in these services? Has anyone else experienced something similar?",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_tier": "Tier-1 Metro",
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "None",
    "verbatim_quote": "the technician told me that the blower was faulty becau"
  },
  {
    "id": "GP-d3d29b06-0",
    "source": "Google Play Store (IN)",
    "rating": 2.0,
    "date": "2026-11-02",
    "author": "Ayushi Debroy",
    "raw_text": "app is breaking a lotttt!!!!",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Other Friction",
    "alternative_mentioned": "None",
    "verbatim_quote": "app is breaking a lotttt!!!!"
  },
  {
    "id": "IOS-18976405",
    "source": "Apple App Store (IN)",
    "rating": 1.0,
    "date": "2026-11-21",
    "author": "ManviGuptaSharma",
    "raw_text": "They will cancel anytime and if you cancel they charge. The bots will keep giving standard customer service response on loop to frustrate you. Last 2 days beauty services cancelled twice at the last minute by them.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "They will cancel anytime and if you cancel they charge."
  },
  {
    "id": "IOS-91724045",
    "source": "Apple App Store (IN)",
    "rating": 1.0,
    "date": "2026-10-20",
    "author": "sandypopli",
    "raw_text": "This is urban loot \nNo accountability \nAny one with no experience of service can get attached to them and give lousy service with an urban face and finally you get royally \n\nCheated\n\nEven today 21/10/2026 \nThey are the same !! Tried 2nd time and got cheated",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Scope Ambiguity & Incomplete Execution",
    "alternative_mentioned": "None",
    "verbatim_quote": "Any one with no experience of service can get attached to them and give lousy service"
  },
  {
    "id": "GP-609b3d27-d",
    "source": "Google Play Store (IN)",
    "rating": 1.0,
    "date": "2026-11-20",
    "author": "Mohammad Enayat Ansari",
    "raw_text": "very unprofessional, our booking for party makeup was cancelled last minute leaving us with no other options, never rely on them keeping the commitment",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "very unprofessional, our booking for party makeup was cancelled last minute leaving us with no other options"
  },
  {
    "id": "GP-7281c6bc-0",
    "source": "Google Play Store (IN)",
    "rating": 4.0,
    "date": "2026-11-19",
    "author": "Bushra Shahid",
    "raw_text": "ur spa and massage charges are too high give offer in that also in saloon also",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_tier": "Unspecified",
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Mixed/Neutral",
    "root_cause_theme": "Other Friction",
    "alternative_mentioned": "None",
    "verbatim_quote": "ur spa and massage charges are too high give offer in that also in saloon also"
  },
  {
    "id": "GP-050bba6a-b",
    "source": "Google Play Store (IN)",
    "rating": 5.0,
    "date": "2026-11-07",
    "author": "Satwik PV",
    "raw_text": "Convenience on tap, honest professionals and transparent pricing.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Convenience on tap, honest professionals and transparent pricing."
  },
  {
    "id": "GP-a8861393-5",
    "source": "Google Play Store (IN)",
    "rating": 5.0,
    "date": "2026-11-16",
    "author": "Gomathi Verachelvan",
    "raw_text": "Go for UC . Wonderful fulfilling service.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Go for UC . Wonderful fulfilling service."
  },
  {
    "id": "IOS-43150201",
    "source": "Apple App Store (IN)",
    "rating": 1.0,
    "date": "2026-11-02",
    "author": "sayhellojt",
    "raw_text": "I booked a technician to inspect a persistent beeping sound on my purifier. Not only was he completely unable to diagnose or fix the original issue, but he also clearly lacked training. He struggled immensely just to open the machine for a restart, which was highly unprofessional to watch.\nWorse yet, while forcing the machine open, he damaged the internal components. As a direct result of his service visit, my unit is now constantly leaking water—even when it is completely turned off. I called for a simple repair and ended up with a broken, leaking appliance. Extremely disappointed and would not recommend.The customer service  is extremely poor.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "None",
    "verbatim_quote": "As a direct result of his service visit, my unit is now constantly leaking water"
  },
  {
    "id": "IOS-53217002",
    "source": "Apple App Store (IN)",
    "rating": 1.0,
    "date": "2026-11-05",
    "author": "B 13579",
    "raw_text": "They are not taking care, i booked but after 24 hrs neither they  come nor they responding, hope UC is over confident and not able to do service worst service experience never recommend anybody to go with this platform",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "i booked but after 24 hrs neither they come nor they responding"
  },
  {
    "id": "IOS-05112025",
    "source": "Apple App Store (IN)",
    "rating": 1.0,
    "date": "2026-10-24",
    "author": "RajeshGhosh091",
    "raw_text": "Extremely Pathetic Service by Urban Company – M1X Purifier Still Not Installed Since 9th October 2026, installed on 23rd after several request and so many cancellations.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "Extremely Pathetic Service by Urban Company – M1X Purifier Still Not Installed Since 9th October 2026, installed on 23rd after several request and so many cancellations."
  },
  {
    "id": "IOS-61105005",
    "source": "Apple App Store (IN)",
    "rating": 1.0,
    "date": "2026-11-07",
    "author": "Raseshu",
    "raw_text": "Unfortunately the quality of professionals and customer service gone so low …..you repent even booking",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Other Friction",
    "alternative_mentioned": "None",
    "verbatim_quote": "Unfortunately the quality of professionals and customer service gone so low …..you repent even booking"
  },
  {
    "id": "RD-1tacjv5",
    "source": "Reddit r/delhi",
    "rating": null,
    "date": "2026-05-11",
    "author": "[deleted]",
    "raw_text": "Kya itna gunda hoon main maa? The Urban Company tales!. [removed]",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Tier-1 Metro",
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Mixed/Neutral",
    "root_cause_theme": "Other Friction",
    "alternative_mentioned": "None",
    "verbatim_quote": "Kya itna gunda hoon main maa? The Urban Company tales!"
  },
  {
    "id": "GP-813841ab-d",
    "source": "Google Play Store (IN)",
    "rating": 5.0,
    "date": "2026-11-05",
    "author": "Navonil Datta",
    "raw_text": "The service person is outstandingly professional with a Human Face. I wish her every success in Life.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_tier": "Unspecified",
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "The service person is outstandingly professional with a Human Face."
  },
  {
    "id": "IOS-93895832",
    "source": "Apple App Store (IN)",
    "rating": 5.0,
    "date": "2026-11-15",
    "author": "Bibhupada pada",
    "raw_text": "Realiable, punctual, good work are the some among. The company services",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Realiable, punctual, good work are the some among."
  },
  {
    "id": "RD-1pjxxqa",
    "source": "Reddit r/india",
    "rating": null,
    "date": "2025-12-11",
    "author": "Any_Investment7887",
    "raw_text": "Are We Paying for Moving Services or Just Paying for the App? Urban Company, JustDial, MagicBricks and Nobroker Under the Lens. My recent relocation using Urban Company, JustDial, MagicBricks and Nobroker turned out to be much more revealing than I expected. These platforms promise verified movers, smooth coordination, real time updates and a polished end to end experience. But when the actual moving day arrived, the gap between what the apps showed and what really happened was impossible to miss.  \nOne team arrived without proper packing material, another mishandled fragile items, a few added surprise charges midway, and some barely followed the instructions clearly mentioned in the booking. Meanwhile, the platforms kept sending cheerful automated messages like \"Your relocation is progressing\" when I was standing right in the middle of confusion.  \nIt started to feel like the digital part of the service was the only thing well designed, while the on ground execution was left to unmonitored vendors.  \nTo be fair, one platform did deliver a better experience than the others. The coordination felt more structured, the team was more prepared, and the overall process matched at least some of the claims made by the app. Not perfect, but definitely closer to what I expected.  \nThis made me realize how wide the gap is between marketing promises and real service quality. The apps look premium, but the accountability often disappears once the movers arrive at your doorstep.  \nAt this point, it is fair to ask whether we are hiring movers or just investing in fancy apps with no real accountability.  \nThis is purely based on my personal experience, and I genuinely want to know:  \nAmong Urban Company, JustDial, MagicBricks and Nobroker, which platform has actually worked well for you?  \n  \nYour suggestions and experiences would really help.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Scope Ambiguity & Incomplete Execution",
    "alternative_mentioned": "Competitor App (NoBroker/etc.)",
    "verbatim_quote": "Are We Paying for Moving Services or Just Paying for the App?"
  },
  {
    "id": "IOS-61447489",
    "source": "Apple App Store (IN)",
    "rating": 1.0,
    "date": "2026-11-07",
    "author": "Sharath_Bandari",
    "raw_text": "My problem is not with the house-help professionals, but with the app and time-slots. Every-time when i try to book urban help at 5 pm or 5:30 pm the app shows exact 6 pm slot and till now no professional showed up at 6 pm every-time the professional wont pick up calls and they will reschedule at other day or give us refund. Now, my question here is when 6pm is not your time then why do you guys keep 6 pm as a time slot. Just frustrating time slots",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "Every-time when i try to book urban help at 5 pm or 5:30 pm the app shows exact 6 pm slot and till now no professional showed up at 6 pm"
  },
  {
    "id": "IOS-61746134",
    "source": "Apple App Store (IN)",
    "rating": 2.0,
    "date": "2026-10-13",
    "author": "Bhaskar Jha",
    "raw_text": "Overpriced product is sold. Inlet valve which is showing at rs. 250 on Amazon was sold by you at Rs 800. The work was of 10 mins but the labour cost charged by you was max 399/-. On top of it, hefty GST. Service was far from customer satisfaction..😔😔",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "Local Technician / Hardware Shop",
    "verbatim_quote": "Overpriced product is sold."
  },
  {
    "id": "GP-5ee89de2-6",
    "source": "Google Play Store (IN)",
    "rating": 5.0,
    "date": "2026-11-05",
    "author": "Ramanand Raman",
    "raw_text": "Great Platform for Make home easy",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_tier": "Unspecified",
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Great Platform for Make home easy"
  },
  {
    "id": "GP-29b8b58f-3",
    "source": "Google Play Store (IN)",
    "rating": 1.0,
    "date": "2026-11-13",
    "author": "Chandana Nagraj",
    "raw_text": "Worst experience in stove repair. don't ask for other repairs other than cleaning. I had booked for stove repair on Oct 27 and completely there was a gas leak in home immediately I have contacted and booked a revisit and which did not happen. We did not have our lunch due to the delay and the company promised for a refund and it did not happen yet.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Post-Payment Support & Warranty Blackout",
    "alternative_mentioned": "None",
    "verbatim_quote": "Worst experience in stove repair. don't ask for other repairs other than cleaning."
  },
  {
    "id": "GP-cdc8b01d-e",
    "source": "Google Play Store (IN)",
    "rating": 1.0,
    "date": "2026-11-07",
    "author": "arun kumar",
    "raw_text": "service staff is good but call center excutive is too much smart and they never co-operate with customer it's shame on urban company",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Post-Payment Support & Warranty Blackout",
    "alternative_mentioned": "None",
    "verbatim_quote": "service staff is good but call center excutive is too much smart and they never co-operate with customer"
  },
  {
    "id": "IOS-92840705",
    "source": "Apple App Store (IN)",
    "rating": 1.0,
    "date": "2026-10-21",
    "author": "Dixeria",
    "raw_text": "Literally the worst app for services, after spending 700+rupees for my laptop repair and check up, after three weeks, immediately after their warranty, may laptop showed signs of it’s problems all over again. Would not recommend and there’s no relevant services or numbers provided",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Post-Payment Support & Warranty Blackout",
    "alternative_mentioned": "None",
    "verbatim_quote": "after spending 700+rupees for my laptop repair and check up, after three weeks, immediately after their warranty, may laptop showed signs of it’s problems all over again."
  },
  {
    "id": "RD-1wmwll5",
    "source": "Reddit r/hyderabad",
    "rating": null,
    "date": "2026-09-22",
    "author": "Quick-Leg7857",
    "raw_text": "Urban company. Soo i recently booked urban company for room cleaning   \nThey cleaned it  \nBut did not ask for otp in the beginning   \nEnd lo they asked not to pay via app  \nThey asked to pay individually   \nAnd asked for otp  \nI asked them its not even showing they filled the otp  \nThey asked they will fill it  \nPayment is done now ( not in the app)😭  \nAnd in the app it is still showing the workers did not come😒",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_tier": "Tier-2+",
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Pro Continuity & Off-App Disintermediation",
    "alternative_mentioned": "Off-App Direct UC Pro",
    "verbatim_quote": "End lo they asked not to pay via app They asked to pay individually And asked for otp"
  },
  {
    "id": "GP-211da961-2",
    "source": "Google Play Store (IN)",
    "rating": 1.0,
    "date": "2026-11-15",
    "author": "Y K Agrawal",
    "raw_text": "I have not found trustworthy rates on app shows different , charged different and invoice different . This there is no match for the rates charges and invoice shared . Forget about what rates were displayed",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "None",
    "verbatim_quote": "I have not found trustworthy rates on app shows different , charged different and invoice different ."
  },
  {
    "id": "RD-1t1pmtw",
    "source": "Reddit r/hyderabad",
    "rating": null,
    "date": "2026-05-02",
    "author": "jarvis6868",
    "raw_text": "Any good affordable vaccum cleaning services in Hyd ?. Looking for good options to get sofa, carpets, office chairs etc. \n\nI see options in Urban Company, but they seem to charge too much.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_tier": "Tier-2+",
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Mixed/Neutral",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "Local Technician / Hardware Shop",
    "verbatim_quote": "I see options in Urban Company, but they seem to charge too much."
  },
  {
    "id": "GP-1b24ee3b-7",
    "source": "Google Play Store (IN)",
    "rating": 5.0,
    "date": "2026-11-17",
    "author": "Ashutosh singh",
    "raw_text": "now service is good then prior",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "now service is good then prior"
  },
  {
    "id": "IOS-73035116",
    "source": "Apple App Store (IN)",
    "rating": 5.0,
    "date": "2026-11-10",
    "author": "Jack Wagh",
    "raw_text": "Nice and useful app 👍🏻",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Nice and useful app 👍🏻"
  },
  {
    "id": "GP-861f6995-0",
    "source": "Google Play Store (IN)",
    "rating": 4.0,
    "date": "2026-11-06",
    "author": "Namrata Panhale",
    "raw_text": "The services are generally good and the staff is helpful. However, I’m reducing one star because the appointments are frequently cancelled or rescheduled by their employees. Customers select a specific time slot based on their schedules, and repeatedly cancelling appointments shows a lack of consideration for the customer's time. I hope they improve their appointment management and respect the customer's chosen time slots.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "The services are generally good and the staff is helpful. However, I’m reducing one star because the appointments are frequently cancelled or rescheduled by their employees."
  },
  {
    "id": "GP-0ee87beb-5",
    "source": "Google Play Store (IN)",
    "rating": 5.0,
    "date": "2026-11-07",
    "author": "Aslam Khan",
    "raw_text": "Excellent and speedy work! Thank you.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Excellent and speedy work! Thank you."
  },
  {
    "id": "GP-de9b91fa-d",
    "source": "Google Play Store (IN)",
    "rating": 1.0,
    "date": "2026-11-04",
    "author": "Sangeeta Chaudhary",
    "raw_text": "slots are not available at any time",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "slots are not available at any time"
  },
  {
    "id": "GP-e99e89e6-b",
    "source": "Google Play Store (IN)",
    "rating": 5.0,
    "date": "2026-11-21",
    "author": "Rai Mukhopadhyay",
    "raw_text": "extremely helpful app for people of all ages, for young office goers, it is EXTREMELY helpful to get jobs done around the house quickly during downtime while for older people, the app interface is easy to use and the professionals provided by the app have good communication to make them understand what is required, what needs to be done and what is the ACTUAL scope of work. 10/10, highly recommend",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "extremely helpful app for people of all ages, for young office goers, it is EXTREMELY helpful to get jobs done around the house quickly"
  },
  {
    "id": "GP-e3370266-0",
    "source": "Google Play Store (IN)",
    "rating": 5.0,
    "date": "2026-11-09",
    "author": "Upin oza",
    "raw_text": "He was excellent and palm message that He was something exceptional. I would rate him 5 on 5. Must recommend",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_tier": "Unspecified",
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "He was excellent and palm message that He was something exceptional."
  },
  {
    "id": "RD-1xd4ri6",
    "source": "Reddit r/hyderabad",
    "rating": null,
    "date": "2026-10-23",
    "author": "New-Foundation-7319",
    "raw_text": "Urban company lady stole my earrings. So recently we lost my nanamma(grandmother) so these four months the entire family stayed in my village. A little more than a month ago I came back to Hyderabad for some work for 2 days and booked urban company cleaning lady. I was out for around 10-15 mins while she was doing her job because I had to eat. Asked my neighbour to watch her. The neighbour didn't watch her properly and it happened during that time. I realised it a day after the service that 1 pair of gold and 1 pair of silver earrings were gone. I escalated this issue on urban company so much and their response was \" please file a police complaint, we will co-operate\" so I had to go back to my village and then talked to my parents about it. They said let's search the entire house before going for it and then I stopped this process. We came back yesterday and realised they were actually gone. Please tell me what I can do.\n\nPs- please don't come at me saying it's my responsibility and it's my negligence and stuff. I know!!!",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_tier": "Tier-1 Metro",
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Other Friction",
    "alternative_mentioned": "None",
    "verbatim_quote": "Urban company lady stole my earrings."
  },
  {
    "id": "IOS-56197430",
    "source": "Apple App Store (IN)",
    "rating": 4.0,
    "date": "2026-11-05",
    "author": "YashaswiniMuthu",
    "raw_text": "Please provide the good stain removal solution for bathroom cleaning",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_tier": "Unspecified",
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Mixed/Neutral",
    "root_cause_theme": "Scope Ambiguity & Incomplete Execution",
    "alternative_mentioned": "None",
    "verbatim_quote": "Please provide the good stain removal solution for bathroom cleaning"
  },
  {
    "id": "IOS-56308905",
    "source": "Apple App Store (IN)",
    "rating": 2.0,
    "date": "2026-11-05",
    "author": "HWRVRG",
    "raw_text": "App is not working well specially during festivals. This happened twice in a month time when partner did not arrive on time & App was stuck for more than hour. I needed to reschedule service for other day & needed to book urgent service from prompts App since UC did not responded",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "Competitor App (NoBroker/etc.)",
    "verbatim_quote": "App is not working well specially during festivals. This happened twice in a month time when partner did not arrive on time & App was stuck for more than hour."
  },
  {
    "id": "GP-7d67e901-7",
    "source": "Google Play Store (IN)",
    "rating": 5.0,
    "date": "2026-11-09",
    "author": "Sujoy Ghosh",
    "raw_text": "Highly satisfied with your services. Keep it up.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_tier": "Unspecified",
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Highly satisfied with your services. Keep it up."
  }
];

const EIGHT_QUESTIONS = [
  {
    q: "1. What do customers expect once a booking is complete?",
    a: "Zero-friction closure and visible accountability: an itemized digital record of what was serviced, parts replaced, and a 1-tap warranty/redo pathway—not a post-payment support blackout (9.3% of all blocker signals)."
  },
  {
    q: "2. How do they decide a home service is needed, and when?",
    a: "Three triggers: (a) Acute breakdowns (AC dripping, flush leak—decided in hours), (b) Cyclical milestones (pre-summer AC, festive cleaning, 30-day salon cycle), and (c) Unprompted dormant needs where UC is forgotten."
  },
  {
    q: "3. Who or what do they turn to for the same or different service?",
    a: "Three primary leakage paths observed in our corpus: (1) Local technicians & hardware shops (42.9% of alternative mentions), (2) Competitor apps like NoBroker (42.9%), and (3) Off-app direct WhatsApp bookings with previous UC pros (14.3%)."
  },
  {
    q: "4. How do customers describe why they did or did not book again?",
    a: "Non-returners cite last-minute slot cancellations (20.9% overall), surprise on-site quotes (14.0% overall; 22.2% on Reddit), and cleaning scope exclusions (22.2% on Reddit). Returners praise standardized SOPs and zero-judgement execution (27.9%)."
  },
  {
    q: "5. What do they do outside the app (locals, neighbours, WhatsApp)?",
    a: "Gated-community residents treat society WhatsApp groups as a trust filter for pre-vetted plumbers/carpenters; cost-conscious households buy spare parts at MRP locally and hire independent technicians."
  },
  {
    q: "6. What separates customers who return from those who do not?",
    a: "Repeaters anchor on fixed-scope standardized SKUs (Salon 14.0%, routine cleaning 14.0%) with predictable bills and pro continuity. Non-returners anchor on open-ended diagnostic repairs or hit slot roulette."
  },
  {
    q: "7. How do patterns differ by category, city, household & channel?",
    a: "App/Play Store detractors spike on Last-Minute Cancellations (20.9%), whereas Reddit India threads (Hyderabad, Mumbai, Delhi, r/india) focus on Scope Ambiguity (22.2%), Diagnostic Upsells (22.2%), and Off-App Pro Bypass (11.1%)."
  },
  {
    q: "8. What unmet needs emerge consistently across conversations?",
    a: "(1) Pre-job scope & spare-part quote verification, (2) Slot reliability protection, (3) Ability to re-book 'My Trusted Pro' in-app, and (4) Digital service receipts with 1-tap warranty."
  }
];

const OPPORTUNITIES = [
  {
    rank: "P0",
    title: "Interactive Pre-Job Scope & Benchmark Quote Verifier",
    targetCohort: "AC & Appliance Repair (14.0%), Deep Cleaning (14.0%)",
    signalShare: "23.3% overall (44.4% of Reddit peer threads)",
    mechanism: "Eliminates surprise on-site gas/spare-part upsell shock and cleaning exclusion disputes via visual 'Included vs. Excluded' checklists and benchmark part rate cards.",
    impact: "High (+90d Repeat & Conversion)"
  },
  {
    rank: "P0",
    title: "Slot Reliability Shield & Proactive Backup Lock",
    targetCohort: "Salon & Spa (14.0%), Time-Sensitive Bookings",
    signalShare: "20.9% overall (#1 App/Play Store blocker)",
    mechanism: "Locks a standby backup partner 2 hours prior to high-risk slots and surfaces instant 1-tap alternative windows before last-minute cancellation occurs.",
    impact: "High (Prevents 1st-Booking Churn)"
  },
  {
    rank: "P1",
    title: "'My Trusted Pro' Preferred Re-Booking & Digital Job Card",
    targetCohort: "Satisfied 1st-Timers across Salon, Cleaning & Handyman",
    signalShare: "39.5% combined (27.9% SOP Praise + 9.3% Support + 2.3% Continuity)",
    mechanism: "Lets customers favorite and priority-request their previous vetted pro in-app (stopping WhatsApp disintermediation) alongside an itemized digital warranty receipt.",
    impact: "Medium-High (30-60d Cadence Lock-in)"
  }
];

export default function App() {
  const [corpus, setCorpus] = useState(INITIAL_CORPUS);
  const [datasetLabel, setDatasetLabel] = useState(
    `Verified India Core Corpus (${INITIAL_CORPUS.length} Multi-Source Records)`
  );
  const [activeTab, setActiveTab] = useState("corpus");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStratum, setSelectedStratum] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(INITIAL_CORPUS[0]);

  const [testInput, setTestInput] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractorResult, setExtractorResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCorpus(parsed);
          setSelectedItem(parsed[0]);
          setDatasetLabel(`${file.name} (${parsed.length} Verified India Core Records)`);
        } else {
          alert("Uploaded JSON must be a non-empty array of tagged records.");
        }
      } catch (err) {
        alert("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
  };

  const stats = useMemo(() => {
    const total = corpus.length;
    const byTheme = {};
    const bySource = {};
    const byStratum = {};
    corpus.forEach((item) => {
      const t = item.root_cause_theme || "Other Friction";
      const s = item.source || "Unknown";
      const st = item.stratum || "Unspecified";
      byTheme[t] = (byTheme[t] || 0) + 1;
      bySource[s] = (bySource[s] || 0) + 1;
      byStratum[st] = (byStratum[st] || 0) + 1;
    });
    const sortedThemes = Object.entries(byTheme)
      .map(([name, count]) => ({ name, count, pct: ((count / total) * 100).toFixed(1) }))
      .sort((a, b) => b.count - a.count);
    return { total, sortedThemes, bySource, byStratum };
  }, [corpus]);

  const filteredCorpus = useMemo(() => {
    return corpus.filter((item) => {
      const catMatch = selectedCategory === "ALL" || item.category === selectedCategory;
      const stratMatch = selectedStratum === "ALL" || item.stratum === selectedStratum;
      const q = searchQuery.toLowerCase();
      const textMatch =
        !q ||
        (item.verbatim_quote || "").toLowerCase().includes(q) ||
        (item.raw_text || "").toLowerCase().includes(q) ||
        (item.source || "").toLowerCase().includes(q) ||
        (item.root_cause_theme || "").toLowerCase().includes(q);
      return catMatch && stratMatch && textMatch;
    });
  }, [corpus, selectedCategory, selectedStratum, searchQuery]);

  const runLiveExtractor = async () => {
    if (!testInput.trim()) return;
    setIsExtracting(true);
    setExtractorResult(null);

    const apiKey = (typeof import.meta !== "undefined" && import.meta.env?.VITE_GEMINI_API_KEY) || "";
    if (!apiKey) {
      setExtractorResult({
        error: "Add VITE_GEMINI_API_KEY in Vercel/AI Studio environment variables to run live extraction."
      });
      setIsExtracting(false);
      return;
    }

    const prompt = `You are the Urban Company India Discovery Engine. Analyze this customer feedback:
"${testInput}"
Return ONLY valid JSON with keys:
- is_valid_india_core (boolean: false if outside India or about InstaHelp / 30-min instant maid)
- exclusion_reason (string)
- category (one of: "AC & Appliance Repair", "Salon & Spa", "Deep Cleaning & Pest Control", "Plumbing, Electrical & Carpentry", "Painting & Home Improvement", "General Multi-Category")
- city_tier (one of: "Tier-1 Metro", "Tier-2+", "Unspecified")
- stratum (one of: "Detractor (1-2★ / Trustpilot)", "Peer Discussion (Reddit)", "Neutral/Positive (3-5★)")
- sentiment_direction (one of: "Repeat Driver", "Repeat Blocker", "Mixed/Neutral")
- root_cause_theme (one of: "Diagnostic & Spare-Part Upsell Distrust", "Last-Minute Cancellation & Slot Roulette", "Post-Payment Support & Warranty Blackout", "Scope Ambiguity & Incomplete Execution", "Pro Continuity & Off-App Disintermediation", "Standardized SOP & Convenience Praise", "Other Friction")
- alternative_mentioned (string)
- verbatim_quote (string)`;

    try {
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        }
      );
      const data = await resp.json();
      const rawJson = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawJson) {
        const parsed = JSON.parse(rawJson);
        setExtractorResult(parsed);
        if (parsed.is_valid_india_core) {
          const newRecord = {
            id: `LIVE-${Date.now().toString().slice(-4)}`,
            source: "Live Evaluator Input",
            rating: null,
            date: new Date().toISOString().slice(0, 10),
            raw_text: testInput,
            ...parsed
          };
          setCorpus((prev) => [newRecord, ...prev]);
          setSelectedItem(newRecord);
        }
      } else {
        setExtractorResult({ error: data?.error?.message || "No response from Gemini API." });
      }
    } catch (err) {
      setExtractorResult({ error: err.message });
    }
    setIsExtracting(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/90 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow">
            UC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-base tracking-tight text-white">
                Urban Company AI Discovery Studio
              </h1>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                India • Ex-InstaHelp
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Consumer Growth PM Case • Goal: Lift 90-Day Repeat Bookings (~84% NTV Engine)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload verified_uc_corpus.json
          </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        <aside className="lg:col-span-3 border-r border-slate-800 bg-slate-900/40 p-4 space-y-5 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-400" /> Active Corpus Status
            </div>
            <div className="text-2xl font-bold text-white">
              {stats.total} <span className="text-xs font-normal text-slate-400">verified records</span>
            </div>
            <div className="text-[11px] text-indigo-300 bg-indigo-950/60 border border-indigo-800/50 rounded px-2 py-1">
              {datasetLabel}
            </div>
            <div className="pt-1 space-y-1">
              {Object.entries(stats.bySource).map(([src, cnt]) => (
                <div key={src} className="flex justify-between text-xs text-slate-300">
                  <span className="truncate pr-2">{src}</span>
                  <span className="font-mono text-slate-400">{cnt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Scope & PM Constraints
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Region locked to India (IN)
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> InstaHelp / 30-min maid excluded
              </li>
              <li className="flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" /> Zero discounts / coupons / memberships
              </li>
              <li className="flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" /> Zero pricing or partner payout changes
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-indigo-400" /> Slice Evidence
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Core Service Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white"
              >
                <option value="ALL">All Core Categories</option>
                <option value="AC & Appliance Repair">AC & Appliance Repair</option>
                <option value="Salon & Spa">Salon & Spa</option>
                <option value="Deep Cleaning & Pest Control">Deep Cleaning & Pest Control</option>
                <option value="Plumbing, Electrical & Carpentry">Plumbing, Electrical & Carpentry</option>
                <option value="Painting & Home Improvement">Painting & Home Improvement</option>
                <option value="General Multi-Category">General Multi-Category</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Bias Correction Stratum</label>
              <select
                value={selectedStratum}
                onChange={(e) => setSelectedStratum(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white"
              >
                <option value="ALL">All Strata (Combined)</option>
                <option value="Peer Discussion (Reddit)">Peer Discussion (Reddit)</option>
                <option value="Detractor (1-2★ / Trustpilot)">Detractor (1-2★ / Trustpilot)</option>
                <option value="Neutral/Positive (3-5★)">Neutral/Positive (3-5★)</option>
              </select>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-6 p-5 overflow-y-auto space-y-5">
          <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {[
              { id: "corpus", label: "1. Corpus & Theme Distribution", icon: BarChart3 },
              { id: "questions", label: "2. 8-Question Synthesis", icon: MessageSquareQuote },
              { id: "opportunities", label: "3. Opportunity Matrix", icon: Layers },
              { id: "evidence", label: "4. AI Evidence & Bias Log", icon: Cpu }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/70"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab === "corpus" && (
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-white">Causal Theme Breakdown (Active Corpus)</h2>
                  <span className="text-xs text-slate-400">N = {stats.total}</span>
                </div>
                <div className="space-y-2.5">
                  {stats.sortedThemes.map((t) => (
                    <div key={t.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-200">{t.name}</span>
                        <span className="font-mono text-indigo-300">{t.count} ({t.pct}%)</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${Math.min(100, Number(t.pct))}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search verbatim quotes, sources (Reddit, Play Store, App Store), or root causes..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500"
                />
              </div>

              <div className="space-y-2.5">
                {filteredCorpus.slice(0, 60).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer ${
                      selectedItem?.id === item.id
                        ? "bg-indigo-950/40 border-indigo-500/60"
                        : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                          {item.source}
                        </span>
                        <span className="text-[11px] text-indigo-300">{item.category}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{item.stratum}</span>
                    </div>
                    <p className="text-xs text-slate-200 italic">"{item.verbatim_quote || item.raw_text}"</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {item.root_cause_theme}
                      </span>
                      {item.alternative_mentioned && item.alternative_mentioned !== "None" && (
                        <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                          Leakage: {item.alternative_mentioned}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "questions" && (
            <div className="space-y-3">
              {EIGHT_QUESTIONS.map((item, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1.5">
                  <h3 className="text-xs font-semibold text-indigo-300">{item.q}</h3>
                  <p className="text-xs text-slate-200 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "opportunities" && (
            <div className="space-y-3">
              <div className="bg-indigo-950/40 border border-indigo-800/50 rounded-xl p-3.5 text-xs text-indigo-200">
                All opportunities operate strictly on the <strong>customer experience layer</strong> (zero discounts, pricing changes, or partner payout edits) to move 90-day repeat bookings.
              </div>
              {OPPORTUNITIES.map((opp, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">
                      {opp.rank}
                    </span>
                    <span className="text-xs font-medium text-emerald-300">{opp.impact}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{opp.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{opp.mechanism}</p>
                  <div className="pt-1 flex flex-wrap gap-3 text-[11px] text-slate-400">
                    <span><strong>Anchor Cohort:</strong> {opp.targetCohort}</span>
                    <span><strong>Evidence Weight:</strong> {opp.signalShare}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "evidence" && (
            <div className="space-y-4 text-xs text-slate-300">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <h3 className="text-sm font-semibold text-white">1. Pipeline Architecture & Quality Gatekeepers</h3>
                <p>
                  Multi-source ingestion across <strong>Google Play Store (IN)</strong>, <strong>Apple App Store (IN)</strong>, and <strong>Indian Reddit communities</strong> (<code>r/hyderabad</code>, <code>r/mumbai</code>, <code>r/india</code>, <code>r/delhi</code>) + UC DRHP/Shareholder baselines (~84% NTV from repeat users).
                </p>
                <p>
                  Pydantic-enforced LLM classification strips non-India geographies, excludes <strong>InstaHelp / 30-min instant maid</strong> mentions, and binds every normalized root-cause tag to an exact verbatim quote.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> 2. Explicit Bias-Correction Protocol
                </h3>
                <ul className="list-disc pl-4 space-y-1.5">
                  <li>
                    <strong>Negativity Skew Correction:</strong> Public review boards over-index on 1-star acute failures. Stratifying into <em>Detractors (19)</em>, <em>Neutral/Positive (15)</em>, and <em>Peer Discussions (9)</em> revealed that while app store detractors spike on Slot Roulette (20.9%), Reddit household discussions uncover Scope Ambiguity (22.2%) and Diagnostic Upsell Distrust (22.2%).
                  </li>
                  <li>
                    <strong>Silent Churn Modeling:</strong> Customers who quietly churn leave no app review trace. Tagging off-app alternatives across peer forums captured direct leakage to Local Technicians/Hardware Shops, Competitor Apps (NoBroker), and Off-App Direct UC Pros (11.1% of Reddit threads).
                  </li>
                </ul>
              </div>
            </div>
          )}
        </main>

        <aside className="lg:col-span-3 border-l border-slate-800 bg-slate-900/40 p-4 space-y-4 overflow-y-auto">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-3.5 space-y-2.5">
            <div className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Live AI Gatekeeper & Tagger
            </div>
            <p className="text-[11px] text-slate-400">
              Paste any Indian customer review or Reddit post to test scope filtering & causal JSON extraction live:
            </p>
            <textarea
              rows={3}
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="e.g., Booked UC salon in Pune, loved the beautician Priya, wish I could book her specifically next month..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white placeholder-slate-600"
            />
            <button
              onClick={runLiveExtractor}
              disabled={isExtracting}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-medium py-2 rounded-lg transition cursor-pointer"
            >
              {isExtracting ? "Running Gemini Gatekeeper..." : "Run Live Causal Extraction"}
            </button>

            {extractorResult && (
              <pre className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-[10px] text-emerald-300 overflow-x-auto max-h-48">
                {JSON.stringify(extractorResult, null, 2)}
              </pre>
            )}
          </div>

          {selectedItem && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <FileJson className="w-3.5 h-3.5 text-indigo-400" /> Structured Record Inspector
              </div>
              <pre className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-[10px] text-slate-300 overflow-x-auto max-h-80">
                {JSON.stringify(selectedItem, null, 2)}
              </pre>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}