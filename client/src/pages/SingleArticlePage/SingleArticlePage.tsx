import React, {useEffect} from 'react';
import Header from '../../shared/ui/Header/Header.tsx';
import HeaderNavigation
    from '../../shared/ui/Header/HeaderNavigation/HeaderNavigation.tsx';
import Content from '../../shared/ui/Content/Content.tsx';
import Footer from '../../shared/ui/Footer/Footer.tsx';
import SimpleHeaderContentTemplate
    from '../../templates/SimpleHeaderContentTemplate/SimpleHeaderContentTemplate.tsx';
import SingleArticleContent
    from './SingleArticleContent/SingleArticleContent.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {
    useAddArticleToUserLastArticlesList,
    useFetchSingleArticleByIndex
} from '../../features/articles/hooks';
import {
    setSingleArticle
} from '../../features/articles/slice/singleArticleSlice.ts';
import {useParams} from 'react-router';
import {Element} from 'react-scroll';
import {scrollToElement} from '../../shared/utils';

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

    const {token} = useSelector((state: RootState) => state.user);
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


    useAddArticleToUserLastArticlesList(token!, Number(indexFromParams))

    return (
        <div>
            <Element name="single-article-top">
                <Header>
                    <HeaderNavigation/>
                    {singleArticle.title && <SimpleHeaderContentTemplate
						pageName={singleArticle.title}/>}
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
