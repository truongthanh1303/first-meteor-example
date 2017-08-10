import { Meteor } from 'meteor/meteor';
import { PlayerList } from '../api/players';

Meteor.startup(() => {
  // code to run on server at startup
  console.log('Hello world on the Server side.');
});
