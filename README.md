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

Any developer who has created multiple repositories and values their time ⏰

## How?
A simple and intuitive UI authenticated with GitHub using [hapi-auth-github](https://github.com/dwyl/hapi-auth-github) and make requests to the github api on your behalf.

After authentication via github login a user will simply have to submit a form with the following fields.
 + Source repo name and owner
 + Target repo name and owner

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

You can see all of the labels that we use in dwyl projects here, with an explanation of each below: http://www.github.com/dwyl/labels/labels

Github gives you a pre-populated list of labels for you to use. They are:

- `bug` #EE0701 - report a bug that needs fixed
- `duplicate` #CCCCCC - duplicate issue
- `enhancement` #84B6EB - improving existing code
- `help-wanted` #128A0C - looking for help or expertise on a subject
- `invalid` #E6E6E6 - GitHub standard tag (not used)
- `question` #CC317C - for open questions and discussions
- `wontfix` #ffffff - when an issue won't be addressed (with reason why in comment)

Here are the custom ones that we use at dwyl:

- `in-progress` #009688 - to be added when an issue has been assigned
- `in-review` #128A0C - once a PR has been submitted relating to the issue
- `please-test` #08E700 - added after PR is merged (assign to product owner)
- `priority-1` #0D47A1 - drop everything and work on this (used only when _completely_ neccessary)
- `priority-2` #1976D2 - high priority issue (what needs doing now)
- `priority-3` #42A5F5 - high priority (what needs doing next)
- `priority-4` #8DC9F9 - low priority (to be upgraded later)
- `priority-5` #C5DEF5 - lowest priority (non-urgent changes)
- `T[x]d` #F06292 - time in 'x' days it should take (estimation)
- `T[x]h` #F7C6C7 - time in 'x' hours it should take (estimation)
- `technical` #D4C5F9 - technical issue for developers


## Questions/Suggestions

We hope you find the application useful! We really want to make the process of setting up a repo as fast as possible so hope this helps.

If you need something cleared up, have any requests or want to offer any improvements then please [create an issue](https://github.com/dwyl/labels/issues/new) or better yet a PR!

 **Note** It also would be great to hear, via issue, your thoughts on our existing set of labels plus your own favourites :smiley:
