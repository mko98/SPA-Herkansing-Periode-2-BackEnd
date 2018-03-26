const assert = require('assert');
const Game = require('../model/game.model');
describe('Reading games out of the database', () => {
    let battlefield;

    beforeEach((done) => {
       battlefield = new Game({
           title: 'Battlefield 1',
           genre: 'FPS',
           engine: 'Frostbite',
           imagePath: 'https://vignette.wikia.nocookie.net/battlefield/images/a/aa/Battlefield_1_PS4_Cover_Art.jpg/revision/latest?cb=20160508015621',
           platforms: ['PS4','XBOX'],
           gameWebsite: 'www.battlefield.com',
           releaseDate: Date.now()
       });
       battlefield.save()
       .then(() => done());
    });

   it('finds all games with a title of battlefield', (done) => {
    Game.find({title: 'Battlefield 1'})
        .then((games) => {
        assert(games[0]._id.toString() === battlefield._id.toString());
        done();
        });
   }) ;

   it('find a game with particular id', (done) => {
       Game.findOne({ _id: battlefield._id} )
           .then((game) => {
           assert(game.title === 'Battlefield 1');
           done();
           });
   });
});
