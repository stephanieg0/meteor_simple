import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tasks } from '../api/collection.js';

import './main.html';



Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    console.log('helper');
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.stephanie.events({
  'click #steph-button'(event, instance) {
    console.log('button works?');
  }
});

Template.body.helpers({
  tasks(){
   return Tasks.find({});
  },
});

Template.body.events({
  'submit .new-task'(event){
    event.preventDefault();
    console.log('submit works');

    var input = $('#todo-input').val();
    console.log(input);

    Tasks.insert({
      text: input,
      createdAt: new Date()
    });

    $('#todo-input').val('');
  }
});
