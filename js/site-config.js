// =============================================
// SoloMaster Guides — Site Configuration
// =============================================

const SITE_CONFIG = {
  name: "SoloMaster Guides",
  tagline: "The Ultimate Single-Player Gaming Guide Hub",
  description: "Expert guides, tips, and walkthroughs for the world's hottest single-player games. Updated daily.",
  url: "https://solomasterguides.com",
  lastUpdated: "2026-06-01",

  adClient: "ca-pub-7173243111626096",
  adSlots: {
    header: "1234567890",
    sidebar: "2345678901",
    inContent1: "3456789012",
    inContent2: "4567890123",
    footer: "5678901234"
  }
};

const CATEGORIES = [
  { id: "action-rpg", name: "Action RPG", slug: "action-rpg", icon: "⚔️", description: "Fast-paced combat meets deep RPG progression" },
  { id: "open-world", name: "Open World", slug: "open-world", icon: "🌍", description: "Vast worlds to explore at your own pace" },
  { id: "horror", name: "Horror", slug: "horror", icon: "👻", description: "Survival horror and psychological terror" },
  { id: "soulslike", name: "Soulslike", slug: "soulslike", icon: "💀", description: "Punishing difficulty, epic boss fights" },
  { id: "fps", name: "FPS", slug: "fps", icon: "🔫", description: "First-person shooting action" },
  { id: "rpg", name: "RPG", slug: "rpg", icon: "📜", description: "Deep storytelling and character building" },
  { id: "roguelike", name: "Roguelike", slug: "roguelike", icon: "🎲", description: "Permadeath runs, endless replayability" },
  { id: "metroidvania", name: "Metroidvania", slug: "metroidvania", icon: "🗺️", description: "Interconnected worlds and ability gating" },
  { id: "survival", name: "Survival", slug: "survival", icon: "🏕️", description: "Craft, build, and survive" },
  { id: "puzzle-adventure", name: "Puzzle Adventure", slug: "puzzle-adventure", icon: "🧩", description: "Brain-teasing narrative adventures" }
];

const GAMES = [
  {
    id: "gothic-1-remake",
    title: "Gothic 1 Remake",
    releaseDate: "2026-06-05",
    developer: "Alkimia Interactive",
    publisher: "THQ Nordic",
    platforms: ["PC", "PS5", "Xbox Series X"],
    category: "action-rpg",
    rating: 87,
    description: "The legendary 2001 RPG returns with a ground-up remake. Explore the penal colony of the Valley of Mines with modernized combat, expanded questlines, and next-gen NPC AI in Unreal Engine 5.",
    featured: true,
    trending: true,
    image: "🎭",
    guides: [
      { title: "Beginner's Guide: Surviving the Colony", slug: "beginners-guide", excerpt: "Everything you need to know to survive your first hours in the Valley of Mines — faction basics, combat tips, and essential early quests.", date: "2026-06-01" },
      { title: "25 Advanced Tips & Secrets", slug: "advanced-tips", excerpt: "25 expert tips for Gothic 1 Remake — hidden mechanics, combat tricks, and secrets veterans overlook.", date: "2026-05-31" },
      { title: "Best Builds for Every Playstyle", slug: "best-builds", excerpt: "From pure warrior to shadow mage — optimized build paths with stat distributions for Gothic Remake.", date: "2026-05-31" },
      { title: "Complete Faction Guide: Old Camp vs New Camp vs Swamp Camp", slug: "faction-guide", excerpt: "Which faction should you join? Full breakdown of rewards, questlines, and exclusive gear for each.", date: "2026-05-30" },
      { title: "All Secret Locations & Hidden Treasures", slug: "secret-locations", excerpt: "Every hidden cave, buried chest, and secret stash in the Valley of Mines — mapped and explained.", date: "2026-05-29" }
    ]
  },
  {
    id: "solarpunk",
    title: "Solarpunk",
    releaseDate: "2026-06-08",
    developer: "Cyberwave",
    publisher: "rokaplay",
    platforms: ["PC", "PS5", "Xbox Series X", "Switch 2"],
    category: "survival",
    rating: 85,
    description: "The #1 most-wishlisted game on Steam. A cozy open-world survival game set across floating islands. Build airships, farm floating gardens, harness solar energy, and explore a stunning procedurally-generated sky world.",
    featured: true,
    trending: true,
    image: "☀️",
    guides: [
      { title: "Getting Started: Your First Floating Island", slug: "getting-started", excerpt: "Step-by-step guide to your first day in Solarpunk — gathering resources, crafting basics, and building your first home.", date: "2026-06-01" },
      { title: "25 Advanced Tips & Secrets", slug: "advanced-tips", excerpt: "25 expert tips for Solarpunk — hidden mechanics, crafting shortcuts, and secrets experienced builders rely on.", date: "2026-05-31" },
      { title: "Ultimate Airship Building Guide", slug: "airship-building", excerpt: "How to design, upgrade, and optimize your airship for maximum speed, cargo capacity, and combat readiness.", date: "2026-05-31" },
      { title: "Energy Management: Solar, Wind & Battery Systems", slug: "energy-management", excerpt: "Master the energy grid — optimal panel placement, storage ratios, and advanced automation circuits.", date: "2026-05-30" },
      { title: "Best Crops & Farming Strategies", slug: "best-crops", excerpt: "Crop yields compared, seasonal planting calendar, and automated irrigation setups for maximum efficiency.", date: "2026-05-28" }
    ]
  },
  {
    id: "nioh-3",
    title: "Nioh 3",
    releaseDate: "2026-03-14",
    developer: "Team Ninja",
    publisher: "Koei Tecmo",
    platforms: ["PS5", "PC"],
    category: "soulslike",
    rating: 86,
    description: "Team Ninja's punishing action RPG returns with a dual-form combat system — seamlessly switch between Samurai and Ninja stances. Set in an unforgiving dark fantasy version of Japan's Warring States period.",
    featured: true,
    trending: false,
    image: "⚔️",
    guides: [
      { title: "Combat Mastery: Samurai vs Ninja Forms", slug: "combat-mastery", excerpt: "Deep dive into the dual-form system — when to switch, combo chains, and advanced techniques for each stance.", date: "2026-05-28" },
      { title: "Stance Switching: The Complete Guide", slug: "stance-switching-guide", excerpt: "Master the art of fluid stance transitions — frame data, cancel windows, and optimal combo routes.", date: "2026-05-25" },
      { title: "Best Weapons Tier List (All 11 Types)", slug: "best-weapons", excerpt: "Every weapon ranked with detailed breakdowns — damage, speed, ki consumption, and best pairing recommendations.", date: "2026-05-22" },
      { title: "All Boss Strategies & Weakness Guide", slug: "boss-strategies", excerpt: "Complete boss compendium — attack patterns, elemental weaknesses, recommended spirit guardians, and cheese strats.", date: "2026-05-20" },
      { title: "Ki Management: The Difference Between Life & Death", slug: "ki-management", excerpt: "Master ki pulse timing, flux techniques, and gear optimization to never run out of stamina again.", date: "2026-05-18" }
    ]
  },
  {
    id: "resident-evil-requiem",
    title: "Resident Evil Requiem",
    releaseDate: "2026-02-21",
    developer: "Capcom",
    publisher: "Capcom",
    platforms: ["PC", "PS5", "Xbox Series X"],
    category: "horror",
    rating: 89,
    description: "A complete reimagining of Raccoon City. Experience the outbreak through new characters as dynamic enemy AI, environmental destruction, and relentless horror reshape the city block by block.",
    featured: true,
    trending: false,
    image: "🧟",
    guides: [
      { title: "Ultimate Survival Guide: Raccoon City", slug: "survival-guide", excerpt: "Resource management, safe rooms, enemy types, and escape routes — survive the nightmare from start to finish.", date: "2026-05-27" },
      { title: "All Puzzle Solutions (No Spoilers)", slug: "all-puzzles", excerpt: "Every puzzle in the game solved step by step — statue puzzles, chemical mixtures, locker combinations, and more.", date: "2026-05-24" },
      { title: "All Weapon Locations & Best Loadouts", slug: "weapon-locations", excerpt: "Where to find every weapon, ammo crafting recipes, and the best loadouts for each character.", date: "2026-05-21" },
      { title: "All Endings Guide: How to Get Each One", slug: "endings-guide", excerpt: "5 endings explained — requirements, key decisions, and step-by-step walkthroughs for the true ending.", date: "2026-05-19" },
      { title: "Speedrun Guide: Sub-2 Hour Route", slug: "speedrun-tips", excerpt: "Optimized routing, skip techniques, and boss strategies for speedrunners aiming for S+ rank.", date: "2026-05-16" }
    ]
  },
  {
    id: "slay-the-spire-2",
    title: "Slay the Spire 2",
    releaseDate: "2026-03-18",
    developer: "Mega Crit",
    publisher: "Mega Crit",
    platforms: ["PC"],
    category: "roguelike",
    rating: 90,
    description: "The long-awaited sequel to the game that defined a genre. Two new characters, revamped relics, endless mode, and a branching multi-act structure. Over 5 million copies sold in launch month.",
    featured: true,
    trending: true,
    image: "🃏",
    guides: [
      { title: "Best Builds & Loadouts Guide", slug: "best-builds", excerpt: "Complete builds guide for STS2 — Necromancer, Paladin, Rogue archetypes with card tier lists and relic combos.", date: "2026-06-01" },
      { title: "Beginner's Guide: First Ascension Win", slug: "beginners-guide", excerpt: "Card evaluation fundamentals, pathing strategy, and how to build your first winning deck from scratch.", date: "2026-05-29" },
      { title: "Necromancer Builds: The Ultimate Guide", slug: "necromancer-builds", excerpt: "Minion swarm, soul harvest, and death knight archetypes — every Necromancer build explained with card tiers.", date: "2026-05-26" },
      { title: "Paladin Deck Archetypes & Win Conditions", slug: "paladin-decks", excerpt: "Divine shield stacking, smite control, and the unstoppable glass cannon build — Paladin mastery guide.", date: "2026-05-23" },
      { title: "Best Relic Combinations (Synergy Tier List)", slug: "relic-combos", excerpt: "The most broken relic pairings in STS2 — from infinite combos to one-turn kill setups.", date: "2026-05-20" },
      { title: "Ascension 20 Guide: Beating the Hardest Difficulty", slug: "ascension-guide", excerpt: "How to climb from A0 to A20 — meta shifts, enemy patterns, and the mindset needed for ascension.", date: "2026-05-17" }
    ]
  },
  {
    id: "road-to-vostok",
    title: "Road to Vostok",
    releaseDate: "2026-04-10",
    developer: "Antti (Solo Dev)",
    publisher: "Self-Published",
    platforms: ["PC"],
    category: "fps",
    rating: 84,
    description: "A solo extraction shooter by a single Finnish developer that took Steam by storm — 140K copies in 5 days. Survive the harsh, atmospheric border zone between Finland and Russia with realistic gunplay and permadeath.",
    featured: false,
    trending: true,
    image: "🎯",
    guides: [
      { title: "Survival Basics: First Raid Walkthrough", slug: "survival-basics", excerpt: "Step-by-step guide to surviving your first raids — loot priorities, enemy patrol patterns, and extraction timing.", date: "2026-05-27" },
      { title: "All Extraction Points & Safe Routes", slug: "extraction-points", excerpt: "Detailed maps showing every extraction point, trigger conditions, and the safest routes through each zone.", date: "2026-05-24" },
      { title: "Weapon Modding: Complete Attachment Guide", slug: "weapon-mods", excerpt: "Every attachment analyzed — sights, grips, suppressors, and ammo types with recoil pattern testing.", date: "2026-05-21" },
      { title: "Full Map Guide: All Zones & POIs", slug: "map-guide", excerpt: "Complete zone maps with loot tiers, enemy spawns, boss locations, and hidden stashes marked.", date: "2026-05-18" }
    ]
  },
  {
    id: "mouse-pi-for-hire",
    title: "Mouse: P.I. For Hire",
    releaseDate: "2026-04-22",
    developer: "Fumi Games",
    publisher: "Fumi Games",
    platforms: ["PC", "PS5", "Xbox Series X"],
    category: "fps",
    rating: 88,
    description: "A stunning noir-inspired boomer shooter with hand-drawn 1930s cartoon aesthetics. Solve cases, blast gangsters, and unravel a conspiracy in a corrupt city — 730K copies sold.",
    featured: false,
    trending: true,
    image: "🐭",
    guides: [
      { title: "Weapons Guide: Every Gun Ranked", slug: "weapons-guide", excerpt: "Complete weapon arsenal breakdown — Tommy guns, revolvers, experimental weapons, and hidden upgrades.", date: "2026-05-28" },
      { title: "Case Solutions: All Investigations Solved", slug: "case-solutions", excerpt: "Step-by-step walkthroughs for every case — clues, interrogation choices, and optimal evidence presentation.", date: "2026-05-25" },
      { title: "Secret Collectibles & Easter Eggs", slug: "secret-collectibles", excerpt: "All hidden figurines, vintage comics, developer rooms, and secret areas — 100% completion guide.", date: "2026-05-22" },
      { title: "Best Perks & Upgrade Priority", slug: "best-perks", excerpt: "Which detective perks to unlock first, upgrade material farming routes, and endgame build optimization.", date: "2026-05-19" }
    ]
  },
  {
    id: "clair-obscur-expedition-33",
    title: "Clair Obscur: Expedition 33",
    releaseDate: "2026-01-28",
    developer: "Sandfall Interactive",
    publisher: "Kepler Interactive",
    platforms: ["PC", "PS5", "Xbox Series X"],
    category: "rpg",
    rating: 92,
    description: "The highest-rated game of 2026. A breathtaking turn-based RPG set in a Belle Époque-inspired world. Lead Expedition 33 on a desperate mission to stop the Paintress, a god-like being who paints death upon the world.",
    featured: true,
    trending: false,
    image: "🎨",
    guides: [
      { title: "Complete Walkthrough: All 12 Chapters", slug: "complete-walkthrough", excerpt: "Full story walkthrough with every boss strategy, puzzle solution, and collectible location.", date: "2026-05-29" },
      { title: "Best Character Builds for Each Party Member", slug: "character-builds", excerpt: "Optimized skill trees, gear sets, and synergies for Gustave, Lune, Sciel, and all party members.", date: "2026-05-26" },
      { title: "All Endings: How to Unlock Every Route", slug: "all-endings", excerpt: "Complete endings guide — 4 routes, hidden requirements, and how to get the true ending in one playthrough.", date: "2026-05-23" },
      { title: "Secret Bosses: Locations & Strategies", slug: "secret-bosses", excerpt: "Every optional superboss — where to find them, recommended levels, and combat strategies for each phase.", date: "2026-05-20" },
      { title: "Best Party Composition & Synergy Guide", slug: "best-party", excerpt: "Party building deep dive — elemental combos, turn order optimization, and the best teams for every situation.", date: "2026-05-17" }
    ]
  },
  {
    id: "baldurs-gate-3",
    title: "Baldur's Gate 3",
    releaseDate: "2023-08-03",
    developer: "Larian Studios",
    publisher: "Larian Studios",
    platforms: ["PC", "PS5", "Xbox Series X"],
    category: "rpg",
    rating: 97,
    description: "Still dominating in 2026. The definitive D&D CRPG with near-infinite player choice, rich companion stories, and tactical turn-based combat. Over 15 million copies sold.",
    featured: true,
    trending: false,
    image: "🐉",
    guides: [
      { title: "Class Tier List: Best Classes for 2026 Meta", slug: "class-tier-list", excerpt: "Every class and subclass ranked for the current patch — S-tier builds, multiclass combos, and role optimization.", date: "2026-05-30" },
      { title: "Romance Guide: All Companion Relationships", slug: "romance-guide", excerpt: "Complete romance walkthrough — approval triggers, key scenes, and how to romance every companion.", date: "2026-05-27" },
      { title: "Best Party Composition for Every Act", slug: "best-party", excerpt: "Optimal party setups for each act and encounter type — tank, healer, controller, and DPS synergies.", date: "2026-05-24" },
      { title: "Hidden Quests & Secret Areas You Missed", slug: "hidden-quests", excerpt: "30+ easily missable quests, secret bosses, and hidden areas across all three acts.", date: "2026-05-21" },
      { title: "Honor Mode Guide: Beat the Hardest Difficulty", slug: "honor-mode-guide", excerpt: "The ultimate challenge — boss-specific tactics, legendary action counters, and risk-free routing.", date: "2026-05-18" }
    ]
  },
  {
    id: "black-myth-wukong",
    title: "Black Myth: Wukong",
    releaseDate: "2024-08-20",
    developer: "Game Science",
    publisher: "Game Science",
    platforms: ["PC", "PS5", "Xbox Series X"],
    category: "soulslike",
    rating: 95,
    description: "The groundbreaking Chinese mythology action RPG. Face 90+ unique bosses as the Destined One. Still getting major content updates in 2026.",
    featured: false,
    trending: false,
    image: "🐒",
    guides: [
      { title: "All Bosses Guide: 90+ Encounters Covered", slug: "all-boss-guide", excerpt: "Complete boss compendium — attack patterns, weaknesses, recommended spells, and difficulty ratings for every boss.", date: "2026-05-25" },
      { title: "Best Transformations: Tier List & Usage Guide", slug: "best-transformations", excerpt: "Every transformation ranked with optimal usage scenarios, combo strings, and hidden mechanics.", date: "2026-05-22" },
      { title: "Secret Endings: How to Unlock the True Finale", slug: "secret-endings", excerpt: "Requirements for both secret endings — item locations, NPC questlines, and missable triggers.", date: "2026-05-19" },
      { title: "Platinum Trophy / 100% Completion Guide", slug: "platinum-trophy-guide", excerpt: "Roadmap to platinum — missable trophies, farming routes, and NG+ cleanup checklist.", date: "2026-05-16" }
    ]
  },
  {
    id: "saros",
    title: "SAROS",
    releaseDate: "2026-05-15",
    developer: "Housemarque",
    publisher: "Sony Interactive",
    platforms: ["PS5", "PC"],
    category: "action-rpg",
    rating: 88,
    description: "Housemarque's ambitious follow-up to Returnal. A haunting third-person action game set on a dying alien world where every death reshapes the planet and your character evolves.",
    featured: false,
    trending: true,
    image: "🌀",
    guides: [
      { title: "Combat Fundamentals: Movement & Survival", slug: "combat-fundamentals", excerpt: "Master the dance of death — dodge timing, parry windows, ability chaining, and environmental awareness.", date: "2026-05-28" },
      { title: "Death Mechanics Explained: How the World Changes", slug: "death-mechanics", excerpt: "Complete breakdown of the death-reshaping system — what changes, what persists, and how to exploit it.", date: "2026-05-25" },
      { title: "Best Upgrades & Priority Guide", slug: "best-upgrades", excerpt: "Which permanent upgrades to unlock first, optimal ether spending, and weapon progression priorities.", date: "2026-05-22" },
      { title: "Full Lore & Story Explained", slug: "lore-explained", excerpt: "The complete story of Carcosa — timeline, character motivations, faction histories, and ending analysis.", date: "2026-05-19" }
    ]
  },
  {
    id: "gta-6",
    title: "Grand Theft Auto VI",
    releaseDate: "2026-11-19",
    developer: "Rockstar Games",
    publisher: "Take-Two Interactive",
    platforms: ["PS5", "Xbox Series X"],
    category: "open-world",
    rating: 0,
    description: "The most anticipated game in history. Return to Vice City with dual protagonists Lucia and Jason. Rockstar's biggest open world ever — pre-release coverage, analysis, and preparation guides.",
    featured: true,
    trending: true,
    image: "🌴",
    guides: [
      { title: "Everything We Know About GTA VI (Updated Daily)", slug: "everything-we-know", excerpt: "The comprehensive pre-release hub — confirmed features, map analysis, character details, and all official info.", date: "2026-06-01" },
      { title: "Vice City Map Analysis: Size, Districts & Landmarks", slug: "vice-city-map-analysis", excerpt: "Community map reconstruction — district breakdown, landmark locations, and size comparisons with GTA V.", date: "2026-05-31" },
      { title: "Characters Guide: Lucia, Jason & Supporting Cast", slug: "characters-guide", excerpt: "Everything we know about every confirmed and rumored character — backgrounds, relationships, and voice actors.", date: "2026-05-30" },
      { title: "Pre-Order Guide: Editions, Bonuses & Best Deals", slug: "pre-order-guide", excerpt: "Compare all editions, pre-order bonuses by retailer, and which version gives you the most value.", date: "2026-05-29" }
    ]
  }
];

// All guides (flattened from games) for search and latest list
const ALL_GUIDES = [];
GAMES.forEach(game => {
  game.guides.forEach(guide => {
    ALL_GUIDES.push({
      ...guide,
      gameId: game.id,
      gameTitle: game.title,
      gameCategory: game.category,
      gameImage: game.image
    });
  });
});

// Sort guides by date (newest first)
ALL_GUIDES.sort((a, b) => new Date(b.date) - new Date(a.date));

// Helper: get category name by id
function getCategoryName(categoryId) {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  return cat ? cat.name : categoryId;
}

// Helper: format date
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
