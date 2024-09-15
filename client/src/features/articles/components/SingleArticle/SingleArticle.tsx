import React from 'react';
import {IArticle} from '../../../../types';

const SingleArticle: React.FC<IArticle> = ({
                                               content,
                                               title,
                                           }) => {

    //TODO Добавить автора и аватарку, после того как сделаю бэк
    return (
        <div>
            {title}
            {content},

        </div>
    );
};

export default SingleArticle;
