
[*] set up adminAuth similar to userAuth but only passed admin users

[*] movie patch route (temporary), set all the inventory.rented values from 0 to an empty array

[*] non-admin users can add rented movies (modifies both User and Movie documents)

8/13

[] register page pug

[] register.js fe xhr post 

[] link to be and test

[] user profile: shows the movies a user is currently renting
    - is the user is viewing their own profile they should be able to return movies

[] admins movie inventory increase/decrease available on frontpage