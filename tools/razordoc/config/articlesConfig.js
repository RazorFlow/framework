module.exports = {
    toc: 'build/toc.json',
    articles: {
        root: '../docs/src/content/js/guide/components/chart',
        imagesLocalPath: 'src/images',
        imagesRelativePath: "js/_images/",
        imagesPhysicalPath: "../newsite/src/docs/dashboard/js/_images/"
    },
    constantsPath: '../jsrf/tools/config/props.json',
    partialsPath: '../docs/src/partials',
    examples: {
        src: "fixture/examples",
        srcSuffix: ".js",
        imagePrefix: "http://examples.razorflow.com/static/exampleImages/js/examples/",
        imageSuffix: ".png",
        thumbPrefix: "http://examples.razorflow.com/static/exampleImages/js/examples/",
        thumbSuffix: ".png",
        livePrefix: "http://examples.razorflow.com/dashboard/js/examples/",
        liveSuffix: ""
    },
    api: {
        linkPrefix: '/docs/dashboard/js/api/',
        meta: 'build/apiMeta.json'
    },
    linkPrefix: "/docs/dashboard/js/",
    out: "build/docs/dashboard/js/",
    suffix: "html",
    articleTemplates: "fixture/article_templates/",
    topBarTitle: 'JavaScript Documentation',

};