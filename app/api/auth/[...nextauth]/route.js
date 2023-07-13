import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter';
import { connectMongoDB } from '@/utils/database';
import User from '@/utils/user';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
        // TwitterProvider({
        //     clientId: process.env.TWITTER_ID,
        //     clientSecret: process.env.TWITTER_CLIENT_SECRET,
        //     version: '2.0' // opt-in to Twitter OAuth 2.0
        // })
    ],
    callbacks: {
        async session({ session }) {
            // find user
            const sessionUser = await User.findOne({
                email: session.user.email
            });

            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ account, profile, email, credentials }) {
            try {
                await connectMongoDB();
                console.log(profile);
                console.log(account);
                // console.log(user);

                // Check if the user already exists
                const user = await User.findOne({ email: profile.email });

                // create a new user if not already existing
                if (!user) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image:
                            account.provider === 'google'
                                ? profile.picture
                                : profile.avatar_url
                    });
                }
                return true;
            } catch (error) {
                console.log('Error signing in', error);
                return false;
            }
        }
        // async redirect({ url, baseUrl }) {
        //     const redirectUrl = url.startsWith('/')
        //         ? new URL(url, baseUrl).toString()
        //         : url;
        //     console.log(
        //         `[next-auth] Redirecting to "${redirectUrl}" (resolved from url "${url}" and baseUrl "${baseUrl}")`
        //     );
        //     return redirectUrl;
        // }
    }
});

export { handler as GET, handler as POST };
