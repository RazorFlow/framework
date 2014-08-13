<?php 
function custom_title () {
    return "KPITableComponent";
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
                
                    <h1>Class KPITableComponent</h1>

<h4>new KPITableComponent()</h4>


    <p>inherits from 
        <a href=MultiKPIComponent.php>MultiKPIComponent</a>
    </p>


<table class="table table-condensed rfParamsTable">
    <tbody>
        
    </tbody>
</table>


<h2>Methods</h2>

    
<h2>Inherited Methods</h2>

              <div id="addKPI" class='rfApiMethod'>
    
    <h3><a href="#addKPI" class="rfDocPermalink pull-right">#</a>addKPI</h3>
    <p>
        <code>addKPI(id, options)</code>
    </p>
    <p>Adds an individual KPI</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>id</code></td>
                <td>
                    String
                </td>
                <td>
                    A unique id for the KPI
                    
                </td>
            </tr>
        
            <tr>
                <td><code>options</code></td>
                <td>
                    ComponentKPIProperties
                </td>
                <td>
                    Set of options for configuring this KPI
                    
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

    




              <div id="updateKPI" class='rfApiMethod'>
    
    <h3><a href="#updateKPI" class="rfDocPermalink pull-right">#</a>updateKPI</h3>
    <p>
        <code>updateKPI(id, opts)</code>
    </p>
    <p>Updates an existing KPI</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>id</code></td>
                <td>
                    String
                </td>
                <td>
                    The unique id for the individual KPI
                    
                </td>
            </tr>
        
            <tr>
                <td><code>opts</code></td>
                <td>
                    ComponentKPIProperties
                </td>
                <td>
                    Set of options for configuring this KPI
                    
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

    




              <div id="deleteKPI" class='rfApiMethod'>
    
    <h3><a href="#deleteKPI" class="rfDocPermalink pull-right">#</a>deleteKPI</h3>
    <p>
        <code>deleteKPI(id)</code>
    </p>
    <p>Deletes an existing KPI</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>id</code></td>
                <td>
                    String
                </td>
                <td>
                    The unique id for the individual KPI
                    
                </td>
            </tr>
        
    </tbody>
</table>
    
    
</div>

    




              <div id="setKPICaptionColor" class='rfApiMethod'>
    
    <h3><a href="#setKPICaptionColor" class="rfDocPermalink pull-right">#</a>setKPICaptionColor</h3>
    <p>
        <code>setKPICaptionColor(id, color)</code>
    </p>
    <p>Sets a caption color for a KPI</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>id</code></td>
                <td>
                    String
                </td>
                <td>
                    The unique id for the individual KPI
                    
                </td>
            </tr>
        
            <tr>
                <td><code>color</code></td>
                <td>
                    String
                </td>
                <td>
                    Color for the caption
                    
                </td>
            </tr>
        
    </tbody>
</table>
    
    
</div>

    




              <div id="setKPIValueColor" class='rfApiMethod'>
    
    <h3><a href="#setKPIValueColor" class="rfDocPermalink pull-right">#</a>setKPIValueColor</h3>
    <p>
        <code>setKPIValueColor(id, opts)</code>
    </p>
    <p>Sets a value color for a KPI</p>
    <h4>Params</h4>
    
        <table class="table table-condensed rfParamsTable">
    <tbody>
        
            <tr>
                <td><code>id</code></td>
                <td>
                    String
                </td>
                <td>
                    The unique id for the individual KPI
                    
                </td>
            </tr>
        
            <tr>
                <td><code>opts</code></td>
                <td>
                    String
                </td>
                <td>
                    Color for the value text
                    
                </td>
            </tr>
        
    </tbody>
</table>
    
    
</div>

    







            
            </div>
        </div>
    </div>
<script type="text/javascript">
window.doc_is_class = true;
window.doc_id = "js_KPITableComponent";
</script>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";

