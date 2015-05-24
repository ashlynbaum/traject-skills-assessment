---
title: To merge or to rebase
date: 2015-05-22 15:58 NZST
tags: Git
---

To merge or to rebase: a question that many developers struggle with. When using git, it is common to have aREADMORE remote repository and a local working version of that same repository. Merging and rebasing are different ways to sync repositories, or branches within a repository. Which leads to the question: when should I merge and when should I rebase. 

##Syncing repositories
```
$ git pull <remote name> <branch name>
```

`git pull` is a command comprised of `fetch` and `merge FETCH_HEAD`. 

```
$ git fetch <remote name>
$ git merge <remote name>/<remote branch name>
```

`fetch` downloads changes from the remote repository without changing anything on your local repository. 

So the next question is when syncing a remote repository (typically origin) to your local repository, do you want to then merge or rebase. 

###Merging
`merge` will create a commit that will inherit the changes of the remote to the local repository. Merging puts all of the changes at the top of the history stack. Merging can be useful for merging branches together. But in the case of syncing you local repository, the extra commit message is not necessary, and clutters the git history.

###Rebasing
`rebase` will take the changes from the remote, and then integrate the changes into your local history, without creating a merge commit. Rebasing is a good choice if you local directory is private.

As a general rule of thumb: never `rebase` on a branch or directory that someone else is working off of, because rebasing changes the git history and will create conflicts with future merges. In most cases, your local branch is a private branch; and changing git history a safe thing to do. Thus it makes more sense to rebase instead of pulling. 

Say for example that the history of your remote repository has been changed. This could happen if someone rebased on that repository, changed commit ID's, or squashed commits. In this case the commit history on the remote repository does not match the local repository. If you were to attempt to merge in this case, you would have a conflict due to commit ID's not matching.  But if you were to rebase, your local history would rewritten and the only conflicts presented will be actual conflicts in the code-base.

How to rebase instead of pulling:

```
$ git fetch
$ git rebase <remote name>/<branch name>

or

$ git pull --rebase <remote name> <branch name>
```

##Branches
Merging is still preferable when you are working on a directory that someone has branched off of, or if you are merging branches back towards source. Having the changes in a single commit allows for simple resetting or reverting. If your merge were to introduce a bug, having all of the changes at the top of the working tree allow you to `reset` or `revert` much easier than if all of the commits from the branch were individually added to the working history.

## Conclusion
Typically I `rebase` when pulling from the remote repository, and when keeping a local private branch up to date with the commit history of the upstream target branch. 
My typical work flow looks like this:

```
$ git fetch <remote name>
$ git status
$ git rebase <remote name>/<branch name>
```

Using the commands separately allows me to check the status of the changes and make an informed decision on if I want to merge or rebase. I typically `merge` between branches. There are times when I will rebase a branch: when working on a feature branch and commits are added to the source branch, I will rebase the source onto the feature branch to account for those change. This will make merging back into the source branch easier and have less conflicts.

Now go code, and rebase often!


***
####References:
1. http://git-scm.com/docs/git-pull
2. http://git-scm.com/docs/git-merge
3. https://git-scm.com/book/en/v2/Git-Branching-Rebasing