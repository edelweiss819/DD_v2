import React, {ReactNode} from 'react';
import styles from './MainContent.module.scss'

interface BodyProps {
    children?: ReactNode;
}

const MainContent: React.FC<BodyProps> = ({children}) => (
    <div className={styles['main-content']}>
        {children}
    </div>
);

export default MainContent;
