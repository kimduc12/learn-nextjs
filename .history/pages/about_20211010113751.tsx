import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/dist/client/router';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/common/header'), { ssr: false });

export interface AboutPageProps {}

function AboutPage(props: AboutPageProps) {
    const router = useRouter();
    console.log('about');
    return (
        <div>
            <Header />
            About page {JSON.stringify(router.query)}
        </div>
    );
}

export async function getServerSideProps() {
    return {};
}

AboutPage.propTypes = {};

export default AboutPage;
