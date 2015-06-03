---
title: Active Record with Rails
date: 2015-05-30 11:30 NZST
tags: Ruby on Rails
---

Active Record is a particular approach to accessing data in a databaseREADMORE. Active Record represents the `model` in the Model View Controller (MVC) style of designing RESTfull applications. Active record describes a relationship between objects and the database and is used in Ruby on Rails. Active record is not just an occurrence used in Rails, it is related to all software development and was named by Martin Fowler in 2003 in his book “Patterns of Enterprise Application Architecture”(3).


###ActiveRecord in Ruby on Rails
ActiveRecord is the library that performs the Object-Relation Mapping (ORM) in rails. ORM is a technique used in programming for converting data between object oriented programming languages and incompatible type systems. Each object instance in ActiveRecord is usually tied to a single row in the database. 

When using Ruby on Rails, ActiveRecord is responsible for handling all database interaction from the application; this is quite a useful thing when developing with Rails. As opposed to querying the database, you can instead  just apply methods to an object. ActiveRecord will read the method called on the object and compose a SQL query statement and return the output as an object.


###CRUD
ActiveRecord handles the CRUD of the database. CRUD is an acronym that stands for Create, Read, Update, Delete. ([Reference 1](http://guides.rubyonrails.org/active_record_basics.html)) and ([Reference 2](http://web.stanford.edu/~ouster/cgi-bin/cs142-fall10/lecture.php?topic=activeRecord)) both are great examples of using methods to implement CRUD on objects.


###Relationship Models
ActiveRecord creates relations between models. Common relations that ActiveRecord implement include:
* belongs_to
* has_many 
* has_one
* has_and_belongs_to_many
* many_to_many


###Naming
ActiveRecord takes very little configuration when using Rails. Typically the default configuration can be used for many applications. Naming schemes between the database and the models are different. When naming database tables: names are plural with underscores separating words `(e.g., line_items)`. When naming model classes: names are singular with the first letter of each word capitalized `(e.g., LineItem)`.

###Migrating Databases
Instead of creating database schema in SQL, ActiveRecord allows you to create migrations to ‘migrate’ your database. Rails keeps track of which migrations have been committed to the database and provides rollback features. 

>"You can think of each migration as being a new 'version' of the database. A schema starts off with nothing in it, and each migration modifies it to add or remove tables, columns, or entries. ActiveRecord knows how to update your schema along this timeline, bringing it from whatever point it is in the history to the latest version. ActiveRecord will also update your db/schema.rb file to match the up-to-date structure of your database" (4).

```
# To actually create the table, you'd run 
$rake db:migrate 
# and to roll it back, 
$rake db:rollback
```

###Conclusion
Alternatives to ActiveRecord in Ruby include DataMapper and Sequel and can be easily implemented into Rails; yet, ActiveRecord is the default in Rails and  the most popular choice. ActiveRecord implements object-relation mapping, essentially mapping ruby objects to their stored equivelemnts in a relational database, this then allows you to access the database without having to write SQL statements directly.


***

####References
1. http://guides.rubyonrails.org/active_record_basics.html
1. http://web.stanford.edu/~ouster/cgi-bin/cs142-fall10/lecture.php?topic=activeRecord
1. http://en.wikipedia.org/wiki/Active_record_pattern#Ruby
1. http://edgeguides.rubyonrails.org/active_record_migrations.html