import createHttpError from "http-errors";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import { clearSessionCookies, createSession, setSessionCookies } from "../services/authServices.js";
import { Session } from "../models/session.js";

export const registerUser = async(req, res) => {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw createHttpError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    const newSession = await createSession(newUser._id);

    setSessionCookies(newSession, res);

    res.status(201).json(newUser);
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw createHttpError(401, 'Invalid credentials')
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw createHttpError(401, 'Invalid credentials')
    }

    await Session.deleteMany({ userId: user._id });
    const newSession = await createSession(user._id);
    setSessionCookies(newSession, res);

    res.status(200).json(user);
}


export const logoutUser = async (req, res) => {
    const { sessionId } = req.cookies;
    if (sessionId) {
        await Session.deleteOne({ _id: sessionId });
    }

    clearSessionCookies(res);

    res.status(204).send();
}


export const refreshUserSession = async (req, res) => {
    const { refreshToken, sessionId } = req.cookies;
    console.log(refreshToken, sessionId);
    const session = await Session.findOne({ _id: sessionId, refreshToken });
    if (!session) {
        throw createHttpError(401, 'Session not found');
    }

    const isRefreshTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);
    if (isRefreshTokenExpired) {
        throw createHttpError(401, 'Refresh token expired');
    }

    await Session.deleteOne({ _id: sessionId });
    const newSession = await createSession(session.userId);

    setSessionCookies(newSession, res);

    res.status(200).json({ message: 'Successfully refreshed a session!'});
}
