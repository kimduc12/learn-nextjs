import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';

interface PostPageProps {
    post: any;
}

function PostDetailPage({ post }: PostPageProps) {
    const router = useRouter();

    // Only work if fallback is true
    // if(router.isFallback) {
    //     return <div>Loading....</div>
    // }
    return (
        <div>
            <h1>Post detail page</h1>
            <p>Query: {JSON.stringify(router.query)}</p>
            <p>{post.id}</p>
            <p>{post.title}</p>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
    const data = await response.json();

    return {
        paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async (
    context: GetStaticPropsContext
) => {
    const params = context.params;
    const postId = params?.postId;
    if (!postId) return { notFound: true };
    const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
    const data = await response.json();

    return {
        props: {
            post: data,
        },
        revalidate: 5,
    };
};

export default PostDetailPage;
