export const isError = (err: unknown) => {
    return err instanceof Error;
}