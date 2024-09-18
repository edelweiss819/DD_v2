import {GENRES} from '../constants';

export const generateGenreByLink = (genreLink: string) => {
    const genreEntry = Object.entries(GENRES).find(([_, value]) => value === `/${genreLink}`);
    return genreEntry ? genreEntry[0] : 'Error';
}