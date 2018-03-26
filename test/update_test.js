const assert = require('assert');
const Game = require('../model/game.model');

describe('Updating records', () => {
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

   function assertName(operation, done) {
       operation
           .then(() => Game.find({}))
           .then((games) => {
               assert(games.length === 1);
               assert(games[0].title === 'Call of Duty');
               done();
           });
   }

   it('instance type using set and save', (done) => {
       battlefield.set('title', 'Call of Duty');
       assertName(battlefield.save(), done);
   });

   it('A model instance can update', (done) => {
       assertName(battlefield.update({title: 'Call of Duty'}), done);
   });

    it('A model class can update', (done) => {
        assertName(Game.update({title: 'Battlefield 1'}, {title: 'Call of Duty'}), done)
    });

    it('A model class can update on record', (done) => {
        assertName(Game.findOneAndUpdate({title: 'Battlefield 1'}, {title: 'Call of Duty'}), done);
    });

    it('A model class can find a record  with an Id and update', (done) => {
        assertName(Game.findByIdAndUpdate(battlefield._id, {title: 'Call of Duty'}), done)
    });

});
