# Rob's React Demo
A react demo to showcase thought process and design intention while creating a react application

## Context

Every rational will only make sense within a certain context as the primary driver for decision making.
So the context for this demo project is as follows. A solo developer in a startup environment whose chief concerns are:

1. Simplicity: The basis for all long term applications and software. If it is anything more than a proof of concept complexity will eat you alive
2. Tight Scope: Many a project has been sunk by taking on the world all at once. A tight focus is of utmost strategic importance
3. Maintainability: With finite resources, all of a sudden your early decisions can have much broader consequences. Choosing bad practices early can impose significant cost. 

## Rationale

Starting from the beginning, and outside of the obvious choices of React / Redux in these cases, we have Typescript. 

Typescript comes along and tames the intensely dynamic language of javascript most notably by adding strict typing. The decision to use typescript in this case was made to aid in the pursuit of simplicity & maintainabillity. Indirectly this choice also helps keep our scope much tighter through giving us a base set of guarantees that we don't need to create through testing.

The libraries I have chosen to include in this project all support the above three main priorities. Are well supported and have great documentation.

A primary focus has been placed on a functional style where possible. Including focusing on immutabillity. While immutabillity has a small memory cost at a larger scale, the headaches avoided by not mutating variables cannot be understated. 

While using global state with redux special attention must be made to all of our assumptions in the application. 
Our entrypoints are not neccesarily consistent or reliable, but thankfully our decisions to use a functional approach accross the application allows for state loading to be trivial. More importantly and thinking as the project might grow. Serverside rendering would also be very easy to implement. 

## Getting started

A basic clone with npm install & npm start will get you there.

## Caveats

In the interest of brevity and creating this in spare time. Most noteably omissions include styling and testing.
In the context setup for this project I believe that testing too early in a project's lifecycle can be detrimental to the lifecycle and development process. And As the application matures and the hierarchy of software becomes apparent, it is then the time to introduce selected testing for the best effect.
As for styling, in lieu of a specific design pitch I prefer to create projects as bare bones as possible, only deciding to dress them after the functionality is secured. Once the functionality is securied A utility driven styling library would be my approach of choice, such as tailwindcss. It embodies the ethos of simplicity that I try to always create sowtware with.
