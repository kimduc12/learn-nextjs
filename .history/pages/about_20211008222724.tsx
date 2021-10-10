import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/dist/client/router'

export interface AboutPageProps {}

function AboutPage(props: AboutPageProps) {
    const router = useRouter();
    return (
        <div>
            About page {JSON.stringify(router.query)}
        </div>
    )
}

AboutPage.propTypes = {

}

export default AboutPage

