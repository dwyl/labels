# 🏷 Labels

## What?

Gui application to copy labels from one repo to another.

## Why?

Having a standard list of labels across all of your projects means that you can
move between repositories quickly and effectively. *However*, manually adding
labels to a new GitHub repository can become old, ***fast***. This module aims
to **save you time** by automating the addition of labels to a new project by
copying them from a selected repo and then transferring them to a target repo.

Our main criteria is that it ***MUST*** be quicker than manually adding labels and will offer a hosted version of the app if you don't want to configure/run the app yourself.

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

## Questions/Suggestions

We hope you find the application useful! We really want to make the process of setting up a repo as fast as possible so hope this helps.

If you need something cleared up, have any requests or want to offer any improvements then please [create an issue](https://github.com/dwyl/labels/issues/new) or better yet a PR!

 **Note** It also would be great to hear, via issue, your thoughts on our existing set of labels plus your own favourites :smiley:
