# RazorDoc

RazorDoc generates documentation for projects that usually involve code. It generates 2 types of documentation:

* Articles
* API Docs

Articles are procedural documents written in Markdown which are converted into HTML. Each article corresponds to a single HTML page that will be generated. API Docs are your standard API Docs.

## Steps involved in acutally building documentation:

#### Conventions:

1. All paths are specified from the directory that is currently executing, not the path to the JSON config file.
2. No leading slashes, no trailing slashes.
3. For absolute path, use "/foo/bar"

#### Step 1:

Write a configuration JSON file called `razordoc.json` and execute `razordoc`.

```
{
	"template": "mydoctemplate", # This is optional and defaults to the default template.
	"outputFileType": "php", # the file suffix of the output files. By default this is HTML.
	"type": "javascript",
	"source": [
		"../src/path/to/*.js",
		"../src/other/*.js"
	],
	"articles": [
		"../docs/path/to" # This should be a directory containing markdown files.
	],
	"examples": [
		"../src/examples/*.js" # This should have example files.
	],
	"output": "../website/public/docs/js"
}
```

#### Step 2:

Add JSDoc-like comments to your code:

```
/**
 * This will be the description of your function
 * 
 * 
 * @param {Type} Parameter description
 * 
 * @rdExample kpiGauge1

 * @rdArticle components/kpi/gauges
 * @rdArticle components/kpi/advanced_gauges
 */
 setGaugeType: function () {

 }
```

#### Step 3:

Write articles in this structure:

```
|- index.md
|- components/
|--- index.md
|--- kpi/
|----- index.md
|----- gauges.md
|----- advanced_gauges.md
|- _partials/
|--- createdb.md
```

#### Step 4:

Add examples in the "example" folder:

```
|- examples/
|--- kpiGauge1.js
|--- kpiGauge2.js
|--- kpiGauge3.js
```

#### Step 5:

Add some partials, for example, let's consider `createdb.md`

```
Create a new file called `{{ filename }}.js` and build a basic skeleton:

    var db = new rf.Dashboard();
    db.setTitle ("{{ dbTitle }}");

    // Our code goes here

    db.render();

```

#### Step 5:

Write the actual document:

For example, let's consider `components/kpi/advanced_gauges.md`

```
{
	"title":"Advanced Gauges"
}
--
In this article, we will learn how to make advanced gauges. Please read {{doc:components/kpi/gauges}} before starting here.

{{template:createdb({'fileName':'advancedGauge', 'dbTitle': "Advanced Gaugwe"})}}

[[... snip...]]

To summarize, the finished dashboard looks like:

{{rdExample:kpiGauge1.js}}
```

#### Step 6:

Run RazorDoc and pass the config file to it.



