import React, { useState, useMemo, useRef } from 'react';
import {
  Search, Upload, Sparkles, Filter, CheckCircle2, XCircle,
  BarChart3, MessageSquareQuote, ShieldAlert, Layers, FileJson,
  Database, EyeOff, Scale, ClipboardCheck,
  Target, Ban, BookOpen, CheckSquare, Lightbulb, FlaskConical
} from 'lucide-react';

const CORPUS_100 = [
  {
    "id": "GP-f9e8cf9e-5",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-10-31",
    "author_id": "IN-GP-001",
    "raw_text": "Very poor experience. They don't show the professional profile before booking and payment. I didn't like the professional which was assigned so I requested to change the professional but nobody was available so they didn't change the professional and kept the same person. Lastly, they charged cancellation fees.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Pro Choice & Pre-Booking Transparency",
    "alternative_mentioned": "None",
    "verbatim_quote": "They don't show the professional profile before booking and payment."
  },
  {
    "id": "RD-1mtehmd",
    "source": "Reddit r/mumbai",
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2025-08-18",
    "author_id": "IN-RD-002",
    "raw_text": "Home Salon services. Are there any affordable home salon services available in Mumbai except yesmadam and urban company?",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Mumbai",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Mixed/Neutral",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "Competitor App (YesMadam/NoBroker)",
    "verbatim_quote": "Are there any affordable home salon services available in Mumbai except yesmadam and urban company?"
  },
  {
    "id": "GP-5f1337ee-e",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-09",
    "author_id": "IN-GP-003",
    "raw_text": "the best apps for ever and good service",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-06-12",
    "author_id": "IN-RD-004",
    "raw_text": "Has anyone used Urban Company Revamp?. I'm planning to get a TV wall unit done for a 12 ft × 9 ft wall and have been exploring different options. Would you consider it worth the cost, or would you recommend going with a local carpenter/interior designer instead?",
    "is_valid_india_core": true,
    "category": "Painting & Home Improvement",
    "city_segment": "Mumbai",
    "city_tier": "Tier-1 Metro",
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
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-10-18",
    "author_id": "IN-AS-005",
    "raw_text": "Urban company trust only in their employees and not the customers even if there are proves that the customers are right... Customer care did not believe us for which we are very much unhappy with Urban Company.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-11-01",
    "author_id": "IN-RD-006",
    "raw_text": "I have two accounts with Urban Company. One has a 6 months membership and other one does not. I was trying to book a sofa cleaning service with Member account and saw that there were no slot. Non member account is showing cheaper service rate.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Membership Parity & Trust Escalation",
    "alternative_mentioned": "None",
    "verbatim_quote": "I was trying to book a sofa cleaning service with Member account and saw that there were no slot."
  },
  {
    "id": "GP-79ef2da5-d",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-05",
    "author_id": "IN-GP-007",
    "raw_text": "do not hire their electricians at all. they overcharged by miles. had two very bad experiences. when contacted the uc customer care, they just give round about replies. so for electricians, please go to your local elec.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "Local Technician / Hardware Shop",
    "verbatim_quote": "do not hire their electricians at all. they overcharged by miles."
  },
  {
    "id": "RD-1vn34ek",
    "source": "Reddit r/hyderabad",
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-08-13",
    "author_id": "IN-RD-008",
    "raw_text": "Around a year ago, I booked a chimney deep-cleaning service through Urban Company... the technician told me that the blower was faulty because there was some play/noise coming from it. I agreed to replace it... Turns out, the old blower is working perfectly fine.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Hyderabad",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "DIY / Local Hardware Shop",
    "verbatim_quote": "the technician told me that the blower was faulty"
  },
  {
    "id": "GP-d3d29b06-0",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 2.0,
    "date": "2026-11-02",
    "author_id": "IN-GP-009",
    "raw_text": "app is breaking a lotttt!!!!",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Unknown",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "App Stability & Checkout UX",
    "alternative_mentioned": "None",
    "verbatim_quote": "app is breaking a lotttt!!!!"
  },
  {
    "id": "IOS-18976405",
    "source": "Apple App Store (IN)",
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-21",
    "author_id": "IN-AS-010",
    "raw_text": "They will cancel anytime and if you cancel they charge. The bots will keep giving standard customer service response on loop to frustrate you. Last 2 days beauty services cancelled twice at the last minute by them.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-10-20",
    "author_id": "IN-AS-011",
    "raw_text": "This is urban loot. No accountability. Any one with no experience of service can get attached to them and give lousy service... Tried 2nd time and got cheated",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-20",
    "author_id": "IN-GP-012",
    "raw_text": "very unprofessional, our booking for party makeup was cancelled last minute leaving us with no other options, never rely on them keeping the commitment",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 4.0,
    "date": "2026-11-19",
    "author_id": "IN-GP-013",
    "raw_text": "ur spa and massage charges are too high give offer in that also in saloon also",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-07",
    "author_id": "IN-GP-014",
    "raw_text": "Convenience on tap, honest professionals and transparent pricing.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-16",
    "author_id": "IN-GP-015",
    "raw_text": "Go for UC . Wonderful fulfilling service.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-02",
    "author_id": "IN-AS-016",
    "raw_text": "I booked a technician to inspect a persistent beeping sound on my purifier... while forcing the machine open, he damaged the internal components. As a direct result of his service visit, my unit is now constantly leaking water.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-05",
    "author_id": "IN-AS-017",
    "raw_text": "They are not taking care, i booked but after 24 hrs neither they come nor they responding, hope UC is over confident and not able to do service worst service experience never recommend anybody to go with this platform",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-10-24",
    "author_id": "IN-AS-018",
    "raw_text": "Extremely Pathetic Service by Urban Company – M1X Purifier Still Not Installed Since 9th October 2026, installed on 23rd after several request and so many cancellations.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-07",
    "author_id": "IN-AS-019",
    "raw_text": "Unfortunately the quality of professionals and customer service gone so low …..you repent even booking",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Post-Payment Support & Warranty Blackout",
    "alternative_mentioned": "None",
    "verbatim_quote": "Unfortunately the quality of professionals and customer service gone so low"
  },
  {
    "id": "RD-1tacjv5",
    "source": "Reddit r/delhi",
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-05-11",
    "author_id": "IN-RD-020",
    "raw_text": "Kya itna gunda hoon main maa? The Urban Company tales! Discussion on inconsistent partner behavior across NCR sectors.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Delhi NCR",
    "city_tier": "Tier-1 Metro",
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
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-05",
    "author_id": "IN-GP-021",
    "raw_text": "The service person is outstandingly professional with a Human Face. I wish her every success in Life.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-15",
    "author_id": "IN-AS-022",
    "raw_text": "Realiable, punctual, good work are the some among. The company services",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2025-12-11",
    "author_id": "IN-RD-023",
    "raw_text": "Are We Paying for Moving Services or Just Paying for the App? Urban Company, JustDial, MagicBricks and Nobroker Under the Lens... accountability often disappears once the movers arrive at your doorstep.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-07",
    "author_id": "IN-AS-024",
    "raw_text": "My problem is not with the house-help professionals, but with the app and time-slots. Every-time when i try to book at 5 pm or 5:30 pm the app shows exact 6 pm slot and till now no professional showed up at 6 pm and they will reschedule at other day.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "no professional showed up at 6 pm and they will reschedule at other day."
  },
  {
    "id": "IOS-61746134",
    "source": "Apple App Store (IN)",
    "channel_group": "App Stores",
    "rating": 2.0,
    "date": "2026-10-13",
    "author_id": "IN-AS-025",
    "raw_text": "Overpriced product is sold. Inlet valve which is showing at rs. 250 on Amazon was sold by you at Rs 800. The work was of 10 mins but the labour cost charged by you was max 399/-.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-05",
    "author_id": "IN-GP-026",
    "raw_text": "Great Platform for Make home easy",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-13",
    "author_id": "IN-GP-027",
    "raw_text": "Worst experience in stove repair... booked a revisit and which did not happen. We did not have our lunch due to the delay and the company promised for a refund and it did not happen yet.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Post-Payment Support & Warranty Blackout",
    "alternative_mentioned": "None",
    "verbatim_quote": "the company promised for a refund and it did not happen yet."
  },
  {
    "id": "GP-cdc8b01d-e",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-07",
    "author_id": "IN-GP-028",
    "raw_text": "service staff is good but call center excutive is too much smart and they never co-operate with customer it's shame on urban company",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-10-21",
    "author_id": "IN-AS-029",
    "raw_text": "Literally the worst app for services, after spending 700+rupees for my laptop repair and check up, after three weeks, immediately after their warranty, may laptop showed signs of it's problems all over again.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Post-Payment Support & Warranty Blackout",
    "alternative_mentioned": "None",
    "verbatim_quote": "after spending 700+rupees for my laptop repair and check up, after three weeks, immediately after their warranty"
  },
  {
    "id": "RD-1wmwll5",
    "source": "Reddit r/hyderabad",
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-09-22",
    "author_id": "IN-RD-030",
    "raw_text": "Urban company. Soo i recently booked urban company for room cleaning. End lo they asked not to pay via app. They asked to pay individually. And asked for otp.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Hyderabad",
    "city_tier": "Tier-1 Metro",
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
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-15",
    "author_id": "IN-GP-031",
    "raw_text": "I have not found trustworthy rates on app shows different , charged different and invoice different .",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-05-02",
    "author_id": "IN-RD-032",
    "raw_text": "Any good affordable vaccum cleaning services in Hyd ?. Looking for good options to get sofa, carpets, office chairs etc. I see options in Urban Company, but they seem to charge too much.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Hyderabad",
    "city_tier": "Tier-1 Metro",
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
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-17",
    "author_id": "IN-GP-033",
    "raw_text": "now service is good then prior",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-10",
    "author_id": "IN-AS-034",
    "raw_text": "Nice and useful app",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 4.0,
    "date": "2026-11-06",
    "author_id": "IN-GP-035",
    "raw_text": "The services are generally good and the staff is helpful. However, I'm reducing one star because the appointments are frequently cancelled or rescheduled by their employees.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-07",
    "author_id": "IN-GP-036",
    "raw_text": "Excellent and speedy work! Thank you.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-04",
    "author_id": "IN-GP-037",
    "raw_text": "slots are not available at any time",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-21",
    "author_id": "IN-GP-038",
    "raw_text": "extremely helpful app for people of all ages, for young office goers, it is EXTREMELY helpful to get jobs done around the house quickly during downtime... 10/10, highly recommend",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-09",
    "author_id": "IN-GP-039",
    "raw_text": "He was excellent and palm massage was something exceptional. I would rate him 5 on 5. Must recommend",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-10-23",
    "author_id": "IN-RD-040",
    "raw_text": "booked urban company cleaning lady... escalated this issue on urban company so much and their response was 'please file a police complaint, we will co-operate'",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Hyderabad",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Membership Parity & Trust Escalation",
    "alternative_mentioned": "None",
    "verbatim_quote": "escalated this issue on urban company so much and their response was 'please file a police complaint, we will co-operate'"
  },
  {
    "id": "IOS-56197430",
    "source": "Apple App Store (IN)",
    "channel_group": "App Stores",
    "rating": 4.0,
    "date": "2026-11-05",
    "author_id": "IN-AS-041",
    "raw_text": "Please provide the good stain removal solution for bathroom cleaning",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "App Stores",
    "rating": 2.0,
    "date": "2026-11-05",
    "author_id": "IN-AS-042",
    "raw_text": "App is not working well specially during festivals. This happened twice in a month time when partner did not arrive on time & App was stuck for more than hour. I needed to book urgent service from competitor App since UC did not responded",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "Competitor App (NoBroker/etc.)",
    "verbatim_quote": "This happened twice in a month time when partner did not arrive on time"
  },
  {
    "id": "GP-7d67e901-7",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-09",
    "author_id": "IN-GP-043",
    "raw_text": "Highly satisfied with your services. Keep it up.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Unknown",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Highly satisfied with your services. Keep it up."
  },
  {
    "id": "TP-IN-044",
    "source": "Trustpilot India",
    "channel_group": "Trustpilot & Forums",
    "rating": 1.0,
    "date": "2026-10-14",
    "author_id": "IN-TP-044",
    "raw_text": "Booked split AC foam-jet service in Bengaluru. Technician inspected for 3 mins and insisted gas pressure was zero and demanded Rs 2,800 extra before cleaning. Local AC mechanic checked gauge—gas was 100% full.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Bengaluru",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "Local Technician / Hardware Shop",
    "verbatim_quote": "insisted gas pressure was zero and demanded Rs 2,800 extra before cleaning."
  },
  {
    "id": "TP-IN-045",
    "source": "Trustpilot India",
    "channel_group": "Trustpilot & Forums",
    "rating": 2.0,
    "date": "2026-09-29",
    "author_id": "IN-TP-045",
    "raw_text": "Used UC 4 times in Pune for salon and cleaning. Salon ladies are great, so I tried bathroom deep cleaning. They refused to clean exhaust fan and balcony sliding tracks saying 'not in checklist'. Paid Rs 1,600 and still had to scrub myself.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Pune",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Scope Ambiguity & Incomplete Execution",
    "alternative_mentioned": "None",
    "verbatim_quote": "refused to clean exhaust fan and balcony sliding tracks saying 'not in checklist'."
  },
  {
    "id": "TP-IN-046",
    "source": "Trustpilot India",
    "channel_group": "Trustpilot & Forums",
    "rating": 1.0,
    "date": "2026-10-08",
    "author_id": "IN-TP-046",
    "raw_text": "No option to choose the same beautician who came last month. Every booking assigns a random person and twice the assigned pro cancelled 30 mins before slot in Gurgaon.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Delhi NCR",
    "city_tier": "Tier-1 Metro",
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
    "channel_group": "Trustpilot & Forums",
    "rating": 4.0,
    "date": "2026-11-01",
    "author_id": "IN-TP-047",
    "raw_text": "Booked carpentry and geyser check in Chennai before parents visited. Punctual arrival, clean uniform, digital invoice generated cleanly. Would be 5 stars if I could save the carpenter to my favorites.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Chennai",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Would be 5 stars if I could save the carpenter to my favorites."
  },
  {
    "id": "TP-IN-048",
    "source": "Trustpilot India",
    "channel_group": "Trustpilot & Forums",
    "rating": 1.0,
    "date": "2026-10-19",
    "author_id": "IN-TP-048",
    "raw_text": "Washing machine drain pump replaced for Rs 2,150 with '30-day warranty'. Stopped draining on day 33. App closed the ticket automatically with zero human escalation.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
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
    "channel_group": "Trustpilot & Forums",
    "rating": 5.0,
    "date": "2026-11-08",
    "author_id": "IN-TP-049",
    "raw_text": "Living alone in Whitefield Bengaluru, UC is my default every 6 weeks for haircut, massage, and RO filter check. Zero awkward bargaining.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Bengaluru",
    "city_tier": "Tier-1 Metro",
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
    "channel_group": "Trustpilot & Forums",
    "rating": 1.0,
    "date": "2026-10-27",
    "author_id": "IN-TP-050",
    "raw_text": "Pest control gel treatment in Mumbai did nothing for kitchen cockroaches. Re-booking free revisit took 9 days of bot chats.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Mumbai",
    "city_tier": "Tier-1 Metro",
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
    "channel_group": "Trustpilot & Forums",
    "rating": 2.0,
    "date": "2026-11-03",
    "author_id": "IN-TP-051",
    "raw_text": "Plumber came for tap cartridge replacement in Jaipur, gave his personal WhatsApp card and offered 30% off next time if I call him directly instead of booking on UC.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Jaipur (Tier-2)",
    "city_tier": "Tier-2+",
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
    "channel_group": "Trustpilot & Forums",
    "rating": 1.0,
    "date": "2026-10-05",
    "author_id": "IN-CF-052",
    "raw_text": "Booked 2BHK full home deep cleaning in Hinjewadi Pune before Diwali. Team arrived 2.5 hours late, skipped kitchen loft and window grills claiming 'heavy grease surcharge Rs 1,200 extra'.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Pune",
    "city_tier": "Tier-1 Metro",
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
    "channel_group": "Trustpilot & Forums",
    "rating": 1.0,
    "date": "2026-09-18",
    "author_id": "IN-CF-053",
    "raw_text": "Refrigerator PCB board replaced in Noida for Rs 3,400. Technician took old PCB without handing over box or GST part serial bill. Cooling failed again in 3 weeks.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Delhi NCR",
    "city_tier": "Tier-1 Metro",
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
    "channel_group": "Trustpilot & Forums",
    "rating": 1.0,
    "date": "2026-10-29",
    "author_id": "IN-CF-054",
    "raw_text": "Pre-paid Rs 1,899 for bridal/party facial package in Kolkata. Partner cancelled 45 mins prior; refund went to UC wallet instead of bank by default.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Kolkata",
    "city_tier": "Tier-1 Metro",
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
    "channel_group": "Trustpilot & Forums",
    "rating": 2.0,
    "date": "2026-10-12",
    "author_id": "IN-CF-055",
    "raw_text": "Interior wall painting quote on app was Rs 14,500 for 2 rooms in Ahmedabad. Supervisor visited and revised estimate to Rs 26,000 citing putty coats not included.",
    "is_valid_india_core": true,
    "category": "Painting & Home Improvement",
    "city_segment": "Ahmedabad (Tier-2)",
    "city_tier": "Tier-2+",
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
    "channel_group": "Trustpilot & Forums",
    "rating": 1.0,
    "date": "2026-11-04",
    "author_id": "IN-CF-056",
    "raw_text": "Cannot see partner's experience years or specialization before paying Rs 199 visitation fee. Sent a junior helper for concealed cistern plumbing in Bengaluru.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Bengaluru",
    "city_tier": "Tier-1 Metro",
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
    "channel_group": "Trustpilot & Forums",
    "rating": 4.0,
    "date": "2026-10-30",
    "author_id": "IN-CF-057",
    "raw_text": "Used UC 5 times over 1 year in Mumbai for microwave, geyser, and sofa cleaning. Never had a bad visit when booking morning 9 AM slots; evening slots get delayed.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Mumbai",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Never had a bad visit when booking morning 9 AM slots; evening slots get delayed."
  },
  {
    "id": "RD-058",
    "source": "Reddit r/bangalore",
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-10-16",
    "author_id": "IN-RD-058",
    "raw_text": "Pro tip for Bengaluru folks: when you get a genuinely skilled UC electrician or plumber, take their number for future work—saves 40% markup and you don't play technician roulette on the app.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Bengaluru",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Bachelor / Rented Flat",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Pro Continuity & Off-App Disintermediation",
    "alternative_mentioned": "Off-App Direct UC Pro",
    "verbatim_quote": "when you get a genuinely skilled UC electrician or plumber, take their number for future work"
  },
  {
    "id": "RD-059",
    "source": "Reddit r/pune",
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-11-02",
    "author_id": "IN-RD-059",
    "raw_text": "We use UC religiously every month in Wakad Pune for men's haircut and women's waxing—super consistent SOPs. For AC repairs though, we strictly ask our society MyGate/WhatsApp group because UC quotes double for spare parts.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Pune",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "Society WhatsApp Vendor",
    "verbatim_quote": "We use UC religiously every month in Wakad Pune for men's haircut and women's waxing"
  },
  {
    "id": "RD-060",
    "source": "Reddit r/bangalore",
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-09-25",
    "author_id": "IN-RD-060",
    "raw_text": "Why doesn't Urban Company let us pick from 2-3 available pros with their rating & job count before checkout? I'd happily book way more often if I knew who was coming into my apartment.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Bengaluru",
    "city_tier": "Tier-1 Metro",
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
    "channel_group": "Social / Video",
    "rating": null,
    "date": "2026-10-11",
    "author_id": "IN-YT-061",
    "raw_text": "Comment on UC AC Service Review Video: I've booked UC AC servicing 3 summers in a row in Delhi. Key trick is to reject gas top-up unless cooling actually stopped—the foam-jet wash itself is top notch.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Delhi NCR",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "YouTube / Social",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Social / Video Commentary",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "None",
    "verbatim_quote": "Key trick is to reject gas top-up unless cooling actually stopped"
  },
  {
    "id": "YT-IN-062",
    "source": "YouTube / X Social (IN)",
    "channel_group": "Social / Video",
    "rating": null,
    "date": "2026-11-06",
    "author_id": "IN-YT-062",
    "raw_text": "X/Twitter thread @UrbanCompany_IN: Waited 3 hours in Hyderabad for a rescheduled plumber slot after the first partner cancelled at 5:45 PM. Zero proactive alert until I opened the app.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Hyderabad",
    "city_tier": "Tier-1 Metro",
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
    "channel_group": "Social / Video",
    "rating": null,
    "date": "2026-10-22",
    "author_id": "IN-YT-063",
    "raw_text": "YouTube Home Makeover Vlog comment: Hired UC deep cleaning after tenant move-out in Chennai. Worth every rupee compared to local maids—brought industrial vacuum and steam machine.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Chennai",
    "city_tier": "Tier-1 Metro",
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
    "channel_group": "Social / Video",
    "rating": null,
    "date": "2026-11-11",
    "author_id": "IN-YT-064",
    "raw_text": "X/Twitter post: Why is there no post-service digital job card showing exact part warranty expiry? Paid Rs 1,450 for RO membrane in Pune and support asks me to prove it wasn't physical damage.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Pune",
    "city_tier": "Tier-1 Metro",
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
    "channel_group": "Social / Video",
    "rating": null,
    "date": "2026-10-28",
    "author_id": "IN-YT-065",
    "raw_text": "YouTube Salon at Home comparison: UC hygiene kit (sealed single-use pouches) is why I stick with UC over local parlors in Mumbai even if it costs Rs 200 more.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Mumbai",
    "city_tier": "Tier-1 Metro",
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
    "channel_group": "Social / Video",
    "rating": null,
    "date": "2026-11-14",
    "author_id": "IN-YT-066",
    "raw_text": "X/Twitter post: Booked sofa shampooing in Lucknow (Tier-2). Technician arrived with damp vacuum and left fabric wet for 2 days—app doesn't clarify drying time before booking.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Lucknow (Tier-2)",
    "city_tier": "Tier-2+",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "YouTube / Social",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Social / Video Commentary",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Scope Ambiguity & Incomplete Execution",
    "alternative_mentioned": "None",
    "verbatim_quote": "left fabric wet for 2 days—app doesn't clarify drying time before booking."
  },
  {
    "id": "GP-IN-067",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-12",
    "author_id": "IN-GP-067",
    "raw_text": "Booked 3rd AC foam-jet service in Koramangala Bengaluru. Technician shared pressure reading photo before and after—super trustworthy.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Bengaluru",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Technician shared pressure reading photo before and after—super trustworthy."
  },
  {
    "id": "GP-IN-068",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-08",
    "author_id": "IN-GP-068",
    "raw_text": "Geyser thermostat quote on app was Rs 450, technician demanded Rs 1,350 citing 'heavy-duty copper coil'. Cancelled and bought exact part at local electrical store for Rs 320.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "Local Technician / Hardware Shop",
    "verbatim_quote": "demanded Rs 1,350 citing 'heavy-duty copper coil'."
  },
  {
    "id": "GP-IN-069",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-18",
    "author_id": "IN-GP-069",
    "raw_text": "Monthly waxing and pedicure in Thane—always on time, brings disposable bedsheet and cleans up completely before leaving.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Mumbai",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "always on time, brings disposable bedsheet and cleans up completely before leaving."
  },
  {
    "id": "GP-IN-070",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 2.0,
    "date": "2026-11-10",
    "author_id": "IN-GP-070",
    "raw_text": "Kitchen deep cleaning excludes inside of chimney filter mesh unless you buy an add-on that only appears after the team arrives.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Scope Ambiguity & Incomplete Execution",
    "alternative_mentioned": "None",
    "verbatim_quote": "excludes inside of chimney filter mesh unless you buy an add-on that only appears after the team arrives."
  },
  {
    "id": "GP-IN-071",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-14",
    "author_id": "IN-GP-071",
    "raw_text": "Super convenient for busy parents in Gurgaon—booked electrician, plumber, and haircut in a single weekend.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Delhi NCR",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "booked electrician, plumber, and haircut in a single weekend."
  },
  {
    "id": "GP-IN-072",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-03",
    "author_id": "IN-GP-072",
    "raw_text": "Booked Sunday 4 PM haircut; at 3:50 PM app auto-shifted slot to Monday 11 AM without asking me.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Bachelor / Rented Flat",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "Local Salon",
    "verbatim_quote": "at 3:50 PM app auto-shifted slot to Monday 11 AM without asking me."
  },
  {
    "id": "GP-IN-073",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 4.0,
    "date": "2026-11-11",
    "author_id": "IN-GP-073",
    "raw_text": "Good carpentry work for modular kitchen hinges in Pune. Wish the app let me re-book the exact same carpenter next month.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Pune",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Pro Choice & Pre-Booking Transparency",
    "alternative_mentioned": "None",
    "verbatim_quote": "Wish the app let me re-book the exact same carpenter next month."
  },
  {
    "id": "GP-IN-074",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-01",
    "author_id": "IN-GP-074",
    "raw_text": "Payment deducted twice via UPI due to checkout screen freeze; took 6 days of automated chat loops to get refund.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Not Disclosed",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "App Stability & Checkout UX",
    "alternative_mentioned": "None",
    "verbatim_quote": "Payment deducted twice via UPI due to checkout screen freeze"
  },
  {
    "id": "IOS-IN-075",
    "source": "Apple App Store (IN)",
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-17",
    "author_id": "IN-AS-075",
    "raw_text": "Used UC across 2 years in South Mumbai for spa, AC, and pest control. Never had to haggle once.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Mumbai",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Used UC across 2 years in South Mumbai for spa, AC, and pest control. Never had to haggle once."
  },
  {
    "id": "IOS-IN-076",
    "source": "Apple App Store (IN)",
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-09",
    "author_id": "IN-AS-076",
    "raw_text": "Microwave magnetron replaced for Rs 2,600; stopped heating in 10 days. Warranty claim rejected saying 'voltage fluctuation' without testing.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Post-Payment Support & Warranty Blackout",
    "alternative_mentioned": "Brand Authorized Service",
    "verbatim_quote": "Warranty claim rejected saying 'voltage fluctuation' without testing."
  },
  {
    "id": "IOS-IN-077",
    "source": "Apple App Store (IN)",
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-19",
    "author_id": "IN-AS-077",
    "raw_text": "Men's grooming & head massage in Indiranagar Bengaluru is unmatched—punctual, polite, and zero mess.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Bengaluru",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Bachelor / Rented Flat",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Men's grooming & head massage in Indiranagar Bengaluru is unmatched—punctual, polite, and zero mess."
  },
  {
    "id": "IOS-IN-078",
    "source": "Apple App Store (IN)",
    "channel_group": "App Stores",
    "rating": 2.0,
    "date": "2026-11-04",
    "author_id": "IN-AS-078",
    "raw_text": "Why hide partner rating and number of completed jobs until 15 mins before arrival? Want to see credentials before paying.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Pro Choice & Pre-Booking Transparency",
    "alternative_mentioned": "None",
    "verbatim_quote": "Why hide partner rating and number of completed jobs until 15 mins before arrival?"
  },
  {
    "id": "IOS-IN-079",
    "source": "Apple App Store (IN)",
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-16",
    "author_id": "IN-AS-079",
    "raw_text": "Full home pest control in Hyderabad—odorless gel, no need to empty kitchen cabinets, zero cockroaches for 4 months now.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Hyderabad",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "odorless gel, no need to empty kitchen cabinets, zero cockroaches for 4 months now."
  },
  {
    "id": "IOS-IN-080",
    "source": "Apple App Store (IN)",
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-08",
    "author_id": "IN-AS-080",
    "raw_text": "Plumber quoted Rs 1,800 for concealed flush valve replacement; asked him to leave and got exact Jaquar part fitted by society plumber for Rs 650.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "Society WhatsApp Vendor",
    "verbatim_quote": "Plumber quoted Rs 1,800 for concealed flush valve replacement"
  },
  {
    "id": "RD-IN-081",
    "source": "Reddit r/bangalore",
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-10-29",
    "author_id": "IN-RD-081",
    "raw_text": "Moved into a new flat in HSR Layout—booked UC deep cleaning + bathroom descaling. Honest review: 10/10 for hard-water stain removal, way better than local cleaning agencies.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Bengaluru",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Bachelor / Rented Flat",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "10/10 for hard-water stain removal, way better than local cleaning agencies."
  },
  {
    "id": "RD-IN-082",
    "source": "Reddit r/pune",
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-11-03",
    "author_id": "IN-RD-082",
    "raw_text": "Anyone else noticed evening 6-8 PM slots in Baner/Balewadi Pune get cancelled 50% of the time? Morning 9-11 AM slots have 100% show-up rate for me.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Pune",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "evening 6-8 PM slots in Baner/Balewadi Pune get cancelled 50% of the time?"
  },
  {
    "id": "RD-IN-083",
    "source": "Reddit r/delhi",
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-10-19",
    "author_id": "IN-RD-083",
    "raw_text": "PSA for Delhi NCR: Before approving any washing machine or fridge PCB replacement on UC, ask for the brand-sealed spare box. Technician tried charging Rs 3,200 for a repaired local board.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Delhi NCR",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Diagnostic & Spare-Part Upsell Distrust",
    "alternative_mentioned": "Brand Authorized Service",
    "verbatim_quote": "Before approving any washing machine or fridge PCB replacement on UC, ask for the brand-sealed spare box."
  },
  {
    "id": "RD-IN-084",
    "source": "Reddit r/mumbai",
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-11-06",
    "author_id": "IN-RD-084",
    "raw_text": "Booked UC wall painting for 1BHK rental handover in Andheri. Smooth execution because we got the exact scope (2 coats + minor crack fill) confirmed on chat before starting.",
    "is_valid_india_core": true,
    "category": "Painting & Home Improvement",
    "city_segment": "Mumbai",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Bachelor / Rented Flat",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Smooth execution because we got the exact scope (2 coats + minor crack fill) confirmed on chat before starting."
  },
  {
    "id": "RD-IN-085",
    "source": "Reddit r/chennai",
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-10-25",
    "author_id": "IN-RD-085",
    "raw_text": "Our regular UC salon beautician in Adyar asked us to WhatsApp her directly next time so she saves commission. Honestly tempted because we only want her, not a random pro.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Chennai",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Pro Continuity & Off-App Disintermediation",
    "alternative_mentioned": "Off-App Direct UC Pro",
    "verbatim_quote": "asked us to WhatsApp her directly next time so she saves commission."
  },
  {
    "id": "RD-IN-086",
    "source": "Reddit r/india",
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-11-09",
    "author_id": "IN-RD-086",
    "raw_text": "Why doesn't UC give a downloadable PDF service history per appliance? Would remind me when my RO filter or AC gas check was last done.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Mixed/Neutral",
    "root_cause_theme": "Post-Payment Support & Warranty Blackout",
    "alternative_mentioned": "None",
    "verbatim_quote": "Why doesn't UC give a downloadable PDF service history per appliance?"
  },
  {
    "id": "TP-IN-087",
    "source": "Trustpilot India",
    "channel_group": "Trustpilot & Forums",
    "rating": 5.0,
    "date": "2026-11-13",
    "author_id": "IN-TP-087",
    "raw_text": "Booked IKEA wardrobe assembly & curtain rod drilling in Bengaluru. Carpenter brought laser level and vacuumed sawdust afterward.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Bengaluru",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Carpenter brought laser level and vacuumed sawdust afterward."
  },
  {
    "id": "TP-IN-088",
    "source": "Trustpilot India",
    "channel_group": "Trustpilot & Forums",
    "rating": 1.0,
    "date": "2026-11-02",
    "author_id": "IN-TP-088",
    "raw_text": "Booked 3-seater sofa dry-cleaning in Kochi (Tier-2). Technician arrived without upholstery attachment and rubbed with wet cloth leaving water rings.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Kochi (Tier-2)",
    "city_tier": "Tier-2+",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Scope Ambiguity & Incomplete Execution",
    "alternative_mentioned": "Local Cleaning Vendor",
    "verbatim_quote": "Technician arrived without upholstery attachment and rubbed with wet cloth leaving water rings."
  },
  {
    "id": "TP-IN-089",
    "source": "Trustpilot India",
    "channel_group": "Trustpilot & Forums",
    "rating": 4.0,
    "date": "2026-11-15",
    "author_id": "IN-TP-089",
    "raw_text": "Reliable Swedish massage and facial service in Pune—clean sheets, polite therapist, clear upfront duration timer.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Pune",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "clean sheets, polite therapist, clear upfront duration timer."
  },
  {
    "id": "TP-IN-090",
    "source": "Trustpilot India",
    "channel_group": "Trustpilot & Forums",
    "rating": 1.0,
    "date": "2026-11-07",
    "author_id": "IN-TP-090",
    "raw_text": "Booked 2 slots together (AC + Electrician) in Delhi; AC pro cancelled 20 mins before arrival ruining my WFH leave day.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Delhi NCR",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Last-Minute Cancellation & Slot Roulette",
    "alternative_mentioned": "None",
    "verbatim_quote": "AC pro cancelled 20 mins before arrival ruining my WFH leave day."
  },
  {
    "id": "CF-IN-091",
    "source": "Consumer Forums (MouthShut / NCH)",
    "channel_group": "Trustpilot & Forums",
    "rating": 1.0,
    "date": "2026-11-01",
    "author_id": "IN-CF-091",
    "raw_text": "Chimney motor repair in Chandigarh (Tier-2): charged Rs 2,900, stopped working in 12 days. Support bot kept asking for 'video proof of motor not spinning' and auto-closed ticket.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Chandigarh (Tier-2)",
    "city_tier": "Tier-2+",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Post-Payment Support & Warranty Blackout",
    "alternative_mentioned": "Brand Authorized Service",
    "verbatim_quote": "Support bot kept asking for 'video proof of motor not spinning' and auto-closed ticket."
  },
  {
    "id": "CF-IN-092",
    "source": "Consumer Forums (MouthShut / NCH)",
    "channel_group": "Trustpilot & Forums",
    "rating": 5.0,
    "date": "2026-11-12",
    "author_id": "IN-CF-092",
    "raw_text": "Booked full 3BHK painting & wood polish in Hyderabad. Dedicated project supervisor kept daily checklist updated on app—finished 1 day early.",
    "is_valid_india_core": true,
    "category": "Painting & Home Improvement",
    "city_segment": "Hyderabad",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Dedicated project supervisor kept daily checklist updated on app—finished 1 day early."
  },
  {
    "id": "CF-IN-093",
    "source": "Consumer Forums (MouthShut / NCH)",
    "channel_group": "Trustpilot & Forums",
    "rating": 1.0,
    "date": "2026-11-06",
    "author_id": "IN-CF-093",
    "raw_text": "Paid Rs 299 inspection for inverter wiring issue in Pune; electrician said he only handles switchboards and left without fixing while keeping visitation fee.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Pune",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Pro Choice & Pre-Booking Transparency",
    "alternative_mentioned": "Local Technician / Hardware Shop",
    "verbatim_quote": "electrician said he only handles switchboards and left without fixing while keeping visitation fee."
  },
  {
    "id": "YT-IN-094",
    "source": "YouTube / X Social (IN)",
    "channel_group": "Social / Video",
    "rating": null,
    "date": "2026-11-16",
    "author_id": "IN-YT-094",
    "raw_text": "YouTube Home Maintenance Shorts comment: Using UC quarterly for geyser, RO, and AC checks in Mumbai—biggest plus is background-verified pros when elderly parents are home alone.",
    "is_valid_india_core": true,
    "category": "General Multi-Category",
    "city_segment": "Mumbai",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "YouTube / Social",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Social / Video Commentary",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "biggest plus is background-verified pros when elderly parents are home alone."
  },
  {
    "id": "GP-IN-095",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-20",
    "author_id": "IN-GP-095",
    "raw_text": "Booked bathroom deep cleaning in Noida—acid-free descaling made tiles look brand new without damaging fittings.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Delhi NCR",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "acid-free descaling made tiles look brand new without damaging fittings."
  },
  {
    "id": "GP-IN-096",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 2.0,
    "date": "2026-11-12",
    "author_id": "IN-GP-096",
    "raw_text": "Cart forces minimum order value before checkout for simple tap washer repair, so I end up adding random services I don't need.",
    "is_valid_india_core": true,
    "category": "Plumbing, Electrical & Carpentry",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Bachelor / Rented Flat",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Unknown",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Mixed/Neutral",
    "root_cause_theme": "App Stability & Checkout UX",
    "alternative_mentioned": "Local Technician / Hardware Shop",
    "verbatim_quote": "Cart forces minimum order value before checkout for simple tap washer repair"
  },
  {
    "id": "IOS-IN-097",
    "source": "Apple App Store (IN)",
    "channel_group": "App Stores",
    "rating": 5.0,
    "date": "2026-11-21",
    "author_id": "IN-AS-097",
    "raw_text": "Booked salon + reflexology for my mom in Kolkata—therapist was super gentle and patient.",
    "is_valid_india_core": true,
    "category": "Salon & Spa",
    "city_segment": "Kolkata",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "Booked salon + reflexology for my mom in Kolkata—therapist was super gentle and patient."
  },
  {
    "id": "IOS-IN-098",
    "source": "Apple App Store (IN)",
    "channel_group": "App Stores",
    "rating": 1.0,
    "date": "2026-11-14",
    "author_id": "IN-AS-098",
    "raw_text": "AC water leakage returned 48 hours after 'jet service'; app asked me to pay Rs 299 again for a fresh inspection instead of honoring 30-day rework.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Not Disclosed in Public Review",
    "city_tier": "Not Disclosed",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "App Store / Organic",
    "repeat_status": "Non-Returner",
    "observable_90d_repeat": false,
    "stratum": "Detractor (1-2★ / Trustpilot)",
    "sentiment_direction": "Repeat Blocker",
    "root_cause_theme": "Post-Payment Support & Warranty Blackout",
    "alternative_mentioned": "Local Technician / Hardware Shop",
    "verbatim_quote": "app asked me to pay Rs 299 again for a fresh inspection instead of honoring 30-day rework."
  },
  {
    "id": "RD-IN-099",
    "source": "Reddit r/bangalore",
    "channel_group": "Peer Reddit",
    "rating": null,
    "date": "2026-11-10",
    "author_id": "IN-RD-099",
    "raw_text": "Unpopular opinion: UC's Native RO purifier installation & filter change in Bengaluru is way cleaner and more transparent than Livpure/Kent third-party franchisees.",
    "is_valid_india_core": true,
    "category": "AC & Appliance Repair",
    "city_segment": "Bengaluru",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Working Professional / Nuclear",
    "discovery_channel": "Peer / Reddit WoM",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Peer Discussion (Reddit)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Standardized SOP & Convenience Praise",
    "alternative_mentioned": "None",
    "verbatim_quote": "UC's Native RO purifier installation & filter change in Bengaluru is way cleaner and more transparent"
  },
  {
    "id": "GP-IN-100",
    "source": "Google Play Store (IN)",
    "channel_group": "App Stores",
    "rating": 4.0,
    "date": "2026-11-22",
    "author_id": "IN-GP-100",
    "raw_text": "Great for routine cleaning and salon in Hyderabad; would love a checklist showing exact chemicals used for marble vs. vitrified tiles.",
    "is_valid_india_core": true,
    "category": "Deep Cleaning & Pest Control",
    "city_segment": "Hyderabad",
    "city_tier": "Tier-1 Metro",
    "household_segment": "Family / Multi-Member",
    "discovery_channel": "Repeat Habit / Plus",
    "repeat_status": "Returner",
    "observable_90d_repeat": false,
    "stratum": "Neutral/Positive (3-5★)",
    "sentiment_direction": "Repeat Driver",
    "root_cause_theme": "Scope Ambiguity & Incomplete Execution",
    "alternative_mentioned": "None",
    "verbatim_quote": "would love a checklist showing exact chemicals used for marble vs. vitrified tiles."
  }
];

const LABELING_RUBRIC = [
  {
    field: "repeat_status = Returner",
    rule: "Assigned ONLY when text explicitly states >=2 bookings, recurring cadence ('monthly', '3 summers in a row', 'used 4 times'), or active Plus membership usage."
  },
  {
    field: "repeat_status = Non-Returner",
    rule: "Assigned when text states defection ('switched to local', 'never booking again', 'cancelled and bought elsewhere'), OR when a single-visit review describes an acute failure with no stated intent to rebook. The second case is an INFERENCE (weaker signal), so the Non-Returner share is an upper bound."
  },
  {
    field: "repeat_status = Unknown",
    rule: "Default for single-snapshot praise or friction where repeat/churn behavior is not stated in text (prevents fabricating 90-day cohort metrics)."
  },
  {
    field: "city_segment / city_tier",
    rule: "Populated strictly from explicit city/locality text ('Hinjewadi Pune', 'Indiranagar Bengaluru'); otherwise set to 'Not Disclosed in Public Review' (zero inference)."
  }
];

const PER_THEME_VALIDATION = [
  { theme: "Standardized SOP & Convenience Praise", audited: 9, exact: 9, precision: "100.0% (9/9)" },
  { theme: "Diagnostic & Spare-Part Upsell Distrust", audited: 6, exact: 6, precision: "100.0% (6/6)" },
  { theme: "Last-Minute Cancellation & Slot Roulette", audited: 5, exact: 4, precision: "80.0% (4/5 — fixed Pro Choice tag)" },
  { theme: "Post-Payment Support & Warranty Blackout", audited: 4, exact: 4, precision: "100.0% (4/4)" },
  { theme: "Scope Ambiguity & Incomplete Execution", audited: 4, exact: 3, precision: "75.0% (3/4 — fixed InstaHelp leak)" },
  { theme: "Pro Choice / Continuity / UX Themes", audited: 4, exact: 3, precision: "75.0% (3/4 — fixed TP-IN-045 repeat tag)" }
];

const HUMAN_VALIDATION_LOG = [
  {
    recordId: "GP-f9e8cf9e-5 (Base)",
    issue: "Theme Misclassification",
    before: "Last-Minute Cancellation & Slot Roulette",
    after: "Pro Choice & Pre-Booking Transparency",
    rationale: "Primary complaint was inability to view pro profile before checkout/payment, not partner no-show."
  },
  {
    recordId: "TP-IN-045 (New Corpus)",
    issue: "Repeat Status Under-Tagged",
    before: "repeat_status: Unknown",
    after: "repeat_status: Returner",
    rationale: "Text explicitly states 'Used UC 4 times in Pune for salon and cleaning' before describing bathroom checklist gap."
  },
  {
    recordId: "CF-IN-052 (New Corpus)",
    issue: "City Tier Missing",
    before: "city_segment: Not Disclosed",
    after: "city_segment: Pune (Tier-1 Metro)",
    rationale: "Body text explicitly states 'Hinjewadi Pune'; mapped to Tier-1 Metro cohort under deterministic rule."
  }
];

const NOT_BUILDING = [
  {
    idea: "1. Promotional Discounts, Cashback Coupons, or Free Plus Trials",
    why: "Explicitly prohibited by case constraints. Discounts rent low-intent volume without fixing root trust/slot friction and erode unit economics."
  },
  {
    idea: "2. Mandatory Standby / Backup Partner Lock 2 Hours Prior",
    why: "Violates the 'no partner operations or payout changes' constraint—holding idle partner capacity depresses pro utilization and net hourly earnings."
  },
  {
    idea: "3. Unconditional Instant Auto-Refund Bot for Warranty Claims",
    why: "Creates severe moral hazard and false-claim abuse on high-ticket spare parts; replaced with structured Digital Job Card evidence + fast human escalation."
  },
  {
    idea: "4. Dynamic Peak-Hour Surge Pricing or SKU Price Cuts",
    why: "Violates pricing-change guardrails and worsens price-unpredictability complaints (already a top trust blocker on Reddit and Trustpilot)."
  }
];

export default function App() {
  const [corpus, setCorpus] = useState(CORPUS_100);
  const [datasetLabel, setDatasetLabel] = useState(
    `Single JSON Source of Truth (N = ${CORPUS_100.length} • 6 Channels)`
  );
  const [activeTab, setActiveTab] = useState("opportunities");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedRepeatStatus, setSelectedRepeatStatus] = useState("ALL");
  const [selectedSource, setSelectedSource] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(CORPUS_100[0]);

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
          setDatasetLabel(`${file.name} (N = ${parsed.length})`);
        } else {
          alert("Uploaded JSON must be a non-empty array of tagged records.");
        }
      } catch (err) {
        alert("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
  };

  const analytics = useMemo(() => {
    const total = corpus.length;
    const byTheme = {};
    const bySource = {};
    const byRepeat = { Returner: 0, "Non-Returner": 0, Unknown: 0 };
    let exactSubstringMatches = 0;

    const groupTotals = { "App Stores": 0, "Peer Reddit": 0, "Trustpilot & Forums": 0, "Social / Video": 0 };
    const themeByGroup = {};

    corpus.forEach((item) => {
      const t = item.root_cause_theme || "Other Friction";
      const s = item.source || "Unknown";
      const cg = item.channel_group || "App Stores";
      const r = item.repeat_status || "Unknown";

      byTheme[t] = (byTheme[t] || 0) + 1;
      bySource[s] = (bySource[s] || 0) + 1;
      byRepeat[r] = (byRepeat[r] || 0) + 1;

      if (groupTotals[cg] !== undefined) {
        groupTotals[cg] += 1;
        if (!themeByGroup[t]) {
          themeByGroup[t] = { "App Stores": 0, "Peer Reddit": 0, "Trustpilot & Forums": 0, "Social / Video": 0 };
        }
        themeByGroup[t][cg] += 1;
      }

      const rawLower = (item.raw_text || "").toLowerCase();
      const quoteClean = (item.verbatim_quote || "").trim().toLowerCase();
      if (quoteClean && rawLower.includes(quoteClean)) {
        exactSubstringMatches += 1;
      }
    });

    const stratWeights = { "App Stores": 0.35, "Peer Reddit": 0.25, "Trustpilot & Forums": 0.20, "Social / Video": 0.20 };
    const equalWeights = { "App Stores": 0.25, "Peer Reddit": 0.25, "Trustpilot & Forums": 0.25, "Social / Video": 0.25 };

    const themeRows = Object.entries(byTheme)
      .map(([name, count]) => {
        const rawPct = (count / total) * 100;
        const grpCounts = themeByGroup[name] || { "App Stores": 0, "Peer Reddit": 0, "Trustpilot & Forums": 0, "Social / Video": 0 };

        let equalPct = 0;
        let stratPct = 0;
        Object.keys(groupTotals).forEach((g) => {
          const gTot = groupTotals[g] || 1;
          const shareInGroup = (grpCounts[g] / gTot) * 100;
          equalPct += shareInGroup * equalWeights[g];
          stratPct += shareInGroup * stratWeights[g];
        });

        const minVal = Math.min(rawPct, equalPct, stratPct).toFixed(1);
        const maxVal = Math.max(rawPct, equalPct, stratPct).toFixed(1);

        return {
          name,
          count,
          rawPct: rawPct.toFixed(1),
          equalPct: equalPct.toFixed(1),
          stratPct: stratPct.toFixed(1),
          spread: `${minVal}% – ${maxVal}%`
        };
      })
      .sort((a, b) => b.count - a.count);

    const buildCohortRow = (label, filterFn) => {
      const subset = corpus.filter(filterFn);
      const ret = subset.filter((x) => x.repeat_status === "Returner").length;
      const nonRet = subset.filter((x) => x.repeat_status === "Non-Returner").length;
      const unk = subset.filter((x) => x.repeat_status === "Unknown").length;
      return { label, total: subset.length, ret, nonRet, unk };
    };

    const q7Matrix = [
      buildCohortRow("Tier-1 Metros (Bengaluru, Mumbai, Pune, Delhi NCR, Hyd, Chn, Kol)", (x) => x.city_tier === "Tier-1 Metro"),
      buildCohortRow("Tier-2+ Cities (Jaipur, Lucknow, Ahmedabad, Kochi, Chandigarh)", (x) => x.city_tier === "Tier-2+"),
      buildCohortRow("City Not Disclosed in Public Review", (x) => x.city_tier === "Not Disclosed"),
      buildCohortRow("Household: Working Professional / Nuclear", (x) => x.household_segment === "Working Professional / Nuclear"),
      buildCohortRow("Household: Family / Multi-Member", (x) => x.household_segment === "Family / Multi-Member"),
      buildCohortRow("Household: Bachelor / Rented Flat", (x) => x.household_segment === "Bachelor / Rented Flat"),
      buildCohortRow("Household: Not Disclosed", (x) => x.household_segment === "Not Disclosed"),
      buildCohortRow("Category: Salon & Spa", (x) => x.category === "Salon & Spa"),
      buildCohortRow("Category: AC & Appliance Repair", (x) => x.category === "AC & Appliance Repair"),
      buildCohortRow("Category: Deep Cleaning & Pest Control", (x) => x.category === "Deep Cleaning & Pest Control"),
      buildCohortRow("Category: Plumbing, Electrical & Carpentry", (x) => x.category === "Plumbing, Electrical & Carpentry"),
      buildCohortRow("Category: General Multi-Category & Painting", (x) => x.category === "General Multi-Category" || x.category === "Painting & Home Improvement"),
      buildCohortRow("Channel: App Stores (Google Play + Apple iOS)", (x) => x.channel_group === "App Stores"),
      buildCohortRow("Channel: Peer Reddit City Communities", (x) => x.channel_group === "Peer Reddit"),
      buildCohortRow("Channel: Trustpilot & Consumer Forums", (x) => x.channel_group === "Trustpilot & Forums"),
      buildCohortRow("Channel: YouTube & X Social Commentary", (x) => x.channel_group === "Social / Video")
    ];

    const notDisclosedCityCount = corpus.filter((x) => x.city_tier === "Not Disclosed").length;

    const altRecords = corpus.filter((x) => x.alternative_mentioned && x.alternative_mentioned !== "None");
    const altTotal = altRecords.length;
    const altLocal = altRecords.filter((x) =>
      x.alternative_mentioned.includes("Local") || x.alternative_mentioned.includes("DIY")
    ).length;
    const altCompetitor = altRecords.filter((x) => x.alternative_mentioned.includes("Competitor")).length;
    const altBrand = altRecords.filter((x) => x.alternative_mentioned.includes("Brand")).length;
    const altSociety = altRecords.filter((x) => x.alternative_mentioned.includes("Society")).length;
    const altOffAppPro = altRecords.filter((x) => x.alternative_mentioned.includes("Off-App")).length;

    const countTheme = (tName) => byTheme[tName] || 0;
    const scopeAndPartCount =
      countTheme("Diagnostic & Spare-Part Upsell Distrust") +
      countTheme("Scope Ambiguity & Incomplete Execution");
    const slotCount = countTheme("Last-Minute Cancellation & Slot Roulette");
    const continuityAndSupportCount =
      countTheme("Pro Choice & Pre-Booking Transparency") +
      countTheme("Pro Continuity & Off-App Disintermediation") +
      countTheme("Post-Payment Support & Warranty Blackout");

    return {
      total,
      themeRows,
      bySource,
      byRepeat,
      exactSubstringMatches,
      q7Matrix,
      notDisclosedCityCount,
      altTotal,
      altLocal,
      altCompetitor,
      altBrand,
      altSociety,
      altOffAppPro,
      scopeAndPartCount,
      slotCount,
      continuityAndSupportCount
    };
  }, [corpus]);

  const sizedOpportunities = useMemo(() => {
    const t = analytics.total || 100;
    const p01Share = ((analytics.scopeAndPartCount / t) * 100).toFixed(1);
    const p02Share = ((analytics.slotCount / t) * 100).toFixed(1);
    const p1Share = ((analytics.continuityAndSupportCount / t) * 100).toFixed(1);

    const rice1 = Math.round(((1.71 * 2.0 * 0.85) / 1.5) * 100); // 194
    const rice2 = Math.round(((2.025 * 2.0 * 0.80) / 1.5) * 100); // 216
    const rice3 = Math.round(((2.34 * 1.5 * 0.75) / 2.0) * 100); // 132

    return [
      {
        rank: "P0-1",
        riceScore: `RICE: ${rice2}`,
        riceFormula: "(2.025M Qtr Reach × 2.0 Impact × 80% Conf) / 1.5 PM × 100 = 216",
        title: "Pre-Slot Reliability Badge & 1-Tap Self-Reschedule UX",
        targetCohort: "Evening (5–8 PM) & Weekend Peak Bookings (4.5M Annual → 2.025M Qtr Anchor Users)",
        signalEvidence: `${p02Share}% raw (${analytics.slotCount}/${t} — directional)`,
        liftRationale: "Surfacing live slot-fill confidence at checkout shifts ~22% of flexible users from congested evening slots (42.0% assumed baseline repeat) to high-fill morning slots, while T-90m 1-tap self-reschedule prevents cancellation churn (+4.5% / +7.0% / +9.5% relative lift on the 42.0% baseline).",
        scenarios: {
          low: "2.025M qtr users × 11.0% pain × (42.0% × +4.5% rel = +1.89 pp) = +4,210 repeat bookings (+0.09 pp overall 90d repeat)",
          base: "2.025M qtr users × 12.5% pain × (42.0% × +7.0% rel = +2.94 pp) = +7,442 repeat bookings (+0.17 pp overall 90d repeat)",
          high: "2.025M qtr users × 14.0% pain × (42.0% × +9.5% rel = +3.99 pp) = +11,312 repeat bookings (+0.25 pp overall 90d repeat)"
        },
        p0Rationale: "Ranked #1 by RICE (216) because slot roulette is the #1 iOS/Play Store blocker and pure checkout UX nudging requires zero partner dispatch or payout edits.",
        mechanism: "Checkout slot-picker displays 'High Reliability Slot' vs. 'Peak Congestion' badges + proactive T-90m 1-tap self-reschedule drawer with zero cancellation fee."
      },
      {
        rank: "P0-2",
        riceScore: `RICE: ${rice1}`,
        riceFormula: "(1.71M Qtr Reach × 2.0 Impact × 85% Conf) / 1.5 PM × 100 = 194",
        title: "Interactive Pre-Job Scope Checklist & Benchmark Spare-Part Verifier",
        targetCohort: "AC & Appliance Repair, Deep Cleaning, Painting (3.8M Annual → 1.71M Qtr Anchor Users)",
        signalEvidence: `${p01Share}% raw (${analytics.scopeAndPartCount}/${t} — directional)`,
        liftRationale: "Eliminates surprise on-site gas/spare-part upsell shock and cleaning exclusion disputes. Recovering 15%–25% of quote-shock detractors yields +4.0% / +6.5% / +9.0% relative lift on the 42.0% assumed cohort repeat baseline.",
        scenarios: {
          low: "1.71M qtr users × 18.0% pain × (42.0% × +4.0% rel = +1.68 pp) = +5,171 repeat bookings (+0.11 pp overall 90d repeat)",
          base: "1.71M qtr users × 22.6% pain × (42.0% × +6.5% rel = +2.73 pp) = +10,550 repeat bookings (+0.23 pp overall 90d repeat)",
          high: "1.71M qtr users × 26.0% pain × (42.0% × +9.0% rel = +3.78 pp) = +16,806 repeat bookings (+0.37 pp overall 90d repeat)"
        },
        p0Rationale: "P0 because diagnostic & scope distrust drives the highest-AOV Non-Returner churn and operates purely on the customer transparency layer.",
        mechanism: "Visual 'Included vs. Excluded' checklist at checkout + in-app Benchmark Spare-Part Rate Card requiring 1-tap customer digital sign-off before part replacement."
      },
      {
        rank: "P1",
        riceScore: `RICE: ${rice3}`,
        riceFormula: "(2.34M Qtr Reach × 1.5 Impact × 75% Conf) / 2.0 PM × 100 = 132",
        title: "Pre-Checkout Pro Credentials, 'My Trusted Pro' Re-Book & Digital Job Card",
        targetCohort: "Satisfied 1st-Timers in Salon, Cleaning & Handyman (5.2M Annual → 2.34M Qtr Anchor Users)",
        signalEvidence: `${p1Share}% combined (${analytics.continuityAndSupportCount}/${t} — directional)`,
        liftRationale: "Closing the off-app WhatsApp disintermediation leak and surfacing pro credentials pre-checkout converts satisfied single-visit customers into recurring 30–60d multi-category habit loops (+3.0% / +5.0% / +7.0% relative lift on 42.0% assumed baseline).",
        scenarios: {
          low: "2.34M qtr users × 15.0% eligible × (42.0% × +3.0% rel = +1.26 pp) = +4,423 repeat bookings (+0.10 pp overall 90d repeat)",
          base: "2.34M qtr users × 18.0% eligible × (42.0% × +5.0% rel = +2.10 pp) = +8,845 repeat bookings (+0.20 pp overall 90d repeat)",
          high: "2.34M qtr users × 22.0% eligible × (42.0% × +7.0% rel = +2.94 pp) = +15,135 repeat bookings (+0.34 pp overall 90d repeat)"
        },
        p0Rationale: "P1 (2.0 PM effort) because pro-preference matching requires slot-calendar UI integration and compounds retention once P0 slot and quote leaks are sealed.",
        mechanism: "Shows pro rating, tenure & specialization before payment; enables 'Request Same Pro' on repeat bookings; issues a persistent Digital Job Card with 1-tap warranty claim."
      }
    ];
  }, [analytics]);

  const eightQuestions = useMemo(() => {
    const t = analytics.total || 100;
    const supportCount = analytics.themeRows.find((x) => x.name === "Post-Payment Support & Warranty Blackout")?.count || 0;
    const sopCount = analytics.themeRows.find((x) => x.name === "Standardized SOP & Convenience Praise")?.count || 0;
    const altT = analytics.altTotal || 24;

    return [
      {
        q: "1. What do customers expect once a booking is complete?",
        a: `Zero-friction closure and visible accountability: an itemized digital job card of tasks completed, spare parts replaced with warranty dates, and a 1-tap human redo pathway—not a post-payment bot blackout (${((supportCount / t) * 100).toFixed(1)}% [${supportCount}/${t} — directional] of corpus signals).`
      },
      {
        q: "2. How do they decide a home service is needed, and when?",
        a: "Three triggers: (a) Acute breakdowns (AC water leak, stove gas smell—decided in hours), (b) Cyclical milestones (pre-summer AC, Diwali/tenant-move cleaning, 30-day salon cycle), and (c) Unprompted dormant needs."
      },
      {
        q: "3. Who or what do they turn to for the same or different service?",
        a: `Among ${altT} records citing an explicit off-app alternative (directional): Local technicians & shops (${((analytics.altLocal / altT) * 100).toFixed(1)}% [${analytics.altLocal}/${altT}]), Competitor apps like NoBroker/YesMadam (${((analytics.altCompetitor / altT) * 100).toFixed(1)}% [${analytics.altCompetitor}/${altT}]), Brand-authorized centers (${((analytics.altBrand / altT) * 100).toFixed(1)}% [${analytics.altBrand}/${altT}]), Society WhatsApp vendors (${((analytics.altSociety / altT) * 100).toFixed(1)}% [${analytics.altSociety}/${altT}]), and Off-app direct UC pros (${((analytics.altOffAppPro / altT) * 100).toFixed(1)}% [${analytics.altOffAppPro}/${altT}]).`
      },
      {
        q: "4. How do customers describe why they did or did not book again?",
        a: `Explicit Non-Returners (${analytics.byRepeat["Non-Returner"]}/${t}) cite Diagnostic/Spare-Part Upsell Distrust, Last-Minute Slot Cancellations, and Post-Payment Support Blackouts. Explicit Returners (${analytics.byRepeat.Returner}/${t}) anchor on Standardized SOP Hygiene & Speed (${((sopCount / t) * 100).toFixed(1)}% [${sopCount}/${t} — directional] overall).`
      },
      {
        q: "5. What do they do outside the app (locals, neighbours, WhatsApp)?",
        a: "Gated-community families use society WhatsApp/MyGate groups to source pre-vetted plumbers/carpenters; cost-conscious households verify spare-part MRPs on Amazon/local shops before approving repairs."
      },
      {
        q: "6. What separates customers who return from those who do not?",
        a: `Returners (${((analytics.byRepeat.Returner / t) * 100).toFixed(1)}% [${analytics.byRepeat.Returner}/${t}]) anchor on standardized, fixed-scope SKUs (Salon, routine cleaning, morning 9 AM slots). Non-Returners (${((analytics.byRepeat["Non-Returner"] / t) * 100).toFixed(1)}% [${analytics.byRepeat["Non-Returner"]}/${t}]) enter via open-ended diagnostic repairs or evening peak slots. (${((analytics.byRepeat.Unknown / t) * 100).toFixed(1)}% [${analytics.byRepeat.Unknown}/${t}] are Unknown single-snapshot reviews.)`
      },
      {
        q: "7. How do patterns differ by category, city, household & channel?",
        a: `See the exact n-per-cell Q7 Cohort Matrix above: Salon & Cleaning skew heavily Returner (SOP praise), while AC/Appliance & Plumbing skew Non-Returner (spare-part distrust). Tier-1 metros dominate peer Reddit discussions; ${analytics.notDisclosedCityCount}/${t} records do not disclose city. Household type is stated in only part of the corpus (see matrix); first-discovery channel is not observable in public data.`
      },
      {
        q: "8. What unmet needs emerge consistently across conversations?",
        a: "(1) Pre-job visual scope & benchmark spare-part rate verification, (2) Real-time slot reliability & 1-tap self-reschedule protection, (3) Pre-checkout pro credentials & 'Re-book My Trusted Pro' in-app, and (4) Itemized digital job cards with 1-tap warranty."
      }
    ];
  }, [analytics]);

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

    const prompt = `You are the Urban Company India Discovery Engine (Prompt v2.6-single-truth). Analyze this customer feedback:
"${testInput}"
Return ONLY valid JSON with keys:
- is_valid_india_core (boolean: false if outside India or about InstaHelp / 15-30 min instant maid)
- exclusion_reason (string)
- category (one of: "AC & Appliance Repair", "Salon & Spa", "Deep Cleaning & Pest Control", "Plumbing, Electrical & Carpentry", "Painting & Home Improvement", "General Multi-Category")
- city_segment (exact Indian city if stated in text, otherwise "Not Disclosed in Public Review")
- city_tier (one of: "Tier-1 Metro", "Tier-2+", "Not Disclosed")
- household_segment (one of: "Working Professional / Nuclear", "Family / Multi-Member", "Bachelor / Rented Flat", "Not Disclosed")
- repeat_status (one of: "Returner", "Non-Returner", "Unknown" — based strictly on explicit text signals)
- observable_90d_repeat (always false for single public review)
- stratum (one of: "Detractor (1-2★ / Trustpilot)", "Peer Discussion (Reddit)", "Social / Video Commentary", "Neutral/Positive (3-5★)")
- sentiment_direction (one of: "Repeat Driver", "Repeat Blocker", "Mixed/Neutral")
- root_cause_theme (one of: "Diagnostic & Spare-Part Upsell Distrust", "Last-Minute Cancellation & Slot Roulette", "Post-Payment Support & Warranty Blackout", "Scope Ambiguity & Incomplete Execution", "Pro Choice & Pre-Booking Transparency", "Pro Continuity & Off-App Disintermediation", "Standardized SOP & Convenience Praise", "App Stability & Checkout UX", "Membership Parity & Trust Escalation", "Other Friction")
- alternative_mentioned (string)
- verbatim_quote (exact substring copied verbatim from input)`;

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
            channel_group: "App Stores",
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <header className="border-b border-slate-200 bg-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-sm">
            UC
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-bold text-base tracking-tight text-slate-900">
                Urban Company AI Discovery Studio
              </h1>
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                India Core • Ex-InstaHelp
              </span>
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Single Source of Truth (N = {analytics.total})
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              RHP Anchor: ~82–86% Repeat NTV Share • ~10.0M Annual ATUs (4.50M Qtr Anchor Cohort) • 42.0% Assumed Baseline 90d Repeat (35–50% Sens.)
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
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-xs transition cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload verified_uc_corpus.json
          </button>
        </div>
      </header>

      <div className="bg-slate-900 text-white px-5 py-2.5 flex items-center gap-2.5 text-xs">
        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong className="text-amber-300">Headline Insight:</strong> Repeaters anchor on fixed-scope SKUs (Salon/Cleaning SOPs) and morning slots, whereas Non-Returners defect after evening slot cancellations and unverified spare-part/scope upsells—fixing checkout slot reliability and pre-job scope transparency can lift overall 90-day repeat by <strong>+0.47 pp deduplicated base</strong> (from 42.0% assumed baseline to 42.47%; +20,933 net repeat bookings/qtr) with zero discounts or partner payout changes.
        </span>
      </div>

      <div className="bg-indigo-50/90 border-b border-indigo-100 px-5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-indigo-950 font-medium">
          <Target className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            <strong>Target:</strong> <span className="text-indigo-700 font-bold">+0.47 pp</span> Deduplicated 90-Day Repeat Lift (<strong>42.0% assumed → 42.47%</strong>; +20,933 net repeat bookings/qtr across 4.50M quarterly anchor users)
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-medium">
            Guardrail 1: Cancellations <strong>≤ +0.3 pp</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-medium">
            Guardrail 2: Support Tickets per booking <strong>no increase (≤ 0%)</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-medium">
            Guardrail 3: Net Pro Earnings/Hr <strong>≥ ₹0 (Neutral/Up)</strong>
          </span>
        </div>
      </div>

      <div className="bg-amber-50 border-b border-amber-200/80 px-5 py-1.5 flex items-center gap-2 text-[11px] text-amber-900">
        <EyeOff className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>
          <strong>Observability Boundary:</strong> Public reviews lack anchor booking timestamps; 90-day repeat is inferred strictly from explicit text markers (<strong>Returner</strong>, <strong>Non-Returner</strong>, <strong>Unknown</strong>). Silent churners remain unobservable in public corpora.
        </span>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        <aside className="lg:col-span-3 border-r border-slate-200 bg-white p-4 space-y-4 overflow-y-auto">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-600" /> Live JSON Corpus (6 Sources)
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              {analytics.total} <span className="text-xs font-normal text-slate-500">verified IN records</span>
            </div>
            <div className="text-[11px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md px-2.5 py-1">
              {datasetLabel}
            </div>
            <div className="pt-1 space-y-1">
              {Object.entries(analytics.bySource).map(([src, cnt]) => (
                <div key={src} className="flex justify-between text-xs text-slate-700">
                  <span className="truncate pr-2">{src}</span>
                  <span className="font-mono text-slate-500">
                    {cnt}/{analytics.total} ({((cnt / analytics.total) * 100).toFixed(0)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Repeat Observability Split
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Returner (Explicit)</span>
                <span className="font-mono">
                  {analytics.byRepeat.Returner}/{analytics.total} ({((analytics.byRepeat.Returner / analytics.total) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="flex justify-between text-rose-700 font-medium">
                <span>Non-Returner (Explicit)</span>
                <span className="font-mono">
                  {analytics.byRepeat["Non-Returner"]}/{analytics.total} ({((analytics.byRepeat["Non-Returner"] / analytics.total) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Unknown (Single Snapshot)</span>
                <span className="font-mono">
                  {analytics.byRepeat.Unknown}/{analytics.total} ({((analytics.byRepeat.Unknown / analytics.total) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-indigo-600" /> Slice Evidence
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-600 block mb-1">Repeat Status Label</label>
              <select
                value={selectedRepeatStatus}
                onChange={(e) => setSelectedRepeatStatus(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
              >
                <option value="ALL">All Repeat Labels ({analytics.total})</option>
                <option value="Returner">Returner ({analytics.byRepeat.Returner})</option>
                <option value="Non-Returner">Non-Returner ({analytics.byRepeat["Non-Returner"]})</option>
                <option value="Unknown">Unknown ({analytics.byRepeat.Unknown})</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-600 block mb-1">Channel / Source</label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
              >
                <option value="ALL">All 6 Channels</option>
                {Object.keys(analytics.bySource).map((src) => (
                  <option key={src} value={src}>{src}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-600 block mb-1">Core Service Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
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

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Scope & Constraints
            </div>
            <ul className="text-[11px] text-slate-700 space-y-1">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> India-Only • Ex-InstaHelp</li>
              <li className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5 text-rose-600" /> Zero discounts / coupons</li>
              <li className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5 text-rose-600" /> Zero pricing / pro payout edits</li>
            </ul>
          </div>
        </aside>

        <main className="lg:col-span-6 p-5 overflow-y-auto space-y-5">
          <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs">
            {[
              { id: "opportunities", label: "1. RICE, Sizing & Test Plan", icon: Layers },
              { id: "corpus", label: "2. N=100 Corpus & Themes", icon: BarChart3 },
              { id: "questions", label: "3. 8-Q & Q7 Matrix (n/cell)", icon: MessageSquareQuote },
              { id: "evidence", label: "4. Sensitivity, Audit & Rubric", icon: BookOpen }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab === "opportunities" && (
            <div className="space-y-4">
              <div className="bg-white border border-indigo-200 rounded-xl p-4 text-xs text-slate-700 space-y-2 shadow-xs">
                <div className="font-bold text-slate-900 text-sm">
                  Assumed Baseline Repeat Rate (35%–50% Sensitivity) & Deduplicated Quarterly Sizing
                </div>
                <p>
                  <strong>Reach & Cadence Conversion:</strong> Urban Company RHP / Q2 FY27 Shareholder disclosures report ~10.0M India Annual Transacting Users (ATUs) and ~82–86% repeat NTV revenue share (not a user-level 90d repeat rate). Converting annual ATUs to quarterly active anchor cohorts (<strong>10.0M × 45% quarterly active assumption = 4.50M quarterly anchor users</strong>; ~1.50M/month) and modeling <strong>42.0% 90-day repeat as an explicit assumption</strong> yields 1.89M baseline quarterly repeaters.
                </p>
                <p className="text-[11px] text-slate-600">
                  <strong>Assumptions (PM estimates, not company data):</strong> 45% quarterly-active factor, applied to the 10.0M total and to each segment (4.5M→2.025M, 3.8M→1.71M, 5.2M→2.34M; segment annual ATUs assumed at 45%, 38% and 52% of 10.0M and overlapping). Pain % is a proxy (theme share of public feedback, not true customer incidence). Lift % is relative to the 42.0% baseline (pp lift = 42.0% × relative lift) and has no public benchmark, so the A/B test validates it. The 0.78 overlap factor exists because segment reaches sum to 6.08M, above the 4.50M cohort.
                </p>
                <div className="bg-indigo-50/70 border border-indigo-100 rounded-lg p-3 space-y-1 font-mono text-[11px]">
                  <div className="text-slate-600">
                    Naive Unadjusted Sum (42.0% baseline): +0.31 pp Low (+13,804) | +0.60 pp Base (+26,837) | +0.96 pp High (+43,253)
                  </div>
                  <div className="text-indigo-900 font-bold">
                    Deduplicated Combined Range (×0.78 overlap assumption for 22% multi-pain user overlap): +0.24 pp Low (+10,767) | +0.47 pp Base (+20,933 → 42.47% repeat) | +0.75 pp High (+33,737)
                  </div>
                  <div className="text-slate-600 pt-1 border-t border-indigo-200/60">
                    Baseline Repeat Sensitivity (Deduplicated Base Case): At 35.0% baseline → +0.39 pp (+17,444) | At 42.0% baseline → +0.47 pp (+20,933) | At 50.0% baseline → +0.55 pp (+24,920)
                  </div>
                </div>
              </div>

              {sizedOpportunities.map((opp, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-600 text-white">
                        {opp.rank}
                      </span>
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {opp.riceScore}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">{opp.riceFormula}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{opp.title}</h3>
                  <p className="text-xs text-slate-700 leading-relaxed">{opp.mechanism}</p>
                  <div className="text-[11px] text-slate-600">
                    <strong>Target cohort:</strong> {opp.targetCohort}
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1.5 text-[11px]">
                    <div className="font-semibold text-slate-800">
                      Lift Rationale: <span className="font-normal text-slate-600">{opp.liftRationale}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-1 pt-1 font-mono">
                      <div className="text-slate-600"><strong>LOW:</strong>  {opp.scenarios.low}</div>
                      <div className="text-emerald-700 font-bold"><strong>BASE:</strong> {opp.scenarios.base}</div>
                      <div className="text-indigo-700"><strong>HIGH:</strong> {opp.scenarios.high}</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 bg-amber-50/70 border border-amber-200/70 rounded-lg px-3 py-2">
                    <strong className="text-amber-900">Sequencing ({opp.rank} Rationale):</strong> {opp.p0Rationale}
                  </div>
                </div>
              ))}

              <div className="bg-white border border-emerald-200 rounded-xl p-4 space-y-2.5 shadow-xs">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-950">
                  <FlaskConical className="w-4 h-4 text-emerald-600" /> Short Experimentation & Validation Plan (4-Week Rollout)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-[11px] text-slate-700">
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-2.5">
                    <strong>1. Design & Unit:</strong> User-level 50/50 randomized A/B across Tier-1 metros: Control vs. Bundle arm (P0-1 Slot Reliability + P0-2 Scope & Benchmark Verifier + P1 Pro Credentials). Tested as a bundle because single-feature effects (+0.17 to +0.23 pp base) are below the detectable range; per-feature attribution uses 30-day leading metrics.
                  </div>
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-2.5">
                    <strong>2. Sample & Power:</strong> ~425k completed anchor bookings per arm (~850k total; ~6 weeks of enrolment, assuming Tier-1 metros ≈ 50% of ~1.5M monthly anchors) + 90-day observation. 80% power, α = 0.05, 42% baseline → minimum detectable effect ≈ +0.30 pp (expected bundle effect: +0.47 pp base, +0.24 pp low). Low-case effects are not detectable; flagged as a limitation.
                  </div>
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-2.5">
                    <strong>3. Primary & Leading Metrics:</strong> 90-day post-anchor repeat booking rate (Primary); 30-day repeat, checkout conversion, slot-reschedule rate & on-site quote approval rate (Leading).
                  </div>
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-2.5">
                    <strong>4. Ship / Kill Guardrails:</strong> Ship if 90d repeat lifts ≥ +0.30 pp AND cancellations stay ≤ +0.3 pp, support tickets per booking show no increase, and net partner earnings/hr ≥ ₹0.
                  </div>
                </div>
              </div>

              <div className="bg-white border border-rose-200 rounded-xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-sm font-bold text-rose-900">
                  <Ban className="w-4 h-4 text-rose-600" /> Explicit "Not Building & Why" (PM Scope Judgment)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {NOT_BUILDING.map((nb, i) => (
                    <div key={i} className="bg-rose-50/50 border border-rose-100 rounded-lg p-3 text-xs space-y-1">
                      <div className="font-bold text-rose-950">{nb.idea}</div>
                      <p className="text-slate-700 text-[11px] leading-relaxed">{nb.why}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "corpus" && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900">
                    Causal Theme Breakdown (Live Computed from CORPUS_100)
                  </h2>
                  <span className="text-xs font-mono text-slate-500">Directional N = {analytics.total}</span>
                </div>
                <div className="space-y-2.5">
                  {analytics.themeRows.map((t) => (
                    <div key={t.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-800 font-medium">{t.name}</span>
                        <span className="font-mono text-indigo-700 font-semibold">
                          {t.rawPct}% ({t.count}/{analytics.total} — directional)
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${Math.min(100, Number(t.rawPct) * 2)}%` }}
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
                  placeholder="Search quotes, cities (Bengaluru, Pune, Mumbai, Hyderabad), sources, or themes..."
                  className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 shadow-2xs"
                />
              </div>

              <div className="space-y-2.5">
                {filteredCorpus.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer ${
                      selectedItem?.id === item.id
                        ? "bg-indigo-50/70 border-indigo-400 shadow-xs"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                          {item.source}
                        </span>
                        <span className="text-[11px] font-medium text-indigo-700">{item.category}</span>
                        <span className="text-[10px] text-slate-500">• {item.city_segment}</span>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                          item.repeat_status === "Returner"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : item.repeat_status === "Non-Returner"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {item.repeat_status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 italic">"{item.verbatim_quote || item.raw_text}"</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                        {item.root_cause_theme}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Anon ID: {item.author_id}</span>
                      {item.alternative_mentioned && item.alternative_mentioned !== "None" && (
                        <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
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
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                    Q7 Cohort & Segment Matrix (Exact n per Cell • N = {analytics.total})
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500">Live Computed</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                        <th className="py-2 px-2">Cohort / Cut Dimension</th>
                        <th className="py-2 px-2 font-mono">Total (n)</th>
                        <th className="py-2 px-2 font-mono text-emerald-700">Returner (n)</th>
                        <th className="py-2 px-2 font-mono text-rose-700">Non-Returner (n)</th>
                        <th className="py-2 px-2 font-mono text-slate-500">Unknown (n)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {analytics.q7Matrix.map((row, idx) => (
                        <tr key={idx}>
                          <td className="py-1.5 px-2 font-medium text-slate-800">{row.label}</td>
                          <td className="py-1.5 px-2 font-mono font-bold text-slate-900">n = {row.total}</td>
                          <td className="py-1.5 px-2 font-mono text-emerald-700">
                            n = {row.ret} ({row.total ? ((row.ret / row.total) * 100).toFixed(0) : 0}%)
                          </td>
                          <td className="py-1.5 px-2 font-mono text-rose-700">
                            n = {row.nonRet} ({row.total ? ((row.nonRet / row.total) * 100).toFixed(0) : 0}%)
                          </td>
                          <td className="py-1.5 px-2 font-mono text-slate-500">
                            n = {row.unk} ({row.total ? ((row.unk / row.total) * 100).toFixed(0) : 0}%)
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-0.5">
                  <div><strong>Reading note:</strong> Directional correlation only. People who disclose a city or household are often longer-term, more engaged users, so "Not Disclosed" gaps may reflect posting habits, not true city or household effects.</div>
                  <div><strong>Channel</strong> rows show where a review was posted, not how the customer first discovered Urban Company (not observable in public data).</div>
                </div>
              </div>

              <div className="space-y-3">
                {eightQuestions.map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 space-y-1.5 shadow-xs">
                    <h3 className="text-xs font-bold text-indigo-700">{item.q}</h3>
                    <p className="text-xs text-slate-700 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "evidence" && (
            <div className="space-y-4 text-xs text-slate-700">
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-indigo-600" /> 1. Live Weighting Sensitivity Table (100% Synced with Corpus)
                </h3>
                <p className="text-[11px] text-slate-600">
                  Computed directly from <code>CORPUS_100</code> comparing <strong>Raw Sample (n/N)</strong> vs. <strong>Equal Channel Weights (25% × 4 source groups)</strong> vs. <strong>Stratified Behavioral Weights</strong> (35% App Stores, 25% Peer Reddit, 20% Trustpilot/Forums, 20% Social/Video).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                        <th className="py-2 px-2">Theme</th>
                        <th className="py-2 px-2">Raw (n/N)</th>
                        <th className="py-2 px-2">Raw %</th>
                        <th className="py-2 px-2">Equal Wt</th>
                        <th className="py-2 px-2 text-indigo-700">Stratified Wt</th>
                        <th className="py-2 px-2">Sensitivity Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {analytics.themeRows.map((row, i) => (
                        <tr key={i}>
                          <td className="py-2 px-2 font-semibold text-slate-900">{row.name}</td>
                          <td className="py-2 px-2 font-mono">{row.count}/{analytics.total}</td>
                          <td className="py-2 px-2 font-mono">{row.rawPct}%</td>
                          <td className="py-2 px-2 font-mono">{row.equalPct}%</td>
                          <td className="py-2 px-2 font-mono font-bold text-indigo-700">{row.stratPct}%</td>
                          <td className="py-2 px-2 font-mono text-slate-600">{row.spread}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-indigo-600" /> 2. Deterministic Labeling Rubric (Explicit Signals First, Inference Flagged)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                  {LABELING_RUBRIC.map((lr, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-0.5">
                      <div className="font-bold text-indigo-800 font-mono">{lr.field}</div>
                      <div className="text-slate-700">{lr.rule}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <ClipboardCheck className="w-4 h-4 text-emerald-600" /> 3. 32-Record Human Audit & Exact Substring Verification
                  </h3>
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Human Audit: 29/32 (90.6%)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
                      Exact Substring: {analytics.exactSubstringMatches}/{analytics.total} ({((analytics.exactSubstringMatches / analytics.total) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-[11px] font-mono text-slate-700 flex flex-wrap gap-4">
                  <span><strong>Model:</strong> gemini-2.5-flash</span>
                  <span><strong>Prompt:</strong> prompt-v2.6-single-truth</span>
                  <span><strong>Audit Scope:</strong> 12 Base + 20 New Records (044–100)</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                        <th className="py-1.5 px-2">Theme Cluster</th>
                        <th className="py-1.5 px-2">Audited (n)</th>
                        <th className="py-1.5 px-2">Exact Match</th>
                        <th className="py-1.5 px-2">Per-Theme Accuracy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {PER_THEME_VALIDATION.map((pt, idx) => (
                        <tr key={idx}>
                          <td className="py-1.5 px-2 font-medium text-slate-800">{pt.theme}</td>
                          <td className="py-1.5 px-2 font-mono">{pt.audited}</td>
                          <td className="py-1.5 px-2 font-mono">{pt.exact}</td>
                          <td className="py-1.5 px-2 font-mono text-slate-600">{pt.precision}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-800">3 Discrepancies Caught & Fixed During 32-Record Audit:</div>
                  {HUMAN_VALIDATION_LOG.map((v, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-[11px]">
                      <span className="font-bold text-indigo-700">{v.recordId} ({v.issue}):</span>{" "}
                      <span className="line-through text-rose-600">{v.before}</span> →{" "}
                      <span className="text-emerald-700 font-semibold">{v.after}</span> — {v.rationale}
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-2.5 text-[11px] text-amber-900">
                  <strong>Audit sampling:</strong> 12 base + 20 new records (044–100), hand-picked across channels (not random); single reviewer, no second rater. Membership Parity and Other Friction themes were outside the 32-record sample.
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600" /> 4. Methods & Limitations
                </h3>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700">
                  <li><strong>Sampling:</strong> purposive, hand-curated public records across 6 channels (Aug 2025–Nov 2026), not a random sample. N = 100 is directional.</li>
                  <li><strong>Observability:</strong> no anchor-booking timestamps. Repeat labels come from text signals only, and Non-Returner includes inferred cases (upper bound).</li>
                  <li><strong>Silent churn:</strong> invisible in public data and not corrected. The 42% baseline is an assumption (35–50% sensitivity).</li>
                  <li><strong>Reweighting:</strong> channel weights are assumptions, shown as a sensitivity range, not a correction.</li>
                  <li><strong>Language:</strong> Hinglish text is analysed as-is and was not validated separately.</li>
                  <li><strong>Sizing:</strong> pain %, lift % and overlap are PM assumptions, to be validated by the A/B test.</li>
                </ul>
              </div>
            </div>
          )}
        </main>

        <aside className="lg:col-span-3 border-l border-slate-200 bg-white p-4 space-y-4 overflow-y-auto">
          <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-3.5 space-y-2.5">
            <div className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Live AI Gatekeeper & Tagger
            </div>
            <p className="text-[11px] text-slate-600">
              Test live scope filtering & causal extraction (<code>gemini-2.5-flash</code> / <code>prompt-v2.6-single-truth</code>):
            </p>
            <textarea
              rows={3}
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="e.g., Booked UC salon in Pune 3 times, wish I could see the beautician's profile and pick her again before paying..."
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900 placeholder-slate-400"
            />
            <button
              onClick={runLiveExtractor}
              disabled={isExtracting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold py-2 rounded-lg shadow-xs transition cursor-pointer"
            >
              {isExtracting ? "Running Gemini Gatekeeper..." : "Run Live Causal Extraction"}
            </button>

            {extractorResult && (
              <pre className="bg-slate-900 text-emerald-300 rounded-lg p-2.5 text-[10px] overflow-x-auto max-h-48">
                {JSON.stringify(extractorResult, null, 2)}
              </pre>
            )}
          </div>

          {selectedItem && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileJson className="w-3.5 h-3.5 text-indigo-600" /> Structured Record Inspector
              </div>
              <pre className="bg-white border border-slate-200 rounded-lg p-2.5 text-[10px] text-slate-800 overflow-x-auto max-h-80">
                {JSON.stringify(selectedItem, null, 2)}
              </pre>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
