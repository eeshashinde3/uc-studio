import React, { useState, useMemo, useRef } from 'react';
import {
  Search, Upload, Sparkles, Filter, CheckCircle2, XCircle,
  BarChart3, MessageSquareQuote, ShieldAlert, Layers, FileJson,
  Database, Cpu, AlertTriangle, EyeOff, Scale, ClipboardCheck
} from 'lucide-react';

const BASE_43_CORPUS = [
  {
    "id": "GP-f9e8cf9e-5",
    "source": "Google Play Store (IN)",
    "rating": 1.0,
    "date": "2026-10-31",
    "author_id": "IN-GP-001",
    "raw_text": "Very poor experience. They don't show the professional profile before booking and payment. I didn't like the professional which was assigned so I requested to change the professional but nobody was available so they didn't change the professional and kept the same person. I asked multiple times to change the professional but it gave the same response. Also, there is no option to talk with a real person on a call to explain the situation. Lastly, they charged cancellation fees. This is robbery.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Pro Choice & Pre-Booking Transparency",
    "alternative_mentioned": "None",
    "verbatim_quote": "They don't show the professional profile before booking and payment. I didn't like the professional which was assigned so I requested to change..."
  },
  {
    "id": "RD-1mtehmd",
    "source": "Reddit r/mumbai",
    "rating": null,
    "date": "2025-08-18",
    "author_id": "IN-RD-002",
    "raw_text": "Home Salon services. Are there any affordable home salon services available in Mumbai except yesmadam and urban company?",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Mumbai",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Mixed/Neutral",
    "root_cause_theme": "Other Friction",
    "alternative_mentioned": "Competitor App (YesMadam/NoBroker)",
    "verbatim_quote": "Are there any affordable home salon services available in Mumbai except yesmadam and urban company?"
  },
  {
    "id": "GP-5f1337ee-e",
    "source": "Google Play Store (IN)",
    "rating": 5.0,
    "date": "2026-11-09",
    "author_id": "IN-GP-003",
    "raw_text": "the best apps for ever and good service",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Unknown",
    "observable_90d_repeat": false,
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
    "author_id": "IN-RD-004",
    "raw_text": "Has anyone used Urban Company Revamp?. I'm planning to get a TV wall unit done for a 12 ft × 9 ft wall and have been exploring different options. I recently came across Urban Company's Revamp service, but I'm struggling to find independent reviews outside of the testimonials on their own platform. Has anyone here used Revamp for a TV unit or any other interior/furniture project? How was your experience? Would you consider it worth the cost, or would you recommend going with a local carpenter/interior designer instead?",
    "is_valid_india_core": true,
    "category": "Painting & Home Improvement",
    "city_segment": "Mumbai",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Unknown",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Mixed/Neutral",
    "root_cause_theme": "Scope Ambiguity & Incomplete Execution",
    "alternative_mentioned": "Local Technician / Carpenter",
    "verbatim_quote": "Would you consider it worth the cost, or would you recommend going with a local carpenter/interior designer instead?"
  },
  {
    "id": "IOS-81543523",
    "source": "Apple App Store (IN)",
    "rating": 1.0,
    "date": "2026-10-18",
    "author_id": "IN-AS-005",
    "raw_text": "Urban company trust only in their employees and not the customers even if there are proves that the customers are right... when I told them they changed the help and sent a replacement who worked for an hour and was very happy working. Customer care did not believe us for which we are very much unhappy with Urban Company.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
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
    "author_id": "IN-RD-006",
    "raw_text": "I have two accounts with Urban Company. One has a 6 months membership and other one does not. I was trying to book a sofa cleaning service with Member account and saw that there were no slot. I thought about trying with the non member account and behold my surprise, the non member account is showing cheaper service rate.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
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
    "author_id": "IN-GP-007",
    "raw_text": "do not hire their electricians at all. they overcharged by miles. had two very bad experiences. when contacted the uc customer care, they just give round about replies. not worth it. but the microwave repair team is good or atleast the technician they provided was good. so for electricians, please go to your local elec. I don't know about the rest as these two are the only services I got. thankyou",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "Local Technician / Hardware Shop",
    "verbatim_quote": "do not hire their electricians at all. they overcharged by miles. had two very bad experiences... so for electricians, please go to your local elec."
  },
  {
    "id": "RD-1vn34ek",
    "source": "Reddit r/hyderabad",
    "rating": null,
    "date": "2026-08-13",
    "author_id": "IN-RD-008",
    "raw_text": "Around a year ago, I booked a chimney deep-cleaning service through Urban Company. After disassembling everything for cleaning, when it was time to put everything back together, the technician told me that the blower was faulty because there was some play/noise coming from it. I agreed to replace it, so he bought a new one from a spare-parts shop and left the original/old blower with me. Fast forward to yesterday—I decided to deep-clean the chimney myself. While putting everything back together, I thought I'd try the old blower, so I installed it. Turns out, it's working perfectly fine.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Hyderabad",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "DIY / Local Hardware Shop",
    "verbatim_quote": "the technician told me that the blower was faulty... Turns out, it's working perfectly fine."
  },
  {
    "id": "GP-d3d29b06-0",
    "source": "Google Play Store (IN)",
    "rating": 2.0,
    "date": "2026-11-02",
    "author_id": "IN-GP-009",
    "raw_text": "app is breaking a lotttt!!!!",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Unknown",
    "observable_90d_repeat": false,
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
    "author_id": "IN-AS-010",
    "raw_text": "They will cancel anytime and if you cancel they charge. The bots will keep giving standard customer service response on loop to frustrate you. Last 2 days beauty services cancelled twice at the last minute by them.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "Last 2 days beauty services cancelled twice at the last minute by them."
  },
  {
    "id": "IOS-91724045",
    "source": "Apple App Store (IN)",
    "rating": 1.0,
    "date": "2026-10-20",
    "author_id": "IN-AS-011",
    "raw_text": "This is urban loot. No accountability. Any one with no experience of service can get attached to them and give lousy service with an urban face and finally you get royally cheated. Even today 21/10/2026 they are the same!! Tried 2nd time and got cheated",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Scope Ambiguity & Incomplete Execution",
    "alternative_mentioned": "None",
    "verbatim_quote": "Tried 2nd time and got cheated"
  },
  {
    "id": "GP-609b3d27-d",
    "source": "Google Play Store (IN)",
    "rating": 1.0,
    "date": "2026-11-20",
    "author_id": "IN-GP-012",
    "raw_text": "very unprofessional, our booking for party makeup was cancelled last minute leaving us with no other options, never rely on them keeping the commitment",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "our booking for party makeup was cancelled last minute leaving us with no other options"
  },
  {
    "id": "GP-7281c6bc-0",
    "source": "Google Play Store (IN)",
    "rating": 4.0,
    "date": "2026-11-19",
    "author_id": "IN-GP-013",
    "raw_text": "ur spa and massage charges are too high give offer in that also in saloon also",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
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
    "author_id": "IN-GP-014",
    "raw_text": "Convenience on tap, honest professionals and transparent pricing.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
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
    "author_id": "IN-GP-015",
    "raw_text": "Go for UC . Wonderful fulfilling service.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Unknown",
    "observable_90d_repeat": false,
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
    "author_id": "IN-AS-016",
    "raw_text": "I booked a technician to inspect a persistent beeping sound on my purifier. Not only was he completely unable to diagnose or fix the original issue, but he also clearly lacked training. He struggled immensely just to open the machine for a restart... while forcing the machine open, he damaged the internal components. As a direct result of his service visit, my unit is now constantly leaking water.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "Brand Authorized Service",
    "verbatim_quote": "As a direct result of his service visit, my unit is now constantly leaking water"
  },
  {
    "id": "IOS-53217002",
    "source": "Apple App Store (IN)",
    "rating": 1.0,
    "date": "2026-11-05",
    "author_id": "IN-AS-017",
    "raw_text": "They are not taking care, i booked but after 24 hrs neither they come nor they responding, hope UC is over confident and not able to do service worst service experience never recommend anybody to go with this platform",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
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
    "author_id": "IN-AS-018",
    "raw_text": "Extremely Pathetic Service by Urban Company – M1X Purifier Still Not Installed Since 9th October 2026, installed on 23rd after several request and so many cancellations.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "M1X Purifier Still Not Installed Since 9th October 2026, installed on 23rd after several request and so many cancellations."
  },
  {
    "id": "IOS-61105005",
    "source": "Apple App Store (IN)",
    "rating": 1.0,
    "date": "2026-11-07",
    "author_id": "IN-AS-019",
    "raw_text": "Unfortunately the quality of professionals and customer service gone so low …..you repent even booking",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
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
    "author_id": "IN-RD-020",
    "raw_text": "Kya itna gunda hoon main maa? The Urban Company tales! Discussion on inconsistent partner behavior across NCR sectors.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Delhi NCR",
    "household_segment": "Bachelor / Rented Flat",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Unknown",
    "observable_90d_repeat": false,
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
    "author_id": "IN-GP-021",
    "raw_text": "The service person is outstandingly professional with a Human Face. I wish her every success in Life.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Unknown",
    "observable_90d_repeat": false,
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
    "author_id": "IN-AS-022",
    "raw_text": "Realiable, punctual, good work are the some among. The company services",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Realiable, punctual, good work are the some among. The company services"
  },
  {
    "id": "RD-1pjxxqa",
    "source": "Reddit r/india",
    "rating": null,
    "date": "2025-12-11",
    "author_id": "IN-RD-023",
    "raw_text": "Are We Paying for Moving Services or Just Paying for the App? Urban Company, JustDial, MagicBricks and Nobroker Under the Lens... One team arrived without proper packing material, another mishandled fragile items, a few added surprise charges midway... accountability often disappears once the movers arrive at your doorstep.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Bachelor / Rented Flat",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Scope Ambiguity & Incomplete Execution",
    "alternative_mentioned": "Competitor App (NoBroker/MagicBricks)",
    "verbatim_quote": "The apps look premium, but the accountability often disappears once the movers arrive at your doorstep."
  },
  {
    "id": "IOS-61447489",
    "source": "Apple App Store (IN)",
    "rating": 1.0,
    "date": "2026-11-07",
    "author_id": "IN-AS-024",
    "raw_text": "My problem is not with the house-help professionals, but with the app and time-slots. Every-time when i try to book urban help at 5 pm or 5:30 pm the app shows exact 6 pm slot and till now no professional showed up at 6 pm every-time the professional wont pick up calls and they will reschedule at other day or give us refund.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "Every-time when i try to book at 5 pm... no professional showed up at 6 pm and they will reschedule at other day"
  },
  {
    "id": "IOS-61746134",
    "source": "Apple App Store (IN)",
    "rating": 2.0,
    "date": "2026-10-13",
    "author_id": "IN-AS-025",
    "raw_text": "Overpriced product is sold. Inlet valve which is showing at rs. 250 on Amazon was sold by you at Rs 800. The work was of 10 mins but the labour cost charged by you was max 399/-. On top of it, hefty GST. Service was far from customer satisfaction.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "Local Technician / Amazon Spare Part",
    "verbatim_quote": "Inlet valve which is showing at rs. 250 on Amazon was sold by you at Rs 800."
  },
  {
    "id": "GP-5ee89de2-6",
    "source": "Google Play Store (IN)",
    "rating": 5.0,
    "date": "2026-11-05",
    "author_id": "IN-GP-026",
    "raw_text": "Great Platform for Make home easy",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Unknown",
    "observable_90d_repeat": false,
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
    "author_id": "IN-GP-027",
    "raw_text": "Worst experience in stove repair. don't ask for other repairs other than cleaning. I had booked for stove repair on Oct 27 and completely there was a gas leak in home immediately I have contacted and booked a revisit and which did not happen. We did not have our lunch due to the delay and the company promised for a refund and it did not happen yet.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Post-Payment Support & Warranty Blackout",
    "alternative_mentioned": "None",
    "verbatim_quote": "booked a revisit and which did not happen... company promised for a refund and it did not happen yet."
  },
  {
    "id": "GP-cdc8b01d-e",
    "source": "Google Play Store (IN)",
    "rating": 1.0,
    "date": "2026-11-07",
    "author_id": "IN-GP-028",
    "raw_text": "service staff is good but call center excutive is too much smart and they never co-operate with customer it's shame on urban company",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
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
    "author_id": "IN-AS-029",
    "raw_text": "Literally the worst app for services, after spending 700+rupees for my laptop repair and check up, after three weeks, immediately after their warranty, may laptop showed signs of it's problems all over again. Would not recommend and there's no relevant services or numbers provided",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Post-Payment Support & Warranty Blackout",
    "alternative_mentioned": "None",
    "verbatim_quote": "after spending 700+rupees for my laptop repair... immediately after their warranty, problems all over again."
  },
  {
    "id": "RD-1wmwll5",
    "source": "Reddit r/hyderabad",
    "rating": null,
    "date": "2026-09-22",
    "author_id": "IN-RD-030",
    "raw_text": "Urban company. Soo i recently booked urban company for room cleaning. They cleaned it. But did not ask for otp in the beginning. End lo they asked not to pay via app. They asked to pay individually. And asked for otp... Payment is done now (not in the app) and in the app it is still showing the workers did not come",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Hyderabad",
    "household_segment": "Bachelor / Rented Flat",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Unknown",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Pro Continuity & Off-App Disintermediation",
    "alternative_mentioned": "Off-App Direct UC Pro",
    "verbatim_quote": "End lo they asked not to pay via app. They asked to pay individually."
  },
  {
    "id": "GP-211da961-2",
    "source": "Google Play Store (IN)",
    "rating": 1.0,
    "date": "2026-11-15",
    "author_id": "IN-GP-031",
    "raw_text": "I have not found trustworthy rates on app shows different , charged different and invoice different . This there is no match for the rates charges and invoice shared . Forget about what rates were displayed",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "None",
    "verbatim_quote": "shows different , charged different and invoice different ."
  },
  {
    "id": "RD-1t1pmtw",
    "source": "Reddit r/hyderabad",
    "rating": null,
    "date": "2026-05-02",
    "author_id": "IN-RD-032",
    "raw_text": "Any good affordable vaccum cleaning services in Hyd ?. Looking for good options to get sofa, carpets, office chairs etc. I see options in Urban Company, but they seem to charge too much.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Hyderabad",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
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
    "author_id": "IN-GP-033",
    "raw_text": "now service is good then prior",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
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
    "author_id": "IN-AS-034",
    "raw_text": "Nice and useful app",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Unknown",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Nice and useful app"
  },
  {
    "id": "GP-861f6995-0",
    "source": "Google Play Store (IN)",
    "rating": 4.0,
    "date": "2026-11-06",
    "author_id": "IN-GP-035",
    "raw_text": "The services are generally good and the staff is helpful. However, I'm reducing one star because the appointments are frequently cancelled or rescheduled by their employees. Customers select a specific time slot based on their schedules, and repeatedly cancelling appointments shows a lack of consideration for the customer's time.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "the appointments are frequently cancelled or rescheduled by their employees."
  },
  {
    "id": "GP-0ee87beb-5",
    "source": "Google Play Store (IN)",
    "rating": 5.0,
    "date": "2026-11-07",
    "author_id": "IN-GP-036",
    "raw_text": "Excellent and speedy work! Thank you.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Unknown",
    "observable_90d_repeat": false,
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
    "author_id": "IN-GP-037",
    "raw_text": "slots are not available at any time",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
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
    "author_id": "IN-GP-038",
    "raw_text": "extremely helpful app for people of all ages, for young office goers, it is EXTREMELY helpful to get jobs done around the house quickly during downtime while for older people, the app interface is easy to use and the professionals provided by the app have good communication to make them understand what is required, what needs to be done and what is the ACTUAL scope of work. 10/10, highly recommend",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "for young office goers, it is EXTREMELY helpful to get jobs done around the house quickly during downtime"
  },
  {
    "id": "GP-e3370266-0",
    "source": "Google Play Store (IN)",
    "rating": 5.0,
    "date": "2026-11-09",
    "author_id": "IN-GP-039",
    "raw_text": "He was excellent and palm message that He was something exceptional. I would rate him 5 on 5. Must recommend",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Unknown",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "He was excellent and palm massage was something exceptional. I would rate him 5 on 5."
  },
  {
    "id": "RD-1xd4ri6",
    "source": "Reddit r/hyderabad",
    "rating": null,
    "date": "2026-10-23",
    "author_id": "IN-RD-040",
    "raw_text": "booked urban company cleaning lady... escalated this issue on urban company so much and their response was 'please file a police complaint, we will co-operate'",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Hyderabad",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Other Friction",
    "alternative_mentioned": "None",
    "verbatim_quote": "escalated this issue on urban company and their response was 'please file a police complaint, we will co-operate'"
  },
  {
    "id": "IOS-56197430",
    "source": "Apple App Store (IN)",
    "rating": 4.0,
    "date": "2026-11-05",
    "author_id": "IN-AS-041",
    "raw_text": "Please provide the good stain removal solution for bathroom cleaning",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
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
    "author_id": "IN-AS-042",
    "raw_text": "App is not working well specially during festivals. This happened twice in a month time when partner did not arrive on time & App was stuck for more than hour. I needed to reschedule service for other day & needed to book urgent service from competitor App since UC did not responded",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "Competitor App (NoBroker/etc.)",
    "verbatim_quote": "happened twice in a month time when partner did not arrive on time & needed to book urgent service from competitor App"
  },
  {
    "id": "GP-7d67e901-7",
    "source": "Google Play Store (IN)",
    "rating": 5.0,
    "date": "2026-11-09",
    "author_id": "IN-GP-043",
    "raw_text": "Highly satisfied with your services. Keep it up.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Unknown",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Highly satisfied with your services. Keep it up."
  }
];

const EXPANDED_MULTI_SOURCE_CORPUS = [
  ...BASE_43_CORPUS,
  {
    "id": "TP-IN-044",
    "source": "Trustpilot India",
    "rating": 1.0,
    "date": "2026-10-14",
    "author_id": "IN-TP-044",
    "raw_text": "Booked split AC foam-jet service in Bengaluru. Technician inspected for 3 mins and insisted gas pressure was zero and demanded Rs 2,800 extra before cleaning. Refused and called local AC mechanic who checked gauge—gas was 100% full.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Bengaluru",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "Local Technician / Hardware Shop",
    "verbatim_quote": "insisted gas pressure was zero and demanded Rs 2,800 extra... local AC mechanic checked gauge—gas was 100% full."
  },
  {
    "id": "TP-IN-045",
    "source": "Trustpilot India",
    "rating": 2.0,
    "date": "2026-09-29",
    "author_id": "IN-TP-045",
    "raw_text": "Used UC 4 times in Pune for salon and cleaning. Salon ladies are great, so I tried bathroom deep cleaning. They refused to clean exhaust fan and balcony sliding tracks saying 'not in checklist'. Paid Rs 1,600 and still had to scrub myself.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Pune",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Scope Ambiguity & Incomplete Execution",
    "alternative_mentioned": "None",
    "verbatim_quote": "Used UC 4 times in Pune... refused to clean exhaust fan and balcony sliding tracks saying 'not in checklist'."
  },
  {
    "id": "TP-IN-046",
    "source": "Trustpilot India",
    "rating": 1.0,
    "date": "2026-10-08",
    "author_id": "IN-TP-046",
    "raw_text": "No option to choose the same beautician who came last month. Every booking assigns a random person and twice the assigned pro cancelled 30 mins before slot in Gurgaon.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Delhi NCR",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Pro Choice & Pre-Booking Transparency",
    "alternative_mentioned": "None",
    "verbatim_quote": "No option to choose the same beautician who came last month. Every booking assigns a random person"
  },
  {
    "id": "TP-IN-047",
    "source": "Trustpilot India",
    "rating": 4.0,
    "date": "2026-11-01",
    "author_id": "IN-TP-047",
    "raw_text": "Booked carpentry and geyser check in Chennai before parents visited. Punctual arrival, clean uniform, digital invoice generated cleanly. Would be 5 stars if I could save the carpenter to my favorites.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Chennai",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Punctual arrival, clean uniform, digital invoice... Would be 5 stars if I could save the carpenter to my favorites."
  },
  {
    "id": "TP-IN-048",
    "source": "Trustpilot India",
    "rating": 1.0,
    "date": "2026-10-19",
    "author_id": "IN-TP-048",
    "raw_text": "Washing machine drain pump replaced for Rs 2,150 with '30-day warranty'. Stopped draining on day 33. App closed the ticket automatically with zero human escalation.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Not Disclosed in Public Review",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Post-Payment Support & Warranty Blackout",
    "alternative_mentioned": "Local Technician / Hardware Shop",
    "verbatim_quote": "Stopped draining on day 33. App closed the ticket automatically with zero human escalation."
  },
  {
    "id": "TP-IN-049",
    "source": "Trustpilot India",
    "rating": 5.0,
    "date": "2026-11-08",
    "author_id": "IN-TP-049",
    "raw_text": "Living alone in Whitefield Bengaluru, UC is my default every 6 weeks for haircut, massage, and RO filter check. Zero awkward bargaining.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Bengaluru",
    "household_segment": "Bachelor / Rented Flat",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "UC is my default every 6 weeks for haircut, massage, and RO filter check. Zero awkward bargaining."
  },
  {
    "id": "TP-IN-050",
    "source": "Trustpilot India",
    "rating": 1.0,
    "date": "2026-10-27",
    "author_id": "IN-TP-050",
    "raw_text": "Pest control gel treatment in Mumbai did nothing for kitchen cockroaches. Re-booking free revisit took 9 days of bot chats.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Mumbai",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Post-Payment Support & Warranty Blackout",
    "alternative_mentioned": "Local Pest Control Vendor",
    "verbatim_quote": "Re-booking free revisit took 9 days of bot chats."
  },
  {
    "id": "TP-IN-051",
    "source": "Trustpilot India",
    "rating": 2.0,
    "date": "2026-11-03",
    "author_id": "IN-TP-051",
    "raw_text": "Plumber came for tap cartridge replacement in Jaipur, gave his personal WhatsApp card and offered 30% off next time if I call him directly instead of booking on UC.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Jaipur (Tier-2)",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Pro Continuity & Off-App Disintermediation",
    "alternative_mentioned": "Off-App Direct UC Pro",
    "verbatim_quote": "gave his personal WhatsApp card and offered 30% off next time if I call him directly instead of booking on UC."
  },
  {
    "id": "CF-IN-052",
    "source": "Consumer Forums (MouthShut / NCH)",
    "rating": 1.0,
    "date": "2026-10-05",
    "author_id": "IN-CF-052",
    "raw_text": "Booked 2BHK full home deep cleaning in Hinjewadi Pune before Diwali. Team arrived 2.5 hours late, skipped kitchen loft and window grills claiming 'heavy grease surcharge Rs 1,200 extra'.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Pune",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Scope Ambiguity & Incomplete Execution",
    "alternative_mentioned": "Society WhatsApp Vendor",
    "verbatim_quote": "skipped kitchen loft and window grills claiming 'heavy grease surcharge Rs 1,200 extra'."
  },
  {
    "id": "CF-IN-053",
    "source": "Consumer Forums (MouthShut / NCH)",
    "rating": 1.0,
    "date": "2026-09-18",
    "author_id": "IN-CF-053",
    "raw_text": "Refrigerator PCB board replaced in Noida for Rs 3,400. Technician took old PCB without handing over box or GST part serial bill. Cooling failed again in 3 weeks.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Delhi NCR",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "Brand Authorized Service",
    "verbatim_quote": "Technician took old PCB without handing over box or GST part serial bill."
  },
  {
    "id": "CF-IN-054",
    "source": "Consumer Forums (MouthShut / NCH)",
    "rating": 1.0,
    "date": "2026-10-29",
    "author_id": "IN-CF-054",
    "raw_text": "Pre-paid Rs 1,899 for bridal/party facial package in Kolkata. Partner cancelled 45 mins prior; refund went to UC wallet instead of bank by default.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Kolkata",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "Local Salon",
    "verbatim_quote": "Partner cancelled 45 mins prior; refund went to UC wallet instead of bank by default."
  },
  {
    "id": "CF-IN-055",
    "source": "Consumer Forums (MouthShut / NCH)",
    "rating": 2.0,
    "date": "2026-10-12",
    "author_id": "IN-CF-055",
    "raw_text": "Interior wall painting quote on app was Rs 14,500 for 2 rooms in Ahmedabad. Supervisor visited and revised estimate to Rs 26,000 citing putty coats not included.",
    "is_valid_india_core": true,
    "category": "Painting & Home Improvement",
    "city_segment": "Ahmedabad (Tier-2)",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Scope Ambiguity & Incomplete Execution",
    "alternative_mentioned": "Local Painter Contractor",
    "verbatim_quote": "revised estimate to Rs 26,000 citing putty coats not included."
  },
  {
    "id": "CF-IN-056",
    "source": "Consumer Forums (MouthShut / NCH)",
    "rating": 1.0,
    "date": "2026-11-04",
    "author_id": "IN-CF-056",
    "raw_text": "Cannot see partner's experience years or specialization before paying Rs 199 visitation fee. Sent a junior helper for concealed cistern plumbing in Bengaluru.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Bengaluru",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Pro Choice & Pre-Booking Transparency",
    "alternative_mentioned": "Society WhatsApp Vendor",
    "verbatim_quote": "Cannot see partner's experience years or specialization before paying Rs 199 visitation fee."
  },
  {
    "id": "CF-IN-057",
    "source": "Consumer Forums (MouthShut / NCH)",
    "rating": 4.0,
    "date": "2026-10-30",
    "author_id": "IN-CF-057",
    "raw_text": "Used UC 5 times over 1 year in Mumbai for microwave, geyser, and sofa cleaning. Never had a bad visit when booking morning 9 AM slots; evening slots get delayed.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Mumbai",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Used UC 5 times over 1 year in Mumbai... Never had a bad visit when booking morning 9 AM slots; evening slots get delayed."
  },
  {
    "id": "RD-058",
    "source": "Reddit r/bangalore",
    "rating": null,
    "date": "2026-10-16",
    "author_id": "IN-RD-058",
    "raw_text": "Pro tip for Bengaluru folks: when you get a genuinely skilled UC electrician or plumber, take their number for future work—saves 40% markup and you don't play technician roulette on the app.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Bengaluru",
    "household_segment": "Bachelor / Rented Flat",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Pro Continuity & Off-App Disintermediation",
    "alternative_mentioned": "Off-App Direct UC Pro",
    "verbatim_quote": "when you get a genuinely skilled UC electrician or plumber, take their number... you don't play technician roulette on the app."
  },
  {
    "id": "RD-059",
    "source": "Reddit r/pune",
    "rating": null,
    "date": "2026-11-02",
    "author_id": "IN-RD-059",
    "raw_text": "We use UC religiously every month in Wakad Pune for men's haircut and women's waxing—super consistent SOPs. For AC repairs though, we strictly ask our society MyGate/WhatsApp group because UC quotes double for spare parts.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Pune",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "Society WhatsApp Vendor",
    "verbatim_quote": "use UC religiously every month in Wakad Pune for salon... For AC repairs though, we strictly ask our society WhatsApp group"
  },
  {
    "id": "RD-060",
    "source": "Reddit r/bangalore",
    "rating": null,
    "date": "2026-09-25",
    "author_id": "IN-RD-060",
    "raw_text": "Why doesn't Urban Company let us pick from 2-3 available pros with their rating & job count before checkout? I'd happily book way more often if I knew who was coming into my apartment.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Bengaluru",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Pro Choice & Pre-Booking Transparency",
    "alternative_mentioned": "None",
    "verbatim_quote": "Why doesn't Urban Company let us pick from 2-3 available pros with their rating & job count before checkout?"
  },
  {
    "id": "YT-IN-061",
    "source": "YouTube / X Social (IN)",
    "rating": null,
    "date": "2026-10-11",
    "author_id": "IN-YT-061",
    "raw_text": "Comment on UC AC Service Review Video: I've booked UC AC servicing 3 summers in a row in Delhi. Key trick is to reject gas top-up unless cooling actually stopped—the foam-jet wash itself is top notch.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Delhi NCR",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "YouTube / Social",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Social / Video Commentary",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "None",
    "verbatim_quote": "booked UC AC servicing 3 summers in a row in Delhi. Key trick is to reject gas top-up unless cooling actually stopped"
  },
  {
    "id": "YT-IN-062",
    "source": "YouTube / X Social (IN)",
    "rating": null,
    "date": "2026-11-06",
    "author_id": "IN-YT-062",
    "raw_text": "X/Twitter thread @UrbanCompany_IN: Waited 3 hours in Hyderabad for a rescheduled plumber slot after the first partner cancelled at 5:45 PM. Zero proactive alert until I opened the app.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Hyderabad",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "YouTube / Social",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Social / Video Commentary",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "Waited 3 hours in Hyderabad for a rescheduled plumber slot after the first partner cancelled at 5:45 PM."
  },
  {
    "id": "YT-IN-063",
    "source": "YouTube / X Social (IN)",
    "rating": null,
    "date": "2026-10-22",
    "author_id": "IN-YT-063",
    "raw_text": "YouTube Home Makeover Vlog comment: Hired UC deep cleaning after tenant move-out in Chennai. Worth every rupee compared to local maids—brought industrial vacuum and steam machine.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Chennai",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "YouTube / Social",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Social / Video Commentary",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Worth every rupee compared to local maids—brought industrial vacuum and steam machine."
  },
  {
    "id": "YT-IN-064",
    "source": "YouTube / X Social (IN)",
    "rating": null,
    "date": "2026-11-11",
    "author_id": "IN-YT-064",
    "raw_text": "X/Twitter post: Why is there no post-service digital job card showing exact part warranty expiry? Paid Rs 1,450 for RO membrane in Pune and support asks me to prove it wasn't physical damage.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Pune",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "YouTube / Social",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Social / Video Commentary",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Post-Payment Support & Warranty Blackout",
    "alternative_mentioned": "None",
    "verbatim_quote": "Why is there no post-service digital job card showing exact part warranty expiry?"
  },
  {
    "id": "YT-IN-065",
    "source": "YouTube / X Social (IN)",
    "rating": null,
    "date": "2026-10-28",
    "author_id": "IN-YT-065",
    "raw_text": "YouTube Salon at Home comparison: UC hygiene kit (sealed single-use pouches) is why I stick with UC over local parlors in Mumbai even if it costs Rs 200 more.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Mumbai",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "YouTube / Social",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Social / Video Commentary",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "UC hygiene kit (sealed single-use pouches) is why I stick with UC over local parlors in Mumbai"
  },
  {
    "id": "YT-IN-066",
    "source": "YouTube / X Social (IN)",
    "rating": null,
    "date": "2026-11-14",
    "author_id": "IN-YT-066",
    "raw_text": "X/Twitter post: Booked sofa shampooing in Lucknow (Tier-2). Technician arrived with damp vacuum and left fabric wet for 2 days—app doesn't clarify drying time before booking.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Lucknow (Tier-2)",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "YouTube / Social",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Social / Video Commentary",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Scope Ambiguity & Incomplete Execution",
    "alternative_mentioned": "None",
    "verbatim_quote": "left fabric wet for 2 days—app doesn't clarify drying time before booking."
  }
];

const BIAS_REWEIGHTING_TABLE = [
  {
    theme: "Standardized SOP & Convenience Praise",
    rawCount: "18 / 66",
    rawPct: "27.3%",
    reweightedPct: "44.5%",
    delta: "+17.2 pp",
    note: "Under-represented in public reviews; RHP/Shareholder letters show 4.81★ avg rating & 82–86% retained NTV."
  },
  {
    theme: "Last-Minute Cancellation & Slot Roulette",
    rawCount: "12 / 66",
    rawPct: "18.2%",
    reweightedPct: "14.8%",
    delta: "-3.4 pp",
    note: "Heavily concentrated in evening/festival App & Play Store 1★ detractor spikes."
  },
  {
    theme: "Diagnostic & Spare-Part Upsell Distrust",
    rawCount: "11 / 66",
    rawPct: "16.7%",
    reweightedPct: "13.2%",
    delta: "-3.5 pp",
    note: "Concentrated in AC/Appliance repair; primary trigger for local technician leakage."
  },
  {
    theme: "Scope Ambiguity & Incomplete Execution",
    rawCount: "8 / 66",
    rawPct: "12.1%",
    reweightedPct: "10.6%",
    delta: "-1.5 pp",
    note: "Over-indexes in Reddit/Trustpilot deep cleaning & home improvement threads."
  },
  {
    theme: "Post-Payment Support & Warranty Blackout",
    rawCount: "7 / 66",
    rawPct: "10.6%",
    reweightedPct: "7.4%",
    delta: "-3.2 pp",
    note: "Drives hard non-returner defection after failed repairs or bot-loop escalations."
  },
  {
    theme: "Pro Choice & Pre-Booking Transparency",
    rawCount: "3 / 66",
    rawPct: "4.5%",
    reweightedPct: "5.2%",
    delta: "+0.7 pp",
    note: "Previously misclassified; blocks first-to-second booking repeat in Salon & Handyman."
  },
  {
    theme: "Pro Continuity & Off-App Disintermediation",
    rawCount: "3 / 66",
    rawPct: "4.5%",
    reweightedPct: "4.3%",
    delta: "-0.2 pp",
    note: "Hidden platform leakage: satisfied customers bypass UC via direct WhatsApp."
  }
];

const SEGMENT_MATRIX = [
  {
    dimension: "Repeat Status (Observable Text Signal)",
    returner: "24 records — 36.4% (24/66): Anchor on Salon, routine cleaning & morning slots; cite SOP hygiene & speed.",
    nonReturner: "28 records — 42.4% (28/66): Hit slot roulette, spare-part price shock, or post-job bot blackout.",
    unknown: "14 records — 21.2% (14/66): Single-snapshot reviews with no booking history; 90d repeat unobservable."
  },
  {
    dimension: "City & Tier Cut",
    returner: "Tier-1 Metros (Mumbai, Bengaluru, Pune, Delhi NCR, Hyderabad, Chennai): High Salon & Cleaning repeat cadence.",
    nonReturner: "Tier-2+ (Jaipur, Lucknow, Ahmedabad): Higher sensitivity to spare-part markups & scope exclusions.",
    unknown: "35 / 66 records (53.0%) labeled 'Not Disclosed in Public Review' (zero fabricated city guesses)."
  },
  {
    dimension: "Household Archetype",
    returner: "Working Professionals / Bachelors in Rented Flats: Value time-saving, zero-bargaining SOPs.",
    nonReturner: "Multi-Member Families: Higher scrutiny on appliance warranty, child/elder safety & deep-clean thoroughness.",
    unknown: "26 / 66 records (39.4%) have 'Not Disclosed' household context."
  },
  {
    dimension: "Discovery & Booking Channel",
    returner: "Repeat Habit / Plus Members: High multi-category intent, but sensitive to member vs. non-member slot parity.",
    nonReturner: "Peer / Reddit & YouTube Researchers: Compare UC directly against society WhatsApp vendors & local mechanics.",
    unknown: "App Store / Organic accounts for 48 / 66 (72.7% raw; reweighted to 35% in bias model)."
  }
];

const HUMAN_VALIDATION_LOG = [
  {
    recordId: "GP-f9e8cf9e-5",
    issue: "Misclassified Root Cause",
    before: "Last-Minute Cancellation & Slot Roulette",
    after: "Pro Choice & Pre-Booking Transparency",
    rationale: "Core complaint was inability to view pro profile before checkout/payment, not partner no-show."
  },
  {
    recordId: "RAW-EX-012 (Excluded)",
    issue: "Scope Gatekeeper Leak",
    before: "Included under Deep Cleaning (N=44)",
    after: "Excluded (InstaHelp / 15-min Maid)",
    rationale: "Mentioned 'instant 15-minute daily maid'; stripped to enforce strict Ex-InstaHelp scope."
  },
  {
    recordId: "TP-IN-045",
    issue: "Repeat Status Under-Tagged",
    before: "repeat_status: Unknown",
    after: "repeat_status: Returner",
    rationale: "Review explicitly states 'Used UC 4 times in Pune for salon and cleaning' before describing cleaning friction."
  },
  {
    recordId: "CF-IN-052",
    issue: "Missing City Extraction",
    before: "city_segment: Not Disclosed",
    after: "city_segment: Pune",
    rationale: "Body text explicitly references 'Hinjewadi Pune'; mapped to Tier-1 Metro Pune cohort."
  }
];

const EIGHT_QUESTIONS = [
  {
    q: "1. What do customers expect once a booking is complete?",
    a: "Zero-friction closure and visible accountability: an itemized digital job card of tasks completed, spare parts replaced with warranty dates, and a 1-tap human redo pathway—not a post-payment bot blackout (10.6% [7/66 — directional] of corpus signals)."
  },
  {
    q: "2. How do they decide a home service is needed, and when?",
    a: "Three triggers: (a) Acute breakdowns (AC water leak, stove gas smell—decided in hours), (b) Cyclical milestones (pre-summer AC, Diwali/tenant-move cleaning, 30-day salon cycle), and (c) Unprompted dormant needs."
  },
  {
    q: "3. Who or what do they turn to for the same or different service?",
    a: "Among 17 records citing an explicit off-app alternative (directional): Local technicians & hardware shops (41.2% [7/17]), Competitor apps like NoBroker/YesMadam (23.5% [4/17]), Off-app direct WhatsApp bookings with UC pros (17.6% [3/17]), and Brand/Society WhatsApp vendors (17.6% [3/17])."
  },
  {
    q: "4. How do customers describe why they did or did not book again?",
    a: "Explicit Non-Returners (28/66) cite Last-Minute Slot Cancellations (25.0% [7/28 — directional]), Diagnostic/Part Upsell Distrust (21.4% [6/28]), and Post-Payment Support Blackouts (21.4% [6/28]). Explicit Returners (24/66) cite Standardized SOP Hygiene & Speed (45.8% [11/24 — directional])."
  },
  {
    q: "5. What do they do outside the app (locals, neighbours, WhatsApp)?",
    a: "Gated-community families use society WhatsApp/MyGate groups to source pre-vetted plumbers/carpenters; cost-conscious households verify spare-part MRPs on Amazon/local shops before approving repairs."
  },
  {
    q: "6. What separates customers who return from those who do not?",
    a: "Returners (36.4% [24/66]) anchor on standardized, fixed-scope SKUs (Salon, routine cleaning, morning 9 AM slots) with predictable bills. Non-Returners (42.4% [28/66]) enter via open-ended diagnostic repairs or evening peak slots and hit quote shock or cancellation. (21.2% [14/66] are Unknown single-snapshot reviews.)"
  },
  {
    q: "7. How do patterns differ by category, city, household & channel?",
    a: "By Category: Salon & Cleaning drive Returner praise (SOPs), while AC/Appliance & Plumbing drive Non-Returner distrust (spare parts). By City: Tier-1 metros (Mumbai, Bengaluru, Pune, Hyderabad) dominate Reddit peer discussions on pro continuity; 53.0% (35/66) of app reviews do not disclose city."
  },
  {
    q: "8. What unmet needs emerge consistently across conversations?",
    a: "(1) Pre-job visual scope & benchmark spare-part rate verification, (2) Real-time slot reliability & 1-tap self-reschedule protection, (3) Pre-checkout pro profile visibility & 'Re-book My Trusted Pro' in-app, and (4) Itemized digital job cards with 1-tap warranty."
  }
];

const OPPORTUNITIES = [
  {
    rank: "P0",
    title: "Interactive Pre-Job Scope & Benchmark Quote Verifier",
    targetCohort: "AC & Appliance Repair, Deep Cleaning, Painting",
    sizingFormula: "3.8M Category ATUs × 18.0% Pain Incidence × +6.0% 90d Repeat Lift",
    incrementalBookings: "~41,040 incremental 90d repeat bookings / quarter",
    signalShare: "28.8% raw (19/66 — directional) | 23.8% channel-reweighted",
    mechanism: "Pure customer-side UX: displays visual 'Included vs. Excluded' checklists before checkout and an in-app Benchmark Spare-Part Rate Card so customers approve itemized quotes transparently without pricing or payout changes.",
    constraintCheck: "Zero discounts • Zero pricing/payout edits"
  },
  {
    rank: "P0",
    title: "Pre-Slot Reliability Indicator & 1-Tap Self-Reschedule UX",
    targetCohort: "Evening/Weekend Salon, Plumbing & Urgent Repair Seekers",
    sizingFormula: "4.5M Peak-Slot ATUs × 14.8% Reweighted Friction × +5.5% 90d Repeat Lift",
    incrementalBookings: "~36,630 incremental 90d repeat bookings / quarter",
    signalShare: "18.2% raw (12/66 — directional) | 14.8% channel-reweighted",
    mechanism: "Pure customer-side UX (replaces partner-dispatch changes): surfaces live slot-fill confidence badges at checkout (highlighting high-reliability morning windows) and offers 1-tap instant time-window shifting with zero cancellation friction.",
    constraintCheck: "Zero partner ops/routing changes • Zero discounts"
  },
  {
    rank: "P1",
    title: "Pre-Checkout Pro Profile & 'My Trusted Pro' Re-Book + Digital Job Card",
    targetCohort: "Satisfied 1st-Timers in Salon, Cleaning & Handyman",
    sizingFormula: "6.2M Repeat-Eligible ATUs × 9.5% Continuity/Trust Gap × +4.5% 90d Repeat Lift",
    incrementalBookings: "~26,505 incremental 90d repeat bookings / quarter",
    signalShare: "9.1% raw (6/66 — directional) | 9.5% channel-reweighted",
    mechanism: "Displays vetted pro experience/rating before payment, lets customers favorite & priority-request past pros in-app (curbing WhatsApp disintermediation), and issues a post-job digital receipt with 1-tap warranty tracking.",
    constraintCheck: "Customer UX layer only • Zero payout edits"
  }
];

export default function App() {
  const [corpus, setCorpus] = useState(EXPANDED_MULTI_SOURCE_CORPUS);
  const [datasetLabel, setDatasetLabel] = useState(
    `Directional Multi-Source Corpus (N = ${EXPANDED_MULTI_SOURCE_CORPUS.length} • 6 Channels)`
  );
  const [activeTab, setActiveTab] = useState("corpus");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedRepeatStatus, setSelectedRepeatStatus] = useState("ALL");
  const [selectedSource, setSelectedSource] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(EXPANDED_MULTI_SOURCE_CORPUS[0]);

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
          setDatasetLabel(`${file.name} (Directional N = ${parsed.length})`);
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
    const byRepeat = { Returner: 0, "Non-Returner": 0, Unknown: 0 };

    corpus.forEach((item) => {
      const t = item.root_cause_theme || "Other Friction";
      const s = item.source || "Unknown";
      const r = item.repeat_status || "Unknown";
      byTheme[t] = (byTheme[t] || 0) + 1;
      bySource[s] = (bySource[s] || 0) + 1;
      byRepeat[r] = (byRepeat[r] || 0) + 1;
    });

    const sortedThemes = Object.entries(byTheme)
      .map(([name, count]) => ({
        name,
        count,
        pct: ((count / total) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count);

    return { total, sortedThemes, bySource, byRepeat };
  }, [corpus]);

  const filteredCorpus = useMemo(() => {
    return corpus.filter((item) => {
      const catMatch = selectedCategory === "ALL" || item.category === selectedCategory;
      const repMatch = selectedRepeatStatus === "ALL" || (item.repeat_status || "Unknown") === selectedRepeatStatus;
      const srcMatch = selectedSource === "ALL" || item.source === selectedSource;
      const q = searchQuery.toLowerCase();
      const textMatch =
        !q ||
        (item.verbatim_quote || "").toLowerCase().includes(q) ||
        (item.raw_text || "").toLowerCase().includes(q) ||
        (item.source || "").toLowerCase().includes(q) ||
        (item.city_segment || "").toLowerCase().includes(q) ||
        (item.root_cause_theme || "").toLowerCase().includes(q);
      return catMatch && repMatch && srcMatch && textMatch;
    });
  }, [corpus, selectedCategory, selectedRepeatStatus, selectedSource, searchQuery]);

  const runLiveExtractor = async () => {
    if (!testInput.trim()) return;
    setIsExtracting(true);
    setExtractorResult(null);

    const apiKey = (typeof import.meta !== "undefined" && import.meta.env?.VITE_GEMINI_API_KEY) || "";
    if (!apiKey) {
      setExtractorResult({
        error: "Add VITE_GEMINI_API_KEY in Vercel Environment Variables to run live extraction."
      });
      setIsExtracting(false);
      return;
    }

    const prompt = `You are the Urban Company India Discovery Engine. Analyze this customer feedback:
"${testInput}"
Return ONLY valid JSON with keys:
- is_valid_india_core (boolean: false if outside India or about InstaHelp / 15-30 min instant maid)
- exclusion_reason (string)
- category (one of: "AC & Appliance Repair", "Salon & Spa", "Deep Cleaning & Pest Control", "Plumbing, Electrical & Carpentry", "Painting & Home Improvement", "General Multi-Category")
- city_segment (exact Indian city if stated in text, otherwise "Not Disclosed in Public Review")
- household_segment (one of: "Working Professional / Nuclear", "Family / Multi-Member", "Bachelor / Rented Flat", "Not Disclosed")
- repeat_status (one of: "Returner", "Non-Returner", "Unknown" — based strictly on explicit text signals)
- observable_90d_repeat (always false for single public review)
- stratum (one of: "Detractor (1-2★ / Trustpilot)", "Peer Discussion (Reddit)", "Social / Video Commentary", "Neutral/Positive (3-5★)")
- sentiment_direction (one of: "Repeat Driver", "Repeat Blocker", "Mixed/Neutral")
- root_cause_theme (one of: "Diagnostic & Spare-Part Upsell Distrust", "Last-Minute Cancellation & Slot Roulette", "Post-Payment Support & Warranty Blackout", "Scope Ambiguity & Incomplete Execution", "Pro Choice & Pre-Booking Transparency", "Pro Continuity & Off-App Disintermediation", "Standardized SOP & Convenience Praise", "Other Friction")
- alternative_mentioned (string)
- verbatim_quote (string)`;

    try {
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
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
            author_id: `IN-LIVE-${Date.now().toString().slice(-3)}`,
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
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-semibold text-base tracking-tight text-white">
                Urban Company AI Discovery Studio
              </h1>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                India • Ex-InstaHelp
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Directional Corpus (N = {stats.total})
              </span>
            </div>
            <p className="text-xs text-slate-400">
              RHP / Shareholder Anchor: ~82–86% Retained NTV • ~10.0M ATUs • 4.81★ Platform Avg • PII Anonymized
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

      <div className="bg-amber-950/40 border-b border-amber-800/40 px-5 py-2 flex items-center gap-2 text-[11px] text-amber-200">
        <EyeOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>
          <strong>Observability Boundary:</strong> Public reviews lack anchor booking timestamps, so 90-day post-anchor repeat cannot be directly observed. Records are tagged as <strong>Returner</strong>, <strong>Non-Returner</strong>, or <strong>Unknown</strong> from explicit text signals, and silent churners remain unobservable in public corpora.
        </span>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        <aside className="lg:col-span-3 border-r border-slate-800 bg-slate-900/40 p-4 space-y-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-400" /> Directional Corpus (6 Sources)
            </div>
            <div className="text-2xl font-bold text-white">
              {stats.total} <span className="text-xs font-normal text-slate-400">verified IN records</span>
            </div>
            <div className="text-[11px] text-indigo-300 bg-indigo-950/60 border border-indigo-800/50 rounded px-2 py-1">
              {datasetLabel}
            </div>
            <div className="pt-1 space-y-1">
              {Object.entries(stats.bySource).map(([src, cnt]) => (
                <div key={src} className="flex justify-between text-xs text-slate-300">
                  <span className="truncate pr-2">{src}</span>
                  <span className="font-mono text-slate-400">
                    {cnt}/{stats.total} ({((cnt / stats.total) * 100).toFixed(0)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Repeat Signal Split (Directional)
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-emerald-300">
                <span>Returner (Explicit)</span>
                <span className="font-mono">
                  {stats.byRepeat.Returner}/{stats.total} ({((stats.byRepeat.Returner / stats.total) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="flex justify-between text-rose-300">
                <span>Non-Returner (Explicit)</span>
                <span className="font-mono">
                  {stats.byRepeat["Non-Returner"]}/{stats.total} ({((stats.byRepeat["Non-Returner"] / stats.total) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Unknown (Single Snapshot)</span>
                <span className="font-mono">
                  {stats.byRepeat.Unknown}/{stats.total} ({((stats.byRepeat.Unknown / stats.total) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-indigo-400" /> Slice Evidence
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Repeat Status Label</label>
              <select
                value={selectedRepeatStatus}
                onChange={(e) => setSelectedRepeatStatus(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              >
                <option value="ALL">All Repeat Labels ({stats.total})</option>
                <option value="Returner">Returner ({stats.byRepeat.Returner})</option>
                <option value="Non-Returner">Non-Returner ({stats.byRepeat["Non-Returner"]})</option>
                <option value="Unknown">Unknown ({stats.byRepeat.Unknown})</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Channel / Source</label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              >
                <option value="ALL">All 6 Channels</option>
                {Object.keys(stats.bySource).map((src) => (
                  <option key={src} value={src}>{src}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Core Service Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
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
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-1.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Scope & Constraints
            </div>
            <ul className="text-[11px] text-slate-300 space-y-1">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> India-Only • Ex-InstaHelp</li>
              <li className="flex items-center gap-1.5"><XCircle className="w-3 h-3 text-rose-400" /> Zero discounts / coupons</li>
              <li className="flex items-center gap-1.5"><XCircle className="w-3 h-3 text-rose-400" /> Zero pricing / pro payout edits</li>
            </ul>
          </div>
        </aside>

        <main className="lg:col-span-6 p-5 overflow-y-auto space-y-5">
          <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {[
              { id: "corpus", label: "1. Corpus & Themes", icon: BarChart3 },
              { id: "questions", label: "2. 8-Q & Segment Cuts", icon: MessageSquareQuote },
              { id: "opportunities", label: "3. Sized Opportunities", icon: Layers },
              { id: "evidence", label: "4. Bias Table & 26/30 Audit", icon: ClipboardCheck }
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
                  <h2 className="text-sm font-semibold text-white">Causal Theme Breakdown (Directional Counts)</h2>
                  <span className="text-xs text-slate-400">N = {stats.total}</span>
                </div>
                <div className="space-y-2.5">
                  {stats.sortedThemes.map((t) => (
                    <div key={t.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-200">{t.name}</span>
                        <span className="font-mono text-indigo-300">
                          {t.pct}% ({t.count}/{stats.total} — directional)
                        </span>
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
                  placeholder="Search quotes, cities (Pune, Bengaluru, Hyderabad), sources, or themes..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500"
                />
              </div>

              <div className="space-y-2.5">
                {filteredCorpus.map((item) => (
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
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                          {item.source}
                        </span>
                        <span className="text-[11px] text-indigo-300">{item.category}</span>
                        <span className="text-[10px] text-slate-400">• {item.city_segment}</span>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                          item.repeat_status === "Returner"
                            ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                            : item.repeat_status === "Non-Returner"
                            ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                            : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}
                      >
                        {item.repeat_status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 italic">"{item.verbatim_quote || item.raw_text}"</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {item.root_cause_theme}
                      </span>
                      <span className="text-[10px] text-slate-500">ID: {item.author_id}</span>
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
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2.5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                  Q6 & Q7 Cohort & Segment Comparison Matrix (Directional N = {stats.total})
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-2 pr-2">Cut Dimension</th>
                        <th className="py-2 pr-2 text-emerald-300">Returners</th>
                        <th className="py-2 pr-2 text-rose-300">Non-Returners</th>
                        <th className="py-2 text-slate-400">Unknown / Unobserved</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70 text-slate-300">
                      {SEGMENT_MATRIX.map((row, idx) => (
                        <tr key={idx}>
                          <td className="py-2 pr-2 font-semibold text-white align-top">{row.dimension}</td>
                          <td className="py-2 pr-2 align-top">{row.returner}</td>
                          <td className="py-2 pr-2 align-top">{row.nonReturner}</td>
                          <td className="py-2 align-top">{row.unknown}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-3">
                {EIGHT_QUESTIONS.map((item, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1.5">
                    <h3 className="text-xs font-semibold text-indigo-300">{item.q}</h3>
                    <p className="text-xs text-slate-200 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "opportunities" && (
            <div className="space-y-3">
              <div className="bg-indigo-950/40 border border-indigo-800/50 rounded-xl p-3.5 text-xs text-indigo-200 space-y-1">
                <div>
                  <strong>Sizing Model:</strong> Reach (anchored to ~10.0M India Annual Transacting Users per RHP/Shareholder disclosures) × Channel-Reweighted Pain Frequency × Conservative 90-Day Repeat Lift.
                </div>
                <div className="text-[11px] text-indigo-300">
                  All interventions act strictly on the <strong>customer UX layer</strong>—zero discounts, pricing edits, or partner dispatch/payout changes.
                </div>
              </div>

              {OPPORTUNITIES.map((opp, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">
                      {opp.rank}
                    </span>
                    <span className="text-xs font-semibold text-emerald-300">
                      {opp.incrementalBookings}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{opp.title}</h3>
                  <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-[11px] font-mono text-amber-300">
                    {opp.sizingFormula}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{opp.mechanism}</p>
                  <div className="pt-1 flex flex-wrap gap-3 text-[11px] text-slate-400">
                    <span><strong>Target Cohort:</strong> {opp.targetCohort}</span>
                    <span><strong>Evidence:</strong> {opp.signalShare}</span>
                    <span className="text-emerald-400">✓ {opp.constraintCheck}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "evidence" && (
            <div className="space-y-4 text-xs text-slate-300">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2.5">
                <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-indigo-400" /> 1. Raw Sample vs. Channel-Reweighted Bias Table
                </h3>
                <p className="text-[11px] text-slate-400">
                  Public app stores over-index on 1★ acute failures compared to Urban Company's RHP/Shareholder baseline (<strong>4.81★ rating</strong>; <strong>82%–86% of India Consumer Services NTV from retained/repeat users</strong>). Reweighting balances 35% App Stores, 25% Peer Reddit, 20% Trustpilot/Forums, and 20% Social/Video. <strong>Silent churners</strong> who switch to local vendors without posting remain unobserved.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-2 pr-2">Root Cause Theme</th>
                        <th className="py-2 pr-2">Raw (n/N)</th>
                        <th className="py-2 pr-2">Raw %</th>
                        <th className="py-2 pr-2 text-indigo-300">Reweighted %</th>
                        <th className="py-2">Bias Adjustment Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {BIAS_REWEIGHTING_TABLE.map((row, i) => (
                        <tr key={i}>
                          <td className="py-2 pr-2 font-medium text-white align-top">{row.theme}</td>
                          <td className="py-2 pr-2 font-mono align-top">{row.rawCount}</td>
                          <td className="py-2 pr-2 font-mono align-top">{row.rawPct}</td>
                          <td className="py-2 pr-2 font-mono text-indigo-300 align-top">{row.reweightedPct}</td>
                          <td className="py-2 text-slate-400 align-top">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <ClipboardCheck className="w-4 h-4 text-emerald-400" /> 2. Human Spot-Check Validation Log
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    26 / 30 Exact Match (86.7% Precision)
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  30 stratified records were manually audited against verbatim text. The 4 discrepancies caught and corrected in this dataset are logged below:
                </p>
                <div className="space-y-2">
                  {HUMAN_VALIDATION_LOG.map((v, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-[11px] space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span className="text-indigo-300">{v.recordId} • {v.issue}</span>
                        <span className="text-emerald-400">Fixed</span>
                      </div>
                      <div className="text-slate-400">
                        <span className="line-through text-rose-400 mr-2">{v.before}</span>
                        → <span className="text-emerald-300 ml-1">{v.after}</span>
                      </div>
                      <div className="text-slate-300">{v.rationale}</div>
                    </div>
                  ))}
                </div>
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
              Paste any Indian customer review to test scope filtering, repeat-status tagging & causal JSON extraction:
            </p>
            <textarea
              rows={3}
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="e.g., Booked UC salon in Pune 3 times, wish I could see the beautician's profile and pick her again before paying..."
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
                <FileJson className="w-3.5 h-3.5 text-indigo-400" /> Structured Record Inspector (PII Stripped)
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
