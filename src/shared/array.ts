export class Arrays {
    /**
     * Chunks an array into pairs of successive elements.
     * E.g. if an array is `[1,2,3]`, it will return `[[1,2],[2,3]]`.
     * E.g. if an array is `[1,2]`, it will return `[[1,2]]`.
     * E.g. if an array is `[1]`, it will return `[[1,1]]`.
     * @param arr the array to make pairs of. Length must be at least 1.
     * @returns an array of each successive pair, in order. It will always return at least 1 pair.
    */
    static successivePairs<T>(arr: T[]): Pair<T>[] {
        if (arr.length < 1) {
            return [];
        } else if (arr.length === 1) {
            return [{ first: arr.at(0)!, second: arr.at(0)! }];
        }
        const out = [];
        for (let i = 0; i < arr.length - 1; i++) {
            out.push({ first: arr.at(i)!, second: arr.at(i + 1)! });
        }
        return out;
    }
}

type Pair<T> = { first: T; second: T };
