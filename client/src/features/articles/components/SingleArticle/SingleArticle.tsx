import React from 'react';
import {IArticle} from '../../../../types';

const SingleArticle: React.FC<IArticle> = ({
                                               content,
                                               title,
                                           }) => {
    return (
        <div>
            {title}
            {content},

        </div>
    );
};

export default SingleArticle;
