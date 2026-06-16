import { ComicApiDto } from "./types/comic";

export const comics: ComicApiDto[] = [
    {
        comicId: 1,
        title: "Comic Title 1",
        description: "This is a description for Comic Title 1.",
        tags: ["Action", "Adventure"],
        uploadedAt: "2024-06-18",
        details:{
            status: "Ongoing",
            year: 2023,
            originalLanguage: "English",
            contentRating: "Teen"
        },
        comments: [
            {
                id: 1,
                content: "This is a comment.",
                comment: "I really enjoyed this comic!",
                author: "User1",
                date: "2023-01-01",
                likes: 10,
                thread: null
            },
            {
                id: 2,
                content: "This is another comment.",
                comment: "Can't wait for the next chapter!",
                author: "User2",
                date: "2023-01-02",
                likes: 10,
                thread: null

            }
        ],
        coverImageUrl: "/images/HomeCarousel/placeholder1.jpg",
        chapters: [
            {
                chapterTitle: "Chapter 1 - Mega Awesome Chapter",
                images: [
                    "/images/HomeCarousel/placeholder1.jpg",
                    "/images/HomeCarousel/placeholder2.jpg",
                    "/images/HomeCarousel/placeholder3.jpg",
                    "/images/HomeCarousel/placeholder4.webp",
                    "/images/Art/abstract-dreams.jpg",
                ]
            },
            {
                chapterTitle: "Chapter 2 - Another Exciting Chapter",
                images: [
                    "/images/Art/serene-forest.webp",
                    "/images/Art/sunset-overdrive.jpg",
                    "/images/HomeCarousel/placeholder1.jpg",
                    "/images/HomeCarousel/placeholder2.jpg",
                ]
            }
        ]
    },
    {
        comicId: 2,
        title: "Comic Title 2",
        description: "This is a description for Comic Title 2.",
        tags: ["Fantasy", "Drama"],
        uploadedAt: "2024-05-20",
        details:{
            status: "Ongoing",
            year: 2023,
            originalLanguage: "English",
            contentRating: "Teen"
        },
        coverImageUrl: "/images/HomeCarousel/placeholder2.jpg",
        comments: [
            {
                id: 1,
                content: "This is a comment.",
                comment: "I really enjoyed this comic!",
                author: "User1",
                date: "2023-01-01",
                thread: null
            },
            {
                id: 2,
                content: "This is another comment.",
                comment: "Can't wait for the next chapter!",
                author: "User2",
                date: "2023-01-02",
                thread: null
            }
        ],
        chapters: [
            {
                chapterTitle: "Chapter 1 - Mega Awesome Chapter",
                images: [
                    "/images/Art/sunset-overdrive.jpg",
                    "/images/HomeCarousel/placeholder3.jpg",
                    "/images/HomeCarousel/placeholder4.webp",
                ]
            },
            {
                chapterTitle: "Chapter 2 - Another Exciting Chapter",
                images: [
                    "/images/Art/abstract-dreams.jpg",
                    "/images/Art/serene-forest.webp",
                    "/images/HomeCarousel/placeholder1.jpg",
                    "/images/HomeCarousel/placeholder2.jpg",
                ]
            }
        ]
    },
    {
        comicId: 3,
        title: "Comic Title 3",
        description: "This is a description for Comic Title 3.",
        tags: ["Sci-Fi", "Thriller"],
        uploadedAt: "2024-04-15",
        details:{   
            status: "Ongoing",
            year: 2023,
            originalLanguage: "English",
            contentRating: "Teen"
        },
        comments: [
            {
                id: 1,
                content: "This is a comment.",
                comment: "I really enjoyed this comic!",
                author: "User1",
                date: "2023-01-01",
                thread: null
            },
            {
                id: 2,
                content: "This is another comment.",
                comment: "Can't wait for the next chapter!",
                author: "User2",
                date: "2023-01-02",
                thread: null
            }
        ],

        coverImageUrl: "/images/HomeCarousel/placeholder3.jpg",
        chapters: [
            {
                chapterTitle: "Chapter 1 - Mega Awesome Chapter",
                images: [
                    "/images/HomeCarousel/placeholder2.jpg",
                    "/images/Art/abstract-dreams.jpg",
                    "/images/Art/serene-forest.webp",
                    "/images/HomeCarousel/placeholder4.webp",
                ]
            },
            {
                chapterTitle: "Chapter 2 - Another Exciting Chapter",
                images: [
                    "/images/HomeCarousel/placeholder1.jpg",
                    "/images/Art/sunset-overdrive.jpg",
                    "/images/HomeCarousel/placeholder3.jpg",
                ]
            }
        ]
    },
    {
        comicId: 4,
        title: "Comic Title 4",
        description: "This is a description for Comic Title 4.",
        tags: ["Mystery", "Horror"],
        uploadedAt: "2024-03-10",
        details:{
            status: "Ongoing",
            year: 2023,
            originalLanguage: "English",
            contentRating: "Teen"
        },
        coverImageUrl: "/images/HomeCarousel/placeholder4.webp",
        comments: [
            {
                id: 1,
                content: "This is a comment.",
                comment: "I really enjoyed this comic!",
                author: "User1",
                date: "2023-01-01",
                thread: null
            },
            {
                id: 2,
                content: "This is another comment.",
                comment: "Can't wait for the next chapter!",
                author: "User2",
                date: "2023-01-02",
                thread: null
            }
        ],
        

        chapters: [
            {
                chapterTitle: "Chapter 1 - Mega Awesome Chapter",
                images: [
                    "/images/Art/serene-forest.webp",
                    "/images/HomeCarousel/placeholder1.jpg",
                    "/images/HomeCarousel/placeholder2.jpg",
                    "/images/Art/abstract-dreams.jpg",
                    "/images/HomeCarousel/placeholder3.jpg",
                    "/images/Art/sunset-overdrive.jpg",
                ]
            },
            {
                chapterTitle: "Chapter 2 - Another Exciting Chapter",
                images: [
                    "/images/HomeCarousel/placeholder4.webp",
                    "/images/Art/serene-forest.webp",
                    "/images/HomeCarousel/placeholder1.jpg",
                ]
            }
        ]
    },
]
