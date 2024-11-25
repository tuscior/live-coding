import { createApp } from './app';

const main = async () => {
    await createApp();
}

main().then(() => {}).catch(err => {
    process.exit(1)
})