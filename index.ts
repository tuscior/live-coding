import { createApp } from './app';

const main = async () => {
    await createApp();
}

main().catch(err => {
    console.log(err);
    process.exit(1)
})