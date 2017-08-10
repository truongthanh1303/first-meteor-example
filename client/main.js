import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { PlayerList } from '../api/players';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  /*'click': function(e, instance) {
    // This event will be fired when user click on every tag in its template.
    e.preventDefault();
    instance.counter.set(instance.counter.get() + 1);
  },*/
  'click button': function(event, instance) {
    // This event will be fired when user click on every button tag in its template.
    event.preventDefault();
    // increment the counter when button is clicked
    console.log('counter instance: ', instance, this);
    instance.counter.set(instance.counter.get() + 1);
  },
  'click a': function(e, instance) {
    // This event will be fired when user click on every a tag in its template.
    e.preventDefault();
    console.log('click on the a tag', this);
  }
});

PlayersList = PlayerList;

console.log('Hello world!', Meteor.isClient);

/*Template.leaderboard.player = function() {
  return 'Some other text';
}*/
Template.leaderboard.helpers({
  player() {
    const currentUserId = Meteor.userId();
    return PlayersList.find({createdBy: currentUserId}, { sort: { score: -1, name: 1 } });
  },
  selectedClass() {
    console.log('this: ', this);
    if (this._id === Session.get('selectedPlayer')) {
      return 'selected';
    }
  }
});

Template.leaderboard.events({
  'click .player': function(event,) {
    console.log('You clicked on a player element.', this);
    Session.set('selectedPlayer', this._id);
  },
  'click .give-five-points': function(evt) {
    const playerId = Session.get('selectedPlayer');
    PlayerList.update(playerId, {$inc: {score: 5}});
  },
  'click .take-five-points': function(evt) {
    PlayerList.update(Session.get('selectedPlayer'), { $inc: { score: -5 } });
  }
});

Template.addPlayerForm.events({
  'submit form': function(evt) {
    evt.preventDefault();
    const form = evt.target;
    const currentUserId = Meteor.userId();
    PlayerList.insert({
      name: form.playerName.value,
      score: 0,
      createdBy: currentUserId
    });
    form.reset();
  },
  'click #removePlayer': function() {
    const playerId = Session.get('selectedPlayer');
    if (playerId) {
      PlayerList.remove(playerId);
    }
  } 
})
