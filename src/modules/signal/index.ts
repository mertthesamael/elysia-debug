import Elysia from "elysia";


export const push = new Elysia({ 'prefix': '/push' })
    .post('/hardal', ({ body }) => {
        return body
    })