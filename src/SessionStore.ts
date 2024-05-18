/* abstract */ class SessionStore {
    findSession(id) {}
    saveSession(id, session) {}
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

    saveSession(sessionID: string, session) {
        this.sessions.set(sessionID, session);
    }

    findAllSessions() {
        return [...this.sessions.values()];
    }
}

