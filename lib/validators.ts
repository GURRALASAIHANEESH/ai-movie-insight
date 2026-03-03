// IMDb IDs follow the pattern: tt + 7 or 8 digits
const IMDB_ID_REGEX = /^tt\d{7,8}$/;

export function isValidImdbId(id: string): boolean {
    return IMDB_ID_REGEX.test(id.trim());
}

export function sanitizeImdbId(id: string): string {
    return id.trim().toLowerCase();
}
