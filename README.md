# 🏷 Labels

See it in action: https://label-sync.herokuapp.com/

## What?

Gui application to copy labels from one repo to another.

## Why?

Having a standard list of labels across all of your projects means that you can
move between repositories quickly and effectively. *However*, manually adding
labels to a new GitHub repository can become old, ***fast***. This module aims
to **save you time** by automating the addition of labels to a new project by
copying them from a selected repo and then transferring them to a target repo.

Our main criteria is that it ***MUST*** be quicker than manually adding labels and will offer a [hosted version](https://label-sync.herokuapp.com/) of the app if you don't want to configure/run the app yourself.

## Who?

Any Github user who has created multiple repositories and values their time ⏰

## How?
A simple and intuitive UI authenticated with GitHub using [hapi-auth-github](https://github.com/dwyl/hapi-auth-github) and make requests to the github api on your behalf.

After authentication via github login a user will simply have to submit a form with the following fields.
 + Source repo name and owner
 + Target repo name and owner

### What happens to existing labels in target repo?
Labels is _non-destructive_.  
If there are existing labels with the same name but a different colour,
the colour will change to match the source repo.  
Other than this, it will simply add any repos that don't already exist and
won't touch existing labels.

## Run

#### Config

Since we are using [hapi-auth-github](https://github.com/dwyl/hapi-auth-github) you will need to follow some of their setup to run the project locally.
 + You need to create a new oauth application in your github but please see [hapi-auth-github](https://github.com/dwyl/hapi-auth-github#2-create-an-app-on-github) for details.
 + You will need to create a [.env](https://github.com/dwyl/learn-environment-variables) file root or project of the form:
```
GITHUB_CLIENT_ID=see_hapi-auth-github
GITHUB_CLIENT_SECRET=see_hapi-auth-github
BASE_URL=see_hapi-auth-github
JWT_SECRET=see_hapi-auth-github
PORT=see_hapi-auth-github
GITHUB_AUTH_REDIRECT_URL=see_hapi-auth-github
SOURCE_REPO=optional
SOURCE_OWNER=optional
```
As we use  we will need all the environment variables [required](https://github.com/dwyl/hapi-auth-github#3-export-the-required-environment-variables) for that module plus our own optional:
  + `SOURCE_REPO` defaults the value of the source repo in form.
  + `SOURCE_OWNER`defaults the value of the source owner in form.


#### To run:

Enter these commands into your terminal:
* `git clone https://github.com/dwyl/labels.git`
* `cd labels`
* `npm i`
* :arrow_up: Make sure you have your `.env` file and all the required variables :arrow_up:.
* `npm start`
* Visit http://localhost:8000/ (or port you have selected)


## Labels

This repository contains our 'master list' of labels used across all dwyl projects: http://www.github.com/dwyl/labels/labels

An explanation of each can be found below, starting with the custom dwyl labels, which we use in conjunction with our [contributing process/guidelines](http://www.github.com/dwyl/contributing).

Clicking on a label will take you to an issue with further discussion on its existence and meaning:

- [`awaiting-review`](https://github.com/dwyl/labels/issues/49) #f39c12 - added to _issue_ once a PR with its resolution has been assigned to a reviewer (replaces `in-progress`)
- [`chore`](https://github.com/dwyl/labels/issues/37) #3A2716 - routine tasks that must be done for every project but require little active brain power
- [`discuss`](https://github.com/dwyl/labels/issues/8) #60EEEE - invites discussion from contributors
- [`epic`](https://github.com/dwyl/labels/issues/35) #000059 - big issues that span multiple days & need to be broken down
- [`external-dependency`](https://github.com/dwyl/labels/issues/54) #e6e6e6 - no further work can be carried out until a third party completes an action (specified in a comment in the issue)
- `in-progress` #009688 - added when you *start* working on an issue (and have assigned it to yourself)
- [`in-review`](https://github.com/dwyl/labels/issues/48) #128A0C - added to _PR_ by QA/reviewer to show a review is *in progress*
- [`merge-conflicts`](https://github.com/dwyl/labels/issues/26) #E74C3C - added to a _PR_ when it has merge conflicts that need to be fixed by the PR's creator
- [`please-test`](https://github.com/dwyl/labels/issues/46) #08E700 - added after PR is merged *and* the feature/fix/change has been deployed to *somewhere the Product Owner can actually **test** it* (assign issue to PO)
- `priority-1` #0D47A1 - drop everything and work on this (used only when _completely_ necessary)
- `priority-2` #1976D2 - high priority issue (what needs doing now)
- `priority-3` #42A5F5 - high priority (what needs doing next)
- `priority-4` #8DC9F9 - low priority (to be upgraded later)
- `priority-5` #C5DEF5 - lowest priority (non-urgent changes and backlog ideas)
- [`starter`](https://github.com/dwyl/labels/issues/36) #27AE60 - issues that those with not much coding experience can contribute to
- [`T[x]d`](https://github.com/dwyl/labels/issues/41) #F06292 - estimated time in 'x' days the issue will take to resolve
- [`T[x]h`](https://github.com/dwyl/labels/issues/41) #F7C6C7 - estimated time in 'x' hours the issue will take to resolve
- `technical` #D4C5F9 - technical tasks e.g. deployment
- [`user-feedback`](https://github.com/dwyl/labels/issues/61) #E91E63 - requests or features that have been added to the backlog as a direct result of user testing
- [`va-task`](https://github.com/dwyl/labels/issues/50) #128214 - denotes administrative usually for [non-developers](https://www.amazon.co.uk/Virtual-Freedom-Chris-C-Ducker/dp/1939529743)

Github also gives you a pre-populated list of labels with every repo:

- `bug` #EE0701 - report a [bug](https://en.wikipedia.org/wiki/Software_bug), not to be confused with a request for additional changes to the code
- `duplicate` #CCCCCC - duplicate issue (link to duplicate in comments)
- `enhancement` #84B6EB - improving existing code
- `help-wanted` #128A0C - looking for help or expertise on a subject
- `invalid` #E6E6E6 - issue is not valid (not used in dwyl)
- `question` #CC317C - for open questions
- `wontfix` #ffffff - when an issue won't be addressed (add a comment to the issue as to *why* this is the case


## Questions/Suggestions

We hope you find the application useful! We really want to make the process of setting up a repo as fast as possible so hope this helps.

If you need something cleared up, have any requests or want to offer any improvements then please [create an issue](https://github.com/dwyl/labels/issues/new).

 **Note** It also would be great to hear, via issue, your thoughts on our existing set of labels plus your own favourites :smiley:
