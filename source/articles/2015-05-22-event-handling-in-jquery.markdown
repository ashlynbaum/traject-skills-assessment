---
title: Event handling in jQuery
date: 2015-05-22 12:41 NZST
tags: JavaScript
---


`.load()` is a method in the jQuery library that READMOREuses AJAX to render data. `.load()` makes a call to the server and returns HTML. I use this method to call the next page of article listings on my blog listed at, www.ashlynbaum.com, and load the results without refreshing the page.

##What I learned in the process
Initially I started by targeting the link that would refresh the page `a.next-page`. Then call the `.on()` method to load the next page of information when the link is clicked.

First Attempt

``` javascript
$(a.next-page).on(click, function(e){
    e.preventDefault();
    var link = $('a.next-page').attr('href');
    $("#blog").load(link + " #blog");
}); 
```

This only half worked. When the 'next page' link was clicked, the content loaded as expected. The new loaded content contains new 'previous page' and 'next page' links. So when the new 'next page' link was clicked again, it would not load the content through AJAX. 

Looking at the `.on()` method documentation, the format is `.on( events [, selector ] [, data ] )`. So you actually want to call this method on a top level element like 'document' or 'body'. `$(document).on(click)` watches the entire document for all clicks vs. watching the anchor element. 

The most important option to consider when using the `.on()` method for this purpose is the `[selector]` option. "A selector string to filter the descendants of the selected elements that trigger the event" (2). So by adding the anchor tag as string for the `[selector]`, the method is now considered *delegated*  instead of *direct*. 

After making the method delegated

``` javascript
$(document).on('click', 'a.next-page', function(e){
    e.preventDefault();
    var link = $('a.next-page').attr('href');
    $("#blog").load(link + " #blog");
});
```

Moral of the story, When using the `.on()` method, it is necessary to consider the binding of the event handler.

***
####References:

1. http://api.jquery.com/category/ajax/
1. http://api.jquery.com/on/
