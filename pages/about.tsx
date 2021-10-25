import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/dist/client/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MainLayout } from '@/components/layouts';

const Header = dynamic(() => import('@/components/common/header'), { ssr: false });

export interface AboutPageProps {}

function AboutPage(props: AboutPageProps) {
    const router = useRouter();
    const [postList, setPostList] = React.useState([]);
    console.log('about', router.query);
    const page = router.query?.page;
    React.useEffect(() => {
        if (!page) return;
        (async () => {
            const response = await fetch(
                `https://js-post-api.herokuapp.com/api/posts?_page=${page}`
            );
            const data = await response.json();
            setPostList(data.data);
        })();
    }, [page]);

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
        <>
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
        </>
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
AboutPage.Layout = MainLayout;
export default AboutPage;
