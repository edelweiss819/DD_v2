import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchArticles} from '../api/';

const PAGE_SIZE = 10;

const useFetchArticles = () => {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['articles'],
        initialPageParam: 1,
        queryFn: fetchArticles,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length < PAGE_SIZE ? undefined : allPages.length + 1;
        },
    });

    const articles = data ? data.pages.flat() : [];

    return {
        articles,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
    };
};

export default useFetchArticles;
