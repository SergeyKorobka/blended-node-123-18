import crypto from 'crypto';
import { FIFTEEN_MINUTES, ONE_MONTH } from '../constants/time.js';
import { Session } from '../models/session.js';

export const createSession = async (userId) => {
    const accessToken = crypto.randomBytes(30).toString('base64');
    const refreshToken = crypto.randomBytes(30).toString('base64');

    const newSession = await Session.create({
        accessToken,
        refreshToken,
        userId,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH)
    })

    return newSession;
}


export const setSessionCookies = (session, res) => {
    res.cookie('accessToken', session.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: FIFTEEN_MINUTES
    });
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ONE_MONTH
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ONE_MONTH
    })
}


export const clearSessionCookies = (res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');
}
