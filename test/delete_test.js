const assert = require('assert');
const Game = require('../model/game.model');

describe('Deleting a game', () => {
    let game;
   beforeEach((done) => {
       game = new Game({
           title: 'Battlefield 1',
           genre: 'FPS',
           engine: 'Frostbite',
           imagePath: 'https://vignette.wikia.nocookie.net/battlefield/images/a/aa/Battlefield_1_PS4_Cover_Art.jpg/revision/latest?cb=20160508015621',
           platforms: ['PS4','XBOX'],
           gameWebsite: 'www.battlefield.com',
           releaseDate: Date.now()
       });
       game.save()
           .then(() => done());
   });


   it('model instance remove', (done) => {
        game.remove()
            .then(() => Game.findOne({title: 'Battlefield 1'}))
            .then((game) => {
            assert(game === null);
            done();
            })
   });

    it('class method remove', (done) => {
        // Remove a bunch of records with a given criteria
        Game.remove({ title: 'Battlefield 1' })
            .then(() => Game.findOne({title: 'Battlefield 1'}))
            .then((game) => {
                assert(game === null);
                done();
        });
    });

    it('class method findOneAndRemove', (done) => {
        Game.findOneAndRemove({title: 'Battlefield 1'}).then(() => Game.findOne({title: 'Battlefield 1'}))
            .then((game) => {
                assert(game === null);
                done();
            });
    });

    it('class method findByIdAndRemove', (done) => {
        Game.findByIdAndRemove(game._id)
            .then(() => Game.findOne({title: 'Battlefield 1'}))
            .then((game) => {
                assert(game === null);
                done();
            });
    });
});
