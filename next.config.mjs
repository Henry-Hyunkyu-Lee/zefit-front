/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        NEXT_PUBLIC_MANAGER_ID: process.env.NEXT_PUBLIC_MANAGER_ID,
        NEXT_PUBLIC_MANAGER_PASSWORD: process.env.NEXT_PUBLIC_MANAGER_PASSWORD,
        NEXT_PUBLIC_KAKAO_APP_KEY: process.env.NEXT_PUBLIC_KAKAO_APP_KEY,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        NEXT_PUBLIC_AWS_S3_REGION: process.env.NEXT_PUBLIC_AWS_S3_REGION,
        NEXT_PUBLIC_AWS_S3_ENDPOINT: process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT,
        NEXT_PUBLIC_AWS_S3_KEY_ID: process.env.NEXT_PUBLIC_AWS_S3_KEY_ID,
        NEXT_PUBLIC_AWS_S3_SECRET_KEY: process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY
    }
};

export default nextConfig;
