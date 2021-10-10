import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/dist/client/router';
import Header from '@/components/common/header';

export interface AboutPageProps {}

function AboutPage(props: AboutPageProps) {
    const router = useRouter();
    return (
        <div>
            <Header />
            About page {JSON.stringify(router.query)}
        </div>
    );
}

AboutPage.propTypes = {};

export default AboutPage;
