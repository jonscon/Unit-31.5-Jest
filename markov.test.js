const {MarkovMachine} = require('./markov')

let testText = "Today I'm going for a walk with my three dogs.\nThey are the best dogs ever."
let testMarkovMachine = new MarkovMachine(testText)

let invalidTestText = ""
let invalidTestMarkovMachine = new MarkovMachine(invalidTestText)

describe('Markov Machine chain tests', () => {
    test('should return chain dictionary with correct elements', () => {
        expect(testMarkovMachine.chains).toBeInstanceOf(Object)
        expect(testMarkovMachine.chains.get("Today")).toContain("I'm")
        expect(testMarkovMachine.chains.get("walk")).toContain("with")
        expect(testMarkovMachine.chains.get("ever.")).toContain(null)

        expect(testMarkovMachine.chains.get("going")).not.toContain("dogs")
        expect(testMarkovMachine.chains.get("dogs.")).not.toContain("are")
        expect(testMarkovMachine.chains.get("for")).not.toContain("walk")

    })

    test('should return empty chain', () => {
        expect(invalidTestMarkovMachine.chains).toBeInstanceOf(Object)
        expect(invalidTestMarkovMachine.chains.get("Today")).toBeUndefined()
        expect(invalidTestMarkovMachine.chains.get("walk")).toBeUndefined()
        expect(invalidTestMarkovMachine.chains.get("ever")).toBeUndefined()
        expect(invalidTestMarkovMachine.chains.size).toEqual(0)
    })
})

describe('MarkovMachine string to array tests', () => {
    test('should create an array of words', () => {
        expect(testMarkovMachine.words).toBeInstanceOf(Array)
        expect(testMarkovMachine.words).toContain("Today")
        expect(testMarkovMachine.words).toContain("walk")
        expect(testMarkovMachine.words).toContain("ever.")
    })

    test('should be empty array', () => {
        expect(invalidTestMarkovMachine.words).toBeInstanceOf(Array)
        expect(invalidTestMarkovMachine.length).toBeUndefined()
        expect(invalidTestMarkovMachine[0]).toBeUndefined()
    })
})

describe('MarkovMachine text tests', () => {
    test('should return random word from array of text', () => {
        expect(testMarkovMachine.words).toContain(MarkovMachine.choice(testMarkovMachine.words))

        let testArr = ['random', 'words', 'in', 'this', 'array']
        expect(testArr).toContain(MarkovMachine.choice(testArr))
    })

    test('should return undefined from empty string', () => {
        expect(MarkovMachine.choice(invalidTestMarkovMachine.words)).toBeUndefined()
    })

    test('should generate text from chains', () => {
        expect(testMarkovMachine.makeText()).not.toBeNull()
        expect(testMarkovMachine.makeText()).not.toBeFalsy()
        expect(testMarkovMachine.makeText().length).toBeGreaterThan(0)
    })
})