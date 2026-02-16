import { NextAuthOptions } from "next-auth";
import { dbConnect } from "./db";
import { User } from "@/models/User";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const user = session.user as any;
        user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user }) {
      await dbConnect();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
          quizzes: [],
        });
      } else {
        await User.findOneAndUpdate(existingUser._id, {
          image: user.image,
        });
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
