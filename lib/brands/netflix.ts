import type { BrandConfig } from "./types";

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
    image: "/new_images/image_1.jpg",
    mobileImage: "/new_images/image_1.jpg",
    imageAlt: "Featured show hero background",
    titleFont: "sf-pro",
    title: "Valentine's Date?",
    description: "P.S. you can't say no",
    genreTags: ["Adventurous", "Goofy", "Forever Yours"],
    maturityRating: "TV-PG",
    playButtonLabel: "Yes",
    myListButtonLabel: "My List",
  },

  // ─── Bottom Navigation (mobile) ──────────────────────────
  bottomNav: {
    items: [
      { label: "Home", iconName: "Home", active: true, avatar: false },
      {
        label: "New & Hot",
        iconName: "Clapperboard",
        active: false,
        avatar: false,
      },
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
    fullscreenMessage: "Hey MJ,\n\nI was going to swing by and leave these flowers on your balcony, but the wind chill at 40 stories is actually... really bad for roses.\n\nAnyway, thanks for always being the person who keeps my feet on the ground (literally and figuratively). You're my favorite person to get into trouble with. Happy Valentine's Day!\n\nP.S. Please don't look at the ceiling, I may have left a web-heart up there and I can't reach it to get it down.",
  },

  // ─── Show Details Database ───────────────────────────────
  shows: [
    {
      id: 1,
      title: "That Day in the Park",
      image: "/new_images/image_2.jpg",
      matchPercent: 92,
      year: 2001,
      rating: "TV-PG",
      episodes: "6 Seasons",
      headline: "When We Couldn't Stop Laughing",
      synopsis:
        "you told me that stupid joke and i still don't get it but watching u laugh made my whole year",
      cast: ["Me", "You", "that squirrel that photobombed us"],
      genres: ["Sunny Days", "Your Smile", "Best Moments"],
      mood: "Happy",
    },
    {
      id: 2,
      title: "The Night You Wore That Dress",
      image: "/new_images/image_3.jpg",
      tag: "New Season Coming Soon",
      matchPercent: 96,
      year: 2018,
      rating: "TV-14",
      episodes: "6 Seasons",
      headline: "You Stole the Show (And My Heart)",
      synopsis:
        "everyone was looking at u and i was just thinking... yeah she's with me. best feeling ever.",
      cast: ["You (looking incredible)", "Me (trying not to stare)"],
      genres: ["Special Nights", "Forever Grateful", "Lucky"],
      mood: "Proud",
    },
    {
      id: 3,
      title: "Our Superhero Movie Date",
      image: "/new_images/image_4.jpg",
      matchPercent: 97,
      year: 2011,
      rating: "TV-MA",
      episodes: "11 Seasons",
      headline: "Cuddle Crew Goals",
      synopsis:
        "this is basically us every time we watch a movie. u always steal the blanket and i don't even mind",
      cast: ["You", "Me", "All the snacks we definitely didn't need"],
      genres: ["Cozy Nights", "Your Head on My Shoulder", "Perfect"],
      mood: "Snuggly",
    },
    {
      id: 4,
      title: "When I Told You I Loved You",
      image: "/new_images/image_5.jpg",
      matchPercent: 95,
      year: 2013,
      rating: "TV-14",
      episodes: "8 Seasons",
      headline: "That Face Right There",
      synopsis:
        "u made this exact face when i said it for the first time. i think about it every single day",
      cast: ["Your surprised face", "My nervous smile", "This moment forever"],
      genres: ["First Times", "Best Moments", "Us"],
      mood: "Overwhelmed (in a good way)",
    },
    {
      id: 5,
      title: "Your Signature Move",
      image: "/new_images/image_6.jpg",
      matchPercent: 98,
      year: 2016,
      rating: "TV-14",
      episodes: "4 Seasons",
      headline: "Peace Sign Energy",
      synopsis:
        "u do this in like every photo and now i do it too. we're that couple and i love it",
      cast: ["You (cute as always)", "Me (your biggest fan)"],
      genres: ["Silly", "Ours", "Adorable"],
      mood: "Playful",
    },
    {
      id: 6,
      title: "Golden Hour",
      image: "/new_images/image_7.jpg",
      matchPercent: 88,
      year: 2017,
      rating: "TV-14",
      episodes: "7 Seasons",
      headline: "This Moment. Every Time.",
      synopsis:
        "when we're this close everything else just... fades. u're my peace. u're my home.",
      cast: ["You", "Me", "The sunset we didn't even notice"],
      genres: ["Quiet Moments", "Forever", "Yours"],
      mood: "Calm",
    },
    {
      id: 7,
      title: "That Fancy Dinner",
      image: "/new_images/image_8.jpg",
      matchPercent: 97,
      year: 2017,
      rating: "TV-MA",
      episodes: "4 Seasons",
      headline: "Your Laugh Across the Table",
      synopsis:
        "we were supposed to be fancy but we ended up giggling at memes. wouldn't have it any other way",
      cast: ["You (laughing at my bad jokes)", "Me (falling harder)"],
      genres: ["Date Nights", "Your Smile", "Everything"],
      mood: "Giddy",
    },
    {
      id: 8,
      title: "Coffee Shop Us",
      image: "/new_images/image_9.jpg",
      matchPercent: 91,
      year: 2017,
      rating: "TV-PG",
      episodes: "7 Seasons",
      headline: "Our Usual Order",
      synopsis:
        "that little spot with the chalkboard menu. u stealing my hoodie. the best part of my week every time",
      cast: ["You in my hoodie", "Me (could stare forever)"],
      genres: ["Cozy", "Simple", "Perfect"],
      mood: "Content",
    },
    {
      id: 9,
      title: "When You Lip Synced For Me",
      image: "/new_images/image_10.jpg",
      matchPercent: 94,
      year: 2016,
      rating: "TV-14",
      episodes: "6 Seasons",
      headline: "Stage Presence Queen",
      synopsis:
        "u were so nervous but u absolutely killed it. i was screaming from the crowd like a proud idiot",
      cast: ["You (icon)", "Me (your #1 hype man)"],
      genres: ["Proud", "Cheesy", "Yours"],
      mood: "Pumped",
    },
    {
      id: 10,
      title: "This Smile",
      image: "/new_images/image_11.jpg",
      matchPercent: 96,
      year: 2005,
      rating: "TV-14",
      episodes: "9 Seasons",
      headline: "My Favorite Photo of You",
      synopsis:
        "black and white can't even capture how bright u make everything. u're my favorite view",
      cast: ["That smile", "Those eyes", "My whole world"],
      genres: ["Timeless", "Beautiful", "Mine"],
      mood: "In Awe",
    },
    {
      id: 11,
      title: "The Duck Face Era",
      image: "/new_images/image_12.jpg",
      matchPercent: 99,
      year: 2008,
      rating: "TV-MA",
      episodes: "5 Seasons",
      headline: "Still Making That Face",
      synopsis:
        "i used to tease u for it. now i hope u never stop. it's so u and i love every bit of u",
      cast: ["Your goofy face", "My heart melting"],
      genres: ["Silly", "Cute", "Ours"],
      mood: "Smitten",
    },
    {
      id: 12,
      title: "Sunday Mornings",
      image: "/new_images/image_13.jpg",
      matchPercent: 96,
      year: 2013,
      rating: "TV-MA",
      episodes: "6 Seasons",
      headline: "Lazy Day Champion",
      synopsis:
        "u're the only person i wanna be ridiculous with at 11am still in bed. my weird matches your weird",
      cast: ["You (putting up with me)", "Me (thumbs up for life)"],
      genres: ["Lazy", "Goofy", "Home"],
      mood: "Relaxed",
    },
    {
      id: 13,
      title: "The Witcher",
      image: "/new_images/image_14.jpg",
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
      title: "Wednesday",
      image: "/new_images/image_15.jpg",
      matchPercent: 94,
      year: 2022,
      rating: "TV-14",
      episodes: "1 Season",
      headline: "A Supernatural Teen Mystery",
      synopsis:
        "Wednesday Addams navigates her new school Nevermore Academy while attempting to master her psychic abilities and solve a local murder mystery.",
      cast: [
        "Jenna Ortega",
        "Gwendoline Christie",
        "Christina Ricci",
        "Emma Myers",
      ],
      genres: ["Supernatural TV", "Teen TV Shows"],
      mood: "Dark",
    },
  ],
};

// Helper: look up a show by id
export function getShowById(id: number) {
  return netflixConfig.shows.find((s) => s.id === id);
}
