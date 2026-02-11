import type { BrandConfig } from "./types"

export const netflixConfig: BrandConfig = {
  // ─── Navbar ───────────────────────────────────────────────
  navbar: {
    logo: "NETFLIX",
    profileColor: "#4b7bec",
    navLinks: [
      { label: "Home", active: true },
      { label: "TV Shows", active: false },
      { label: "Movies", active: false },
      { label: "New & Popular", active: false },
      { label: "My List", active: false },
      { label: "Browse by Languages", active: false },
    ],
  },

  // ─── Hero Section ────────────────────────────────────────
  hero: {
    image: "/images/hero-bg.jpg",
    mobileImage: "/images/hero-bg.jpg",
    imageAlt: "Featured show hero background",
    titleFont: "sf-pro",
    title: "Young Sheldon",
    description:
      'Brilliant yet awkward 9-year-old Sheldon Cooper lands in high school where his smarts leave everyone stumped in this "The Big Bang Theory" spin-off.',
    genreTags: ["Comedy", "Family", "Heartwarming"],
    maturityRating: "TV-PG",
    playButtonLabel: "Play",
    moreInfoButtonLabel: "More Info",
    myListButtonLabel: "My List",
  },

  // ─── Bottom Navigation (mobile) ──────────────────────────
  bottomNav: {
    items: [
      { label: "Home", iconName: "Home", active: true, avatar: false },
      { label: "New & Hot", iconName: "Clapperboard", active: false, avatar: false },
      { label: "My Netflix", iconName: null, active: false, avatar: true },
    ],
  },

  // ─── Content Rows ────────────────────────────────────────
  contentRows: [
    {
      title: "Your Next Watch",
      showIds: [1, 2, 3, 4, 5, 6, 7],
    },
    {
      title: "My List",
      showIds: [8, 9, 10, 11, 12, 13, 14],
    },
  ],

  // ─── Modal / Show Details ────────────────────────────────
  modal: {
    seriesBadgeLabel: "Series",
    playButtonLabel: "Play",
    addToListLabel: "Add to My List",
    likeLabel: "Like",
    volumeLabel: "Toggle volume",
    closeLabel: "Close",
    castLabel: "Cast:",
    genresLabel: "Genres:",
    moodLabel: "This show is:",
    moreLabel: "more",
    hdBadge: "HD",
    adBadge: "AD",
    fullscreenMessage: "Hello",
  },

  // ─── Show Details Database ───────────────────────────────
  shows: [
    {
      id: 1,
      title: "Reba",
      image: "/images/card-reba.jpg",
      matchPercent: 92,
      year: 2001,
      rating: "TV-PG",
      episodes: "6 Seasons",
      headline: "A Fan-Favorite Family Comedy",
      synopsis:
        "A sharp-witted Texas mom navigates the chaos of raising her family after her husband leaves her for his dental hygienist. With humor and heart, Reba holds it all together.",
      cast: ["Reba McEntire", "Melissa Peterman", "Steve Howey", "JoAnna Garcia"],
      genres: ["Sitcoms", "Family Comedies"],
      mood: "Witty",
    },
    {
      id: 2,
      title: "All American",
      image: "/images/card-allamerican.jpg",
      tag: "New Season Coming Soon",
      matchPercent: 96,
      year: 2018,
      rating: "TV-14",
      episodes: "6 Seasons",
      headline: "New Season Coming This Fall",
      synopsis:
        "A rising high school football player from South LA is recruited to play for Beverly Hills High, forcing him to navigate two vastly different worlds while chasing his dream.",
      cast: ["Daniel Ezra", "Samantha Logan", "Michael Evans Behling", "Greta Onieogou"],
      genres: ["Sports Dramas", "Teen TV Shows"],
      mood: "Inspiring",
    },
    {
      id: 3,
      title: "Shameless",
      image: "/images/card-shameless.jpg",
      matchPercent: 97,
      year: 2011,
      rating: "TV-MA",
      episodes: "11 Seasons",
      headline: "Outrageously Dysfunctional. Endlessly Bingeable.",
      synopsis:
        "The Gallagher family survives on the South Side of Chicago with an absent mother and a drunk father, relying on each other and sheer resourcefulness to get by.",
      cast: ["William H. Macy", "Emmy Rossum", "Jeremy Allen White", "Cameron Monaghan"],
      genres: ["Dark Comedies", "TV Dramas"],
      mood: "Irreverent",
    },
    {
      id: 4,
      title: "Brooklyn Nine-Nine",
      image: "/images/card-brooklyn99.jpg",
      matchPercent: 95,
      year: 2013,
      rating: "TV-14",
      episodes: "8 Seasons",
      headline: "The Funniest Precinct in New York",
      synopsis:
        "Detective Jake Peralta and his diverse, lovable colleagues protect Brooklyn while navigating workplace antics under their stoic new commanding officer, Captain Holt.",
      cast: ["Andy Samberg", "Andre Braugher", "Melissa Fumero", "Terry Crews"],
      genres: ["Workplace Comedies", "Crime TV Comedies"],
      mood: "Feel-Good",
    },
    {
      id: 5,
      title: "Stranger Things",
      image: "/images/card-strangerthings.jpg",
      matchPercent: 98,
      year: 2016,
      rating: "TV-14",
      episodes: "4 Seasons",
      headline: "The Final Season is Coming",
      synopsis:
        "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one very strange little girl.",
      cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder", "David Harbour"],
      genres: ["Sci-Fi TV", "Horror Series"],
      mood: "Dark",
    },
    {
      id: 6,
      title: "S.W.A.T.",
      image: "/images/card-swat.jpg",
      matchPercent: 88,
      year: 2017,
      rating: "TV-14",
      episodes: "7 Seasons",
      headline: "Action-Packed Police Drama",
      synopsis:
        "A locally born and bred S.W.A.T. sergeant leads a team of elite law enforcement officers who are the last stop for solving crimes in Los Angeles.",
      cast: ["Shemar Moore", "Stephanie Sigman", "Alex Russell", "Lina Esco"],
      genres: ["Action TV", "Crime TV Dramas"],
      mood: "Suspenseful",
    },
    {
      id: 7,
      title: "Ozark",
      image: "/images/card-ozark.jpg",
      matchPercent: 97,
      year: 2017,
      rating: "TV-MA",
      episodes: "4 Seasons",
      headline: "A Critically Acclaimed Crime Thriller",
      synopsis:
        "A financial planner relocates his family to the Ozarks after a money laundering scheme goes wrong, forcing him to pay off a substantial debt to a Mexican drug lord.",
      cast: ["Jason Bateman", "Laura Linney", "Julia Garner", "Skylar Gaertner"],
      genres: ["Crime TV Dramas", "TV Thrillers"],
      mood: "Dark",
    },
    {
      id: 8,
      title: "Young Sheldon",
      image: "/images/card-youngsheldon.jpg",
      matchPercent: 91,
      year: 2017,
      rating: "TV-PG",
      episodes: "7 Seasons",
      headline: "The Origin Story of a Genius",
      synopsis:
        "For 9-year-old Sheldon Cooper, being a once-in-a-generation mind capable of advanced mathematics isn't always helpful growing up in East Texas.",
      cast: ["Iain Armitage", "Zoe Perry", "Lance Barber", "Montana Jordan"],
      genres: ["Sitcoms", "Family Comedies"],
      mood: "Heartwarming",
    },
    {
      id: 9,
      title: "Lucifer",
      image: "/images/card-lucifer.jpg",
      matchPercent: 94,
      year: 2016,
      rating: "TV-14",
      episodes: "6 Seasons",
      headline: "Devilishly Good Television",
      synopsis:
        "Bored with being the Lord of Hell, Lucifer Morningstar abandons his throne to start a new life in Los Angeles, where he helps the LAPD solve crimes.",
      cast: ["Tom Ellis", "Lauren German", "Kevin Alejandro", "D.B. Woodside"],
      genres: ["Supernatural TV", "Crime TV Dramas"],
      mood: "Witty",
    },
    {
      id: 10,
      title: "The Office",
      image: "/images/card-theoffice.jpg",
      matchPercent: 96,
      year: 2005,
      rating: "TV-14",
      episodes: "9 Seasons",
      headline: "The Greatest Workplace Comedy Ever Made",
      synopsis:
        "A documentary crew captures the everyday interactions of the workers at the Dunder Mifflin paper company's Scranton, Pennsylvania branch.",
      cast: ["Steve Carell", "Rainn Wilson", "John Krasinski", "Jenna Fischer"],
      genres: ["Mockumentaries", "Workplace Comedies"],
      mood: "Quirky",
    },
    {
      id: 11,
      title: "Breaking Bad",
      image: "/images/card-breakingbad.jpg",
      matchPercent: 99,
      year: 2008,
      rating: "TV-MA",
      episodes: "5 Seasons",
      headline: "A Landmark in Television History",
      synopsis:
        "A high school chemistry teacher diagnosed with terminal lung cancer teams up with a former student to manufacture and sell crystal meth to secure his family's future.",
      cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn", "Dean Norris"],
      genres: ["Crime TV Dramas", "TV Thrillers"],
      mood: "Dark",
    },
    {
      id: 12,
      title: "Peaky Blinders",
      image: "/images/card-peakyblinders.jpg",
      matchPercent: 96,
      year: 2013,
      rating: "TV-MA",
      episodes: "6 Seasons",
      headline: "By Order of the Peaky Blinders",
      synopsis:
        "A gangster family epic set in 1920s England, centering on a gang who sew razor blades into the peaks of their caps and their fierce leader Tommy Shelby.",
      cast: ["Cillian Murphy", "Helen McCrory", "Paul Anderson", "Sophie Rundle"],
      genres: ["Crime TV Dramas", "Period Pieces"],
      mood: "Gritty",
    },
    {
      id: 13,
      title: "The Witcher",
      image: "/images/card-thewitcher.jpg",
      matchPercent: 93,
      year: 2019,
      rating: "TV-MA",
      episodes: "3 Seasons",
      headline: "A Dark Fantasy Epic",
      synopsis:
        "Geralt of Rivia, a mutated monster-hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
      cast: ["Henry Cavill", "Anya Chalotra", "Freya Allan", "Joey Batey"],
      genres: ["Fantasy TV Shows", "TV Dramas"],
      mood: "Dark",
    },
    {
      id: 14,
      title: "Brooklyn Nine-Nine",
      image: "/images/card-brooklyn99.jpg",
      matchPercent: 95,
      year: 2013,
      rating: "TV-14",
      episodes: "8 Seasons",
      headline: "The Funniest Precinct in New York",
      synopsis:
        "Detective Jake Peralta and his diverse, lovable colleagues protect Brooklyn while navigating workplace antics under their stoic new commanding officer, Captain Holt.",
      cast: ["Andy Samberg", "Andre Braugher", "Melissa Fumero", "Terry Crews"],
      genres: ["Workplace Comedies", "Crime TV Comedies"],
      mood: "Feel-Good",
    },
  ],
}

// Helper: look up a show by id
export function getShowById(id: number) {
  return netflixConfig.shows.find((s) => s.id === id)
}
