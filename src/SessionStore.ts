import { sessionObj } from "./utils/types";

/* abstract */ class SessionStore {
    findSession(sessionID: string) {}
    saveSession(sessionID: string, session: sessionObj) {}
    findAllSessions() {}
}

export class InMemorySessionStore extends SessionStore {
    sessions: Map<any, any>;
    constructor() {
        super();
        this.sessions = new Map();
    }

    findSession(sessionID: string) {
        return this.sessions.get(sessionID);
    }

    saveSession(sessionID: string, session: sessionObj) {
        this.sessions.set(sessionID, session);
    }

    findAllSessions() {
        return [...this.sessions.values()];
    }
}

