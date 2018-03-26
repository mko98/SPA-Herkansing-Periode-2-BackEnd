const assert = require('assert');
const Game = require('../model/game.model');

describe('Creating records', () => {
    it('saves a game', (done) => {
      const game = new Game({
          title: 'Battlefield 1',
          genre: 'FPS',
          engine: 'Frostbite',
          imagePath: 'https://vignette.wikia.nocookie.net/battlefield/images/a/aa/Battlefield_1_PS4_Cover_Art.jpg/revision/latest?cb=20160508015621',
          platforms: ['PS4','XBOX'],
          gameWebsite: 'www.battlefield.com',
          releaseDate: Date.now()
      });

        game.save()
            .then(() => {
                assert(!game.isNew);
                done();
            });
});
});
