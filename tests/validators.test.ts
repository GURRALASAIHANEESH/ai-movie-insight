import { isValidImdbId, sanitizeImdbId } from "@/lib/validators";

describe("isValidImdbId", () => {
    it("accepts valid 7-digit IMDb ID", () => {
        expect(isValidImdbId("tt0133093")).toBe(true);
    });

    it("accepts valid 8-digit IMDb ID", () => {
        expect(isValidImdbId("tt12345678")).toBe(true);
    });

    it("rejects ID without tt prefix", () => {
        expect(isValidImdbId("0133093")).toBe(false);
    });

    it("rejects ID with letters after tt", () => {
        expect(isValidImdbId("ttabcdefg")).toBe(false);
    });

    it("rejects empty string", () => {
        expect(isValidImdbId("")).toBe(false);
    });

    it("rejects ID with too few digits", () => {
        expect(isValidImdbId("tt01234")).toBe(false);
    });

    it("rejects ID with too many digits", () => {
        expect(isValidImdbId("tt012345678")).toBe(false);
    });
});

describe("sanitizeImdbId", () => {
    it("trims whitespace", () => {
        expect(sanitizeImdbId("  tt0133093  ")).toBe("tt0133093");
    });

    it("lowercases the ID", () => {
        expect(sanitizeImdbId("TT0133093")).toBe("tt0133093");
    });
});
