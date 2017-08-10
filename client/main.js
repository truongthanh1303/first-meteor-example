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
    console.log('click on the button', this);
    // increment the counter when button is clicked
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
    return PlayersList.find();
  },
  selectedClass() {
    console.log('this: ', this);
    if (this._id === Session.get('selectedPlayer')) {
      return 'selected';
    }
  }
});

Template.leaderboard.events({
  'click .player': function(event, instance) {
    console.log('You clicked on a player element.', this);
    Session.set('selectedPlayer', this._id);
    console.log('Session value: ', Session.get('selectedPlayer'));
  }
})
