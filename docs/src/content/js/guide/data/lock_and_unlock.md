<meta>
{
	"title": "Lock and Unlock components",
	"subtitle": "",
	"index": 1,
	"id": "lock_and_unlock"
}
</meta>

Any component object (see {{ ref("component_object") }}) has two special functions which change the behaviour of the component, these functions are the **lock** and **unlock** functions only.

### What does lock/unlock do?

When a component is locked, by calling the {{ linkApi ('js', 'Component', 'lock') }} function, you can add it to the dashboard, and instead of drawing the actual component, the dashboard displays a "Loading" indicator over the component.

When you call "unlock" function, it immediately draws the full component and restores it like the original state.

### How is this useful?

You can use {{ linkApi ('js', 'Component', 'lock') }} and {{ linkApi ('js', 'Component', 'unlock') }} to add components first to the dashboard, and enable them later on. This allows you to build dashboards that fetch data from multiple sources and load fast.

But for a simple demonstration, here's a an example of a chart which displays the dashboard immediately, but puts the chart in "loading" state for 2 seconds until the timeout is called:

{{ embedExample ('js', 'locking0') }}

We will be covering more about how locking can help you load data in a later article.
