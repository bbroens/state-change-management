# state-change-management

Examples on how to keep track of app state changes

> This repo is an educative example in progress.

## Challenge: Tracking state changes

Having worked on real-time simulation software, one of the key challenges is how to keep track of state changes. State `change` management is a superset of state management itself, meaning that we want to keep track of `WHAT`, `WHO`, `WHEN` and `WHY` our app state changed - in addition to the state change itself.

Perhaps we want to show a timeline of everything that happened with the state, or we want to restore the state back to a certain point in time.

In a regular app, the user enters their name in a field and we update the state with a simple `onChange` event. But things get a little more interesting when we also want to keep track of everything that made the state change, including ways to get to the state as it was earlier.

## About this repository

This repository is intended to illustrate a number of approaches to state change management, with some included examples in the source folder. In this readme, you can find an explanation of conceptual problems and possible solutions.

![Preview: Example App](/public/screenshot.png?raw=true)

## Ways to keep track of state changes

To keep the problem space somewhat compact, Here's three major ways to keep track of state changes:

1. Have the app state include dates and mutation values `INSIDE of itself`.

2. Make a `full/delta state snapshot` and store it in a database, together with metadata of the event that triggered the snapshot.

3. Have a `separate log of events and changes`, next to the state. By separately logging events & values, we keep storage cost to a minimum and we have an overview that allows for step-by-step changes. A great example is an undo/redo feature or an event timeline.

### Solution 1: Store changes in app state itself:

This is a hacky solution, where we do not track changes separate from state. When you don't need to track many changes, you might feel temped to try something like this:

```javascript
const state = {
  username: "jdoe",
  "last-login": "2023-01-05 15:27:16",
  donations: [
    { date: "2023-01-01", amount: 5 },
    { date: "2023-01-02", amount: 10 },
  ],
  // ...
};
```

It might be interesting for small applications or when you don't need to keep track of many events, but it will come back to bite you once your app grows. Storing many mutations WITHIN state will make it unreasonably large and slow down the rest of your app that uses this state. The only reason why I am listing this, is because it tends to get used out in the wild pretty often. It might look easy and approachable, but it scales horribly.

### Solution 2: Store full-state snapshots:

Rather than storing individual mutations, we can opt to just store a full copy of the state for each change. This approach has benefits, but some important downsides. What makes this in interesting premises is the fact that we will have object copies of the state at any point in time. If we want to restore the app state to an earlier point in time, we just load in the snapshot from that moment. No differential calculations required to load state.

One obvious downside is the storage cost this introduces. With a thousand events, we get a thousand state snapshots. Those snapshots need to hit the API, database, and back again. You'll also be more likely to hit localstorage limitations if you plan to offload snapshot storage there.

```javascript
// Snapshot 1: jdoe donated 5 EUR.
const state = {
  username: "jdoe",
  "last-login": "2023-01-01 15:27:16",
  donation_amount: 5,
  // ...
};
```

```javascript
// Snapshot 2: jdoe donated another 10 EUR.
const state = {
  username: "jdoe",
  "last-login": "2023-01-01 15:30:16",
  donation_amount: 15,
  // ...
};
```

To solve this storage problem, you can choose to only store `state delta snapshots`. Meaning that you will compare the new snapshot to the previous one, and only store the values that have `actually changed` compared to last snapshot. It involves a bit more compute during store and during recall, but the storage cost reduction makes this well worth it. It's the best way to actually store snapshots for apps with large state and/or many snapshots.

But then there's the second downside to the snapshot approach: Extracting information about the events between these snapshots. Let's say it's Friday and we want to compare the current state to last Tuesday's state. We now have a bunch of snapshots between now and then, but how do we make a timeline of changes between all of them? Be prepared to write a chunk of differential logic, that can be pretty heavy depending on far you want to compare back to.
If state change comparison is a priority, dumping raw state objects is an easier approach compared to dumping just state deltas.

The snapshot approach, especially with deltas, is a decent solution if you're looking to use state backup/restore - or even to copy state from one user to another. It's fairly straightforward, as long as you don't need to process and extract information from too many snapshots in between, for a timeline for example.

### Solution: Store changes in a separate log:

This is a great approach to track linear state changes, for example for a timeline of events or an undo/redo functionality. The state behaves just like any traditional app state, but the events that lead to state changes get tracked in a `separate log`. This way we can clearly track what happened at what point, and we can even cherry pick the changes: Want to undo the last 10 steps, but skip 6 and 7? Sure thing!

We can store this log separately, and process it separately. A short example:
Let's say user jdoe put his phone in his left pocket:

```javascript
// The state gets updated.
const state = {
  username: "jdoe",
  l_pocket: "phone",
  r_pocket: "",
  hands: "",
  // ...
};

// And the event gets logged.
const logEvents = [
  { time: "2023-01-01 15:27:16", user: "jdoe", l_pocket: "phone" },
];
```

Now if user jdoe takes out his phone, the state mutates as usual but the change also gets logged for future reference:

```javascript
// The state gets updated with overwritten values.
const state = {
  username: "jdoe",
  l_pocket: "",
  r_pocket: "",
  hands: "phone",
  // ...
};

// The event gets added to the log.
const logEvents = [
  { time: "2023-01-01 15:27:16", username: "jdoe", l_pocket: "phone" },
  {
    time: "2023-01-01 15:29:21",
    username: "jdoe",
    l_pocket: "",
    hands: "phone",
  },
];
```

The state doesn't care about the log. The state just mutates and it's the logs lob to keep track of state history. We can add all the metadata we want. Even things that we don't use in the state itself.

The downside is that this step based approach potentially requires lots of steps to be executed to get to a far point in time. Want to see how the state looked 5000 events ago? Then you need to run back from the current state for all those 5000 steps, just to get to that point. Still, this way it would be easier to get an overview of those last 5000 change events, compared to having to process 5000 state snapshots.

Another major downside to logging every change is the storage cost. As you can see in the repo example app, storing events leads to a way larger array of events compared to storing state snapshots. You could set a treshold, or not log every action; but that depends on your use case.

### Adapt to your use case

It all comes down to your specific use case. If you need state changes tracked, or need to be able to restore state - it's best to consider the full scope of what your app needs to track. Storing snapshot just for a few steps of undo/redo might be excessive, but having to run thousands of logged steps in order to return to a previous state might not be preferable either.

A mix of delta snapshots and step logging might be a great option if your application requires both bulk as wel as lineair state change tracking.
