import { afterEach, describe, expect, it, vi } from "vitest";
import Home, { getBannerImages, getHomeConfig } from "@/app/page";

describe("Home page helpers", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns default banner images when config is null", () => {
    expect(getBannerImages(null)).toEqual([
      "/images/HomeCarousel/placeholder1.jpg",
      "/images/HomeCarousel/placeholder2.jpg",
      "/images/HomeCarousel/placeholder3.jpg",
    ]);
  });

  it("filters out empty banner images when config contains values", () => {
    expect(getBannerImages({ bannerImages: ["/img1.jpg", "", "/img2.jpg"] })).toEqual([
      "/img1.jpg",
      "/img2.jpg",
    ]);
  });

  it("returns null when fetch response is not ok", async () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve({ ok: false })));

    const result = await getHomeConfig();
    expect(result).toBeNull();
  });

  it("returns config home data when fetch succeeds", async () => {
    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({ home: { bannerImages: ["/img-a.jpg"] } }),
      })
    ));

    const result = await getHomeConfig();
    expect(result).toEqual({ bannerImages: ["/img-a.jpg"] });
  });
});

describe("Home page render", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the home page with banner images from config", async () => {
    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({ home: { bannerImages: ["/img-a.jpg", "/img-b.jpg"] } }),
      })
    ));

    const element = await Home();

    expect(element.type).toBe("main");
    expect(Array.isArray(element.props.children)).toBe(true);
    expect(element.props.children[0].props.images).toEqual(["/img-a.jpg", "/img-b.jpg"]);
  });
});
