<div align="center">

# 🏷 Labels

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/dwyl/labels/ci.yml?label=build&style=flat-square&branch=main)
[![codecov.io](https://img.shields.io/codecov/c/github/dwyl/labels/main.svg?style=flat-square)](http://codecov.io/github/dwyl/labels?branch=main)
[![contributions welcome](https://img.shields.io/badge/feedback-welcome-brightgreen.svg?style=flat-square)](https://github.com/dwyl/labels/issues)
[![HitCount](https://hits.dwyl.com/dwyl/labels.svg?style=flat-square)](https://hits.dwyl.com/dwyl/labels)

_Try_ it: [**labels**.fly.dev](https://labels.fly.dev/)

</div>

## What? 💭

A Web App to copy `GitHub` labels from one repo to another.

## Why? 🤷‍♀️

Having a standard list of `labels` across all of your projects 
means you can move between repositories quickly 
and effectively. 
*However*, manually adding labels 
to a new `GitHub` repository can become old, ***fast***. <br />
This app **saves you time** 
by _automating_ the addition of `labels` 
to a `new` project,
copying from a selected repo 
and creating them on the target repo.

Our main criteria is that the tool 
must be faster than manually adding labels. 
We offer a
[hosted version](https://labels.fly.dev)
of the app 
if you don't want to configure/run the app yourself.

At **`dwyl`** we use labels a _lot_ 
on **issues** and **pull requests**
to ***communicate*** about the status of the work
on a project.
We work remotely and the `labels` allow us
to quickly know what is going on.
For example we can quickly see
from the list of issues on a repository
if someone is working on a specific issue (**`in-progress`** label),
if a task is finished but **`awaiting-review`** 
or **`in-review`**.

> See the complete
[list of labels and their description](https://github.com/dwyl/labels#labels)
below.

This process streamlines communication
and allows us to focus on developing features
instead of spending time on "chat"
explaining the status of an issue.
It also allows us to communicate quickly with our clients & stakeholders
as they know when to test and approve/reject a feature with the label **`please-test`**.

## Who? 

Any `person` that uses `GitHub` 
and has multiple repos 
they want to keep `labels` consistent across. 
i.e: people that value their time! ⏰

## How?

A simple and intuitive UI authenticated 
with `GitHub` using
[elixir-auth-github](https://github.com/dwyl/elixir-auth-github/)
and make requests 
to the **`GitHub` API** on your behalf.

After authentication via `GitHub` login 
simply have to submit a form with the following fields.
 + Source repo name and owner.
 + Target repo name and owner.

You can also copy labels again 
to previously synchronized repositories.
If you need to make changes.

### What happens to _existing_ labels in target repo? 🤔

`labels` is _non-destructive_.
If there are existing labels 
with the same name but a different colour,
the colour will change to match the source repo.
Other than this, it will simply add any labels that _don't_ already exist and
won't touch the existing ones.

## Run the App! 🏃‍♀️

To run the `labels` app on your `localhost`,
follow these steps:

### 1. Clone the project ⬇️

```sh
git clone git@github.com:dwyl/labels.git && cd labels
```

### 2. Install dependencies ⏳

```sh
mix setup
```

### 3. Configure Environment Variables 📝

> `labels` uses 
[`elixir-auth-github`](https://github.com/dwyl/elixir-auth-github) 
for authentication,
follow the instructions in:
[create-a-github-app-and-oauth2-credentials](https://github.com/dwyl/elixir-auth-github/#2-create-a-github-app-and-oauth2-credentials-)
to get your `GitHub` Auth keys.
 
 Create an
 [.env](https://github.com/dwyl/learn-environment-variables)
 file root or project with the two variables:

```sh
GITHUB_CLIENT_ID=<your-client-id>
GITHUB_CLIENT_SECRET=<your-client-secret>
```

Once you've added the environment variables to the `.env` file
and saved the file, 
run the command:

```sh
source .env
```

That will make your environment variables
available to the App. 

### 4. Run the App 🚀 

```sh
mix s
```

Now visit: 
[localhost:4000](http://localhost:4000/)
in your web browser.



<br />
<div align="center">

## _Our_ List Of Labels 📜 🏷️

</div>

This repository is our 
"[single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth)" 
of labels used across all `@dwyl` projects, 
see: 
[github.com/dwyl/labels/labels](github.com/dwyl/labels/labels)

An explanation of each can be found below,
starting with the _custom_ dwyl labels,
which we use in conjunction with our
[contributing process/guidelines](https://www.github.com/dwyl/contributing).

Clicking on a label will take you to an issue 
with further discussion on its existence and meaning:

- [`awaiting-review`](https://github.com/dwyl/labels/issues/49) #f39c12 - added to _issue_ once a PR with its resolution has been assigned to a reviewer (replaces `in-progress`)
- [`chore`](https://github.com/dwyl/labels/issues/37) #3A2716 - routine tasks that must be done for every project but require little active brain power
- [`discuss`](https://github.com/dwyl/labels/issues/8) #60EEEE - invites discussion from contributors
- [`documentation`](https://github.com/dwyl/labels/issues/141) `#0075ca` - 
  Improvements or additions to documentation
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
- `research` #82f2d6 - additional research required to make progress on a story/task. Be specific in the issue description/comment.
- [`starter`](https://github.com/dwyl/labels/issues/36) #27AE60 - issues that those with not much coding experience can contribute to
- [`T[x]d`](https://github.com/dwyl/labels/issues/41) #F06292 - estimated time in 'x' days the issue will take to resolve
- [`T[x]h`](https://github.com/dwyl/labels/issues/41) #F7C6C7 - estimated time in 'x' hours the issue will take to resolve
- `technical` #D4C5F9 - technical tasks e.g. deployment
- [`tech-debt`](https://github.com/dwyl/labels/issues/101) #FF3636 - A feature/requirement implemented in a sub-optimal way & must be re-written.
  see: [What is Technical Debt?](https://github.com/dwyl/product-owner-guide#what-is-technical-debt)
- [`user-feedback`](https://github.com/dwyl/labels/issues/61) #E91E63 - requests or features that have been added to the backlog as a direct result of user testing
- [`va-task`](https://github.com/dwyl/labels/issues/50) #128214 -
denotes administrative tasks that can be done by 'Virtual Assistants',
usually for [non-developers](https://www.amazon.co.uk/Virtual-Freedom-Chris-C-Ducker/dp/1939529743)

Github also gives you a pre-populated list of labels with every repo:

- `bug` #EE0701 - report a [bug](https://en.wikipedia.org/wiki/Software_bug), not to be confused with a request for additional changes to the code
- `duplicate` #CCCCCC - duplicate issue (link to duplicate in comments)
- `enhancement` #84B6EB - improving existing code
- `help-wanted` #128A0C - signals author of the issue is looking for help or expertise on a subject
_(NB. if you'd like to see where dwyl is in need of a helping hand, check out https://tudo-app.herokuapp.com/)_
- `invalid` #E6E6E6 - issue is not valid (not used in dwyl)
- `question` #CC317C - for open questions
- `wontfix` #ffffff - when an issue won't be addressed (add a comment to the issue as to *why* this is the case


## Feedback / Questions / Suggestions 🙏

We hope you find the application useful! We really want to make the process of setting up a repo as fast as possible so hope this helps.

If you need something cleared up, have any requests or want to offer any improvements then please [create an issue](https://github.com/dwyl/labels/issues/new).
We love hearing _your_ thoughts. 😊