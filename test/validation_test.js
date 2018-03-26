const assert = require('assert');
const Game = require('../model/game.model');

describe('Validating records', () => {
    it('requires a game name', () => {
        const game = new Game({
            title: undefined,
            genre: 'FPS',
            engine: 'Frostbite',
            imagePath: 'https://vignette.wikia.nocookie.net/battlefield/images/a/aa/Battlefield_1_PS4_Cover_Art.jpg/revision/latest?cb=20160508015621',
            platforms: ['PS4','XBOX'],
            gameWebsite: 'www.battlefield.com',
            releaseDate: Date.now()
        });
        const validationResult = game.validateSync();
        const { message } = validationResult.errors.title;

        assert(message === 'Title is required.')
    });


    it('disallows invalid records from being saved', (done) => {
        const game = new Game({
            title: 'Battlefield 1',
            genre: 'FPS',
            engine: 'Frostbite',
            imagePath: 'https://vignette.wikia.nocookie.net/battlefield/images/a/aa/Battlefield_1_PS4_Cover_Art.jpg/revision/latest?cb=20160508015621',
            platforms: ['PS4','XBOX'],
            gameWebsite: 'www.battlefield.com',
            releaseDate: '2-3-5-2018'
        });
        game.save()
            .catch((validationResult) => {
            const {message} = validationResult.errors.releaseDate;

            assert(message === "Cast to Date failed for value \"2-3-5-2018\" at path \"releaseDate\"");
            done();
        });
    });
});
