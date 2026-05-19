import { ComicInterface } from "./types/comic";

export const comics: ComicInterface[] = [
    {
        id: 1,
        title: "Comic Title 1",
        description: "This is a description for Comic Title 1.",
        tags: ["Action", "Adventure"],
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
                images: ["/images/HomeCarousel/placeholder1.jpg", "/images/HomeCarousel/placeholder2.jpg"]
            },
            {
                chapterTitle: "Chapter 2 - Another Exciting Chapter",
                images: ["/images/HomeCarousel/placeholder3.jpg", "/images/HomeCarousel/placeholder4.webp"]
            }
        ]
    },
    {
        id: 2,
        title: "Comic Title 2",
        description: "This is a description for Comic Title 2.",
        tags: ["Fantasy", "Drama"],
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
                images: ["/images/HomeCarousel/placeholder1.jpg", "/images/HomeCarousel/placeholder2.jpg"]
            },
            {
                chapterTitle: "Chapter 2 - Another Exciting Chapter",
                images: ["/images/HomeCarousel/placeholder3.jpg", "/images/HomeCarousel/placeholder4.webp"]
            }
        ]
    },
    {
        id: 3,
        title: "Comic Title 3",
        description: "This is a description for Comic Title 3.",
        tags: ["Sci-Fi", "Thriller"],
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
                images: ["/images/HomeCarousel/placeholder1.jpg", "/images/HomeCarousel/placeholder2.jpg"]
            },
            {
                chapterTitle: "Chapter 2 - Another Exciting Chapter",
                images: ["/images/HomeCarousel/placeholder3.jpg", "/images/HomeCarousel/placeholder4.webp"]
            }
        ]
    },
    {
        id: 4,
        title: "Comic Title 4",
        description: "This is a description for Comic Title 4.",
        tags: ["Mystery", "Horror"],
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
                images: ["/images/HomeCarousel/placeholder1.jpg", "/images/HomeCarousel/placeholder2.jpg"]
            },
            {
                chapterTitle: "Chapter 2 - Another Exciting Chapter",
                images: ["/images/HomeCarousel/placeholder3.jpg", "/images/HomeCarousel/placeholder4.webp"]
            }
        ]
    },
]