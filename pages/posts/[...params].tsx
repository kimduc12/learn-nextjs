import { useRouter } from 'next/dist/client/router'
import React from 'react'

interface PostParamsPageProps {

}

function PostParamsPage({}: PostParamsPageProps) {
    const router = useRouter();
    return (
        <div>
            <h1>Params page</h1>
            <p>Query: {JSON.stringify(router.query)}</p>
        </div>
    )
}

export default PostParamsPage
