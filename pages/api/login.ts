// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';

export const config = {
    api: {
        bodyParser: false,
    },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.method !== 'POST') {
        return res.status(404).json({ status: false, message: 'method not supported' });
    }
    return new Promise((resolve) => {
        // don't send cookies to API server
        req.headers.cookie = '';

        const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
            try {
                let body = '';
                proxyRes.on('data', function (chunk) {
                    body += chunk;
                });
                proxyRes.on('end', function () {
                    const { accessToken, expiredAt } = JSON.parse(body);
                    const cookies = new Cookies(req, res, {
                        secure: process.env.NODE_ENV !== 'development',
                    });
                    cookies.set('access_token', accessToken, {
                        httpOnly: true,
                        sameSite: 'lax',
                        expires: new Date(expiredAt),
                    });
                    (res as NextApiResponse).status(200).end({ message: 'success' });
                });
            } catch (error) {
                (res as NextApiResponse).status(500).end({ message: 'error' });
            }
        };
        proxy.once('proxyRes', handleLoginResponse);
        proxy.web(req, res, {
            target: process.env.API_URL,
            changeOrigin: true,
            selfHandleResponse: true,
        });
    });
}
