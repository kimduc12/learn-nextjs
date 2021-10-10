import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/dist/client/router';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/common/header'), { ssr: false });

export interface AboutPageProps {}

function AboutPage(props: AboutPageProps) {
    const router = useRouter();
    const [postList, setPostList] = React.useState([]);
    console.log('about');
    React.useEffect(() => {
        (async () => {
            const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
            const data = await response.json();
        })();
    }, []);
    return (
        <div>
            <Header />
            About page {JSON.stringify(router.query)}
        </div>
    );
}

export const getServerSideProps = async () => {
    return {
        props: {},
    };
};

AboutPage.propTypes = {};

export default AboutPage;
