export class AssertionError extends Error {
    public constructor(message:string) {
        super(message);
        this.name = "AssertionError";
    }
}