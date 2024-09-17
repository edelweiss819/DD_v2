import React, {useEffect} from 'react';
import Header from '../../components/Header/Header.tsx';
import HeaderNavigation
    from '../../components/Header/HeaderNavigation/HeaderNavigation.tsx';
import Content from '../../components/Content/Content.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import SingleArticleHeader from './SingleArticleHeader/SingleArticleHeader.tsx';
import SingleArticleContent
    from './SingleArticleContent/SingleArticleContent.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {useFetchSingleArticleByIndex} from '../../features/articles/hooks';
import {
    setSingleArticle
} from '../../features/articles/slice/singleArticleSlice.ts';
import {useParams} from 'react-router';
import {Element} from 'react-scroll';
import {scrollToElement} from '../../utils';

const SingleArticlePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {index: indexFromParams} = useParams<{ index: string }>();

    const generateFinalIndex = (): number => {
        if (currentArticleIndex === undefined || currentArticleIndex === 0) {
            return Number(indexFromParams)
        } else return currentArticleIndex;
    }


    const {
        singleArticle,
        currentArticleIndex
    } = useSelector((state: RootState) => state.singleArticle);
    const {
        data: fetchedSingleArticle,
    } = useFetchSingleArticleByIndex(generateFinalIndex());

    useEffect(() => {
        if (fetchedSingleArticle) {
            dispatch(setSingleArticle(fetchedSingleArticle));
        }

    }, [
                  dispatch,
                  fetchedSingleArticle
              ]);

    useEffect(() => {
        document.title = ` DD || ${singleArticle.title}`;
    }, [singleArticle.title]);

    useEffect(() => {
        scrollToElement('single-article-top', 0, 0);
    }, [scrollToElement]);

    return (
        <div>
            <Element name="single-article-top">
                <Header>
                    <HeaderNavigation/>
                    {singleArticle.title && <SingleArticleHeader
						singleArticleTitle={singleArticle.title}/>}
                </Header>
            </Element>
            <Content>
                <SingleArticleContent singleArticle={singleArticle}/>
            </Content>
            <Footer/>
        </div>
    );
};

export default SingleArticlePage;
