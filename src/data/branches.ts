import type { Branch } from "@/lib/cart-types";

// Note: Branch naming/location lists can change over time; this list is based on
// publicly available branch listings and is intended for demo + smart routing.
export const branches: Branch[] = [
  // Faisalabad
  {
    id: "faisalabad-rehmat-chowk",
    name: "Cheezious Pizza (Rehmat Chowk)",
    city: "Faisalabad",
    dummyWhatsApp: "923001000001",
  },
  {
    id: "faisalabad-samanabad",
    name: "Cheezious Donner (Samanabad)",
    city: "Faisalabad",
    dummyWhatsApp: "923001000002",
  },

  // Islamabad
  {
    id: "islamabad-centaurus",
    name: "Centaurus Mall (F-8/4)",
    city: "Islamabad",
    dummyWhatsApp: "923001000003",
  },
  {
    id: "islamabad-e11",
    name: "E-11 Markaz",
    city: "Islamabad",
    dummyWhatsApp: "923001000004",
  },
  {
    id: "islamabad-f7",
    name: "F-7 Jinnah Super",
    city: "Islamabad",
    dummyWhatsApp: "923001000005",
  },
  {
    id: "islamabad-f10",
    name: "F-10 Markaz",
    city: "Islamabad",
    dummyWhatsApp: "923001000006",
  },
  {
    id: "islamabad-f11",
    name: "F-11 Markaz (Liberty Square)",
    city: "Islamabad",
    dummyWhatsApp: "923001000007",
  },
  {
    id: "islamabad-g13",
    name: "G-13/1 (Khawaja Plaza)",
    city: "Islamabad",
    dummyWhatsApp: "923001000008",
  },
  {
    id: "islamabad-g15",
    name: "G-15 Markaz (Cheezious Bite)",
    city: "Islamabad",
    dummyWhatsApp: "923001000009",
  },
  {
    id: "islamabad-gigamall",
    name: "Giga Mall (DHA Phase II)",
    city: "Islamabad",
    dummyWhatsApp: "923001000010",
  },
  {
    id: "islamabad-ghauri-town",
    name: "Ghauri Town (Phase 5)",
    city: "Islamabad",
    dummyWhatsApp: "923001000011",
  },
  {
    id: "islamabad-golra-morr",
    name: "Golra Morr (University Road)",
    city: "Islamabad",
    dummyWhatsApp: "923001000012",
  },
  {
    id: "islamabad-i8",
    name: "I-8 Markaz (Pakland / Pakland Plaza)",
    city: "Islamabad",
    dummyWhatsApp: "923001000013",
  },
  {
    id: "islamabad-intellectual-village",
    name: "Bahria Intellectual Village",
    city: "Islamabad",
    dummyWhatsApp: "923001000014",
  },
  {
    id: "islamabad-taramri",
    name: "Taramri (Lehtrar Road)",
    city: "Islamabad",
    dummyWhatsApp: "923001000015",
  },
  {
    id: "islamabad-phulgran",
    name: "Phulgran (Murree Road)",
    city: "Islamabad",
    dummyWhatsApp: "923001000016",
  },

  // Lahore
  {
    id: "lahore-baghbanpura",
    name: "Baghbanpura (GT Road)",
    city: "Lahore",
    dummyWhatsApp: "923001000017",
  },
  {
    id: "lahore-dha-phase-4",
    name: "DHA Phase 4",
    city: "Lahore",
    dummyWhatsApp: "923001000018",
  },
  {
    id: "lahore-dha-bite",
    name: "DHA Bite (Mini Commercial)",
    city: "Lahore",
    dummyWhatsApp: "923001000019",
  },
  {
    id: "lahore-dolmen-mall",
    name: "Dolmen Mall (DHA Phase 6)",
    city: "Lahore",
    dummyWhatsApp: "923001000020",
  },
  {
    id: "lahore-gulshan-e-ravi",
    name: "Gulshan-e-Ravi (Main Boulevard)",
    city: "Lahore",
    dummyWhatsApp: "923001000021",
  },
  {
    id: "lahore-jail-road",
    name: "Jail Road (Shadman)",
    city: "Lahore",
    dummyWhatsApp: "923001000022",
  },
  {
    id: "lahore-johar-town-g3",
    name: "Johar Town (G3, Phase 2)",
    city: "Lahore",
    dummyWhatsApp: "923001000023",
  },
  {
    id: "lahore-johar-town-j3",
    name: "Johar Town (J3, Phase 2)",
    city: "Lahore",
    dummyWhatsApp: "923001000024",
  },
  {
    id: "lahore-nespak",
    name: "Nespak Housing Society (Canal Bank Road)",
    city: "Lahore",
    dummyWhatsApp: "923001000025",
  },
  {
    id: "lahore-shadbagh",
    name: "Shadbagh (Qamar Park)",
    city: "Lahore",
    dummyWhatsApp: "923001000026",
  },
  {
    id: "lahore-thokar-niaz-beg",
    name: "Thokar Niaz Beg",
    city: "Lahore",
    dummyWhatsApp: "923001000027",
  },
  {
    id: "lahore-allama-iqbal-town",
    name: "Allama Iqbal Town (Main Boulevard)",
    city: "Lahore",
    dummyWhatsApp: "923001000028",
  },

  // Mian Channu
  {
    id: "mian-channu-amin-trade-center",
    name: "Amin Trade Center (Multan–Mian Channu Road)",
    city: "Mian Channu",
    dummyWhatsApp: "923001000029",
  },

  // Okara
  {
    id: "okara-tehsil-road",
    name: "Tehsil Road (Aamir Colony)",
    city: "Okara",
    dummyWhatsApp: "923001000030",
  },

  // Pattoki
  {
    id: "pattoki-faisal-colony",
    name: "Faisal Colony (Shahrah-e-Quaid-e-Azam)",
    city: "Pattoki",
    dummyWhatsApp: "923001000031",
  },

  // Peshawar
  {
    id: "peshawar-hayatabad",
    name: "Hayatabad (Phase 1 Super Market)",
    city: "Peshawar",
    dummyWhatsApp: "923001000032",
  },
  {
    id: "peshawar-hbk",
    name: "HBK (Achini Payan)",
    city: "Peshawar",
    dummyWhatsApp: "923001000033",
  },
  {
    id: "peshawar-tehkal",
    name: "Tehkal",
    city: "Peshawar",
    dummyWhatsApp: "923001000034",
  },

  // Rawalpindi
  {
    id: "rawalpindi-adyala-road",
    name: "Adyala Road",
    city: "Rawalpindi",
    dummyWhatsApp: "923001000035",
  },
  {
    id: "rawalpindi-kalma-chowk",
    name: "Kalma Chowk (Dhamial Road)",
    city: "Rawalpindi",
    dummyWhatsApp: "923001000036",
  },
  {
    id: "rawalpindi-commercial-market",
    name: "Commercial Market (New Town)",
    city: "Rawalpindi",
    dummyWhatsApp: "923001000037",
  },
  {
    id: "rawalpindi-pwd",
    name: "PWD (Main PWD Road)",
    city: "Rawalpindi",
    dummyWhatsApp: "923001000038",
  },
  {
    id: "rawalpindi-saddar",
    name: "Saddar (Adam Jee Road)",
    city: "Rawalpindi",
    dummyWhatsApp: "923001000039",
  },
  {
    id: "rawalpindi-scheme-3",
    name: "Chaklala Scheme 3",
    city: "Rawalpindi",
    dummyWhatsApp: "923001000040",
  },
  {
    id: "rawalpindi-bahria-phase-7",
    name: "Bahria Town Phase 7",
    city: "Rawalpindi",
    dummyWhatsApp: "923001000041",
  },
  {
    id: "rawalpindi-bahria-phase-7-2",
    name: "Bahria Town Phase 7 (Food Street)",
    city: "Rawalpindi",
    dummyWhatsApp: "923001000042",
  },
  {
    id: "rawalpindi-bahria-civic-center",
    name: "Bahria Civic Center",
    city: "Rawalpindi",
    dummyWhatsApp: "923001000043",
  },

  // Sahiwal
  {
    id: "sahiwal-near-pilot-school",
    name: "Near Pilot School (Mazdoor Pulli Road)",
    city: "Sahiwal",
    dummyWhatsApp: "923001000044",
  },
  {
    id: "sahiwal-palm-view-market",
    name: "Palm View Market",
    city: "Sahiwal",
    dummyWhatsApp: "923001000045",
  },

  // Wah Cantt
  {
    id: "wah-cantt-gt-road",
    name: "Wah Cantt (GT Road)",
    city: "Wah Cantt",
    dummyWhatsApp: "923001000046",
  },
]
  .slice()
  .sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name));

