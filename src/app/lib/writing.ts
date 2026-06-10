import { WritingApiDto } from "./types/writing";

export const writing: WritingApiDto[] = [
    {
        writingId: 1,
        title: "Sunset Overdrive",
        description: "A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset,A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes. A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.A vibrant depiction of a city skyline at sunset, with bold colors and dynamic brushstrokes.",
        tags: ["sunset", "cityscape", "vibrant"],
        coverUrl: "/images/Art/sunset-overdrive.jpg",
        links:["google.com","twitter.com"],
        uploadedAt:"6/16/2024",
        comments:[
            {
                id: 1,
                content: "This is amazing!",
                comment: "I love the colors and the energy in this piece.",
                author: "ArtLover123",
                date: "6/17/2024",
                likes: 10,
                thread: null
            }
        ],
        chapters:[
            {
                writingChapterId: 1,
                writingId: 1,
                writingChapterTitle:"Chapter 1",
                writingChapterContent:[
                    {
                        writingChapterContentId: 1,
                        writingChapterId: 1,
                        writingContentPosition:1,
                        writingContentType:"Text",
                        writingContentBlock:[{
                            writingChapterContentBlockId: 1,
                            writingChapterContentId: 1,
                            writingContentBlockContent:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                            writingContentBlockImageUrl: null,
                            writingContentBlockAltText: null,
                        }]
                    },
                    {
                        writingChapterContentId: 2,
                        writingChapterId: 1,
                        writingContentPosition:2,
                        writingContentType:"Image",
                        writingContentBlock:[{
                            writingChapterContentBlockId: 2,
                            writingChapterContentId: 2,
                            writingContentBlockContent: null,
                            writingContentBlockImageUrl:"/images/Art/sunset-overdrive.jpg",
                            writingContentBlockAltText:"Sunset Overdrive",
                        }]
                    },
                    {
                        writingChapterContentId: 3,
                        writingChapterId: 1,
                        writingContentPosition:3,
                        writingContentType:"Text",
                        writingContentBlock:[{
                            writingChapterContentBlockId: 3,
                            writingChapterContentId: 3,
                            writingContentBlockContent:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            writingContentBlockImageUrl: null,
                            writingContentBlockAltText: null,
                        }]
                    }
                ]
            },
            {
                writingChapterId: 2,
                writingId: 1,
                writingChapterTitle:"Chapter 2",
                writingChapterContent:[
                    {
                        writingChapterContentId: 4,
                        writingChapterId: 2,
                        writingContentPosition:1,
                        writingContentType:"Text",
                        writingContentBlock:[{
                            writingChapterContentBlockId: 4,
                            writingChapterContentId: 4,
                            writingContentBlockContent:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                            writingContentBlockImageUrl: null,
                            writingContentBlockAltText: null,
                        }]
                    },
                    {
                        writingChapterContentId: 5,
                        writingChapterId: 2,
                        writingContentPosition:2,
                        writingContentType:"Image",
                        writingContentBlock:[{
                            writingChapterContentBlockId: 5,
                            writingChapterContentId: 5,
                            writingContentBlockContent: null,
                            writingContentBlockImageUrl:"/images/Art/sunset-overdrive.jpg",
                            writingContentBlockAltText:"Sunset Overdrive",
                        }]
                    },
                    {
                        writingChapterContentId: 6,
                        writingChapterId: 2,
                        writingContentPosition:3,
                        writingContentType:"Text",
                        writingContentBlock:[{
                            writingChapterContentBlockId: 6,
                            writingChapterContentId: 6,
                            writingContentBlockContent:"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                            writingContentBlockImageUrl: null,
                            writingContentBlockAltText: null,
                        }]
                    }
                ]
            }
        ]
    },
]