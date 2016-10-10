# 🏷 Labels
Copies labels from one repo to another


## Why?
Having a standard list of labels across all of your projects means that you can
move between repositories quickly and effectively. *However*, manually adding
labels to a new GitHub repository can become old, ***fast***. This module aims
to **save you time** by automating the addition of labels to a new project by
copying them from a selected repo and then transferring them to a target repo.

Our main criteria is that it ***MUST*** be quicker than manually adding labels.

## What?
A quick and easy way to add an existing list of standardised labels to a GitHub
repo.

## Who?
#### Who should use this?
Any developer who has created multiple repositories and values their time ⏰

## How?
A simple and intuitive UI authenticated with GitHub. It will include the
following fields:

* repo that you want to copy labels from (any public repo)
* list of target repos that you want to add labels to (one that you have access to)
* GitHub username
* GitHub password

## Run

#### Config

You'll need to add the following configuration in order to run and login to the
application locally:

`export GITHUB_AUTH_REDIRECT_URL=/githubauth`

We've included some optional configuration settings that you can set in your
environment variables. These are `SOURCE_REPO` and `SOURCE_OWNER`.
The reason we've added these options is to make it quick and easy to sync labels
from a single source repository to multiple target repositories. Export them just
as you did for the redirect url above:

`export SOURCE_REPO=[your_source_repo_name]`  
`export SOURCE_OWNER=[your_source_repo_owner]`

#### To run:

* `git clone https://github.com/dwyl/labels.git`
* `cd labels`
* `npm start`
* visit http://localhost:8000/
