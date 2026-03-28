import { describe, it, expect, vi } from "vitest"

//import functions ()
import { hashedPassword, verifyPassword } from "../controllers/userControllers.js"

/*
Tests to check if user passwords are properly created and stored
*/

//password hasing test
describe('hashedPassword', () => {
    it('should return a hash different from the original password', async () => {
        const password = 'testpassword123'
        const hash = await hashedPassword(password)

        expect(hash).not.toBe(password)
        expect(hash).toMatch(/^\$argon2/) // argon2 hash pattern
    })
})

//verifying password works test
describe('verifyPassword', () => {
    it('should return true for matching password', async () => {
        const password = 'testPassword123'
        const hash = await hashedPassword(password)

        const result = await verifyPassword(hash, password)
        expect(result).toBe(true)
    })

    it('should return false for non-matching password', async () => {
        const hash = await hashedPassword('correctPassword')

        const result = await verifyPassword(hash, 'wrongPassword')
        expect(result).toBe(false)
    })
})

/*
Tests to check if Database is working as expected
*/

