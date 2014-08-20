--
title: "Types of Dashboards: Standalone and Embedded"
id: "standalone_vs_embedded"
index: 3
--


Currently, a dashboard can be displayed in 2 modes:

* Standalone
* Embedded

## What is a standalone dashboard?

This is when the dashboard is the only item on the HTML page. Creating a standalone dashboard tells the framework that it can use up all the space, and make some optimizations to the CSS. You should consider creating a standalone dashboard if:

* Your dashboard is independent and doesn't need any external UI to function.
* You are using your dashboard as a "wallboard" and is primarily used for monitoring 

You will not need to modify your HTML in any way to enable a standalone dashboard.

### Creating a standalone dashboard:

After including `jquery.min.js`, `razorflow.min.js` and `razorflow.min.css` in your HTML page:

~~~
rf.StandaloneDashboard (function (db) {
	// Add components to db


	// No need to return anything or call any functions...
});
~~~

## What is an embedded dashboard?

You can embed the dashboard into an existing application. In this situation the dashboard is directly embedded and integrated as part of your page, not as an IFrame, allowing you to control and integrate your dashboard and control it using external controls.

To learn more on how to create an embedded dashboard, see {{ linkArticle ('js_create_embedded' )}}
