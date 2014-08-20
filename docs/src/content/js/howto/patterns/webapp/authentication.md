--
title: "Adding authentication to your dashboard"
subtitle: ""
id: "js_pattern_authentication"
index: 0
--


{{ notice ('warning', '', "This applies to the JavaScript version of the documentation. These instructions are relatively generic and apply to virtually all " )}}

RazorFlow Dashboard Framework is designed to allow you to integrate with just about any authentication system. The Dashboard Framework focusses only on displaying the final data and providing you an interface for the events, and is very flexible to fit into any requirement. But to make use of this flexibility you will need to add a little extra code to make it work with your authentication system. Some suggested options are:

1. Use an directory service like LDAP, or Active Directory, which your organization already uses.
2. Use a regular username/password login system which is currently used by your web application.
3. Use an oAuth type solution to let a 3rd-party server handle authentication.
4. Use [HTTP Basic Auth](http://en.wikipedia.org/wiki/Basic_access_authentication)
5. Use a social authentication system like Facebook or Google.

The fundamental concepts behind adding authentication to your dashboard lies in 2 parts:

1. Redirect a user to a login page. On successful login set a cookie to check that a user is valid.
2. Use that cookie to check against each HTTP request that the user has the right access to the data.

### Part 1: Initial dashboard load

When the dashboard loads for the first time, your server-side script should check whether the user has valid authentication, and ask the user to log in in case the user doesn't have access to it. A brief schematic of how this would work is available below:

{{ image ("js/auth_basic_firstload.png") }}

### Part 2: Loading data through AJAX

Even after your dashboard is loaded, if it loads additional data through AJAX, you should verify the login information each time on the server for security purposes. A brief schematic of how this would work is available below.

{{ image ("js/auth_basic_ajax.png") }}

### Guidelines for authentication for your dashboard

* Authentication is generally tricky to implement perfectly and keep it secure as there are a lot of potential possible loopholes which can cause a big data loss. Consider going in for a ready-to-use authentication system.
* Always remember to check the authentication cookie against every request, even if it's an AJAX request to fetch additional data. It is entirely possible a malicious user is creating custom AJAX requests to fool your system.
* If possible, ensure that the user that's requesting the data has access to the data is being requested. For example, Alice has access to "North" region, and Bob has access to "South" region data. If Bob makes a request to `/get_data.php?region=North`, then it would show data for North, which he doesn't have access for.

### Suggested links

* [The definitive guide to form based authentication](http://stackoverflow.com/questions/549/the-definitive-guide-to-form-based-website-authentication)
* [A good list of guidelines for auth](https://www.owasp.org/index.php/Authentication_Cheat_Sheet)

