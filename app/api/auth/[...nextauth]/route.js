import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { connectMongoDB } from '@/utils/database';
import User from '@/utils/user';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
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
        async signIn({ profile }) {
            try {
                await connectMongoDB();
                console.log(profile);

                // Check if the user already exists
                const user = await User.findOne({ email: profile.email });

                // create a new user if not already existing
                if (!user) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture
                    });
                }
            } catch (error) {
                console.log('Error signing in', error);
            }
        }
    }
});

export { handler as GET, handler as POST };
