import {GENRES} from '../constants';

export const generateLinkByGenre = (genre: string) => {
    const genreLink = Object.entries(GENRES).find(([key, _]) => key === genre);
    return genreLink ? genreLink[1] : null
}