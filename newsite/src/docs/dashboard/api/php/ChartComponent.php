<?php 
function custom_title () {
    return "ChartComponent";
}

function rf_topbar () {
    return array (
        'url' => '/docs/dashboard/',
        'title' => 'RazorFlow Documentation'
    );
}

function extra_scripts () {
  return array(
    'vendor/kendo.custom.min.js',
    'vendor/prism.min.js',
    'js/rfDocs.js'
  );
}

function extra_styles () {
  return array(
    'vendor/kendo.common.min.css',
    'vendor/prism.css',
    'vendor/kendo.bootstrap.min.css'
  );
}

require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <ul id="docTree">
                    <li data-id="doc_root"><a href="/docs/dashboard/index.php">Documentation</a><ul><li data-id="js_doc_root"><a href="/docs/dashboard/js/index.php">Dashboards with JavaScript</a><ul><li data-id="js_guide_root"><a href="/docs/dashboard/js/guide/index.php">Guide</a><ul><li data-id="components_index"><a href="/docs/dashboard/js/guide/components/index.php">Component Guide</a><ul><li data-id="chart_guide"><a href="/docs/dashboard/js/guide/components/chart/index.php">Chart Component</a><ul><li data-id="chart_basic"><a href="/docs/dashboard/js/guide/components/chart/chart_basic.php">Basic ChartComponent Functionality</a></li><li data-id="series_config"><a href="/docs/dashboard/js/guide/components/chart/series_config.php">Chart Series Configuration</a></li><li data-id="chart_yaxis"><a href="/docs/dashboard/js/guide/components/chart/chart_yaxis.php">Configuring the Y-Axis of the chart</a></li><li data-id="chart_update"><a href="/docs/dashboard/js/guide/components/chart/chart_update.php">Updating chart data</a></li><li data-id="chart_event_click"><a href="/docs/dashboard/js/guide/components/chart/chart_event_click.php">Chart click events</a></li><li data-id="chart_series_stacked"><a href="/docs/dashboard/js/guide/components/chart/chart_series_stacked.php">Stacked Charts</a></li><li data-id="chart_bar"><a href="/docs/dashboard/js/guide/components/chart/chart_bar.php">Bar Charts</a></li><li data-id="dual_axis"><a href="/docs/dashboard/js/guide/components/chart/dual_axis.php">Dual Y Axes Charts</a></li><li data-id="chart_drilldown"><a href="/docs/dashboard/js/guide/components/chart/chart_drilldown.php">Drill-down data using breadcrumbs</a></li></ul></li><li data-id="common_guide"><a href="/docs/dashboard/js/guide/components/common/index.php">Common component concepts</a><ul><li data-id="number_formatting"><a href="/docs/dashboard/js/guide/components/common/number_formatting.php">Number Formatting</a></li><li data-id="js_component_kpis"><a href="/docs/dashboard/js/guide/components/common/component_kpis.php">Component KPIs</a></li><li data-id="component_layout"><a href="/docs/dashboard/js/guide/components/common/component_layout.php">Component Layout and Dimensions</a></li></ul></li><li data-id="filter_guide"><a href="/docs/dashboard/js/guide/components/filter/index.php">Filter Component</a><ul><li data-id="filter_configure"><a href="/docs/dashboard/js/guide/components/filter/filter_configure.php">Getting Started with the filter component</a></li><li data-id="filter_getvalues"><a href="/docs/dashboard/js/guide/components/filter/filter_getvalues.php">Get the values entered by users</a></li><li data-id="filter_submit_event"><a href="/docs/dashboard/js/guide/components/filter/filter_submit_event.php">Filter submit events</a></li></ul></li><li data-id="gauge_guide"><a href="/docs/dashboard/js/guide/components/gauge/index.php">Gauge Component</a><ul><li data-id="gauge_basic"><a href="/docs/dashboard/js/guide/components/gauge/gauge_basic.php">Getting Started with Gauge Component</a></li><li data-id="gauge_update"><a href="/docs/dashboard/js/guide/components/gauge/gauge_update.php">Updating the Gauge Component</a></li></ul></li><li data-id="kpi_guide"><a href="/docs/dashboard/js/guide/components/kpi/index.php">KPI Component</a><ul><li data-id="kpi_basic"><a href="/docs/dashboard/js/guide/components/kpi/kpi_basic.php">Getting Started with KPI Component</a></li><li data-id="value_format"><a href="/docs/dashboard/js/guide/components/kpi/value_format.php">Customizing KPI Display value</a></li><li data-id="kpi_whatis"><a href="/docs/dashboard/js/guide/components/kpi/kpi_whatis.php">What is a KPI</a></li></ul></li><li data-id="kpi_group_guide"><a href="/docs/dashboard/js/guide/components/kpigroup/index.php">KPI Group Component</a><ul><li data-id="kpi_group_basic"><a href="/docs/dashboard/js/guide/components/kpigroup/kpi_group_basic.php">Getting Started with KPI Group Component</a></li></ul></li><li data-id="kpi_table_guide"><a href="/docs/dashboard/js/guide/components/kpitable/index.php">KPI Table Component</a><ul><li data-id="kpi_table_basic"><a href="/docs/dashboard/js/guide/components/kpitable/kpi_table_basic.php">Getting Started with KPI Table Component</a></li></ul></li><li data-id="table_guide"><a href="/docs/dashboard/js/guide/components/table/index.php">Table Component</a><ul><li data-id="table_add_data"><a href="/docs/dashboard/js/guide/components/table/table_add_data.php">Adding data to the table</a></li><li data-id="table_format_values"><a href="/docs/dashboard/js/guide/components/table/table_format_values.php">Column formatting</a></li></ul></li></ul></li><li data-id="dashboard_guide"><a href="/docs/dashboard/js/guide/dashboard/index.php">Dashboard Fundamentals</a><ul><li data-id="create_standalone"><a href="/docs/dashboard/js/guide/dashboard/create_standalone.php">Creating a standalone dashboard</a></li><li data-id="add_components"><a href="/docs/dashboard/js/guide/dashboard/add_components.php">Add components to your dashboard</a></li><li data-id="arrange_components"><a href="/docs/dashboard/js/guide/dashboard/arrange_components.php">Component dimensions and arrangement</a></li><li data-id="standalone_vs_embedded"><a href="/docs/dashboard/js/guide/dashboard/standalone_vs_embedded.php">Types of Dashboards: Standalone and Embedded</a></li><li data-id="webframework_standalone"><a href="/docs/dashboard/js/guide/dashboard/webframework_standalone.php">Building a standalone dashboard with your web framework</a></li><li data-id="js_create_embedded"><a href="/docs/dashboard/js/guide/dashboard/embedded.php">Embedding a dashboard</a></li><li data-id="create_tabbed"><a href="/docs/dashboard/js/guide/dashboard/tabbed_dashboard.php">Create a Tabbed Dashboard</a></li><li data-id="embed_tabbed"><a href="/docs/dashboard/js/guide/dashboard/tabbed_embedded.php">Embed a Tabbed Dashboard into an existing page</a></li><li data-id="dashboard_deploy"><a href="/docs/dashboard/js/guide/dashboard/deploy.php">Deploying your Dashboard</a></li></ul></li><li data-id="data_guide"><a href="/docs/dashboard/js/guide/data/index.php">Working with Data</a><ul><li data-id="lock_and_unlock"><a href="/docs/dashboard/js/guide/data/lock_and_unlock.php">Lock and Unlock components</a></li><li data-id="dashboard_first"><a href="/docs/dashboard/js/guide/data/dashboard_first.php">Configure dashboard first and fetch data next</a></li><li data-id="prefetch_data"><a href="/docs/dashboard/js/guide/data/prefetch_data.php">Dashboards with data fetched first</a></li></ul></li></ul></li><li data-id="howto_index"><a href="/docs/dashboard/js/howto/index.php">RazorFlow How-To Articles</a><ul><li data-id="patterns_index"><a href="/docs/dashboard/js/howto/patterns/index.php">Dashboard Patterns</a><ul><li data-id="js_patterns_webapp_index"><a href="/docs/dashboard/js/howto/patterns/webapp/index.php">Web Application Patterns</a><ul><li data-id="js_pattern_authentication"><a href="/docs/dashboard/js/howto/patterns/webapp/authentication.php">Adding authentication to your dashboard</a></li></ul></li></ul></li><li data-id="server_index"><a href="/docs/dashboard/js/howto/server/index.php">Working with server-side technologies</a><ul><li data-id="php_index"><a href="/docs/dashboard/js/howto/server/php/index.php">Building dashboards with PHP</a><ul><li data-id="php_simple"><a href="/docs/dashboard/js/howto/server/php/php_simple.php">A basic interactive PHP Dashboard example</a></li></ul></li></ul></li><li data-id="troubleshooting_index"><a href="/docs/dashboard/js/howto/troubleshooting/index.php">Troubleshooting</a><ul><li data-id="js_debug"><a href="/docs/dashboard/js/howto/troubleshooting/js_debug.php">JavaScript Debugging Notes</a></li></ul></li></ul></li></ul></li><li data-id="php_doc_root"><a href="/docs/dashboard/php/index.php">Dashboards with PHP</a><ul><li data-id="php_guide_index"><a href="/docs/dashboard/php/guide/index.php">Guide</a><ul><li data-id="php_component_index"><a href="/docs/dashboard/php/guide/components/index.php">Component Guide</a><ul><li data-id="php_chart_guide"><a href="/docs/dashboard/php/guide/components/chart/index.php">Chart Component</a><ul><li data-id="php_chart_basic"><a href="/docs/dashboard/php/guide/components/chart/chart_basic.php">Basic ChartComponent Functionality</a></li><li data-id="php_series_config"><a href="/docs/dashboard/php/guide/components/chart/series_config.php">Chart Series Configuration</a></li><li data-id="php_chart_yaxis"><a href="/docs/dashboard/php/guide/components/chart/chart_yaxis.php">Configuring the Y-Axis of the chart</a></li><li data-id="php_chart_update"><a href="/docs/dashboard/php/guide/components/chart/chart_update.php">Updating chart data</a></li><li data-id="php_chart_event_click"><a href="/docs/dashboard/php/guide/components/chart/chart_event_click.php">Chart click events</a></li><li data-id="php_chart_series_stacked"><a href="/docs/dashboard/php/guide/components/chart/chart_series_stacked.php">Stacked Charts</a></li><li data-id="php_chart_bar"><a href="/docs/dashboard/php/guide/components/chart/chart_bar.php">Bar Charts</a></li><li data-id="php_dual_axis"><a href="/docs/dashboard/php/guide/components/chart/dual_axis.php">Dual Y Axes Charts</a></li><li data-id="php_chart_drill_into_modal"><a href="/docs/dashboard/php/guide/components/chart/chart_drill_into_modal.php">Chart Drill into Modal</a></li></ul></li><li data-id="php_common_guide"><a href="/docs/dashboard/php/guide/components/common/index.php">Common component concepts</a><ul><li data-id="php_number_formatting"><a href="/docs/dashboard/php/guide/components/common/number_formatting.php">Number Formatting</a></li><li data-id="php_component_kpis"><a href="/docs/dashboard/php/guide/components/common/php_component_kpis.php">Component KPIs</a></li></ul></li><li data-id="php_filter_guide"><a href="/docs/dashboard/php/guide/components/filter/index.php">Filter Component</a><ul><li data-id="php_filter_configure"><a href="/docs/dashboard/php/guide/components/filter/filter_configure.php">Getting Started with the filter component</a></li><li data-id="php_filter_submit_event"><a href="/docs/dashboard/php/guide/components/filter/filter_submit_event.php">Filter submit events</a></li><li data-id="php_filter_getvalues"><a href="/docs/dashboard/php/guide/components/filter/filter_getvalues.php">Get the values entered by users</a></li></ul></li><li data-id="php_gauge_guide"><a href="/docs/dashboard/php/guide/components/gauge/index.php">Gauge Component</a><ul><li data-id="php_gauge_basic"><a href="/docs/dashboard/php/guide/components/gauge/gauge_basic.php">Getting Started with Gauge Component</a></li><li data-id="php_gauge_update"><a href="/docs/dashboard/php/guide/components/gauge/gauge_update.php">Updating the Gauge Component</a></li></ul></li><li data-id="php_kpi_guide"><a href="/docs/dashboard/php/guide/components/kpi/index.php">KPI Component</a><ul><li data-id="php_kpi_basic"><a href="/docs/dashboard/php/guide/components/kpi/kpi_basic.php">Getting Started with KPI Component</a></li><li data-id="php_value_format"><a href="/docs/dashboard/php/guide/components/kpi/value_format.php">Customizing KPI Display value</a></li><li data-id="php_kpi_whatis"><a href="/docs/dashboard/php/guide/components/kpi/kpi_whatis.php">What is a KPI</a></li></ul></li><li data-id="php_kpi_group_guide"><a href="/docs/dashboard/php/guide/components/kpigroup/index.php">KPI Group Component</a><ul><li data-id="php_kpi_group_basic"><a href="/docs/dashboard/php/guide/components/kpigroup/kpi_group_basic.php">Getting Started with KPI Group Component</a></li></ul></li><li data-id="php_kpi_table_guide"><a href="/docs/dashboard/php/guide/components/kpitable/index.php">KPI Table Component</a><ul><li data-id="php_kpi_table_basic"><a href="/docs/dashboard/php/guide/components/kpitable/kpi_table_basic.php">Getting Started with KPI Table Component</a></li></ul></li><li data-id="php_table_guide"><a href="/docs/dashboard/php/guide/components/table/index.php">Table Component</a><ul><li data-id="php_table_add_data"><a href="/docs/dashboard/php/guide/components/table/table_add_data.php">Adding data to the table</a></li><li data-id="php_table_format_values"><a href="/docs/dashboard/php/guide/components/table/table_format_values.php">Column formatting</a></li></ul></li></ul></li><li data-id="php_dashboard_guide"><a href="/docs/dashboard/php/guide/dashboard/index.php">Dashboard Fundamentals</a><ul><li data-id="php_installation"><a href="/docs/dashboard/php/guide/dashboard/installation.php">Install RazorFlow PHP Dashboard Framework</a></li><li data-id="php_create_standalone"><a href="/docs/dashboard/php/guide/dashboard/create_standalone.php">Create a new dashboard</a></li><li data-id="php_create_embed"><a href="/docs/dashboard/php/guide/dashboard/embed.php">Embed a dashboard into an existing page</a></li><li data-id="php_add_components"><a href="/docs/dashboard/php/guide/dashboard/add_components.php">Add components to your dashboard</a></li><li data-id="php_create_tabbed"><a href="/docs/dashboard/php/guide/dashboard/tabbed_dashboard.php">Create a Tabbed Dashboard</a></li><li data-id="php_embed_tabbed"><a href="/docs/dashboard/php/guide/dashboard/tabbed_embedded.php">Embed a Tabbed Dashboard into an existing page</a></li><li data-id="php_arrange_components"><a href="/docs/dashboard/php/guide/dashboard/arrange_components.php">Component dimensions and arrangement</a></li></ul></li></ul></li><li data-id="howto_index"><a href="/docs/dashboard/php/howto/index.php">RazorFlow How-To Articles</a><ul><li data-id="php_howto_databases_index"><a href="/docs/dashboard/php/howto/databases/index.php">Working with Databases</a><ul><li data-id="php_sql_simple"><a href="/docs/dashboard/php/howto/databases/php_sql_simple.php">A simple SQL Dashboard with PHP</a></li><li data-id="php_sql_breadcrumbs"><a href="/docs/dashboard/php/howto/databases/php_sql_breadcrumb.php">A DrillDown SQL Dashboard with PHP</a></li></ul></li><li data-id="php_integration_index"><a href="/docs/dashboard/php/howto/integration/index.php">Integrating with other applications</a><ul><li data-id="php_cakephp"><a href="/docs/dashboard/php/howto/integration/cakephp.php">Embedding into CakePHP MVC App</a></li></ul></li></ul></li></ul></li></ul></li>
                    <li data-lang="" data-class="_undefined">API Documentation<ul><li data-lang="js" data-class="js_undefined">JS Documentation<ul><li data-lang="js" data-class="js_ChartComponent"><a href="/docs/dashboard/api/js/ChartComponent.php">ChartComponent</a></li><li data-lang="js" data-class="js_Component"><a href="/docs/dashboard/api/js/Component.php">Component</a></li><li data-lang="js" data-class="js_FilterComponent"><a href="/docs/dashboard/api/js/FilterComponent.php">FilterComponent</a></li><li data-lang="js" data-class="js_GaugeComponent"><a href="/docs/dashboard/api/js/GaugeComponent.php">GaugeComponent</a></li><li data-lang="js" data-class="js_KPIComponent"><a href="/docs/dashboard/api/js/KPIComponent.php">KPIComponent</a></li><li data-lang="js" data-class="js_KPIGroupComponent"><a href="/docs/dashboard/api/js/KPIGroupComponent.php">KPIGroupComponent</a></li><li data-lang="js" data-class="js_KPITableComponent"><a href="/docs/dashboard/api/js/KPITableComponent.php">KPITableComponent</a></li><li data-lang="js" data-class="js_MultiKPIComponent"><a href="/docs/dashboard/api/js/MultiKPIComponent.php">MultiKPIComponent</a></li><li data-lang="js" data-class="js_TableComponent"><a href="/docs/dashboard/api/js/TableComponent.php">TableComponent</a></li></ul></li><li data-lang="php" data-class="php_undefined">PHP Documentation<ul><li data-lang="php" data-class="php_ChartComponent"><a href="/docs/dashboard/api/php/ChartComponent.php">ChartComponent</a></li><li data-lang="php" data-class="php_Component"><a href="/docs/dashboard/api/php/Component.php">Component</a></li><li data-lang="php" data-class="php_FilterComponent"><a href="/docs/dashboard/api/php/FilterComponent.php">FilterComponent</a></li><li data-lang="php" data-class="php_GaugeComponent"><a href="/docs/dashboard/api/php/GaugeComponent.php">GaugeComponent</a></li><li data-lang="php" data-class="php_KPIComponent"><a href="/docs/dashboard/api/php/KPIComponent.php">KPIComponent</a></li><li data-lang="php" data-class="php_KPIGroupComponent"><a href="/docs/dashboard/api/php/KPIGroupComponent.php">KPIGroupComponent</a></li><li data-lang="php" data-class="php_KPITableComponent"><a href="/docs/dashboard/api/php/KPITableComponent.php">KPITableComponent</a></li><li data-lang="php" data-class="php_MultiKPIComponent"><a href="/docs/dashboard/api/php/MultiKPIComponent.php">MultiKPIComponent</a></li><li data-lang="php" data-class="php_TableComponent"><a href="/docs/dashboard/api/php/TableComponent.php">TableComponent</a></li><li data-lang="php" data-class="php_ArrayUtils"><a href="/docs/dashboard/api/php/ArrayUtils.php">ArrayUtils</a></li></ul></li></ul></li>
                </ul>
            </div>
            <div class="col-md-9">
                
                    <h1>Class ChartComponent</h1>

<h4>new ChartComponent()</h4>


    <p>inherits from 
        <a href=Component.php>Component</a>
    </p>


<table class="table table-condensed rfParamsTable">
    <tbody>
        
    </tbody>
</table>


<h2>Methods</h2>
 

        <div id="addSeries" class='rfApiMethod'>
    
    <h3><a href="#addSeries" class="rfDocPermalink pull-right">#</a>addSeries</h3>
    <p>
        <code>addSeries($id, $name, $seriesData, $opts)</code>
    </p>
    <p>Adds a series to the chart. The number of data points provided using the seriesData array should be the same as the other series and the number of labels</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>$id</code></td>
                <td>
                    String
                </td>
                <td>
                    Unique id of the series. This will be used for updating the series data
                    
                </td>
            </tr>
        
            <tr>
                <td><code>$name</code></td>
                <td>
                    String
                </td>
                <td>
                    The name of this series
                    
                </td>
            </tr>
        
            <tr>
                <td><code>$seriesData</code></td>
                <td>
                    Array
                </td>
                <td>
                    The series data
                    
                </td>
            </tr>
        
            <tr>
                <td><code>$opts</code></td>
                <td>
                    Array
                </td>
                <td>
                    A bunch of options passed to as an associative array
                    
                </td>
            </tr>
        
    </tbody>
</table>
    
    
        <h4>Example</h4>
        <pre><code>$chart1 = new ChartComponent(&#39;my_chart1&#39;);
$chart1-&gt;addSeries(&#39;sales&#39;, &#39;Sales&#39;, array(826.25, 382.14, 261.36, 241.56, 93.53, 79.20, 60.39, 57.71, 40.59, 40.59));</code></pre>
    
</div>

    


    
        <div id="setPieValues" class='rfApiMethod'>
    
    <h3><a href="#setPieValues" class="rfDocPermalink pull-right">#</a>setPieValues</h3>
    <p>
        <code>setPieValues($seriesData, $opts)</code>
    </p>
    <p>Set an array of data points which will be used for the pie chart</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>$seriesData</code></td>
                <td>
                    Array
                </td>
                <td>
                    The series data array
                    
                </td>
            </tr>
        
            <tr>
                <td><code>$opts</code></td>
                <td>
                    Array
                </td>
                <td>
                    The series options as an associative array
                    
                </td>
            </tr>
        
    </tbody>
</table>
    
    
</div>

    


    
        <div id="updateSeries" class='rfApiMethod'>
    
    <h3><a href="#updateSeries" class="rfDocPermalink pull-right">#</a>updateSeries</h3>
    <p>
        <code>updateSeries($id, $newData)</code>
    </p>
    <p>Updates a series</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>$id</code></td>
                <td>
                    String
                </td>
                <td>
                    The id of the series
                    
                </td>
            </tr>
        
            <tr>
                <td><code>$newData</code></td>
                <td>
                    Array
                </td>
                <td>
                    The update data array
                    
                </td>
            </tr>
        
    </tbody>
</table>
    
    
</div>

    


    
        <div id="setLables" class='rfApiMethod'>
    
    <h3><a href="#setLables" class="rfDocPermalink pull-right">#</a>setLables</h3>
    <p>
        <code>setLables($labelArray)</code>
    </p>
    <p>Set the labels of the chart, which are the names on the X-Axis</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>$labelArray</code></td>
                <td>
                    Array
                </td>
                <td>
                    An array of labels as strings
                    
                </td>
            </tr>
        
    </tbody>
</table>
    
    
</div>

    


    
        <div id="setYAxis" class='rfApiMethod'>
    
    <h3><a href="#setYAxis" class="rfDocPermalink pull-right">#</a>setYAxis</h3>
    <p>
        <code>setYAxis($name, $options)</code>
    </p>
    <p>Configure the Y-Axis of the chart</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>$name</code></td>
                <td>
                    String
                </td>
                <td>
                    The name of the y axis
                    
                </td>
            </tr>
        
            <tr>
                <td><code>$options</code></td>
                <td>
                    Array
                </td>
                <td>
                    Options array. See the guide for available options
                    
                </td>
            </tr>
        
    </tbody>
</table>
    
    
</div>

    


    
        <div id="addYAxis" class='rfApiMethod'>
    
    <h3><a href="#addYAxis" class="rfDocPermalink pull-right">#</a>addYAxis</h3>
    <p>
        <code>addYAxis($id, $name, $options)</code>
    </p>
    <p>Configure the Y-Axis of the chart</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>$id</code></td>
                <td>
                    String
                </td>
                <td>
                    The unique id of this axis
                    
                </td>
            </tr>
        
            <tr>
                <td><code>$name</code></td>
                <td>
                    String
                </td>
                <td>
                    The name of the y axis
                    
                </td>
            </tr>
        
            <tr>
                <td><code>$options</code></td>
                <td>
                    Array
                </td>
                <td>
                    Options array. See the guide for available options
                    
                </td>
            </tr>
        
    </tbody>
</table>
    
    
</div>

    


    
        <div id="onItemClick" class='rfApiMethod'>
    
    <h3><a href="#onItemClick" class="rfDocPermalink pull-right">#</a>onItemClick</h3>
    <p>
        <code>onItemClick($lockedComponents, $func)</code>
    </p>
    <p>Attach a handler for the event when a chart plot item is clicked</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>$lockedComponents</code></td>
                <td>
                    Array
                </td>
                <td>
                    Components to be locked
                    
                </td>
            </tr>
        
            <tr>
                <td><code>$func</code></td>
                <td>
                    String
                </td>
                <td>
                    Function name to be executed on item click
                    
                </td>
            </tr>
        
    </tbody>
</table>
    
    
</div>

    


    
        <div id="clearChart" class='rfApiMethod'>
    
    <h3><a href="#clearChart" class="rfDocPermalink pull-right">#</a>clearChart</h3>
    <p>
        <code>clearChart()</code>
    </p>
    <p>Clears all the data in the chart. Use this function if you want to update the chart with new data and labels. Be sure to lock the component before</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
    </tbody>
</table>
    
    
</div>

    


    
        <div id="getType" class='rfApiMethod'>
    
    <h3><a href="#getType" class="rfDocPermalink pull-right">#</a>getType</h3>
    <p>
        <code>getType()</code>
    </p>
    <p>Gets the type of this component</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
    </tbody>
</table>
    
    
</div>

    


    

    
<h2>Inherited Methods</h2>

              <div id="setCaption" class='rfApiMethod'>
    
    <h3><a href="#setCaption" class="rfDocPermalink pull-right">#</a>setCaption</h3>
    <p>
        <code>setCaption($caption)</code>
    </p>
    <p>Set the caption of this component which is the text displayed on top of the component</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>$caption</code></td>
                <td>
                    String
                </td>
                <td>
                    Caption text to be displayed on the component
                    
                </td>
            </tr>
        
    </tbody>
</table>
    
    
</div>

    




              <div id="setDimensions" class='rfApiMethod'>
    
    <h3><a href="#setDimensions" class="rfDocPermalink pull-right">#</a>setDimensions</h3>
    <p>
        <code>setDimensions($w, $h)</code>
    </p>
    <p>Set the dimensions of the component. The dimensions are based on a 12-column grid</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>$w</code></td>
                <td>
                    Number
                </td>
                <td>
                    Width of the Component in Units
                    
                </td>
            </tr>
        
            <tr>
                <td><code>$h</code></td>
                <td>
                    Number
                </td>
                <td>
                    Height of the Component in Units
                    
                </td>
            </tr>
        
    </tbody>
</table>
    
    
</div>

    




              <div id="hideComponent" class='rfApiMethod'>
    
    <h3><a href="#hideComponent" class="rfDocPermalink pull-right">#</a>hideComponent</h3>
    <p>
        <code>hideComponent()</code>
    </p>
    <p>Hides a component from the dashboard</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
    </tbody>
</table>
    
    
</div>

    




              <div id="showAsModal" class='rfApiMethod'>
    
    <h3><a href="#showAsModal" class="rfDocPermalink pull-right">#</a>showAsModal</h3>
    <p>
        <code>showAsModal()</code>
    </p>
    <p>Show a hidden component in a modal</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
    </tbody>
</table>
    
    
</div>

    




              <div id="addComponentKPI" class='rfApiMethod'>
    
    <h3><a href="#addComponentKPI" class="rfDocPermalink pull-right">#</a>addComponentKPI</h3>
    <p>
        <code>addComponentKPI($id, $options)</code>
    </p>
    <p>Add a simple Key Performance Indicator (KPI/Metric) attached to the
bottom of the component.</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>$id</code></td>
                <td>
                    String
                </td>
                <td>
                    A unique ID to identify the component KPI
                    
                </td>
            </tr>
        
            <tr>
                <td><code>$options</code></td>
                <td>
                    ComponentKPIProperties
                </td>
                <td>
                    The options as an Associative Array
                    
                        <table class="table table-condensed rfParamsTable"><thead><th>Name</th><th>Type</th><th>Description</th></thead>
                        <tbody>
                            
                            <tr>
                                <td><code>caption</code></td>
                                <td>string</td>
                                <td>The caption to display for the component KPI</td>
                            </tr>
                            
                            <tr>
                                <td><code>numberFormatFlag</code></td>
                                <td>boolean</td>
                                <td>If set to true, the number will be formatted as per the options.</td>
                            </tr>
                            
                            <tr>
                                <td><code>numberHumanize</code></td>
                                <td>boolean</td>
                                <td>Uses K, M and B to denote thousands, millions and billions respectively.</td>
                            </tr>
                            
                            <tr>
                                <td><code>numberPrefix</code></td>
                                <td>string</td>
                                <td>Adds a string perfix to the number.</td>
                            </tr>
                            
                            <tr>
                                <td><code>numberSuffix</code></td>
                                <td>string</td>
                                <td>Adds a string suffix to the number.</td>
                            </tr>
                            
                            <tr>
                                <td><code>numberDecimalPoints</code></td>
                                <td>number</td>
                                <td>Number of decimal places to show.</td>
                            </tr>
                            
                        </tbody>
                        </table>
                    
                </td>
            </tr>
        
    </tbody>
</table>
    
    
</div>

    




              <div id="updateComponentKPI" class='rfApiMethod'>
    
    <h3><a href="#updateComponentKPI" class="rfDocPermalink pull-right">#</a>updateComponentKPI</h3>
    <p>
        <code>updateComponentKPI($id, $options)</code>
    </p>
    <p>Updates the Component KPI</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>$id</code></td>
                <td>
                    String
                </td>
                <td>
                    A unique ID to identify the component KPI. This has to be the same as the one used to add the component kpi
                    
                </td>
            </tr>
        
            <tr>
                <td><code>$options</code></td>
                <td>
                    Array
                </td>
                <td>
                    Array with the new value to set
                    
                </td>
            </tr>
        
    </tbody>
</table>
    
    
</div>

    




              <div id="removeComponentKPI" class='rfApiMethod'>
    
    <h3><a href="#removeComponentKPI" class="rfDocPermalink pull-right">#</a>removeComponentKPI</h3>
    <p>
        <code>removeComponentKPI($id)</code>
    </p>
    <p>Removes a Component KPI</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>$id</code></td>
                <td>
                    String
                </td>
                <td>
                    A unique ID to identify the component KPI. This has to be the same as the one used to add the component kpi
                    
                </td>
            </tr>
        
    </tbody>
</table>
    
    
</div>

    




              <div id="getID" class='rfApiMethod'>
    
    <h3><a href="#getID" class="rfDocPermalink pull-right">#</a>getID</h3>
    <p>
        <code>getID()</code>
    </p>
    <p>Get the id for this component</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
    </tbody>
</table>
    
    
</div>

    







            
            </div>
        </div>
    </div>
<script type="text/javascript">
window.doc_is_class = true;
window.doc_id = "php_ChartComponent";
</script>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";

