const projects = [
  {
    id: "lock-in",
    category: "films",
    eyebrow: "Short Film",
    title: "Lock In",
    summary: "A short film exploring the loop of academic pressure — and the moments that crack it open.",
    description:
      "Fully self-produced from script to screen. Lock In involved writing, pre-production planning, on-location shooting, and a self-directed edit, all managed independently.",
    thumbnail: {
      variant: "vertical",
      aspect: "2:3",
      tile: "2x2",
      label: "Scene study",
      theme: "cobalt"
    },
    deliverables: [
      "Writer",
      "Director",
      "Producer",
      "Videographer",
      "Editor"
    ],
    outcome: "2024"
  },
  {
    id: "bro-cant-choose",
    category: "films",
    eyebrow: "Short Film",
    title: "Bro Can't Choose",
    summary: "A comedic short about indecision, told with a single character and a series of impossible choices.",
    description:
      "A lighter, character-driven piece that leaned into timing and performance over visual complexity. Handled all production roles independently.",
    thumbnail: {
      variant: "horizontal",
      aspect: "16:9",
      tile: "3x2",
      label: "Character beat",
      theme: "ember"
    },
    deliverables: [
      "Writer",
      "Director",
      "Producer",
      "Videographer",
      "Editor"
    ],
    outcome: "2024"
  },
  {
    id: "hku-co-op",
    category: "promo-videos",
    eyebrow: "Promo Video",
    title: "HKU Co-op",
    summary: "A promotional video for the HKU Co-operative Education Programme, highlighting student experience and institutional mission.",
    description:
      "Took full creative ownership from concept to delivery — writing the narrative, directing on location, managing production logistics, and editing the final cut.",
    thumbnail: {
      variant: "horizontal",
      aspect: "16:9",
      tile: "2x2",
      label: "Campus campaign",
      theme: "azure"
    },
    deliverables: [
      "Writer",
      "Director",
      "Producer",
      "Videographer",
      "Editor"
    ],
    outcome: "2025 — Produced for the University of Hong Kong."
  },
  {
    id: "hku-cic-initiative",
    category: "promo-videos",
    eyebrow: "Promo Video",
    title: "HKU CIC Initiative",
    summary: "A promotional film for HKU's Communication-Intensive Courses Initiative, with hand-drawn illustrated credits as a visual signature.",
    description:
      "The closing credits feature hand-drawn character avatars — including composer Rowbay and the film's cast — giving the video a personal, handcrafted finish alongside polished production work.",
    thumbnail: {
      variant: "vertical",
      aspect: "9:16",
      tile: "1x2",
      label: "Illustrated credits",
      theme: "pearl"
    },
    deliverables: [
      "Writer",
      "Director",
      "Producer",
      "Videographer",
      "Editor"
    ],
    outcome: "2025 — Produced for the University of Hong Kong."
  },
  {
    id: "hku-common-core-ccch9027",
    category: "promo-videos",
    eyebrow: "Promo Video",
    title: "HKU Common Core: CCCH9027",
    summary: "A course promotional video for HKU's Common Core curriculum, capturing the spirit of the CCCH9027 unit.",
    description:
      "Handled production, videography, and post-production as part of a collaborative course promotion initiative for the university.",
    thumbnail: {
      variant: "horizontal",
      aspect: "3:2",
      tile: "2x1",
      label: "Course feature",
      theme: "ink"
    },
    deliverables: [
      "Producer",
      "Videographer",
      "Editor"
    ],
    outcome: "2025 — Produced for the University of Hong Kong."
  },
  {
    id: "hku-robocon",
    category: "promo-videos",
    eyebrow: "Promo Video",
    title: "HKU Robocon",
    summary: "A promotional edit for HKU's Robocon team, capturing the build process and team spirit ahead of competition.",
    description:
      "Focused on post-production: assembling footage into a cohesive story that communicated both technical rigor and team energy.",
    thumbnail: {
      variant: "horizontal",
      aspect: "16:9",
      tile: "2x1",
      label: "Build energy",
      theme: "steel"
    },
    deliverables: [
      "Producer",
      "Editor"
    ],
    outcome: "2024 — Produced for HKU Robocon."
  },
  {
    id: "hku-cic-peer-consultant",
    category: "promo-videos",
    eyebrow: "Promo Video",
    title: "HKU CIC Peer Consultant Programme",
    summary: "A recruitment-focused promo for the HKU CIC Peer Consultant Programme, showcasing the student-led support network.",
    description:
      "Wrote the script, produced the shoot, and handled all editorial work to deliver a video aligned with the programme's outreach goals.",
    thumbnail: {
      variant: "vertical",
      aspect: "2:3",
      tile: "1x2",
      label: "Peer voices",
      theme: "sage"
    },
    deliverables: [
      "Writer",
      "Producer",
      "Videographer",
      "Editor"
    ],
    outcome: "2024 — Produced for the University of Hong Kong."
  },
  {
    id: "hku-lap-chee-farewell",
    category: "event-recaps",
    eyebrow: "Event Recap",
    title: "HKU Lap-Chee College Farewell Party",
    summary: "A warm recap of the Lap-Chee College farewell celebration, preserving the atmosphere for departing students.",
    description:
      "Shot and edited to feel like a genuine memory — candid moments, atmosphere, and the rhythm of the evening captured as they happened.",
    thumbnail: {
      variant: "horizontal",
      aspect: "3:2",
      tile: "2x2",
      label: "Farewell night",
      theme: "rose"
    },
    deliverables: [
      "Videographer",
      "Editor"
    ],
    outcome: "2025 — Produced for HKU Lap-Chee College."
  },
  {
    id: "hku-jcsv3-music-festival",
    category: "event-recaps",
    eyebrow: "Event Recap",
    title: "HKU JCSV3 International Music Festival",
    summary: "A recap film for the JCSV3 International Music Festival at HKU, capturing performances and the energy of the event.",
    description:
      "Focused on live performance capture and a dynamic edit that reflected the scale and spirit of an international music festival.",
    thumbnail: {
      variant: "vertical",
      aspect: "9:16",
      tile: "1x2",
      label: "Live festival",
      theme: "violet"
    },
    deliverables: [
      "Videographer",
      "Editor"
    ],
    outcome: "2025 — Produced for HKU JCSV3."
  },
  {
    id: "photoshoot-studio-portraits",
    category: "photoshoots",
    eyebrow: "Photoshoot",
    title: "Studio Portrait Series",
    summary: "A placeholder dossier for controlled studio portrait work using clean lighting and restrained styling.",
    description:
      "Designed as a stand-in for final image sets. This entry marks the vertical portrait layout and keeps the photoshoot section fully navigable while real images are prepared.",
    thumbnail: {
      variant: "vertical",
      aspect: "2:3",
      tile: "1x4",
      label: "Studio light",
      theme: "linen"
    },
    deliverables: [
      "Lighting direction",
      "Portrait capture",
      "Retouching"
    ],
    outcome: "Placeholder dossier for incoming studio work."
  },
  {
    id: "photoshoot-location-editorial",
    category: "photoshoots",
    eyebrow: "Photoshoot",
    title: "Location Editorial Set",
    summary: "A placeholder dossier for outdoor and on-location stills with a more environmental frame.",
    description:
      "This entry exists to exercise the wider horizontal thumbnail format and give the section a balanced grid before final photo selections are added.",
    thumbnail: {
      variant: "horizontal",
      aspect: "16:9",
      tile: "3x2",
      label: "Location frame",
      theme: "forest"
    },
    deliverables: [
      "Location scouting",
      "Shot direction",
      "Color finishing"
    ],
    outcome: "Placeholder dossier for incoming on-location work."
  }
];

export default projects;