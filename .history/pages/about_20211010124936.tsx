import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/dist/client/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Header = dynamic(() => import('@/components/common/header'), { ssr: false });

export interface AboutPageProps {}

function AboutPage(props: AboutPageProps) {
    const router = useRouter();
    const [postList, setPostList] = React.useState([]);
    console.log('about', router.query);
    const page = Number(router.query?.page) || 1;
    React.useEffect(() => {
        (async () => {
            const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`);
            const data = await response.json();
            setPostList(data.data);
        })();
    }, []);

    const handleNextClick = () => {
        router.push(
            {
                pathname: '/about',
                query: {
                    page: page + 1,
                },
            },
            undefined,
            { shallow: true }
        );
    };
    return (
        <div>
            <Header />
            About page {JSON.stringify(router.query)}
            <ul>
                {postList.map((post: any) => (
                    <li key={post.id}>
                        <Link href={`/posts/${post.id}`}>
                            <a>{post.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
            <button onClick={handleNextClick}>Next Page</button>
        </div>
    );
}

export const getStaticProps = async () => {
    console.log('getStaticProps');
    return {
        props: {},
    };
};

// export const getServerSideProps = async () => {
//     return {
//         props: {},
//     };
// };

AboutPage.propTypes = {};

export default AboutPage;
